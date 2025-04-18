import React from 'react'
import styles from "./style.module.scss"
import { LanguageSwitcher } from '@/components/languageSwitcher'
import { NavbarProps } from '@/types/general'

const DoubleButton: React.FC<NavbarProps> = ({ locales }) => {
    return (
        <div className={styles.doubleButton}>
            <div className={styles.languageSwitcher}>
                <LanguageSwitcher locales={locales} />
            </div>
            <div className={styles.body}>
                <span>
                    Let&apos;s Talk
                </span>
            </div>
            <div className={styles.icon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" d="M13 18.75a.74.74 0 0 1-.53-.22a.75.75 0 0 1 0-1.06L17.94 12l-5.47-5.47a.75.75 0 0 1 1.06-1.06l6 6a.75.75 0 0 1 0 1.06l-6 6a.74.74 0 0 1-.53.22" /><path fill="currentColor" d="M19 12.75H5a.75.75 0 0 1 0-1.5h14a.75.75 0 0 1 0 1.5" /></svg>
            </div>
        </div>
    )
}

export default DoubleButton