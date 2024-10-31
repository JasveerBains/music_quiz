import styles from "./track.module.css"

export default function Track({swapping, isSelected1, isSelected2, selected, setSelected, swap, track, isCorrect, position}) {

    function timeFormat(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function selectTrack() {
        if (swapping) {
            return
        }
        if (selected.length == 0) {
            setSelected([position-1]);

        } else if (isSelected1) {
            setSelected([]);

        } else {
            swap(position-1);
        }

    }

    if (isCorrect) {
        return (
            <tr className={styles.correct}>
                <td className={styles.rank}>{position}</td>
                <td>{track.title}</td>
                <td className={styles.duration}>{timeFormat(track.duration)}</td>
            </tr>
        )
    } else if (isSelected1) {
        return (
            <tr className={styles.selected1} onClick={selectTrack}>
                <td className={styles.rank}>{position}</td>
                <td>{track.title}</td>
                <td className={styles.duration}>{timeFormat(track.duration)}</td>
            </tr>
        )
    } else if (isSelected2) {
        return (
            <tr className={styles.selected2} onClick={selectTrack}>
                <td className={styles.rank}>{position}</td>
                <td>{track.title}</td>
                <td className={styles.duration}>{timeFormat(track.duration)}</td>
            </tr>
        )
    }

    return (
        <tr className={swapping ? styles.disabled : styles.unselected} onClick={selectTrack}>
            <td className={styles.rank}>{position}</td>
            <td>{track.title}</td>
            <td className={styles.duration}>{timeFormat(track.duration)}</td>
        </tr>
    )
}