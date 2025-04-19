import React from 'react'
import styles from "./style.module.scss"
import { PrismicNextLink } from "@prismicio/next"
import Icon from './icon'
import { DoubleButtonProps } from '@/types/general'

const DoubleButton: React.FC<DoubleButtonProps> = ({ buttonTitle, type = 'arrowRight', field, className = '' }) => {
    const buttonContent = (
        <>
            <div className={styles.body}>
                <span>
                    {buttonTitle || field?.text || "Let's Talk"}
                </span>
            </div>
            <Icon type={type} />
        </>
    );

    if (field && field.link_type !== 'Any') {
        return (
            <PrismicNextLink field={field} className={`${styles.doubleButton} ${className}`}>
                {buttonContent}
            </PrismicNextLink>
        );
    }

    return (
        <div className={`${styles.doubleButton} ${className}`}>
            {buttonContent}
        </div>
    );
};

export default DoubleButton