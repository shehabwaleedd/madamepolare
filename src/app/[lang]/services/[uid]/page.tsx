import { Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { resolveLang } from "@/lib/resolveLang";
import { getFullLocale } from "@/utils/localeUtils";

type Params = Promise<{ lang: string; uid: string }>;

export default async function Page({ params }: { params: Params }) {
    const { uid, lang } = await params;
    const resolvedLang = await resolveLang(Promise.resolve({ lang }));
    const fullLocale = getFullLocale(resolvedLang);
    const client = createClient();

    const page = await client.getByUID("service_post", uid, { lang: fullLocale }).catch(() => notFound());

    return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { uid, lang } = await params;
    const resolvedLang = await resolveLang(Promise.resolve({ lang }));
    const fullLocale = getFullLocale(resolvedLang);
    const client = createClient();

    const page = await client.getByUID("service_post", uid, { lang: fullLocale }).catch(() => notFound());

    return {
        title: page.data.meta_title,
        description: page.data.meta_description,
        openGraph: {
            images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
        },
    };
}

export async function generateStaticParams() {
    const client = createClient();
    const pages = await client.getAllByType("service_post", { lang: "*" });

    return pages.map((page) => ({
        uid: page.uid,
        lang: page.lang,
    }));
}
