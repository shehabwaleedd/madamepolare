import * as prismic from '@prismicio/client';
import * as prismicNext from '@prismicio/next';
import { getSimpleLocale } from '@/utils/localeUtils';

export const repositoryName = process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME || '';
export const endpoint = prismic.getRepositoryEndpoint(repositoryName);

export const routes: prismic.ClientConfig['routes'] = [
    {
        type: 'page',
        uid: 'home',
        path: '/:lang?',
    },
    {
        type: 'page',
        path: '/:lang?/:uid',
    },
];

export function createClient(config: prismic.ClientConfig = {}) {
    const client = prismic.createClient(endpoint, {
        routes,
        ...config,
    });

    prismicNext.enableAutoPreviews({ client });

    return client;
}

// ✅ No `any`, uses base type from @prismicio/client
export function linkResolver(doc: prismic.PrismicDocument) {
    const simpleLocale = getSimpleLocale(doc.lang);
    const isDefaultLocale = simpleLocale === 'en';

    if (doc.type === 'page' && doc.uid === 'home') {
        return isDefaultLocale ? '/' : `/${simpleLocale}`;
    }

    if (doc.type === 'page') {
        return isDefaultLocale ? `/${doc.uid}` : `/${simpleLocale}/${doc.uid}`;
    }

    return '/';
}
