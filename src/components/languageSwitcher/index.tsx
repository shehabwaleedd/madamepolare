import { PrismicNextLink } from '@prismicio/next';
import { getSimpleLocale } from '@/utils/localeUtils';

interface LanguageSwitcherProps {
    locales: {
        lang: string;
        lang_name: string;
        url: string;
    }[];
}

const localeLabels: Record<string, string> = {
    'en': 'English',
    'fr': 'Français',
};

export const LanguageSwitcher = ({ locales }: LanguageSwitcherProps) => (
    <div className="language-switcher">
        <span aria-hidden>🌐</span>
        <ul className="language-list">
            {locales.map((locale) => {
                const simplifiedLang = getSimpleLocale(locale.lang);

                return (
                    <li key={locale.lang} className="language-item">
                        <PrismicNextLink href={locale.url}locale={locale.lang}aria-label={`Change language to ${locale.lang_name}`}className="language-link">
                            {localeLabels[simplifiedLang] || simplifiedLang}
                        </PrismicNextLink>
                    </li>
                );
            })}
        </ul>
    </div>
);