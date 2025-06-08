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

  // Estados pra modal e animações
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalOut, setModalOut] = useState(false);

  // Estado pra animação de saída do dashboard
  const [dashOut, setDashOut] = useState(false);

  // Estado do modal e edição
  const [orgModal, setOrgModal] = useState({
    title: "",
    notes: "",
    createdAt: '',
    id: ''
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState({ title: "", notes: "" });

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

  // Abrir modal pra visualização
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
      setIsModalVisible(true);
      setModalOut(false);
      setIsEditMode(false);
    } catch (err) {
      console.log("Erro ao buscar org:", err?.response?.data?.message || err.message);
    }
  }

  // Abrir modal no modo edição
  async function EditOrg(id) {
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
      const data = response?.data?.data;
      setEditData({ title: data.title || "", notes: data.notes || "" });
      setOrgModal(data);
      setIsModalVisible(true);
      setModalOut(false);
      setIsEditMode(true);
    } catch (err) {
      console.log("Erro ao buscar org para edição:", err?.response?.data?.message || err.message);
    }
  }

  // Salvar edição via form submit
  async function SaveEdit(e) {
    e.preventDefault();
    try {
      await axios.put(
        `https://notebrains.onrender.com/api/v1/me/orgs/update/${orgModal.id}`,
        editData,
        {
          headers: {
            'x-api-key': 'kingjs_4534',
            'Authorization': `Bearer ${Cookies.get("token")}`,
            'ngrok-skip-browser-warning': 'true'
          }
        }
      );
      closeModal();
      ReqUser();
    } catch (err) {
      console.log("Erro ao salvar edição:", err?.response?.data?.message || err.message);
    }
  }

  // Função pra fechar modal com animação de saída
  function closeModal() {
    setModalOut(true);
    setTimeout(() => {
      setIsModalVisible(false);
      setModalOut(false);
      setOrgModal({ title: "", notes: "", createdAt: '', id: '' });
      setIsEditMode(false);
      setEditData({ title: "", notes: "" });
    }, 250);
  }

  // Função pra sair do dashboard com animação
  function closeDashboard() {
    setDashOut(true);
    setTimeout(() => {
      router.push('/');
    }, 250);
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
      <main className={`${styles['dashboard']} ${dashOut ? 'animaClose' : 'animaAppear1'}`}>
        <Sidebar key={0} allItems={me?.orgs} />

        <div className={styles['content']}>
          <div className={styles["Header-home"]}>
            <h1>minhas anotações</h1>
            <h2>Noteke</h2>
          </div>

          {loading ? (

            <div className={styles["Org-list"]}>
              <p className={styles["loading"]}>Carregando orgs...</p>
            </div>
          ) : (
            <div className={styles["Org-list"]}>
              {me?.orgs?.length ? me.orgs.map((org, index) => (
                <div key={index} className={`${styles["Org"]} AppearBottomBar`}>
                  <div className={styles["l"]}>

                    <h3 className={styles["title"]}>{org?.title || "Sem título"}</h3>
                    <span className={styles["type"]}>Tipo: {org?.type || "Sem tipo"}</span><br />
                    <span className={styles["type"]}>
                      Criado em: {org?.createdAt ? new Date(org.createdAt).toLocaleDateString() : "Sem data"}
                    </span>
                  </div>

                  <div className={styles["r"]}>
                    <div className={`${styles["btn"]} ${styles["a1"]}`} onClick={() => DeleteOrg(org.id)}>
                      <Trash />
                    </div>
                    <div className={`${styles["btn"]} ${styles["a2"]}`} onClick={() => ReqOrg(org.id)}>
                      <Eye />
                    </div>
                    <div className={`${styles["btn"]} ${styles["a3"]}`} onClick={() => EditOrg(org.id)}>
                      <Edit />
                    </div>
                  </div>
                </div>
              )) : (
                <p>Você não tem orgs</p>
              )}
            </div>
          )}

          {isModalVisible && (
            <div className={`centerContainer  stanContainer2 ${modalOut ? 'animaClose' : 'animaAppear1'} full modal`}>
              <header>

                {isEditMode ? "Editando org" : "Seu org selecionado"}
                <X style={{ cursor: 'pointer' }} onClick={closeModal} />

              </header>

              {isEditMode ? (
                <form onSubmit={SaveEdit} className='stanForm1'>
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Título"
                    required
                  />
                  <textarea
                    value={editData.notes}
                    onChange={(e) => setEditData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Notas"
                    rows={8}
                  />
                  <button type="submit">Salvar</button>
                </form>
              ) : (
                <>
                  <header>
                    <h3>{orgModal.title || "Selecione uma organização"}</h3>
                    <small>
                      {orgModal.createdAt && `Criada em: ${new Date(orgModal.createdAt).toLocaleDateString()}`}
                    </small>
                  </header>
                  <div style={{ height: "80%" }}>
                    <p>{orgModal.notes}</p>
                  </div>
                </>
              )}
            </div>
          )}

          <BottomBar />

        </div>
      </main>
    </>
  );
}