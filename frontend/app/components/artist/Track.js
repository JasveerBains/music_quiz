import styles from "./track.module.css"

export default function Track({track}) {

    function timeFormat(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    return (
        <tr>
            {/* <td>{track.id}</td> */}
            <td className={styles.rank}>{track.rank}</td>
            <td className={styles.trackTitle}>{track.title}</td>
            <td className={styles.trackArtists}>
                    {track.contributors.map((artist, idx) => (
                        <div className={styles.artistContainer} key={idx}>
                        {idx === 0 && <span>{artist.name} </span>}
                        {idx !== 0 && <span>, {artist.name}</span>}
                        </div>
                    ))}
            </td>
            <td className={styles.duration}>{timeFormat(track.duration)}</td>
        </tr>
    )
}