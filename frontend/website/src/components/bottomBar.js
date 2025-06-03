import styles from "@/styles/sidebar.module.css";
import Link from "next/link";
import Cookies from "js-cookie";
import { DoorOpen, Copy, CircleUser,Plus } from "lucide-react";
export default function BottomBar() {
    return (
        <div className={`${styles["nav-links", "bottomBar"]} ContentStandart`}>

            <Link href="/dashboard" className={styles["nav-link"]}>
                <Copy size={30} className={styles.icon} />
            </Link>
            <Link href="/dashboard/person" className={styles["nav-link"]}>
                <CircleUser size={30} className={styles.icon} />
            </Link>
            <Link href="/new" className={styles["nav-link"]}>
                <Plus size={30} className={styles.icon} />
            </Link>
            <Link href="/" onClick={() => Cookies.remove('token')} className={styles["nav-link"]}>
                <DoorOpen size={30} className={styles.icon} />
            </Link>
        </div>
    )
}