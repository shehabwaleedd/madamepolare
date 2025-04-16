'use client'
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from './style.module.scss';

interface AnimatedBlockProps {
    text: string;
}

const AnimatedBlock = ({ text }: AnimatedBlockProps) => {
    const sentenceRef = useRef<HTMLParagraphElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!sentenceRef.current || !containerRef.current) return;
        const wrapLettersInSpan = (element: HTMLElement) => {
            const text = element.textContent || '';
            element.innerHTML = text
                .split(' ')
                .map(word =>
                    `<span class="${styles.word}">${word
                        .split('')
                        .map(char => `<span class="${styles.letter}"><span>${char}</span></span>`)
                        .join('')}</span>`
                )
                .join(' ');
        };

        const shuffleArray = (array: Element[]) => {
            const newArray = [...array];
            for (let i = newArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
            }
            return newArray;
        };

        wrapLettersInSpan(sentenceRef.current);

        const letters = document.querySelectorAll(`.${styles.letter} span`);
        const container = containerRef.current;
        const shuffleLetters = shuffleArray(Array.from(letters));

        ScrollTrigger.create({
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        });

        const distPerLetter = 100 / letters.length;
        for (let i = 0; i < letters.length; i++) {
            gsap.from(shuffleLetters[i], {
                y: '110%',
                ease: 'power4.inOut',
                duration: 0.8,
                scrollTrigger: {
                    trigger: container,
                    start: `top+=${distPerLetter * i}% bottom`,
                    end: '+=1',
                    toggleActions: 'play none reverse none'
                }
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [text]);

    return (
        <div className={styles.animatedBlock}>
            <div className={styles.container} ref={containerRef}>
            <p className={styles.sentence} ref={sentenceRef}>
                {text}
            </p>
        </div>
        </div>
    );
};

export default AnimatedBlock;