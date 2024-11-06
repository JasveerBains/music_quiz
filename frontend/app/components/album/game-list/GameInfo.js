import { useEffect, useState } from "react";
import styles from './gameInfo.module.css';
import Link from "next/link";
import { compareStrings } from "@/app/utils/stringProcessing";


export default function GameInfo({trackNames, solved, setSolved, id}) {
    var correct = 0;
    var total = 0;

    solved.forEach(s => {
        total += 1;
        correct += s;
    });

    const restartGame = () => {
        var newSolved = [];
        for (let i=0; i<total; i++) {
            newSolved.push(0);
        }
        setSolved(newSolved);
    }
    
    const [inputValue, setInputValue] = useState("");

    const checkInput = () => {
        var indicesSolved = []
        trackNames.forEach((t, idx) => {
            if (compareStrings(t, inputValue)) {
                indicesSolved.push(idx)
            }
        });
        if (indicesSolved.length == 0) {
            return
        }
        if (solved[indicesSolved[0]] == 1) {
            return
        }
        var temp = [...solved];
        indicesSolved.forEach((i) => {
            temp[i] = 1
        })
        setSolved(temp);
        setInputValue("");
        var container = document.getElementById("gameInfoContainer");
        var container2 = document.getElementById("tracklistContainer");
        container.style.outline = "0.5rem solid limegreen";
        container2.style.outline = "0.5rem solid limegreen";
        setTimeout(() => {
            container.style.removeProperty("outline");
            container2.style.removeProperty("outline");
        }, 1500);

    };

    useEffect(() => {
        checkInput(solved);
        console.log(inputValue);
    }, [inputValue])

    return (
        <div id="gameInfoContainer" className={styles.outerContainer}>
            <h3>Can you name all of the songs in this album?</h3>
            <div className={styles.innerContainer}>
                {
                    correct != total ? (
                        <form>
                        <input placeholder="Guess..." type="text" value={inputValue} spellCheck="false" autoComplete="false" onChange={(e) => {
                            setInputValue(e.target.value)
                        }}/>
                        <b>{correct}/{total}</b>
                        </form>

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