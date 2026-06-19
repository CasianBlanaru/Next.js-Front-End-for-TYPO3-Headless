import { T3Sites } from "@/types";

export const useT3Options = (): { currentSiteOptions: T3Sites } => {
    const currentSiteOptions: T3Sites = {
        api: {
            baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "https://pwa-demo.ddev.site/headless",
        },
        i18n: {
            default: process.env.DEFAULT_LOCALE || "en",
            locales: process.env.LOCALES ? process.env.LOCALES.split(",") : ["en", "de", "pl"],
        },
        hostname: process.env.NEXT_PUBLIC_HOSTNAME || "https://pwa-demo.ddev.site",
    };

    return { currentSiteOptions };
};
