import type { MiddlewareHandler } from 'astro';
import { defineMiddleware} from "astro:middleware";
import { supabase } from '../lib/supabaseClient.ts';

export const logVisit: MiddlewareHandler = defineMiddleware(({request, url, clientAddress}, next) => {
    const pathname = url.pathname;
    const MODE = import.meta.env.MODE;

    // disable in dev mode
    if (MODE === "development") {
        return next();
    }

    if (
        !(pathname === "/" || pathname.startsWith("/blog") || pathname.startsWith("/about")) ||
        pathname.endsWith('.js') ||
        pathname.endsWith('.css') ||
        pathname.endsWith('.svg') ||
        pathname.endsWith('.ico') ||
        pathname.endsWith('.jpg') ||
        pathname.endsWith('.txt') ||
        pathname.endsWith('.json') ||
        request.method !== 'GET'
    ) {
        return next();
    }

    const saveVisit = async () => {
        // const rawIP = clientAddress;
        const language = request.headers.get('accept-language')?.split(',')[0] ?? '';
        const referrer = request.headers.get('referer') ?? '';

        await supabase.from('visits').insert([{
            path: pathname,
            referrer,
            language,
        }]);
    }

    // non-blocking
    saveVisit().then();
    return next();
});
