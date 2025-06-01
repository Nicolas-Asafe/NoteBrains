import styles from "@/styles/sidebar.module.css";
import Link from "next/link";
import Cookies from "js-cookie";
import { DoorOpen, BookCopy, Copy, CircleUser, Settings } from "lucide-react";
export default function BottomBar() {
    return (
        <div className={`${styles["nav-links", "bottomBar"]}  ContentStandart`}>

            <Link href="/home" className={styles["nav-link"]}>
                <Copy size={30} className={styles.icon} />
            </Link>
            <Link href="/dashboard/person" className={styles["nav-link"]}>
                <CircleUser size={30} className={styles.icon} />
            </Link>
            <Link href="/docs" className={styles["nav-link"]}>
                <BookCopy size={30} className={styles.icon} />
            </Link>
            <Link href="/settings" className={styles["nav-link"]}>
                <Settings size={30} className={styles.icon} />
            </Link>
            <Link href="/" onClick={() => Cookies.remove('token')} className={styles["nav-link"]}>
                <DoorOpen size={30} className={styles.icon} />
            </Link>
        </div>
    )
}