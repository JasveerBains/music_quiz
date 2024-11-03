import styles from "./track.module.css"
import { convertTime } from "@/app/utils/stringProcessing"

export default function Track({track}) {

    return (
        <tr>
            <td className={styles.rank}>{track.rank}</td>
            <td>{track.title}</td>
            <td className={styles.duration}>{convertTime(track.duration)}</td>
        </tr>
    )
}