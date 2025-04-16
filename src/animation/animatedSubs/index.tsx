'use client'

import styles from './style.module.scss';
import { useInView, motion } from 'framer-motion';
import React, { useRef } from 'react';
import { slideUp } from '../animate';

interface AnimatedSubsProps {
    phrase: string;
    once?: boolean;
    
}
const AnimatedSubs: React.FC<AnimatedSubsProps> = ({ phrase, once = false }) => {
    const description = useRef(null);
    const isInView = useInView(description, { margin: "0px 0px -100px 0px", once: once })

    return (
        <div ref={description} className={styles.description}>
            <div className={styles.body}>
                <p>
                    {
                        phrase.split(" ").map((word, index) => {
                            return <span key={index} className={styles.mask}>
                                <motion.span
                                    variants={slideUp} custom={index} animate={isInView ? "open" : "closed"} key={index}>
                                    {word}
                                </motion.span>
                            </span>
                        })
                    }
                </p>
            </div>
        </div>
    )
}

export default AnimatedSubs