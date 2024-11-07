import { OrbisDB, OrbisConnectResult } from "@useorbis/db-sdk";
import { OrbisEVMAuth } from '@useorbis/db-sdk/auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { catchError } from "@useorbis/db-sdk/util";
import { contains, ilike, or, gte } from "@useorbis/db-sdk/operators";

export interface Profile {
    username?: string;
    bio?: string;
    avatar?: string;
    skills?: string[];
    experience?: string[];
    availability?: 'available' | 'busy' | 'unavailable';
    socialLinks?: {
        twitter?: string;
        github?: string;
        linkedin?: string;
    };
}

export interface Post {
    title: string;
    body: string;
    type?: 'job' | 'proposal' | 'review' | 'update';
    tags?: string[];
    metadata?: Record<string, any>;
}

interface OrbisState {
    db: OrbisDB | null;
    connected: boolean;
    loading: boolean;
    session: any | null;
    error: Error | null;
}

interface OrbisActions {
    connect: (provider: any) => Promise<OrbisConnectResult>;
    disconnect: () => Promise<void>;
    isConnected: () => Promise<boolean>;
    
    // Profile operations
    createProfile: (profile: Profile) => Promise<any>;
    updateProfile: (profileId: string, profile: Partial<Profile>) => Promise<any>;
    getProfile: (did: string) => Promise<any>;
    
    // Post operations
    createPost: (post: Post) => Promise<any>;
    getPosts: (options?: {
        type?: string;
        limit?: number;
        offset?: number;
        orderBy?: Array<[string, 'asc' | 'desc']>;
    }) => Promise<any>;
    updatePost: (postId: string, update: Partial<Post>) => Promise<any>;
}

export const useOrbisStore = create<OrbisState & OrbisActions>()(
    persist(
        (set, get) => ({
            db: new OrbisDB({
                ceramic: {
                    gateway: process.env.NEXT_PUBLIC_CERAMIC_GATEWAY || "https://ceramic-orbisdb-mainnet-direct.hirenodes.io/"
                },
                nodes: [
                    {
                        gateway: process.env.NEXT_PUBLIC_ORBIS_GATEWAY || "https://studio.useorbis.com",
                        env: process.env.NEXT_PUBLIC_ORBIS_ENV || "did:pkh:eip155:1:0xc3d5af402b5aec9545ae0285a0d2af50f812d547"
                    }
                ]
            }),
            connected: false,
            loading: false,
            session: null,
            error: null,

            connect: async (provider) => {
                const { db } = get();
                if (!db) throw new Error("OrbisDB not initialized");

                set({ loading: true, error: null });
                try {
                    const auth = new OrbisEVMAuth(provider);
                    const result: OrbisConnectResult = await db.connectUser({ auth });
                    
                    if (result.auth) {
                        set({ 
                            connected: true, 
                            session: result.auth.session,
                            loading: false 
                        });
                        console.log("Connected to OrbisDB", result);
                        return result;
                    }
                    throw new Error("Connection failed");
                } catch (error) {
                    set({ 
                        error: error as Error, 
                        loading: false,
                        connected: false,
                        session: null
                    });
                    throw error;
                }
            },

            disconnect: async () => {
                const { db } = get();
                if (!db) return;

                set({ loading: true });
                try {
                    await db.disconnectUser();
                    set({ 
                        connected: false, 
                        session: null, 
                        loading: false 
                    });
                } catch (error) {
                    set({ 
                        error: error as Error, 
                        loading: false 
                    });
                    throw error;
                }
            },

            isConnected: async () => {
                const { db } = get();
                if (!db) return false;
                return await db.isUserConnected();
            },

            // Profile operations
            createProfile: async (profile: Profile) => {
                const { db } = get();
                if (!db) throw new Error("OrbisDB not initialized");

                const [result, error] = await catchError(() => 
                    db.insert("profile")
                        .value(profile)
                        .context("defreelance")
                        .run()
                );

                if (error) throw error;
                return result;
            },

            updateProfile: async (profileId: string, profile: Partial<Profile>) => {
                const { db } = get();
                if (!db) throw new Error("OrbisDB not initialized");

                const [result, error] = await catchError(() => 
                    db.update(profileId)
                        .set(profile)
                        .run()
                );

                if (error) throw error;
                return result;
            },

            getProfile: async (did: string) => {
                const { db } = get();
                if (!db) throw new Error("OrbisDB not initialized");

                const [result, error] = await catchError(() => 
                    db.select()
                        .from("profile")
                        .where({ creator: did })
                        .context("defreelance")
                        .run()
                );

                if (error) throw error;
                return result.rows[0];
            },

            // Post operations
            createPost: async (post: Post) => {
                const { db } = get();
                if (!db) throw new Error("OrbisDB not initialized");

                const [result, error] = await catchError(() => 
                    db.insert("post")
                        .value(post)
                        .context("defreelance")
                        .run()
                );

                if (error) throw error;
                return result;
            },

            getPosts: async (options = {}) => {
                const { db } = get();
                if (!db) throw new Error("OrbisDB not initialized");

                let query = db.select()
                    .from("post")
                    .context("defreelance");

                if (options.type) {
                    query = query.where({ type: options.type });
                }

                if (options.orderBy) {
                    query = query.orderBy(...options.orderBy);
                }

                if (options.limit) {
                    query = query.limit(options.limit);
                }

                if (options.offset) {
                    query = query.offset(options.offset);
                }

                const [result, error] = await catchError(() => query.run());
                if (error) throw error;
                return result.rows;
            },

            updatePost: async (postId: string, update: Partial<Post>) => {
                const { db } = get();
                if (!db) throw new Error("OrbisDB not initialized");

                const [result, error] = await catchError(() => 
                    db.update(postId)
                        .set(update)
                        .run()
                );

                if (error) throw error;
                return result;
            },
        }),
        {
            name: 'orbis-storage',
            partialize: (state) => ({ 
                connected: state.connected,
                session: state.session 
            })
        }
    )
);