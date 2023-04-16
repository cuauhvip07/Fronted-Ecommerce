import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import React, { useContext, useState } from 'react';
import AppConfig from '@/layout/AppConfig';
// import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

export default function Home() {
  //--> Variables
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  // const [checked, setChecked] = useState(false);
  const [estiloEmail, setEstiloEmail] = useState('')
  const [estiloPassword, setEstiloPassword] = useState('')
  const [mensajeAdvertencia, setMensajeAdvertencia] = useState('')


  //--> Uso de contexto
  const { layoutConfig } = useContext(LayoutContext);

  const router = useRouter();
  const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

  const validarEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
  //--> Envio de datos
  const validarEnvio = () => {
    if ([email, password].includes('')) {
      setEstiloEmail('p-invalid')
      setEstiloPassword('p-invalid')
      setMensajeAdvertencia("Todos los campos son obligatorios")
      setTimeout(() => { setMensajeAdvertencia('') }, 3000)
      return
    } else {
      setEstiloEmail('')
      setEstiloPassword('')
    }
    if (!validarEmail.test(email)) {
      setEstiloEmail('p-invalid')
      setMensajeAdvertencia("El email no es valido")
      setTimeout(() => { setMensajeAdvertencia('') }, 3000)
      return
    } else { setEstiloEmail('') }
    if (password.length < 6) {
      setEstiloPassword('p-invalid')
      setMensajeAdvertencia("La contraseña es muy corta")
      setTimeout(() => { setMensajeAdvertencia('') }, 3000)
      return
    } else { setEstiloPassword('') }
    setMensajeAdvertencia('')
    console.log("Envio exitoso")
    router.push('/pages/dashboard')
  }

  //---------------------------| Valor que regresara |---------------------------
  return (
    <>
      <Head>
        <title>Jardin del Eden</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="Jardin del eden, una pagina para comprar flores" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta property="og:type" content="website"></meta>
        <meta property="og:title" content="Sakai by PrimeReact | Free Admin Template for NextJS"></meta>
        <meta property="og:url" content="https://www.primefaces.org/sakai-react"></meta>
        <meta property="og:description" content="The ultimate collection of design-agnostic, flexible and accessible React UI Components." />
        <meta property="og:image" content="https://www.primefaces.org/static/social/sakai-nextjs.png"></meta>
        <meta property="og:ttl" content="604800"></meta>
        <link rel="icon" href={`/favicon.ico`} type="image/x-icon"></link>
      </Head>

      <div className={containerClassName}>
        <div className="flex flex-column align-items-center justify-content-center">
          {/* <img src={`/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0" /> */}
          <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)' }}>
            <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
              <div className="text-center mb-5">
                {/* <img src="/demo/images/login/avatar.png" alt="Image" height="50" className="mb-3" /> */}
                <div className="text-900 text-3xl font-medium mb-3">Jardin del Eden</div>
                <span className="text-600 font-medium">Descripcion  de jardin del Eden</span>
              </div>

              <div>
                <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">Email</label>
                <InputText
                  inputid="email1" value={email} onChange={(e) => setEmail(e.target.value)}
                  type="text" placeholder="Email address" className={`w-full md:w-30rem mb-5 ${estiloEmail}`} style={{ padding: '1rem' }} />

                <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">Password</label>
                <Password
                  inputid="password1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
                  feedback={false} className="w-full mb-5" inputClassName={`w-full p-3 md:w-30rem ${estiloPassword}`} />

                <div className="flex align-items-center justify-content-between mb-5 gap-5">
                  <div className="flex align-items-center">
                    <Link
                      href="/pages/crearcuenta"
                      className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}
                    >Crear cuenta</Link>
                  </div>
                  <Link
                    href="/pages/password"
                    className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}
                  >Olvido su contraseña?</Link>
                </div>
                <Button label="Iniciar Sesion" className="w-full p-3 text-xl" onClick={validarEnvio} />

                {mensajeAdvertencia && (<p className='font-bold text-center bg-red-600 text-white mt-4 py-2'>{mensajeAdvertencia}</p>)}
              </div>
            </div>
          </div>
        </div>
        <AppConfig />
      </div>
    </>
  )
}
