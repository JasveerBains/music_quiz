import styles from "./track.module.css"
import Link from "next/link"
import { convertTime } from "@/app/utils/stringProcessing"

export default function Track({track, display, hasArtists}) {

    

    return (
        <tr>
        {
        display ? (
            <>
            <td className={styles.rank}>{track.rank}</td>
            <td className={styles.title}>{track.title}</td>
            {hasArtists && (
                <td className={styles.trackArtists}>
                {track.contributors.map((artist, idx) => (
                    <div className={styles.artistContainer} key={idx}>
                    {idx === 0 && <span><Link href={`./${artist.id}`}>{artist.name}</Link></span>}
                    {idx !== 0 && <span>, <Link href={`./${artist.id}`}>{artist.name}</Link></span>}
                    </div>
                ))}
                </td>
            )}
            <td className={styles.duration}>{convertTime(track.duration)}</td>
            </>

            ) : (

            <>
            <td className={styles.rank}>{track.rank}</td>
            <td></td>
            {hasArtists && <td></td>}
            <td className={styles.duration}></td>
            </>
            )
            
        }
        </tr>
    )
}