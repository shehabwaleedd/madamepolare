import React from 'react'
import styles from "./style.module.scss"
import Image from 'next/image'
import Icon from '@/ui/doubleButton/icon';

const Hero = () => {
    // Avatar data array for CMS integration
    const avatars = [
        { src: "/assets/hero/hero5.webp", alt: "Team member 1" },
        { src: "/assets/hero/hero3.webp", alt: "Team member 2" },
        { src: "/assets/hero/hero2.webp", alt: "Team member 3" },
        { src: "/assets/hero/hero4.webp", alt: "Team member 4" },
    ];

    const visibleAvatars = 3;

    return (
        <section className={styles.hero}>
            <div className={styles.content}>
                <div className={styles.row}>
                    <h2>All-in-one</h2>
                    <Image src="/assets/hero/hero1.webp" alt="hero image" height={300} width={300} className={styles.rowImage} />
                </div>
                <div className={styles.row}>
                    <h2>Creative</h2>
                    <div className={styles.avatars}>
                        <div className={styles.avatarContainer}>
                            {avatars.slice(0, visibleAvatars).map((avatar, index) => {
                                const isLast = index === visibleAvatars - 1;
                                return (
                                    <Image key={index} src={avatar.src} alt={avatar.alt} height={300} width={300} className={styles.avatar} style={{ left: `${index * 48}px`, zIndex: visibleAvatars - index, boxShadow: isLast ? '5px 0 10px rgba(0, 0, 0, 0.2)' : 'none' }} />
                                );
                            })}
                        </div>
                        <div className={styles.plusSign}>+</div>
                    </div>
                    <h2>& Design</h2>
                </div>
                <div className={styles.row}>
                    <h2>Agency</h2>
                    <Icon type='arrowDown' />
                </div>
            </div>
        </section>
    )
}

export default Hero