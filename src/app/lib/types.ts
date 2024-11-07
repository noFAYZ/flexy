export interface OrbisPost {
    stream_id: string;
    creator: string;
    content: {
        title?: string;
        body?: string;
        type?: 'job' | 'proposal' | 'review';
        tags?: string[];
        attachments?: string[];
        data?: Record<string, any>;
    };
    context?: string;
    timestamp: number;
    indexing_timestamp?: number;
    master?: string;
    reply_to?: string;
}

export interface OrbisProfile {
    did: string;
    stream_id: string;
    content: {
        username: string;
        description?: string;
        avatar?: string;
        skills?: string[];
        hourlyRate?: number;
        availability?: 'available' | 'busy' | 'unavailable';
        social?: {
            twitter?: string;
            github?: string;
            linkedin?: string;
        };
    };
    timestamp: number;
    creator: string;
    context?: string;
}