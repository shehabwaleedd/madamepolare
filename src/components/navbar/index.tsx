'use client'
import React, { useRef } from 'react';
import styles from "./style.module.scss";
import { motion, useScroll, useMotionValue, useMotionValueEvent } from 'framer-motion';
import TransitionLink from '@/animation/transitionLink';
import UpperNav from './upperNav';


const Navbar: React.FC = () => {
    const { scrollY } = useScroll();
    const lastScrollY = useRef(0);
    const opacity = useMotionValue(1);

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

    const links = [
        { title: "Home", href: "/" },
        { title: "About", href: "/about" },
        { title: "Work", href: "/work" },
        { title: "Contact", href: "/contact" }
    ];

    return (
        <motion.header className={styles.navbar} style={{ opacity, transition: "opacity 0.3s ease" }}>
            <UpperNav />
            <nav className={styles.container}>
                <TransitionLink href="/" className={styles.logo}>
                    <span>Madamepolare</span>
                </TransitionLink>
                <div className={styles.content}>
                    <div className={styles.links}>
                        {links.map((link) => (
                            <TransitionLink key={link.title} href={link.href} className={styles.link}>
                                {link.title}
                            </TransitionLink>
                        ))}
                    </div>
                </div>
            </nav>
        </motion.header>
    );
}

export default Navbar;