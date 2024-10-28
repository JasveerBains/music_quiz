import React from 'react';
import { useEffect } from 'react';
import styles from './artistPage.module.css';

function adjustFontSize(element) {
    const maxAllowedWidth = window.innerWidth / 3;
    let fontSize = parseFloat(window.getComputedStyle(element).fontSize);
  
    while (element.scrollWidth > maxAllowedWidth && fontSize > 8) {
        fontSize -= 1;
        element.style.fontSize = `${fontSize}px`;
    }
}

const ArtistHeader = ({artistInfo}) => {
    useEffect(() => {
        const textElement = document.querySelector('h1');
        adjustFontSize(textElement);
        window.addEventListener('resize', () => adjustFontSize(textElement));
        
        return () => {
          window.removeEventListener('resize', adjustFontSize);
        };
    }, []);

    return (
        <div className={styles.outerContainer}>
        <div className={styles.innerContainer}>

            <img className={styles.coverImage} src={artistInfo.picture}></img>
            <div className={styles.textContainer}>

            <h1>{artistInfo.name}</h1>

            </div>
        </div>
        </div>
    )
}

export default ArtistHeader