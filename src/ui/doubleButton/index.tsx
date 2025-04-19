import React from 'react'
import styles from "./style.module.scss"
import { DoubleButtonProps } from '@/types/general'
import Icon from './icon';

const DoubleButton: React.FC<DoubleButtonProps> = ({ buttonTitle, type }) => {
    return (
        <div className={styles.doubleButton}>
            <div className={styles.body}>
                <span>
                    {buttonTitle || "Let's Talk"}
                </span>
            </div>
            <Icon type={type}/>
        </div>
    );
};

export default DoubleButton