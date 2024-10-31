import { useEffect, useState } from "react";
import styles from './gameInfo.module.css';
import Link from "next/link";

export default function GameInfo({correct, currOrder, id, attempts, checkable, checkOrder, restartGame}) {

    var total = 0
    currOrder.forEach(() => {
        total += 1;
    });

    var totalCorrect = 0
    correct.forEach(() => {
        totalCorrect += 1
    })

    return (
        <div id="gameInfoContainer" className={styles.outerContainer}>
            <h3>Can you put these songs in the correct order?</h3>
            <div className={styles.innerContainer}>
                {
                    totalCorrect != total ? (
                        <>
                        <h4>Attempts: {attempts}</h4>
                        <b>{totalCorrect}/{total}</b>
                        </>

                    ) : (
                        <h4>Congratulations! You won in {attempts} attempts!</h4>
                    )
                }

                <div className={styles.options}>
                    {
                        checkable ? (
                            <div className={styles.check} onClick={checkOrder}>CHECK</div>
                        ) : (
                            <div className={styles.checkDisabled}>CHECK</div>
                        )
                    }

                    <div className={styles.restart} onClick={restartGame}>RESTART</div>

                    <Link href={`/album/${id}`}>
                        <div className={styles.return}>RETURN</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}