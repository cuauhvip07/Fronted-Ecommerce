import React, { useState, useRef } from 'react'
import Head from 'next/head';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { useRouter } from 'next/router';
import { InputText } from "primereact/inputtext";
import { Messages } from 'primereact/messages';
import AppConfig from '@/layout/AppConfig';

const CrearCuenta = () => {
  //--> Variaable de redireccinamiento
  const router = useRouter();

  //-----------------------| Lista de variables |-----------------------
  const toast = useRef(null);
  const msgs = useRef(null);
  const [email, setEmail] = useState('')
  const [nombre, setNombre] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  //--> Variables para validar envio
  const [estiloEmail, setEstiloEmail] = useState('')
  const [estiloNombre, setEstiloNombre] = useState('')
  const [estiloPassword, setEstiloPassword] = useState('')
  const [estiloConfirmPass, setEstiloConfirmPass] = useState('')
  //--> Mensajes de advertencia
  // const [mensajeAdvertencia, setMensajeAdvertencia] = useState('')

  //-----------------------| Expresion regular |-----------------------
  const validarEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

  const mostrarMensaje = (mensaje) => {
    msgs.current.show(
      { severity: 'error', detail: `${mensaje}`, sticky: true, closable: false },
    );
  };

  const limpiarMensaje = () => { msgs.current.clear() }

  const crearUsuario = (e) => {
    e.preventDefault()
    if ([email, nombre, password].includes('')) {
      if (!email) setEstiloEmail('p-invalid')
      if (!nombre) setEstiloNombre('p-invalid')
      if (!password) setEstiloPassword('p-invalid')
      if (!confirmPassword) setEstiloConfirmPass('p-invalid')
      // setMensajeAdvertencia("Todos los campos son validos")
      // setTimeout(() => { setMensajeAdvertencia('') }, 3000)
      mostrarMensaje("Todos los campos son validos")
      setTimeout(() => { limpiarMensaje() }, 3000)
      return
    } else {
      setEstiloEmail('')
      setEstiloNombre('')
      setEstiloPassword('')
      setEstiloConfirmPass('')
    }
    //--> Validar email
    if (!validarEmail.test(email)) {
      setEstiloEmail('p-invalid')
      // setMensajeAdvertencia("El email no es valido")
      // setTimeout(() => { setMensajeAdvertencia('') }, 3000)
      mostrarMensaje("El email no es valido")
      setTimeout(() => { limpiarMensaje() }, 3000)
      return
    } else { setEstiloEmail('') }
    //--> Validar password
    if (password.length < 6) {
      setEstiloPassword('p-invalid')
      // setMensajeAdvertencia("La contraseña es muy corta")
      // setTimeout(() => { setMensajeAdvertencia('') }, 3000)
      mostrarMensaje("La contraseña es muy corta")
      setTimeout(() => { limpiarMensaje() }, 3000)
      return
    } else { setEstiloPassword('') }
    //--> Validar confirmar password
    if (confirmPassword.length < 6) {
      setEstiloConfirmPass('p-invalid')
      // setMensajeAdvertencia("La contraseña es muy corta")
      // setTimeout(() => { setMensajeAdvertencia('') }, 3000)
      mostrarMensaje("La contraseña es muy corta")
      setTimeout(() => { limpiarMensaje() }, 3000)
      return
    } else { setEstiloConfirmPass('') }
    //--> Comprobar contraseñas iguales
    if (password !== confirmPassword) {
      setEstiloPassword('p-invalid')
      setEstiloConfirmPass('p-invalid')
      // setMensajeAdvertencia("Son diferentes las contraseñas")
      // setTimeout(() => { setMensajeAdvertencia('') }, 3000)
      mostrarMensaje("Son diferentes las contraseñas")
      setTimeout(() => { limpiarMensaje() }, 3000)
      return
    } else {
      setEstiloPassword('')
      setEstiloConfirmPass('')
    }
    //--> Limpiar campos
    setEmail('')
    setNombre('')
    setPassword('')
    setEstiloConfirmPass('')
    //--> Notificar estatus
    toast.current.show({ severity: 'success', summary: 'Usuario creado!', detail: 'Revisa tu correo', life: 3000 });
  }

  const cancelarCreacion = () => {
    //--> Limpiar campos antes de salio
    setNombre('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')

    //--> Redireccionar
    router.push('/')
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
            <p className='text-center text-6xl font-bold underline'>Crear cuenta</p>

            <div className="flex flex-column card-container card" onSubmit={crearUsuario}>
              <div className='flex align-items-center justify-content-center'>
                <div>
                  <label htmlFor="nombreCompleto" className="block text-900 text-xl font-medium mb-2">Tu nombre</label>
                  <InputText id="nombreCompleto" placeholder="Nombre completo"
                    // className='flex align-items-center justify-content-center w-full md:w-30rem mb-5' style={{ padding: '1rem' }}
                    className={`${estiloNombre} flex align-items-center justify-content-center w-full md:w-30rem mb-5`}
                    style={{ padding: '1rem' }}
                    value={nombre} onChange={(e) => { setNombre(e.target.value) }} />
                </div>
              </div>
              <div className='flex align-items-center justify-content-center'>
                <div>
                  <label htmlFor="correo" className="block text-900 text-xl font-medium mb-2">Correo electrónico</label>
                  <InputText
                    id="correo" placeholder="Correo"
                    className={`${estiloEmail} flex align-items-center justify-content-center w-full md:w-30rem mb-5`}
                    style={{ padding: '1rem' }}
                    value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </div>
              </div>
              <div className='flex align-items-center justify-content-center'>
                <div>
                  <label htmlFor="password" className="block text-900 text-xl font-medium mb-2">Contraseña</label>
                  <Password
                    className={`${estiloPassword} flex align-items-center justify-content-center w-full md:w-30rem mb-5`}
                    style={{ padding: '1rem' }}
                    value={password} onChange={(e) => setPassword(e.target.value)} toggleMask />
                </div>
              </div>
              <div className='flex align-items-center justify-content-center'>
                <div>
                  <label htmlFor="password" className="block text-900 text-xl font-medium mb-2">Confirmar contraseña</label>
                  <Password
                    className={`${estiloConfirmPass} flex align-items-center justify-content-center w-full md:w-30rem mb-5`}
                    style={{ padding: '1rem' }}
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} toggleMask />
                </div>
              </div>

              {/* {mensajeAdvertencia && (<p className='font-bold text-center bg-red-600 text-white mt-4 py-2'>{mensajeAdvertencia}</p>)} */}
              <div className='flex justify-content-center flex-wrap card-container'>
                <div className='flex align-items-center justify-content-center'>
                  <div className='W-Full'>
                    <Messages ref={msgs} />
                  </div>
                </div>
              </div>
            </div>

            <div className='flex justify-content-around flex-wrap card-container'>
              <Button
                label="Cancelar" onClick={cancelarCreacion} severity="danger"
                className='flex align-items-center justify-content-center' />
              <Button label="Aceptar" onClick={crearUsuario} severity="success"
                className='flex align-items-center justify-content-center' />
            </div>


          </div>
        </div>
        <AppConfig />
      </div>
    </>
  )
}

export default CrearCuenta
