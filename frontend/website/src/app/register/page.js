"use client";

import axios from 'axios';
import { useRouter } from 'next/navigation';

import { useNameRG } from '../../hooks/register-hooks/useNameRG';
import { useEmailRG } from '../../hooks/register-hooks/useEmailRG';
import { usePasswordRG } from '../../hooks/register-hooks/usePasswordRG';
import { useMessageRG } from '../../hooks/register-hooks/useMessageRG';
import { useMessageType } from '../../hooks/register-hooks/useMessageType';

import Styles from '../page.module.css';

export default function Register() {
  const { name, setName } = useNameRG();
  const { email, setEmail } = useEmailRG();
  const { password, setPassword } = usePasswordRG();
  const { message, setMessage } = useMessageRG();
  const { messageType, setMessageType } = useMessageType();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://d7a8-2804-1810-e706-3500-7c43-b51d-b51b-d7d5.ngrok-free.app/api/v1/register', {
        name,
        email,
        password
      }, {
        headers: {
          'x-api-key': 'kingjs_4534'
        }
      });
      console.log('Registro Bem-sucedido:', response.data);
      setMessage('Registro bem-sucedido');
      setMessageType('sucess');
      router.push('/');
    } catch (error) {
      if (error.response) {
        console.error('Erro no registro:', error.response.data);
        setMessage('Erro no registro: ' + error.response.data.message);
      } else {
        console.error('Erro Desconhecido:', error.message);
        setMessage('Erro Desconhecido: ' + error.message);
      }
      setMessageType('error');
    }
  };

  return (
    <section className={Styles.container}>
      <div className={Styles.divObject}>
        <form onSubmit={handleSubmit} className={Styles.formBox}>
          <div className={Styles.divTitle}>
            <h1 className={Styles.h1Title}>BrainNotes | Register</h1>
          </div>
          <div className={Styles.divInputName}>
            <input
              className={Styles.inputName}
              type="text"
              placeholder="Digite seu Nome de Usuário"
              minLength={8}
              maxLength={16}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={Styles.divInputEmail}>
            <input
              className={Styles.inputEmail}
              type="email"
              placeholder="Ex: example@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={Styles.inputPasswordEmail}>
            <input
              className={Styles.inputPassword}
              type="password"
              placeholder="Digite sua senha"
              required
              minLength={8}
              maxLength={16}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={Styles.divButtonSubmit}>
            <button className={Styles.buttonSubmit}type="submit">Registrar-se</button>
          </div>
        </form>
          <div className={Styles.divMessage}>
            {message && (
                <div className={messageType === 'sucess' ? 'message-sucess' : 'message-error'}>
                  {message}
                </div>
            )}
          </div>
      </div>
    </section>
  );
}