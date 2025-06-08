"use client";

import { authMiddleware } from '../../middlewares/authMiddleware';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../components/Sidebar';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Trash, Eye, Edit, X } from 'lucide-react';
import styles from '../../styles/dashboard.module.css';
import BottomBar from '@/components/bottomBar';

export default function Dashboard() {
  const router = useRouter();
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orgModal, setOrgModal] = useState({
    title: "",
    notes: "",
    createdAt: ''
  });

  async function ReqUser() {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://notebrains.onrender.com/api/v1/me/person',
        {
          headers: {
            'x-api-key': 'kingjs_4534',
            'Authorization': `Bearer ${Cookies.get("token")}`,
            'ngrok-skip-browser-warning': 'true'
          }
        }
      );
      setMe(response?.data?.data?.user);
    } catch (err) {
      console.error("Erro ao buscar usuário:", err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }

  async function DeleteOrg(id) {
    try {
      await axios.delete(
        `https://notebrains.onrender.com/api/v1/me/orgs/delete/${id}`,
        {
          headers: {
            'x-api-key': 'kingjs_4534',
            'Authorization': `Bearer ${Cookies.get("token")}`,
            'ngrok-skip-browser-warning': 'true'
          }
        }
      );
      ReqUser();
    } catch (err) {
      console.log("Erro ao deletar org:", err?.response?.data?.message || err.message);
    }
  }

  async function ReqOrg(id) {
    try {
      const response = await axios.get(
        `https://notebrains.onrender.com/api/v1/me/orgs/${id}`,
        {
          headers: {
            'x-api-key': 'kingjs_4534',
            'Authorization': `Bearer ${Cookies.get("token")}`,
            'ngrok-skip-browser-warning': 'true'
          }
        }
      );
      setOrgModal(response?.data?.data);
      setOrgModalVisible(true);
    } catch (err) {
      console.log("Erro ao buscar org:", err?.response?.data?.message || err.message);
    }
  }

  useEffect(() => {
    const isAuthenticated = authMiddleware();
    if (!isAuthenticated) {
      router.push('/');
      return;
    }
    ReqUser();
  }, []);

  return (
    <>
      <main className={`${styles['dashboard']} AnimaAppear2`}>
        <Sidebar key={0} allItems={me?.orgs} />

        <div className={styles['content']}>
          <div className={styles["Header-home"]}>
            <h1>minhas anotações</h1>
            <h2>Noteke</h2>
          </div>

          {loading ? (
              <div className={styles["Org-list"]}>
                <p className={styles["loading"]}>carregando anotações...</p>
              </div>
          ) : (
            <div className={styles["Org-list"]}>
              {me?.orgs?.length ? me.orgs.map((org, index) => (
                <div key={index} className={`${styles["Org"]} AppearBottomBar`}>
                  <div className={styles["l"]}>
                    <h3 className={styles["title"]}>{org?.title || "No title"}</h3>
                    <span className={styles["type"]}>Tipo: {org?.type || "Unknown"}</span><br />
                    <span className={styles["type"]}>
                      Criado em: {org?.createdAt ? new Date(org.createdAt).toLocaleDateString() : "Unknown"}
                    </span>
                  </div>

                  <div className={styles["r"]}>
                    <div className={`${styles["btn"]} ${styles["a1"]}`} onClick={() => DeleteOrg(org.id)}>
                      <Trash />
                    </div>
                    <div className={`${styles["btn"]} ${styles["a2"]}`} onClick={() => {
                      ReqOrg(org.id)
                      setIsModalVisible(true)
                    }}>
                      <Eye />
                    </div>
                    <div className={`${styles["btn"]} ${styles["a3"]}`}>
                      <Edit />
                    </div>
                  </div>
                </div>
              )) : (
                <p>Você não tem anotações</p>
              )}
            </div>
          )}

          {isModalVisible && (
            <div className={`centerContainer stanContainer2 animaAppear1 full`}>
              <header>
                Modal da sua Nota <X style={{cursor:'pointer'}} onClick={() => setIsModalVisible(false)} />
              </header>
              <header>
                <h3>{orgModal.title || "Selecione uma organização"}</h3>
                <small>
                  {orgModal.createdAt && `Criada em: ${new Date(orgModal.createdAt).toLocaleDateString()}`}
                </small>
              </header>
              <div style={{ 
                height:"80%"
              }}><p>{orgModal.notes}</p>
              </div>
            </div>
          )}

        </div>
      </main>
      <BottomBar />
    </>
  );
}