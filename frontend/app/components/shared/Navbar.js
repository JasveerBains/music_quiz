'use client';

import Link from "next/link";
import styles from './navbar.module.css';
import { usePathname, useParams } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    // const {id} = useParams();

    return (
        <nav className={styles.navContainer}>
            <div className={styles.navItem}>
                <Link className={pathname==="/" ? styles.active : ""} href="/">
                    <div className={styles.navText}>
                        HOME
                    </div>
                </Link>
            </div>

            {
                pathname.startsWith("/album/") && (
                    <div className={styles.navItem}>
                        <Link className={pathname.startsWith("/album") && !pathname.startsWith("/album/game") ? styles.active : ""} href={`/album`}>
                            <div className={styles.navText}>
                                ALBUM
                            </div>
                        </Link>
                    </div>
                )
            }
            {

                pathname.startsWith("/artist/") && (
                    <div className={styles.navItem}>
                        <Link className={pathname.startsWith("/artist") && !pathname.startsWith("/artist/game") ? styles.active : ""} href={`/artist`}>
                            <div className={styles.navText}>
                                ARTIST
                            </div>
                        </Link>
                    </div>
                )
            }
        </nav>
    )
}