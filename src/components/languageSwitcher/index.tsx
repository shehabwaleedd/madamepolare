'use client';

import { useState, useRef, useEffect } from 'react';
import { getSimpleLocale } from '@/utils/localeUtils';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './style.module.scss';

interface LanguageSwitcherProps {
    locales: {
        lang: string;
        lang_name: string;
        url: string;
    }[];
    currentLocale?: string;
}

const localeLabels: Record<string, string> = {
    en: 'En',
    fr: 'Fr',
};

export const LanguageSwitcher = ({ locales, currentLocale }: LanguageSwitcherProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    const detectCurrentLocale = () => {
        const pathSegments = pathname.split('/');
        const firstSegment = pathSegments[1];
        if (firstSegment === 'en' || firstSegment === 'fr') {
            return firstSegment;
        }
        return currentLocale || locales[0].lang.split('-')[0];
    };

    const currentSimplified = detectCurrentLocale();
    const currentLabel = localeLabels[currentSimplified] || currentSimplified;

    const buildHref = (targetLang: string) => {
        const pathSegments = pathname.split('/');
        if (['en', 'fr'].includes(pathSegments[1])) {
            pathSegments[1] = targetLang;
        } else {
            pathSegments.unshift(targetLang);
        }
        return pathSegments.join('/');
    };

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
        <div className={styles.languageSwitcher} ref={dropdownRef}>
            <button className={styles.trigger} onClick={() => setIsOpen(!isOpen)}>
                <span className={styles.currentLocale}>{currentLabel}</span>
                <svg className={styles.arrow} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
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
                            const newHref = buildHref(simplifiedLang);

                            return (
                                <li key={locale.lang} className={`${styles.item} ${isActive ? styles.active : ''}`}>
                                    <Link href={newHref} className={styles.link}>
                                        {label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};
