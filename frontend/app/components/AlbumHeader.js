import React from 'react'

const AlbumHeader = ({albumInfo}) => {
  return (
    <div>
        <div>{albumInfo.id}</div>
        <div>{albumInfo.title}</div>
        <div>{albumInfo.cover}</div>
        <div>{albumInfo.nb_tracks}</div>
        <div>{albumInfo.release_date}</div>
        <br/>
        <div>{albumInfo.artist.id}</div>
        <div>{albumInfo.artist.name}</div>
        <div>{albumInfo.artist.picture}</div>
    </div>
  )
}

export default AlbumHeader