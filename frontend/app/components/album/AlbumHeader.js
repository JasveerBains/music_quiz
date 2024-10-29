import React, { useEffect } from 'react'
import styles from'./albumheader.module.css';
import Link from 'next/link';

function convertDate(dateString) {
  const [year, month, day] = dateString.split("-");
  const mon = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${day} ${mon[parseInt(month)-1]} ${year}`;
}

function adjustFontSize(element) {
  const maxAllowedWidth = window.innerWidth / 3;
  let fontSize = parseFloat(window.getComputedStyle(element).fontSize);

  while (element.scrollWidth > maxAllowedWidth && fontSize > 8) {
      fontSize -= 1;
      element.style.fontSize = `${fontSize}px`;
  }
}

const AlbumHeader = ({albumInfo}) => {
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

    <img className={styles.coverImage} src={albumInfo.cover}></img>
    <div className={styles.textContainer}>

      <h1>{albumInfo.title}</h1>
      <div className={styles.artistContainer}>
        <img className={styles.artistImage} src={albumInfo.artist.picture}></img>
        <h3><Link href={`/artist/${encodeURIComponent(albumInfo.artist.id)}`}>{albumInfo.artist.name}</Link></h3>
      </div>

      <h4>{albumInfo.nb_tracks} Tracks</h4>
      <h4>{convertDate(albumInfo.release_date)}</h4>

    </div>
  </div>
  </div>
  )
}

export default AlbumHeader