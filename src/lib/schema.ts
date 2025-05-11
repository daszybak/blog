export type Database = {
    public: {
        Tables: {
            visits: {
                Row: {
                    id: string;                  // UUID
                    country: string | null;
                    path: string | null;
                    referrer: string | null;
                    language: string | null;
                    timestamp: string;           // ISO string
                };
                Insert: {
                    country?: string | null;
                    path?: string | null;
                    referrer?: string | null;
                    language?: string | null;
                    timestamp?: string;          // optional
                };
            };
        };
    };
};

