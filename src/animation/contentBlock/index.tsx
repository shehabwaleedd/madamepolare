'use client';

import React, { useRef, useMemo } from 'react';
import styles from "./style.module.scss";
import { motion, useScroll, useTransform } from 'framer-motion';
import CharacterWithOpacity from '../charactersWithOpacity';
import { ContentBlockProps } from '@/types/general';
import BrushStroke from '../brushStroke';

const ContentBlock: React.FC<ContentBlockProps> = ({ description = '', highlightColor = '#2491A8', showBrushStroke = false, brushColors, brushSpiralType, brushPosition }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const containerOpacity = useTransform(
        scrollYProgress,
        [0, 0.35],
        [0, 1],
        { clamp: true }
    );

    const parsedContent = useMemo(() => {
        const result: Array<{ text: string; isHighlighted: boolean }> = [];
        const regex = /<span>(.*?)<\/span>/g;
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(description)) !== null) {
            if (match.index > lastIndex) {
                result.push({
                    text: description.substring(lastIndex, match.index),
                    isHighlighted: false
                });
            }
            result.push({
                text: match[1],
                isHighlighted: true
            });
            lastIndex = match.index + match[0].length;
        }

        if (lastIndex < description.length) {
            result.push({
                text: description.substring(lastIndex),
                isHighlighted: false
            });
        }
        return result;
    }, [description]);

    const totalChars = useMemo(() =>
        parsedContent.reduce((sum, part) => sum + part.text.length, 0),
        [parsedContent]
    );

    if (!description) return null;

    let globalCharIndex = 0;

    return (
        <div className={styles.stickyWrapper} ref={containerRef}>
            <div className={styles.contentBlock} data-scroll-section>
                <div className={styles.content}>
                    <div className={styles.blockP}>
                        <motion.div className={styles.textContainer} style={{ opacity: containerOpacity }}>
                            {parsedContent.map((part, partIndex) => {
                                const characters = part.text.split('').map((char, charIdx) => {
                                    const currentIndex = globalCharIndex++;
                                    const fadeInThreshold = 0.05 + (currentIndex / totalChars) * 0.5;
                                    const normalFadeOutThreshold = 0.6 + ((totalChars - currentIndex) / totalChars) * 0.1;
                                    const highlightedFadeOutThreshold = 0.8 + ((totalChars - currentIndex) / totalChars) * 0.15;
                                    const isPaddedFirst = currentIndex === 0 && /[a-zA-Z]/.test(char);
                                    const isWhitespace = char === ' ' || char === '\n';

                                    return (<CharacterWithOpacity key={`char-${partIndex}-${charIdx}`} char={char} scrollYProgress={scrollYProgress} fadeInThreshold={fadeInThreshold} normalFadeOutThreshold={normalFadeOutThreshold} highlightedFadeOutThreshold={highlightedFadeOutThreshold} isPaddedFirst={isPaddedFirst} isWhitespace={isWhitespace} isHighlighted={part.isHighlighted} />);
                                });

                                if (part.isHighlighted) {
                                    return (
                                        <span key={`highlight-${partIndex}`} className={styles.highlightedText} style={{ color: highlightColor }}>
                                            {characters}
                                        </span>
                                    );
                                }

                                return <React.Fragment key={`text-${partIndex}`}>{characters}</React.Fragment>;
                            })}
                        </motion.div>
                    </div>
                    {showBrushStroke && (
                        <BrushStroke position={brushPosition} spiralType={brushSpiralType} colors={brushColors} externalScrollProgress={scrollYProgress} scrollThreshold={{ start: 0.1, end: 0.5 }} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default React.memo(ContentBlock);