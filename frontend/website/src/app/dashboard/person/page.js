'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";

export default function Person() {
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

    useEffect(() => {
        ReqUser();
    }, []);
    return (
        <main className="stanContainer2 centerContainer AnimaAppear1">
            <header>
                <h2>Your person</h2>
                <Link href={'/dashboard'}>back</Link>
            </header>
            <div>
                <span>Name:</span>
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