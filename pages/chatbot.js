import React from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';
import styles from '../styles/styles.module.css';



const otherFontTheme = {
  background: '#f5f8fb',
  fontFamily: 'Arial',
  headerBgColor: '#ff998d',
  headerFontColor: '#fff',

  
};
const steps=[{
  id:'saludo',
  message:'Hola, bienvenido a Soporte al cliente, ¿En que te puedo ayudar?',  
  trigger:'opciones' 
},
{
  id:'opciones',
  options:[{value: "Flores Populares",label: "1. Flores Populares",trigger:"Populares"},
           {value: "Cuidado de Flores",label: "2. Cuidado de Flores",trigger:"Cuidado"},
           {value: "Flores que Ofrecemos",label: "3. Flores que Ofrecemos",trigger:"Ofrecemos"},
           {value: "Duración de las flores",label: "4. Duración de las flores",trigger:"Duracion"},
           {value: "Reembolsos/Devoluciones",label: "5. Reembolsos/Devoluciones",trigger:"RD"},
           {value: "Envíos y costos",label: "6. Envíos y costos",trigger:"EC"},
           {value: "Seguimiento de pedido",label: "7. Seguimiento de pedido",trigger:"Seguimiento"},
           {value: "Métodos de pago",label: "8. Métodos de pago",trigger:"Metodosp"},
           {value: "Garantías",label: "9. Garantías",trigger:"garantias"},
  ],
},
{
  id:'Populares',
  message:'Las flores más populares son:',  
  trigger:'opciones'
},
{
  id:'Cuidado',
  message:'El cuidado de las flores es:',  
  trigger:'opciones'
},
{
  id:'Ofrecemos',
  message:'Algunas de las flores que ofrecemos son:',  
  trigger:'opciones'
},
{
  id:'Duracion',
  message:'Las flores más populares son:',  
  trigger:'opciones'
},
{
  id:'RD',
  message:'Las flores más populares son:',  
  trigger:'opciones'
},
{
  id:'EC',
  message:'Las flores más populares son:',  
  trigger:'opciones'
},
{
  id:'Seguimiento',
  message:'Las flores más populares son:',  
  trigger:'opciones'
},
{
  id:'Metodosp',
  message:'Las flores más populares son:',  
  trigger:'opciones'
},
{
  id:'garantias',
  message:'Las flores más populares son:',  
  trigger:'opciones'
}];

const ThemedExample = () => (
    
  <ThemeProvider theme={otherFontTheme}>
    <div className={`${styles} rsc-container`}>
    <ChatBot
         steps={steps}
        headerTitle= "Servicio al Cliente"
        floatingStyle={{

          borderRadius: '50%',
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.3)'
        }}
        
        opened={false}
        floating={true}
        style={{ width: '450px', height: '470px' }}
          headerClassName="rsc-header"
          optionClassName="rsc-os-option-element"
          optionStyle={{ width: '200px', fontSize: '12px' }}
          optionElementHoverStyle={{ backgroundColor: '#d72d3b', width: '200px', fontSize: '12px' }}
          floatingIcon={<img src="/images/Chatbot.png" height={'50px'} alt="Chatbot Icon" />}
          botAvatar="/images/Chatbot2.png"
      />
    
     </div>
    
  </ThemeProvider>
 

);
export default ThemedExample;
