"use client";

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        'https://notebrains.onrender.com/api/v1/register',
        { name, email, password },
        { headers: { 'x-api-key': 'kingjs_4534' } }
      );
      setMessage(['Registro bem-sucedido!', true]);
      router.push('/');
    } catch (error) {
      const errorMessage =
        error?.response?.data?.data.error || 'Erro no registro. Tente novamente.';
      setMessage([errorMessage, false]);
    }
  };

  return (
    <section className="stanContainer1 stanFull1 centerContainer AnimaAppear1">
      <form onSubmit={handleSubmit} className="stanForm1">
        <h1>Registro</h1>

        <div>
          <input
            className="hoverMega"
            type="text"
            placeholder="Digite seu Nome de Usuário"
            maxLength={16}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <input
            className="hoverMega"
            type="email"
            placeholder="Ex: exemplo@gmail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <input
            className="hoverMega"
            type="password"
            placeholder="Digite sua senha"
            minLength={8}
            maxLength={16}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="hoverMega">
          Registrar-se
        </button>

        <span>
          <a href="/">Já possui uma conta? Faça login</a>
        </span>
      </form>

      <div className="msgContainer">
        {message ? (
          <span style={{ color: message[1] ? 'green' : 'red' }}>
            {message[0]}
          </span>
        ) : (
          <span>Preencha os dados para criar sua conta!</span>
        )}
      </div>
    </section>
  );
}
