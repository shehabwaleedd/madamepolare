import { useState, useRef, useEffect } from 'react';
import { PrismicNextLink } from '@prismicio/next';
import { getSimpleLocale } from '@/utils/localeUtils';
import styles from "./style.module.scss";

interface LanguageSwitcherProps {
    locales: {
        lang: string;
        lang_name: string;
        url: string;
    }[];
    currentLocale?: string;
}

const localeLabels: Record<string, string> = {
    'en': 'En',
    'fr': 'Fr',
};

export const LanguageSwitcher = ({ locales, currentLocale }: LanguageSwitcherProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const current = currentLocale || locales[0].lang;
    const currentSimplified = getSimpleLocale(current);
    const currentLabel = localeLabels[currentSimplified] || currentSimplified;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.languageSwitcher} ref={dropdownRef} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <button className={styles.trigger} onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-haspopup="true">
                <span className={styles.currentLocale}>{currentLabel}</span>
                <svg className={`${styles.arrow} ${isOpen ? styles.open : ''}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 5.5a.5.5 0 0 1 .5.5v10.793l4.146-4.147a.5.5 0 0 1 .708.708l-5 5a.5.5 0 0 1-.708 0l-5-5a.5.5 0 0 1 .708-.708l4.146 4.147V6a.5.5 0 0 1 .5-.5" />
                </svg>
            </button>

            {isOpen && (
                <div className={styles.dropdown}>
                    <ul className={styles.list}>
                        {locales.map((locale) => {
                            const simplifiedLang = getSimpleLocale(locale.lang);
                            const label = localeLabels[simplifiedLang] || simplifiedLang;
                            const isActive = simplifiedLang === currentSimplified;

                            return (
                                <li key={locale.lang} className={`${styles.item} ${isActive ? styles.active : ''}`}>
                                    <PrismicNextLink href={locale.url} locale={locale.lang} aria-label={`Change language to ${locale.lang_name}`} className={styles.link} onClick={() => setIsOpen(false)}>
                                        {label}
                                    </PrismicNextLink>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};