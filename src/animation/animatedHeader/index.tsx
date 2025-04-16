import React, { useRef } from 'react';
import { slideUp } from "@/animation/animate";
import { motion, useInView } from "framer-motion";
import styles from "./style.module.scss";

interface AnimatedHeaderProps {
    word: string;
    once?: boolean;
    className?: string;
}

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({ word, once = false, className }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once });

    if (typeof word !== 'string') {
        console.error('AnimatedHeader: word prop must be a string');
        return null;
    }

    const words = word.split(" ");

    return (
        <h2 ref={containerRef} className={`${styles.headerContainer} ${className || ''}`}>
            {words.map((singleWord, wordIndex) => (
                <React.Fragment key={`word-${wordIndex}`}>
                    {wordIndex > 0 && " "}
                    <span className={styles.wordWrapper}>
                        {singleWord.split("").map((char, i) => (
                            <span className={styles.header} key={`${char}-${i}-${wordIndex}`}>
                                <motion.span custom={[i * 0.02, (singleWord.length - i) * 0.01]} variants={slideUp} initial="initial" animate={isInView ? "open" : "closed"} exit="closed">
                                    {char}
                                </motion.span>
                            </span>
                        ))}
                    </span>
                </React.Fragment>
            ))}
        </h2>
    );
};

export default AnimatedHeader;