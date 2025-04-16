'use client'
import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useAnimationFrame } from 'framer-motion'
import styles from './style.module.scss'

interface TitleMarqueeProps {
    phrase1: string;
    phrase2?: string;
}

const TitleMarquee: React.FC<TitleMarqueeProps> = ({ phrase1, phrase2 }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentWidth, setContentWidth] = useState(0);
    const [isInitialized, setIsInitialized] = useState(false);
    const prevScrollY = useRef(0);
    const direction = useRef(-1);
    const [scrollSpeed, setScrollSpeed] = useState(1);
    const speedTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const lastScrollTimeRef = useRef(0);

    const x = useMotionValue(0);
    const xTransform = useTransform(x, value => `${value}px`);

    const { scrollY } = useScroll({
        layoutEffect: false,
    });

    const BASE_SPEED = 120;

    useEffect(() => {
        if (contentRef.current) {
            const width = contentRef.current.offsetWidth;
            if (width > 0) {
                setContentWidth(width);
                setIsInitialized(true);
            }
        }
    }, [phrase1, phrase2]);

    const handleScrollChange = useCallback((latest: number) => {
        const now = performance.now();
        const timeDelta = now - lastScrollTimeRef.current;
        lastScrollTimeRef.current = now;

        const currentDirection = latest > prevScrollY.current ? -1 : 1;
        if (currentDirection !== direction.current) {
            direction.current = currentDirection;
        }

        const scrollDelta = Math.abs(latest - prevScrollY.current);
        const velocity = timeDelta > 0 ? scrollDelta / timeDelta : 0;
        const newSpeed = Math.min(5, 1 + (velocity * 15));

        if (Math.abs(newSpeed - scrollSpeed) > 0.2) {
            setScrollSpeed(newSpeed);
        }

        if (speedTimeoutRef.current) {
            clearTimeout(speedTimeoutRef.current);
        }

        if (timeDelta > 100) {
            speedTimeoutRef.current = setTimeout(() => setScrollSpeed(1), 150);
        }

        prevScrollY.current = latest;
    }, [scrollSpeed]);

    useAnimationFrame((_, delta) => {
        if (!isInitialized || contentWidth === 0) return;

        const secondsDelta = delta / 1000;
        const moveAmount = direction.current * BASE_SPEED * scrollSpeed * secondsDelta;

        const currentX = x.get();
        let nextX = currentX + moveAmount;

        if (direction.current === -1 && nextX <= -contentWidth) {
            nextX += contentWidth;
        } else if (direction.current === 1 && nextX >= 0) {
            nextX -= contentWidth;
        }

        x.set(nextX);
    });

    useEffect(() => {
        const unsubscribeScroll = scrollY.onChange(handleScrollChange);

        return () => {
            unsubscribeScroll();
            if (speedTimeoutRef.current) clearTimeout(speedTimeoutRef.current);
        };
    }, [handleScrollChange, scrollY]);

    const contentItems = useMemo(() => {
        const content = phrase2 ? [phrase1, phrase2] : [phrase1];
        return [...content, ...content];
    }, [phrase1, phrase2]);

    return (
        <div className={styles.titleMarquee} ref={containerRef}>
            <div className={styles.sliderContainer}>
                <motion.div className={styles.slider} style={{ x: xTransform }} ref={contentRef}>
                    {contentItems.map((text, index) => (
                        <p key={index} className={styles.marqueeLine}>
                            {text}
                        </p>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default React.memo(TitleMarquee);