export const localeMap: Record<string, string> = {
    'en': 'en-us',
    'fr': 'fr-fr',
};

export function getSimpleLocale(fullLocale: string): string {
    return localeMap[fullLocale] || fullLocale.split('-')[0];
}

export function getFullLocale(simpleLocale: string): string {
    return localeMap[simpleLocale] || 'en-us';
}