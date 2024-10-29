import React from 'react'
import styles from './artistPage.module.css'
import Link from 'next/link';

const AlbumCard = ({album}) => {
  return (
    <Link href={`/album/${encodeURIComponent(album.id)}`} key={album.id} className={styles.albumCard}>

        <img src={album.cover}></img>
        <h3 >{album.title}</h3>
    </Link>
  )
}

export default AlbumCard