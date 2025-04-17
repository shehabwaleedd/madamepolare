
import { NextRequest, NextResponse } from 'next/server';


const SUPPORTED_LOCALES = ['en', 'fr'];
const DEFAULT_LOCALE = 'en';

export async function middleware(request: NextRequest) {
    try {

        const { pathname } = request.nextUrl;


        if (
            pathname.startsWith('/_next') ||
            pathname.startsWith('/api') ||
            pathname.startsWith('/slice-simulator')
        ) {
            return;
        }

        const pathnameHasLocale = SUPPORTED_LOCALES.some(
            locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
        );


        if (!pathnameHasLocale && pathname !== '/') {
            return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, request.url));

        }

        if (pathname === '/') {
            return NextResponse.rewrite(new URL(`/${DEFAULT_LOCALE}`, request.url));
        }
    } catch (error) {
        console.error('Middleware error:', error);

        return NextResponse.next();
    }
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|api|slice-simulator).*)',
    ],
};