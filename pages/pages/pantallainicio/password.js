import React, { useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import AppConfig from '@/layout/AppConfig';

const RestablecerPassword = () => {
  //-----------------------| Lista de variables |-----------------------
  const toast = useRef(null);
  const [email, setEmail] = useState('')
  const [estiloEmail, setEstiloEmail] = useState('')
  const [mensajeAdvertencia, setMensajeAdvertencia] = useState('')

  //-----------------------| Expresion regular |-----------------------
  const validarEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

  //-----------------------| Funcion de envio |-----------------------
  const enviarCorreo = (e) => {
    //--> Validacion antes de enviar
    e.preventDefault()
    if (!email) {
      setEstiloEmail('p-invalid')
      setMensajeAdvertencia("Debe registrar su correo")
      setTimeout(() => { setMensajeAdvertencia('') }, 3000)
      return
    } else { setEstiloEmail('') }
    if (!validarEmail.test(email)) {
      setEstiloEmail('p-invalid')
      setMensajeAdvertencia("El email no es valido")
      setTimeout(() => { setMensajeAdvertencia('') }, 3000)
      return
    } else { setEstiloEmail('') }

    //--> Revisar que exista el correo

    //--> Envio al back-end
    setEmail('')
    console.log("Datos enviados")
    toast.current.show({ severity: 'success', summary: 'Envio exitoso!', detail: 'Revisa tu correo', life: 3000 });
  }

  //-----------------------| Lo que se muestra en pantalla |-----------------------
  return (
    <>
      <Head>
        <title>Jardin del Eden - Restablecer</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="El usuario restablecera su password mediante su correo" />
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
      <div className="grid">
        <Toast ref={toast} />
        <div className="col-12">
          <h5 className='text-center'>Restableciendo contraseña</h5>
          <div className="card">

            <form className="flex flex-wrap gap-3 p-fluid" onSubmit={enviarCorreo}>
              <div className="flex-initial">
                <label htmlFor="correo" className="font-bold block mb-2">Ingresa tu correo</label>
                <span className="p-input-icon-left">
                  <i className="pi pi-user" />
                  <InputText
                    id="correo" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} className={estiloEmail} />
                </span>
              </div>
              {mensajeAdvertencia && (
                <p className='font-bold text-center bg-red-600 text-white mt-4 py-2'>{mensajeAdvertencia}</p>
              )}
              <Button label="Restablecer contraseña" className="w-full p-3 text-xl" type='submit' />
            </form>

            <Link href="/" className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }} >
              Regresar
            </Link>

          </div>
        </div>
        <AppConfig />
      </div>
    </>
  )
}

export default RestablecerPassword
