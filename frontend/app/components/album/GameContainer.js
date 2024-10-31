import Link from "next/link"
import styles from './gamecontainer.module.css';

export default function GameContainer() {
    return (
        <div className={styles.outerContainer}>
            <Link href={'/album/game-list'}>
            <div className={styles.gameButton}>
                LIST
            </div>
            </Link>

            <Link href={'/album/game-order'}>
            <div className={styles.gameButton}>
                ORDER
            </div>
            </Link>
        </div>
    )
}