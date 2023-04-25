import React, { useState, useRef, use } from 'react'
import Link from 'next/link';
import Head from 'next/head';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { InputText } from "primereact/inputtext";
import AppConfig from '@/layout/AppConfig';

const CrearCuenta = () => {
  //-----------------------| Lista de variables |-----------------------
  const toast = useRef(null);
  const [email, setEmail] = useState('')
  const [nombre, setNombre] = useState('')
  const [password, setPassword] = useState('')
  //--> Variables para validar envio
  const [estiloEmail, setEstiloEmail] = useState('')
  const [estiloNombre, setEstiloNombre] = useState('')
  const [estiloPassword, setEstiloPassword] = useState('')
  const [mensajeAdvertencia, setMensajeAdvertencia] = useState('')

  //-----------------------| Expresion regular |-----------------------
  const validarEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

  const crearUsuario = (e) => {
    e.preventDefault()
    if ([email, nombre, password].includes('')) {
      if (!email) setEstiloEmail('p-invalid')
      if (!nombre) setEstiloNombre('p-invalid')
      if (!password) setEstiloPassword('p-invalid')
      setMensajeAdvertencia("Todos los campos son validos")
      setTimeout(() => { setMensajeAdvertencia('') }, 3000)
      return
    } else {
      setEstiloEmail('')
      setEstiloNombre('')
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

    setEmail('')
    setNombre('')
    setPassword('')

    toast.current.show({ severity: 'success', summary: 'Usuario creado!', detail: 'Revisa tu correo', life: 3000 });
  }

  return (
    <>
      <Head>
        <title>Jardin del Eden - Crear usuario</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="El usuario podra darse de alta en el sistema" />
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
          <div className="card">
            <h5 className='card text-center'>Llena el formulario para crear tu cuenta</h5>

            <form className="flex flex-wrap gap-3 p-fluid" onSubmit={crearUsuario}>
              <div className="flex-initial">
                <label htmlFor="nombreCompleto" className="font-bold block mb-2">Ingresa tu nombre Completo</label>
                <span className="p-input-icon-left">
                  <i className="pi pi-user" />
                  <InputText id="nombreCompleto" placeholder="Nombre completo" className={estiloNombre}
                    value={nombre} onChange={(e) => { setNombre(e.target.value) }} />
                </span>
              </div>
              <div>
                <label htmlFor="correo" className="font-bold block mb-2">Ingresa tu correo</label>
                <span className="p-input-icon-left">
                  <i className="pi pi-envelope" />
                  <InputText id="correo" placeholder="Correo" className={estiloEmail}
                    value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </span>
              </div>
              <div>
                <label htmlFor="password" className="font-bold block mb-2">Ingresa tu contraseña</label>
                <Password className={estiloPassword} value={password} onChange={(e) => setPassword(e.target.value)} toggleMask />
              </div>

              {mensajeAdvertencia && (<p className='font-bold text-center bg-red-600 text-white mt-4 py-2'>{mensajeAdvertencia}</p>)}

              <Button label="Crear cuenta" className="w-full p-3 text-xl" type='submit' />
            </form>

            <Link href="/" className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
              Regresar
            </Link>

          </div>
        </div>
        <AppConfig />
      </div>
    </>
  )
}

export default CrearCuenta
