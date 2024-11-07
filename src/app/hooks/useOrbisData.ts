import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orbisDb } from '@/lib/orbis';

export function useOrbisData() {
    const queryClient = useQueryClient();

    // Fetch user profile
    const useProfile = (did: string) => {
        return useQuery({
            queryKey: ['profile', did],
            queryFn: () => orbisDb.getProfile(did),
            enabled: !!did,
        });
    };

    // Create post
    const useCreatePost = () => {
        return useMutation({
            mutationFn: async (data: any) => {
                return await orbisDb.createPost(data);
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['posts'] });
            },
        });
    };

    // Fetch posts
    const usePosts = (context: string, options = {}) => {
        return useQuery({
            queryKey: ['posts', context, options],
            queryFn: () => orbisDb.getPosts({ context, ...options }),
        });
    };

    return {
        useProfile,
        useCreatePost,
        usePosts,
    };
}