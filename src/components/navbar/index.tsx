'use client'
import React from 'react';
import styles from "./style.module.scss";
import TransitionLink from '@/animation/transitionLink';
import DoubleButton from '@/ui/doubleButton';
import { NavbarProps } from '@/types/general';
import Marquee from '@/animation/marquee';
import SvgLogo from '@/ui/svgLogo';
import { LanguageSwitcher } from '../languageSwitcher';

const Navbar: React.FC<NavbarProps> = ({ locales, settings }) => {

    const links = settings?.nav_items?.map((item) => {
        const linkUrl = item.link_url;
        let href = '/';

        if (linkUrl) {
            if (linkUrl.link_type === 'Web') {
                href = linkUrl.url || '/';
            } else if (linkUrl.link_type === 'Document') {
                href = linkUrl.slug ? `/${linkUrl.slug}` : '/';
            }
        }

        return {
            title: item.link_label || '',
            href
        };
    }) ?? [];

    return (
        <header className={styles.navbar}>
            <Marquee text={settings?.marqueetext || 'Welcome to our website'} />
            <div className={styles.logoContainer}>
                <SvgLogo />
            </div>
            <nav className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.links}>
                        {links.map((link) => (
                            <TransitionLink key={link.title} href={link.href} className={styles.link}>
                                {link.title}
                            </TransitionLink>
                        ))}
                    </div>
                    <div className={styles.center}>
                        <h3>{settings?.centeredtitle || 'Communication Agency'}</h3>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.languageSwitcher}>
                            <LanguageSwitcher locales={locales} />
                        </div>
                        <DoubleButton buttonTitle={settings?.double_button_title || 'Let`s Talk'} />
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;