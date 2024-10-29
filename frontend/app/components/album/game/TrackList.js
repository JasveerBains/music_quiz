import Track from './Track';
import styles from "../track.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';

export default function TrackList({tracks, solved}) {
    return (
        <div id="tracklistContainer" className={styles.outerContainer}>
        <table className={styles.tracklist}>
            <thead>
                <tr>
                    {/* <th>id</th> */}
                    <th className={styles.rank}>#</th>
                    <th className={styles.titleText}>Title</th>
                    {/* <th>title short</th> */}
                    <th className={styles.clock}><FontAwesomeIcon icon={faClock}/></th>
                </tr>
            </thead>
            <tbody>
            {
                tracks.map((track, idx) => {
                    return (
                        <Track key={track.id} track={track} solved={solved[idx]}/>
                    )
                })
            }
            </tbody>
        </table>
        </div>
    )
}