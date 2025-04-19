'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { PrismicNextLink } from '@prismicio/next';
import { SettingsDocumentData } from '@/types/footer';
import styles from './style.module.scss';
import SvgLogo from '@/ui/svgLogo';
import { KeyTextField } from '@prismicio/client';


const SocialIcon = ({ type }: { type: KeyTextField }) => {
    switch (type) {
        case 'Instagram':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
                    <path fill="currentColor" d="M128 82a46 46 0 1 0 46 46a46.06 46.06 0 0 0-46-46m0 80a34 34 0 1 1 34-34a34 34 0 0 1-34 34m48-136H80a54.06 54.06 0 0 0-54 54v96a54.06 54.06 0 0 0 54 54h96a54.06 54.06 0 0 0 54-54V80a54.06 54.06 0 0 0-54-54m42 150a42 42 0 0 1-42 42H80a42 42 0 0 1-42-42V80a42 42 0 0 1 42-42h96a42 42 0 0 1 42 42ZM190 76a10 10 0 1 1-10-10a10 10 0 0 1 10 10" />
                </svg>
            );
        case 'LinkedIn':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                        <path d="M21 8v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5M7 17v-7" />
                        <path d="M11 17v-3.25M11 10v3.75m0 0c0-3.75 6-3.75 6 0V17M7 7.01l.01-.011" />
                    </g>
                </svg>
            );
        default:
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
                    <path fill="currentColor" d="M128 82a46 46 0 1 0 46 46a46.06 46.06 0 0 0-46-46m0 80a34 34 0 1 1 34-34a34 34 0 0 1-34 34m48-136H80a54.06 54.06 0 0 0-54 54v96a54.06 54.06 0 0 0 54 54h96a54.06 54.06 0 0 0 54-54V80a54.06 54.06 0 0 0-54-54m42 150a42 42 0 0 1-42 42H80a42 42 0 0 1-42-42V80a42 42 0 0 1 42-42h96a42 42 0 0 1 42 42ZM190 76a10 10 0 1 1-10-10a10 10 0 0 1 10 10" />
                </svg>
            );
    }
};

const MapPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" />
        <path d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z" />
    </svg>
);

const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
);


interface FooterProps {
    settings: SettingsDocumentData;
}

const Footer: React.FC<FooterProps> = ({ settings }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setEmail('');
    };


    const navigationTitle = settings.footer_navigation_title || 'Info';
    const navigationLinks = settings.footer_navigation_links || [];
    const socialTitle = settings.footer_social_title || 'Social';
    const socialLinks = settings.footer_social_links || [];
    const offices = settings.footer_offices || [];
    const newsletterLabel = settings.footer_newsletter_label || 'Newsletter';
    const emailPlaceholder = settings.footer_newsletter_placeholder || 'Your e-mail';
    const copyrightText = (settings.footer_copyright_text || '© {year} Madame Polare Attelier. All rights reserved.')
        .toString().replace('{year}', new Date().getFullYear().toString());
    const legalLinks = settings.footer_legal_links || [];
    const backToTopText = settings.footer_back_to_top_text || 'Back to top';

    return (
        <footer className={styles.footer} id="contact" aria-labelledby="contact-heading">
            <div className={styles.wrapper}>
                <div className={styles.topSection}>
                    <div className={styles.navigations}>
                        <div className={styles.column}>
                            <h3>{navigationTitle}</h3>
                            <ul>
                                {navigationLinks.map((link, index) => (
                                    <li key={index}>
                                        <PrismicNextLink field={link.link_url} className={styles.footerLink}>
                                            {link.link_label}
                                        </PrismicNextLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.column}>
                            <h3>{socialTitle}</h3>
                            <ul>
                                {socialLinks.map((link, index) => (
                                    <li key={index}>
                                        <PrismicNextLink field={link.platform_url} className={styles.footerLink}>
                                            {link.platform_name}
                                        </PrismicNextLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {offices.map((office, index) => (
                            <div className={styles.column} key={index}>
                                <h3>{office.office_title}</h3>
                                <div className={styles.address}>
                                    <div className={styles.mapPin}><MapPinIcon /></div>
                                    <p>{office.office_address_line1}</p>
                                    <p>{office.office_address_line2}</p>
                                </div>
                                <div className={styles.phone}>
                                    <div className={styles.phoneIcon}><PhoneIcon /></div>
                                    <p>{office.office_phone}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.middleSection}>
                    <div className={styles.socialIcons}>
                        {socialLinks.map((platform, index) => (
                            <PrismicNextLink key={index} field={platform.platform_url} aria-label={platform.platform_name?.toString() || ''}>
                                <div className={styles.icon}>
                                    <SocialIcon type={platform.platform_icon} />
                                </div>
                            </PrismicNextLink>
                        ))}
                    </div>

                    <div className={styles.newsletter}>
                        <span className={styles.newsletterLabel}>{newsletterLabel}</span>
                        <form className={styles.newsletterForm} onSubmit={handleSubmit}>
                            <div className={styles.inputContainer}>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.newsletterInput} id="newsletter-email" placeholder=" " required />
                                <label htmlFor="newsletter-email" className={styles.placeholderText}>
                                    {emailPlaceholder}
                                </label>
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
                        <p className={styles.primary}>{copyrightText}</p>
                        <div className={styles.bottomLinks}>
                            <ul className={styles.footerNavLinks}>
                                {legalLinks.map((link, index) => (
                                    <li key={index}>
                                        <PrismicNextLink field={link.link_url} className={styles.footerCopyrightLink}>
                                            {link.link_label}
                                        </PrismicNextLink>
                                    </li>
                                ))}
                            </ul>
                            <Link href="#top" className={styles.backToTop}>
                                {backToTopText}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;