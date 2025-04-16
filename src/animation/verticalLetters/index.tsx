'use client'; 

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './style.module.scss';


if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface TextEffect027Props {
    words: string[];
}

const TextEffect027: React.FC<TextEffect027Props> = ({ words }) => {
    const container = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.to(`.${styles.letter}`, {
                yPercent: 100,
                ease: 'power1.inOut',
                scrollTrigger: {
                    trigger: `.${styles.list}`,
                    start: '55.55% bottom',
                    end: '100% 80%',
                    scrub: 1,
                },
                stagger: {
                    each: 0.05,
                    from: 'random',
                },
            });
        },
        { scope: container }
    );

    const renderWord = (word: string) => {
        return word.split('').map((char, index) => {
            if (char === ' ') {
                return <React.Fragment key={`${word}-space-${index}`}>{' '}</React.Fragment>;
            }
            return (
                <span key={`${word}-${char}-${index}`} className={styles.letter}>
                    <span>{char}</span><span>{char}</span>
                </span>
            );
        });
    };

    return (
        <section ref={container} className={styles.mwg_effect027}>
            <ul className={styles.list}>
                {words.map((word, idx) => (
                    <li key={idx} className={styles.listItem}>
                        {renderWord(word)}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default TextEffect027;