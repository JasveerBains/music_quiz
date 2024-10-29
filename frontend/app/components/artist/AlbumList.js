import React from 'react';
import AlbumCard from './AlbumCard';
import styles from "./artistPage.module.css";

const AlbumList = ({albums}) => {
  return (
    <div className={styles.albumContainer}>
        {
        albums.map(a => {
            return (
                <AlbumCard key={a.id} album={a}/>
            )
        })
        }
    </div>
  )
}

export default AlbumList