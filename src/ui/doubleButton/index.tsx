import React from 'react'
import styles from "./style.module.scss"
import { LanguageSwitcher } from '@/components/languageSwitcher'
import { DoubleButtonProps } from '@/types/general'



const DoubleButton: React.FC<DoubleButtonProps> = ({ locales }) => {
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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m7 7l7-7l-7-7" /></svg>
            </div>
        </div>
    )
}

export default DoubleButton