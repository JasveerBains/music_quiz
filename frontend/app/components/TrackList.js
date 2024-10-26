import React from 'react';
import Track from './Track';
import "./track.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';

const TrackList = ({tracks}) => {

    return (
        <table>
            <thead>
                <tr>
                    {/* <th>id</th> */}
                    <th className='rank'>#</th>
                    <th>Title</th>
                    {/* <th>title short</th> */}
                    <th className='clock'><FontAwesomeIcon icon={faClock}/></th>
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