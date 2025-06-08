import styles from "../styles/sidebar.module.css";
import Link from "next/link";
import { Trash2, DoorOpen,Plus, BookCopy, Copy, CircleUser, Settings } from "lucide-react";
import Cookies from "js-cookie";
export default function Sidebar({ allItems = [] }) {
  return (
    <div className={`${styles.sidebar}`}>
      <header>
        <h1>Brain Note</h1>
      </header>

      <section>
        <div className={styles["nav-links"]}>

          <Link href="/dashboard" className={styles["nav-link"]}>
            Minhas Notas
            <Copy size={30} className={styles.icon} />
          </Link>
          <Link href="/dashboard/person" className={styles["nav-link"]}>
            Minha Conta
            <CircleUser size={30} className={styles.icon} />
          </Link>
          <Link href="/new"  className={styles["nav-link"]}>
            Novo
            <Plus size={30} className={styles.icon} />
          </Link>
          <Link href="/" onClick={() => Cookies.remove('token')} className={styles["nav-link"]}>
            Sair
            <DoorOpen size={30} className={styles.icon} />
          </Link>
        </div>

        <div className={styles["org-list"]}>
          <header>
            <p>Suas Notas:</p>

          </header>
          <ul>
            {allItems.map(item => (
              <li
                key={item.id}
                className="AppearBottomBar"
              >
                <span>
                  {item.title || "Untitled"}
                  <span className={styles.subtype}>
                    ({item.type.charAt(0).toUpperCase() + item.type.slice(1)})
                  </span>
                </span>
              </li>
            ))}
            {allItems.length === 0 && (
              <p className={styles["no-orgs"]}>Nenhuma Anotação encontrada.</p>
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}