import { useEffect, useState } from "react";
import styles from './gameInfo.module.css';
import Link from "next/link";

export default function GameInfo({correct, setCorrect, currOrder, id}) {

    var total = 0
    currOrder.forEach(() => {
        total += 1;
    });

    var totalCorrect = 0
    correct.forEach(() => {
        totalCorrect += 1
    })

    const restartGame = () => {
        // var newSolved = [];
        // for (let i=0; i<total; i++) {
        //     newSolved.push(0);
        // }
        // setSolved(newSolved);
    }

    return (
        <div id="gameInfoContainer" className={styles.outerContainer}>
            <h3>Can you put these songs in the correct order?</h3>
            <div className={styles.innerContainer}>
                {
                    totalCorrect != total ? (
                        <>
                        <b>{totalCorrect}/{total}</b>
                        </>

                    ) : (
                        <h4>Congratulations! You Win!</h4>
                    )
                }

                <div className={styles.options}>
                    <div className={styles.restart} onClick={restartGame}>RESTART</div>

                    <Link href={`/album/${id}`}>
                        <div className={styles.return}>RETURN</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}