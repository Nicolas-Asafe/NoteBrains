'use client';

import styles from "../styles/sidebar.module.css";
import Link from "next/link";
import { DoorOpen, Plus, Copy, CircleUser, X } from "lucide-react";
import Cookies from "js-cookie";
import { useState } from "react";

export default function Sidebar({ allItems = [] }) {
  const [orgSelecionada, setOrgSelecionada] = useState(null);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [animandoSaida, setAnimandoSaida] = useState(false);

  const abrirModal = (item) => {
    setOrgSelecionada(item);
    setModalVisivel(true);
    setAnimandoSaida(false);
  };

  const fecharModal = () => {
    setAnimandoSaida(true);
    setTimeout(() => {
      setModalVisivel(false);
      setOrgSelecionada(null);
    }, 300); // Duração da animação de saída em milissegundos (bater com o CSS)
  };

  return (
    <div className={styles.sidebar}>
      <header>
        <h1>Brain Note</h1>
      </header>

      <section>
        <div className={styles["nav-links"]}>
          <Link href="/dashboard" className={styles["nav-link"]}>
            Meus orgs
            <Copy size={30} className={styles.icon} />
          </Link>
          <Link href="/dashboard/person" className={styles["nav-link"]}>
            Minha conta
            <CircleUser size={30} className={styles.icon} />
          </Link>
          <Link href="/new" className={styles["nav-link"]}>
            Nova
            <Plus size={30} className={styles.icon} />
          </Link>
          <Link href="/" onClick={() => Cookies.remove("token")} className={styles["nav-link"]}>
            Sair da conta
            <DoorOpen size={30} className={styles.icon} />
          </Link>
        </div>

        <div className={styles["org-list"]}>
          <header>
            <p>Seus orgs:</p>
          </header>
          <ul>
            {allItems.map((item) => (
              <li
                key={item.id}
                className="AppearBottomBar"
                onClick={() => abrirModal(item)}
                style={{ cursor: "pointer" }}
              >
                <span>
                  {item.title || "Sem título"}
                  <span className={styles.subtype}>
                    ({item.type?.charAt(0).toUpperCase() + item.type?.slice(1)})
                  </span>
                </span>
              </li>
            ))}
            {allItems.length === 0 && (
              <p className={styles["no-orgs"]}>Nenhum org foi encontrado.</p>
            )}
          </ul>
        </div>
      </section>

      {modalVisivel && (
        <div
          className={`centerContainer stanContainer2 full modal ${animandoSaida ? "animaClose" : "animaAppear1"}`}
        >
          <header>
            <span>Organização Selecionada</span>
            <X style={{ cursor: "pointer" }} onClick={fecharModal} />
          </header>
          <header>
            <h3>{orgSelecionada?.title || "Sem título"}</h3>
            <small>
              {orgSelecionada?.createdAt &&
                `Criada em: ${new Date(orgSelecionada.createdAt).toLocaleDateString()}`}
            </small>
          </header>
          <div style={{ height: "80%" }}>
            <p>{orgSelecionada?.notes || "Sem anotações."}</p>
          </div>
        </div>
      )}
    </div>
  );
}
