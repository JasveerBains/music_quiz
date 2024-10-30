import Track from './Track';
import styles from "./track.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';

export default function TrackList({currOrder, setCurrOrder, correct}) {

    const [selected, setSelected] = useState([]);
    const [swapping, setSwapping] = useState([]);
    const [swapped, setSwapped] = useState(false);

    const swap = (idx1) => {
        const idx2 = selected[0];
        var newOrder = [...currOrder];
        [newOrder[idx1], newOrder[idx2]] = [newOrder[idx2], newOrder[idx1]];

        setSelected([idx2, idx1]);
        setTimeout(() => {
            setSwapping([idx2, idx1])
            setSelected([]);
        }, 400)
        setTimeout(() => {
            setSwapped(true);
        }, 800)
        
        setTimeout(() => {
            setSwapping([]);
            setCurrOrder(newOrder);
            setSwapped(false);
        }, 1200)
    }

    return (
        <div id="tracklistContainer" className={styles.outerContainer}>
        <table className={styles.tracklist}>
            <thead>
                <tr>
                    <th className={styles.rank}>#</th>
                    <th className={styles.titleText}>Title</th>
                    <th className={styles.clock}><FontAwesomeIcon icon={faClock}/></th>
                </tr>
            </thead>
            <tbody>
            {
                currOrder.map((track, idx) => {
                    if (swapping[0] == idx) {
                        return (
                            <Track
                                key={track.id}
                                swapping={true}
                                isSelected1={false}
                                isSelected2={true && !swapped}
                                selected={selected}
                                setSelected={setSelected}
                                swap={swap}
                                track={currOrder[swapping[1]]}
                                isCorrect={correct.includes(idx)}
                                position={idx + 1}
                            />
                        );
                    } else if (swapping[1] == idx) {
                        return (
                            <Track
                                key={track.id}
                                swapping={true}
                                isSelected1={true && !swapped}
                                isSelected2={false}
                                selected={selected}
                                setSelected={setSelected}
                                swap={swap}
                                track={currOrder[swapping[0]]}
                                isCorrect={correct.includes(idx)}
                                position={idx + 1}
                            />
                        );
                    } else {
                        return (
                            <Track
                                swapping={selected.length==2 || swapping.length==2}
                                key={track.id}
                                isSelected1={selected[0] == idx}
                                isSelected2={selected[1] == idx}
                                selected={selected}
                                setSelected={setSelected}
                                swap={swap}
                                track={track}
                                isCorrect={correct.includes(idx)}
                                position={idx + 1}
                            />
                        );
                    }
                })
            }
            </tbody>
        </table>
        </div>
    )
}