import React from 'react'
import styles from "./style.module.scss"

const DoubleButton = () => {
    return (
        <div className={styles.doubleButton}>
            <div className={styles.body}>
                <span>
                    Button
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 5.5a.5.5 0 0 1 .5.5v10.793l4.146-4.147a.5.5 0 0 1 .708.708l-5 5a.5.5 0 0 1-.708 0l-5-5a.5.5 0 0 1 .708-.708l4.146 4.147V6a.5.5 0 0 1 .5-.5" /></svg>
            </div>
        </div>
    )
}

export default DoubleButton