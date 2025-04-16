'use client'

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './style.module.scss';
import { BrushStrokeProps } from '@/types/brush';

const DOODLE_PATTERNS = {
    pattern1: `M 80 120 C 40 180 20 280 80 340 C 160 420 320 420 290 310 C 250 210 430 180 520 300 C 590 390 420 520 320 540 C 230 560 42 698 360 800 C 791 942 975 684 628 113`,
    pattern2: `M 115 176 C -4 599 76 834 314 641 C 709 285 873 439 643 750 C 345 1157 381 5 765 17 C 1249 4 42 698 492 -128`,
    pattern3: `M 83 331 C -4 599 76 834 778 869 C 2021 894 13 386 1414 1556`,
    pattern4: `M 7 977 C 765 1654 1778 -51 2088 1129 C 2546 2638 13 386 2809 1135`,
    top: `M 576 -90 C 1424 367 819 836 515 494 C 291 170 1809 889 1735 452`,
    bottomRight: `M 2090 590 C 1002 30 -217 1174 569 1460 C 1548 1615 1393 928 -270 699`,
};


const BrushStroke: React.FC<BrushStrokeProps> = ({
    spiralType = 'medium',
    customPath,
    position = 'left',
    colors = { start: '#f0c14b', end: '#5521b5' },
    className = '',
    strokeWidth = 65,
    scale = 1,
    offsetX = 0,
    offsetY = 0,
    animated = true,
    viewBox = "0 0 800 600",
    scrollThreshold = { start: 0, end: 0.5 },
    externalScrollProgress,
    id,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const brushId = id || `brush-${position}-${spiralType}-${strokeWidth}`;
    const gradientId = `brush-gradient-${brushId}`;

    const pathToUse = customPath ||
        (spiralType && DOODLE_PATTERNS[spiralType as keyof typeof DOODLE_PATTERNS]) ||
        DOODLE_PATTERNS.pattern1;

    const { scrollYProgress: internalScroll } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const scrollYProgress = externalScrollProgress || internalScroll;

    const pathDrawProgress = useTransform(
        scrollYProgress,
        [scrollThreshold.start, scrollThreshold.end],
        [0, 1]
    );

    const opacityProgress = useTransform(
        scrollYProgress,
        [scrollThreshold.start, scrollThreshold.end, scrollThreshold.end + 0.2, 1],
        [1, 1, 0, 0]
    );

    const brushPositionClass = position === 'left' ? styles.left : position === "top" ? styles.top : styles.right;

    const svgStyle = {
        transform: `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`,
        transformOrigin: position === 'right' ? 'right center' : 'left center',
    };

    return (
        <div ref={containerRef} className={`${styles.brushStrokeContainer} ${brushPositionClass} ${className}`}>
            <motion.svg width="100%" height="100%" viewBox={viewBox} preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" className={styles.brushStrokeSvg} style={{ ...svgStyle, opacity: opacityProgress }}>
                <defs>
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={colors.start} />
                        <stop offset="100%" stopColor={colors.end} />
                    </linearGradient>
                </defs>
                {animated ? (
                    <motion.path d={pathToUse} fill="none" stroke={`url(#${gradientId})`} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} style={{ pathLength: pathDrawProgress }} strokeDasharray="1" strokeDashoffset="0" />
                ) : (
                    <path d={pathToUse} fill="none" stroke={`url(#${gradientId})`} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
                )}
            </motion.svg>
        </div>
    );
};

export default React.memo(BrushStroke);