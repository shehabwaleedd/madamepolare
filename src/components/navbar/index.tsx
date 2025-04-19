'use client'
import React, { useEffect, useRef } from 'react';
import styles from "./style.module.scss";
import { motion, useScroll, useMotionValue, useMotionValueEvent } from 'framer-motion';
import TransitionLink from '@/animation/transitionLink';
import DoubleButton from '@/ui/doubleButton';
import { NavbarProps } from '@/types/general';
import Marquee from '@/animation/marquee';
import SvgLogo from '@/ui/svgLogo';

const Navbar: React.FC<NavbarProps> = ({ locales, settings }) => {
    const { scrollY } = useScroll();
    const lastScrollY = useRef(0);
    const opacity = useMotionValue(1);

    useEffect(() => {
        console.log(settings, "settings");
    }, [settings]);

    useMotionValueEvent(scrollY, "change", (current) => {
        if (current < 10) {
            opacity.set(1);
            lastScrollY.current = current;
            return;
        }

        const isScrollingDown = current > lastScrollY.current;
        const targetOpacity = isScrollingDown ? 0 : 1;
        opacity.set(targetOpacity);
        lastScrollY.current = current;
    });

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
        <motion.header className={styles.navbar} style={{ opacity, transition: "opacity 0.3s ease" }}>
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
                        <DoubleButton locales={locales} buttonTitle={settings?.double_button_title} />
                    </div>
                </div>
            </nav>
        </motion.header>
    );
}

export default Navbar;