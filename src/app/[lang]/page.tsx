import { Metadata } from 'next';
import { SliceZone } from '@prismicio/react';
import { createClient } from '@/prismicio';
import { components } from '@/slices';
import { getFullLocale } from '@/utils/localeUtils';
import { notFound } from 'next/navigation';
import { resolveLang } from '@/helper/resolveLang';

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const lang = await resolveLang(params);
  const fullLocale = getFullLocale(lang);

  try {
    const client = createClient();
    const page = await client.getSingle('home', { lang: fullLocale });

    if (!page) {
      return {
        title: 'Home',
      };
    }

    return {
      title: page.data.title,
      description: page.data.meta_description || '',
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Home",
    };
  }
}

export default async function Home({ params }: { params: Params }) {
  const lang = await resolveLang(params);
  const fullLocale = getFullLocale(lang);

  try {
    const client = createClient();
    const page = await client.getSingle('home', { lang: fullLocale });

    return (
      <div className="container home-container">
        <SliceZone slices={page.data.slices} components={components} />
      </div>
    );
  } catch (error) {
    console.error(`Error fetching homepage in ${fullLocale}:`, error);
    return notFound();
  }
}

export async function generateStaticParams() {
  const client = createClient();
  const repository = await client.getRepository();

  return repository.languages.map(lang => ({
    lang: lang.id.split('-')[0],
  }));
}
