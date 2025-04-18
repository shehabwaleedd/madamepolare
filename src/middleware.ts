import { NextRequest, NextResponse } from 'next/server';

const SUPPORTED_LOCALES = ['en', 'fr'];
const DEFAULT_LOCALE = 'en';

const isStaticAsset = (pathname: string): boolean => {

    return /\.(?:jpg|jpeg|gif|png|svg|webp|ico|ttf|woff|woff2|mp4|webm|mp3|pdf|css|js)$/.test(pathname);
};

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (
        isStaticAsset(pathname) ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/slice-simulator')
    ) {
        return NextResponse.next();
    }

    const hasLocale = SUPPORTED_LOCALES.some(
        locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (!hasLocale && pathname !== '/') {
        return NextResponse.redirect(
            new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url)
        );
    }

    if (pathname === '/') {
        return NextResponse.rewrite(
            new URL(`/${DEFAULT_LOCALE}`, request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next|api|slice-simulator).*)',
    ],
};