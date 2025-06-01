"use client";

import { authMiddleware } from '../../middlewares/authMiddleware';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../components/Sidebar';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Trash, Eye, Edit } from 'lucide-react';
import styles from '../../styles/dashboard.module.css';
import BottomBar from '@/components/bottomBar';

export default function Dashboard() {
  const router = useRouter();
  const [me, setMe] = useState(null);

  async function ReqUser() {
    try {
      const response = await axios.get(
        'https://a414-2804-1810-e706-3500-7c43-b51d-b51b-d7d5.ngrok-free.app/api/v1/me/person',
        {
          headers: {
            'x-api-key': 'kingjs_4534',
            'Authorization': `Bearer ${Cookies.get("token")}`,
            'ngrok-skip-browser-warning': 'true'
          }
        }
      );
      setMe(response?.data?.data?.user)
    } catch (err) {
      console.error("Erro ao buscar usuário:", err?.response?.data || err.message);
    }
  }

  useEffect( () => {
    const isAuthenticated =  authMiddleware();
    if (!isAuthenticated) {
      router.push('/');
      return;
    }
    ReqUser();
  }, []);

  return (
    <main className={styles['dashboard']}>
      <Sidebar key={0} allItems={me?.orgs} />

      <div className={styles['content']} >
        <div className={styles["Header-home"]}>
          <h1>My Orgs</h1>
          <h2>Noteke</h2>
        </div>

        <div className={styles["Org-list"]}>
          {me?.orgs?.length ? me.orgs.map((org, index) => (
            <div key={index} className={styles["Org"]}>
              <div className={styles["l"]}>
                <h3 className={styles["title"]}>{org?.title || "No title"}</h3>
                <span className={styles["type"]}>Type: {org?.type || "Unknown"}</span>
              </div>
              <div className={styles["r"]}>
                <div className={`${styles["btn"]} ${styles["a1"]}`}>
                  <Trash />
                </div>
                <div className={`${styles["btn"]} ${styles["a2"]}`}>
                  <Eye />
                </div>
                <div className={`${styles["btn"]} ${styles["a3"]}`}>
                  <Edit />
                </div>
              </div>
            </div>
          )) : (
            <p>You don’t have orgs</p>
          )}
        </div>
        <BottomBar/>
      </div>
    </main>
  );
}
