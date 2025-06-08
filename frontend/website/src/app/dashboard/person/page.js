'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import ThemeToggle from '../../../components/ThemeToogle';

export default function Person() {
    const [me, setMe] = useState(null);

    async function ReqUser() {
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
            setMe(response?.data?.data?.user)
        } catch (err) {
            console.error("Erro ao buscar usuário:", err?.response?.data || err.message);
        }
    }

    useEffect(() => {
        ReqUser();
    }, []);
    return (
        <main className="stanContainer2 stanFull2 centerContainer AnimaAppear1">
            <header>
                <h2>Your person</h2>
                <Link href={'/dashboard'}>back</Link>
            </header>
            <header>
                Preferências: 
                <section style={{
                    display:"flex",
                    gap:10
                }}>
                   <ThemeToggle />
                </section>
            </header>
            <div>
                <span>Nome:</span>
                <p>{me?.name}</p>
            </div>
            <div>
                <span>Email:</span>
                <p>{me?.email}</p>
            </div>
            <div>
                <span>Id:</span>
                <p>#{me?.id}</p>
            </div>
        </main>
    )
}