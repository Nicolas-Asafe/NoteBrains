"use client";

import Styles from './page.module.css';
import { useEmail } from '../hooks/useEmail';
import { usePassword } from '../hooks/usePassword';
import { useMessage } from '../hooks/useMessage';
import { useMessageType } from '../hooks/useMessageType';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Home() {
  const { email, setEmail } = useEmail();
  const { password, setPassword } = usePassword();
  const { message, setMessage } = useMessage();
  const { messageType, setMessageType } = useMessageType();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://afb5-2804-1810-e706-3500-7c43-b51d-b51b-d7d5.ngrok-free.app/api/v1/login', {
        email,
        password
      }, {
        headers: {
          'x-api-key': 'kingjs_4534'
        }
      });
      console.log('Login bem-sucedido:', response.data);
      Cookies.set('token', response.data.token);
      setMessage('Login bem-sucedido');
      setMessageType('sucess');
      
      router.push('/dashboard');

    } catch (error) {
      if (error.response) {
        console.error('Erro no login:', error.response.data);
        setMessage('Erro no login: ' + error.response.data.message);
      } else {
        console.error('Erro desconhecido:', error.message);
        setMessage('Erro desconhecido' + error.message);
      }
      setMessageType('error');
    }
  };

  return (
    <section className={Styles.container}>
        <div className={Styles.divObject}>
      <form onSubmit={handleSubmit} className={Styles.formBox}>
        <div className={Styles.divTitle}>
          <h1 className={Styles.h1Title}>BrainNotes | Login</h1>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={Styles.divButtonSubmit}>
          <button className={Styles.buttonSubmit} type="submit">Login</button>
        </div>

        <div className={Styles.divRegister}>
          <a className={Styles.aRegister} href="/register">Não possui uma conta? Clique aqui e faça a sua!</a>
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