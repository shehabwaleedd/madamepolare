import React, { useRef, useState, useLayoutEffect } from "react";
import { motion, useScroll, useMotionValue, useAnimationFrame, useMotionValueEvent } from "framer-motion";
import styles from "./style.module.scss";

const ANIMATION_DURATION_SECONDS = 15;

interface MarqueeProps {
    text: string;
}

const Marquee: React.FC<MarqueeProps> = ({ text }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLHeadingElement>(null);
    const [contentWidth, setContentWidth] = useState<number>(0);
    const [isInitialized, setIsInitialized] = useState<boolean>(false);

    const x = useMotionValue<number>(0);
    const direction = useRef<number>(-1);
    const lastScrollY = useRef<number>(0);

    const { scrollY } = useScroll();

    useLayoutEffect(() => {
        if (contentRef.current) {
            const width = contentRef.current.offsetWidth;
            if (width > 0) {
                setContentWidth(width);
                x.set(-width);
                setIsInitialized(true);
            }
        }
    }, [text, x]);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const currentScrollY = latest < 0 ? 0 : latest;
        const scrollDirection = currentScrollY > lastScrollY.current ? -1 : 1;
        if (scrollDirection !== direction.current) {
            direction.current = scrollDirection;
        }
        lastScrollY.current = currentScrollY;
    });

    useAnimationFrame((time, delta) => {
        if (!isInitialized || contentWidth === 0 || delta === 0) return;

        const secondsDelta = delta / 1000;
        const speed = contentWidth / ANIMATION_DURATION_SECONDS;
        const moveBy = direction.current * speed * secondsDelta;

        const currentX = x.get();
        let nextX = currentX + moveBy;

        if (direction.current === -1 && nextX <= -2 * contentWidth) {
            nextX += contentWidth;
        } else if (direction.current === 1 && nextX >= 0) {
            nextX -= contentWidth;
        }

        x.set(nextX);
    });

    const renderCount = contentWidth > 0 ? 4 : 1; 

    return (
        <div className={styles.marquee}>
            <motion.div className={styles.marqueeWrapper}ref={wrapperRef}style={{ x }}>
                {[...Array(renderCount)].map((_, i) => (
                    <h3 key={i}ref={i === 0 ? contentRef : null}className={styles.marqueeText}>
                        {text}
                    </h3>
                ))}
            </motion.div>
        </div>
    );
};

export default Marquee;