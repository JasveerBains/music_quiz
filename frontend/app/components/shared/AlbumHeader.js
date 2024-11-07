import React, { useEffect } from 'react'
import styles from'./albumheader.module.css';
import Link from 'next/link';
import { convertDate } from '@/app/utils/stringProcessing';

function adjustFontSize(element) {
  const maxAllowedWidth = window.innerWidth / 2;
  let fontSize = parseFloat(window.getComputedStyle(element).fontSize);

  while (element.scrollWidth > maxAllowedWidth && fontSize > 8) {
      fontSize -= 1;
      element.style.fontSize = `${fontSize}px`;
  }
}

const AlbumHeader = ({albumInfo, clickableLink}) => {
    useEffect(() => {
        const titleText = document.querySelector('h1');
        adjustFontSize(titleText);
        titleText.style.visibility = "visible";
    }, []);

return (
  <div className={styles.outerContainer}>
  <div className={styles.innerContainer}>

    <img className={styles.coverImage} src={albumInfo.cover}></img>
    <div className={styles.textContainer}>

      <h1>{albumInfo.title}</h1>
      <div className={styles.artistContainer}>
        <img className={styles.artistImage} src={albumInfo.artist.picture}></img>
        {
            clickableLink? (
                <h3 className={styles.artistLink}><Link href={`/artist/${encodeURIComponent(albumInfo.artist.id)}`}>{albumInfo.artist.name}</Link></h3>
            ) : (
                <h3>{albumInfo.artist.name}</h3>
            )
        }
      </div>

      <h4>{albumInfo.nb_tracks} Tracks</h4>
      <h4>{convertDate(albumInfo.release_date)}</h4>

    </div>
  </div>
  </div>
  )
}

export default AlbumHeader