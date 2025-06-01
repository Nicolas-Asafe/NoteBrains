"use client";

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Cookies from 'js-cookie';


export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://afb5-2804-1810-e706-3500-7c43-b51d-b51b-d7d5.ngrok-free.app/api/v1/login', {
        email,
        password
      }, {
        headers: {
          'x-api-key': 'kingjs_4534',
        }
      });

      setMessage([response?.data?.message,true])
      Cookies.set('token', response.data.token);
      
      router.push('/dashboard');
    } catch (error) {
      console.log(error.response?.data?.message)
      setMessage([error.response?.data?.message,false])
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <section className="stanContainer1 centerContainer">
      <form onSubmit={handleSubmit} className='stanForm1'>
        <h1>Login</h1>
        <div>
          <input
            className='hoverMega'
            type="email"
            placeholder="Ex: example@gmail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <input
            className='hoverMega'
            type="password"
            placeholder="Digite sua senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className='hoverMega' disabled={loading}>
          {loading ? 'Entrando...' : 'Login'}
        </button>
        <span>
          <a href="/register">Não possui uma conta? Clique aqui e faça a sua!</a>
        </span>
      </form>
      <div className='msgContainer'>
        {message ? (
          <span style={{ color: message[1] ? 'green' : 'red' }}>
            {message[0]}
          </span>
        ) : (
          <span>Entre na sua conta!</span>
        )}
      </div>
    </section>
  );
}
