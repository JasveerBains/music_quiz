import Link from "next/link"
import styles from './gamecontainer.module.css';

export default function GameContainer() {
    return (
        <div className={styles.outerContainer}>
            <Link href={'/album/game'}>
            <div className={styles.gameButton}>
                START GAME
            </div>
            </Link>
        </div>
    )
}