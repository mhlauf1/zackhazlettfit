type CacheEntry<T> = {
    value: T;
    expiry: number;
};

class CacheManager {
    private cache: Map<string, CacheEntry<any>> = new Map();

    set<T>(key: string, value: T, ttl: number) {
        const expiry = Date.now() + ttl;
        this.cache.set(key, { value, expiry });
    }

    get<T>(key: string): T | null {
        const entry = this.cache.get(key);
        if (!entry) return null;

        if (Date.now() > entry.expiry) {
            this.cache.delete(key);
            return null;
        }

        return entry.value;
    }

    invalidate(keys: string[]) {
        for (const key of keys) {
            this.cache.delete(key);
        }
    }
}

const cacheManager = new CacheManager();
export default cacheManager;
