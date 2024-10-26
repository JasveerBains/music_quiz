import React from 'react'
import Track from './Track'

const TrackList = ({tracks}) => {

    return (
        <table>
            <thead>
                <tr>
                    {/* <th>id</th> */}
                    <th>#</th>
                    <th>Title</th>
                    {/* <th>title short</th> */}
                    <th>Duration</th>
                </tr>
            </thead>
            <tbody>
            {
                tracks.map((track) => {
                    return (
                        <Track key={track.id} track={track}/>
                    )
                })
            }
            </tbody>
        </table>
    )
}

export default TrackList