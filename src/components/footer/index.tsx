'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './style.module.scss';
import SvgLogo from '@/ui/svgLogo';

const links = [
    {
        title: "Privacy Policy",
        href: "/privacy"
    },
    {
        title: "Cookies",
        href: "/cookies"
    }
];

const navLinks = [
    {
        title: "Work",
        href: "/work"
    },
    {
        title: "About",
        href: "/about"
    },
    {
        title: "Services",
        href: "/services"
    },
    {
        title: "Pricing",
        href: "/pricing"
    },
    {
        title: "Magazine",
        href: "/magazine"
    },
    {
        title: "Career",
        href: "/career"
    },
    {
        title: "FAQ",
        href: "/faq"
    }
];

const socialMedia = [
    {
        title: "Instagram",
        url: "#"
    },
    {
        title: "LinkedIn",
        url: "#"
    },
];

const Footer: React.FC = () => {
    const [email, setEmail] = useState('');



    return (
        <footer className={styles.footer} id="contact" aria-labelledby="contact-heading">
            <div className={styles.wrapper}>
                <div className={styles.topSection}>
                    <div className={styles.navigations}>
                        <div className={styles.column}>
                            <h3>Info</h3>
                            <ul>
                                {navLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link href={link.href} className={styles.footerLink}>
                                            {link.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.column}>
                            <h3>Social</h3>
                            <ul>
                                {socialMedia.map((link, index) => (
                                    <li key={index}>
                                        <Link href={link.url} className={styles.footerLink}>
                                            {link.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.column}>
                            <h3>Head Office</h3>
                            <div className={styles.address}>
                                <div className={styles.mapPin}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" />
                                        <path d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z" />
                                    </svg>
                                </div>
                                <p>17 rue André del Sarte</p>
                                <p>75018 Paris, France</p>
                            </div>
                            <div className={styles.phone}>
                                <div className={styles.phoneIcon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                    </svg>
                                </div>
                                <p>+33 01 01 01 01 01</p>
                            </div>
                        </div>

                        <div className={styles.column}>
                            <h3>US Office</h3>
                            <div className={styles.address}>
                                <div className={styles.mapPin}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" />
                                        <path d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z" />
                                    </svg>
                                </div>
                                <p>225 Lexington Ave.</p>
                                <p>15001A New York City, New York</p>
                            </div>
                            <div className={styles.phone}>
                                <div className={styles.phoneIcon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                    </svg>
                                </div>
                                <p>+1 11 11 11 11 1</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.middleSection}>
                    <div className={styles.socialIcons}>
                        <Link href="#" aria-label="Instagram">
                            <div className={styles.icon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
                                    <path fill="currentColor" d="M128 82a46 46 0 1 0 46 46a46.06 46.06 0 0 0-46-46m0 80a34 34 0 1 1 34-34a34 34 0 0 1-34 34m48-136H80a54.06 54.06 0 0 0-54 54v96a54.06 54.06 0 0 0 54 54h96a54.06 54.06 0 0 0 54-54V80a54.06 54.06 0 0 0-54-54m42 150a42 42 0 0 1-42 42H80a42 42 0 0 1-42-42V80a42 42 0 0 1 42-42h96a42 42 0 0 1 42 42ZM190 76a10 10 0 1 1-10-10a10 10 0 0 1 10 10" />
                                </svg>
                            </div>
                        </Link>
                        <Link href="#" aria-label="LinkedIn">
                            <div className={styles.icon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                                        <path d="M21 8v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5M7 17v-7" />
                                        <path d="M11 17v-3.25M11 10v3.75m0 0c0-3.75 6-3.75 6 0V17M7 7.01l.01-.011" />
                                    </g>
                                </svg>
                            </div>
                        </Link>
                    </div>

                    <div className={styles.newsletter}>
                        <span className={styles.newsletterLabel}>Newsletter</span>
                        <form className={styles.newsletterForm}>
                            <div className={styles.inputContainer}>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.newsletterInput} id="newsletter-email" placeholder=" " />
                                <label htmlFor="newsletter-email" className={styles.placeholderText}>Your e-mail</label>
                                <button type="submit" className={styles.submitButton} aria-label="Subscribe">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                        <polyline points="12,8 16,12 12,16" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                        <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="1.5" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <SvgLogo />

                <div className={styles.footerBottom}>
                    <div className={styles.footerCopyrightLine}>
                        <p className={styles.primary}>© {new Date().getFullYear()} Madame Polare Attelier. All rights reserved.</p>
                        <div className={styles.bottomLinks}>
                            <ul className={styles.footerNavLinks}>
                                {links.map((link, index) => (
                                    <li key={index}>
                                        <Link href={link.href} className={styles.footerCopyrightLink}>
                                            {link.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <Link href="#top" className={styles.backToTop}>
                                Back to top
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;