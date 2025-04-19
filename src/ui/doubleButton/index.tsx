import React from 'react'
import styles from "./style.module.scss"
import { LanguageSwitcher } from '@/components/languageSwitcher'
import { DoubleButtonProps } from '@/types/general'
import Icon from './icon';

const DoubleButton: React.FC<DoubleButtonProps> = ({ locales, buttonTitle }) => {
    return (
        <div className={styles.doubleButton}>
            <div className={styles.languageSwitcher}>
                <LanguageSwitcher locales={locales} />
            </div>
            <div className={styles.body}>
                <span>
                    {buttonTitle || "Let's Talk"}
                </span>
            </div>
            <Icon />
        </div>
    );
};

export default DoubleButton