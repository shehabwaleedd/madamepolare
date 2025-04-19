export async function resolveLang(params: Promise<{ lang: string }>) {
    const { lang } = await params;
    return lang;
}
