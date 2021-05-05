import React from 'react';
import styles from './styles.module.scss';
import './styles.module.scss';

export default function header({ color }) {
    return (
        <header className={styles.header}>
            <div className={styles.headerLogo}>
                <img src="netflix-logo.svg" />
            </div>
            <div className={styles.headerUser}>
                <img src="logoUser.png" />
            </div>
        </header >
    )
}