import Track from './Track';
import styles from "./track.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';

export default function TrackList({tracks, displayed}) {
    
    return (
        <div id="tracklistContainer" className={styles.outerContainer}>
        <table className={styles.tracklist}>
            <thead>
                <tr>
                    <th className={styles.rank}>#</th>
                    <th className={styles.titleText}>Title</th>
                    {Object.hasOwn(tracks[0], "contributors") && <th className={styles.titleText}>Artists</th>}
                    <th className={styles.clock}><FontAwesomeIcon icon={faClock}/></th>
                </tr>
            </thead>
            <tbody>
            {
                tracks.map((track, idx) => {
                    return (
                        <Track key={track.id} track={track} display={displayed[idx]} hasArtists={Object.hasOwn(tracks[0], "contributors")}/>
                    )
                })
            }
            </tbody>
        </table>
        </div>
    )
}