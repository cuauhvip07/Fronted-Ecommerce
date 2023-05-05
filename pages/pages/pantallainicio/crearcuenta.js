import React, { useState, useRef } from 'react'
import Head from 'next/head';
import AppConfig from '@/layout/AppConfig';
//--> Componentes de primeReact
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { useRouter } from 'next/router';
import { InputText } from "primereact/inputtext";
import { Messages } from 'primereact/messages';
//--> Componentes propios
import { camposVacios, emailInvalido, passwordInvalido, passwordsInValidas } from '@/components/mensajesNotificaciones/mensajes';
import { usuarioCreado } from '@/components/mensajesNotificaciones/notificaciones';

const CrearCuenta = () => {
  //--> Variaable de redireccinamiento
  const router = useRouter();

  //--> Mensajes
  const toast = useRef(null);
  const msgs = useRef(null);

  //-----------------------| Lista de variables |-----------------------
  //--> Campos de entrada
  const [email, setEmail] = useState('')
  const [nombre, setNombre] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  //--> Validar envio
  const [estiloEmail, setEstiloEmail] = useState('')
  const [estiloNombre, setEstiloNombre] = useState('')
  const [estiloPassword, setEstiloPassword] = useState('')
  const [estiloConfirmPass, setEstiloConfirmPass] = useState('')

  //-----------------------| Expresion regular |-----------------------
  const validarEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

  //-----------------------| Mensajes de advertencia |-----------------------
  const mostrarMensaje = (mensaje) => { msgs.current.show({ severity: 'error', detail: `${mensaje}`, sticky: true, closable: false }) };
  const limpiarMensaje = () => { msgs.current.clear() }

  //-----------------------| Envio |-----------------------
  const crearUsuario = () => {
    //--> Validar campos llenos
    if ([email, nombre, password, confirmPassword].includes('')) {
      if (!email) setEstiloEmail('p-invalid')
      if (!nombre) setEstiloNombre('p-invalid')
      if (!password) setEstiloPassword('p-invalid')
      if (!confirmPassword) setEstiloConfirmPass('p-invalid')
      mostrarMensaje(camposVacios)
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
      mostrarMensaje(emailInvalido)
      setTimeout(() => { limpiarMensaje() }, 3000)
      return
    } else { setEstiloEmail('') }

    //--> Validar password
    if (password.length < 6) {
      setEstiloPassword('p-invalid')
      mostrarMensaje(passwordInvalido)
      setTimeout(() => { limpiarMensaje() }, 3000)
      return
    } else { setEstiloPassword('') }

    //--> Comprobar passwords iguales
    if (password !== confirmPassword) {
      setEstiloPassword('p-invalid')
      setEstiloConfirmPass('p-invalid')
      mostrarMensaje(passwordsInValidas)
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
    //--> Notificar estatus despues de validarlo con back-end
    toast.current.show({ severity: 'success', summary: `${usuarioCreado.titulo}`, detail: `${usuarioCreado.contenido}`, life: 3000 });
  }

  const cancelarCreacion = () => {
    //--> Limpiar campos de entrada antes de salir
    setNombre('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')

    //--> Limpiar estilos de campos de entrada
    setEstiloEmail('')
    setEstiloNombre('')
    setEstiloPassword('')
    setEstiloConfirmPass('')

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

      <div className='flex h-screen'>
        <Toast ref={toast} />
        <div className="col-6 m-auto">
          <div className="card ">

            <p className='text-center text-6xl font-bold underline'>Crear cuenta</p>

            <div className="flex flex-column card-container">
              <div className='flex align-items-center justify-content-center'>
                <div className='field'>
                  <label htmlFor="nombreCompleto" className="block text-900 text-xl font-medium mb-2">Tu nombre</label>
                  <InputText
                    id="nombreCompleto" placeholder="Nombre y apellidos" keyfilter="alpha"
                    className={`${estiloNombre}`} style={{ width: "200px" }}
                    value={nombre} onChange={(e) => { setNombre(e.target.value) }} />
                </div>
              </div>
              <div className='flex align-items-center justify-content-center'>
                <div className='field'>
                  <label htmlFor="email" className="block text-900 text-xl font-medium mb-2">Correo electrónico</label>
                  <InputText
                    id="email" placeholder="Ingresa un correo activo" className={`${estiloEmail}`} style={{ width: "200px" }}
                    value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </div>
              </div>
              <div className='flex align-items-center justify-content-center'>
                <div className='field'>
                  <label className="block text-900 text-xl font-medium mb-2">Contraseña</label>
                  <Password
                    placeholder='Mínimo 6 caracteres' className={`${estiloPassword}`} style={{ width: "200px" }}
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    promptLabel="Crea tu contraseña" weakLabel="Debil" mediumLabel="Medio" strongLabel="Fuerte"
                  />
                </div>
              </div>
              <div className='flex align-items-center justify-content-center'>
                <div className='field'>
                  <label className="block text-900 text-xl font-medium mb-2">Confirmar contraseña</label>
                  <Password
                    placeholder='Repite tu contraseña' className={`${estiloConfirmPass}`} style={{ width: "200px" }}
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} feedback={false}
                  />
                </div>
              </div>
              <div className='mx-auto' style={{ width: "260px", textAlign: "center" }}>
                <Messages ref={msgs} />
              </div>
              <div className='flex justify-content-evenly my-5'>
                <Button label="Aceptar" onClick={crearUsuario} severity="success" />
                <Button label="Cancelar" onClick={cancelarCreacion} severity="danger" />
              </div>
            </div>

          </div>
        </div>
        <AppConfig />
      </div>
    </>
  )
}

export default CrearCuenta
