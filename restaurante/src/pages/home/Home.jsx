import React, { use, useEffect } from 'react'
import './home.css'
import reload from '../../assets/svg/reload.svg'
import { useState } from 'react'
import axios from 'axios'
function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const pedidoStyle={
    fontSize : 'large',
    padding: '10px'
  }

  const [pedidos, setPedidos] = useState([]);

  useEffect(() =>{
    let fakeData = []
    const getOrders = () => {
      try{
        //const response = axios.get("http://localhost:80/api/app/ssv/getPedidos")
        //console.log(response.data)
        let response = [
          {
            id:1,
            name:"Papas fritas",
            price:100,
            cantidad:1,
          },
          {
            id:2,
            name:"Hamburguesa",
            price:200,
            cantidad:1,
          }
        ]
        fakeData = response
      }catch(error){
        console.log("error", error)
      }
    }
    getOrders()

    const fakeDataWithStatus = fakeData.map((item) => {
      return {
        ...item,
        status: 'pendiente', 
      };
    });
    

    setPedidos(fakeDataWithStatus);
  },[])

  

  const confirmOrder = (id) =>{
    try{
      const newArray = pedidos.map((item) =>{
        if(item.id === id){
          return {...item, status: 'confirmado'}
        }
        return item
      })
      setPedidos(newArray)
      console.log("confirm order "+id)
    }
    catch(error){
      console.log("error", error)
    }
    
  }

  const sendOrder = (id) =>{
    try{
      const newArray = pedidos.map((item) => {
        if (item.id === id) {
          return { ...item, status: "enviado" };
        }
        return item;
      });
      setPedidos(newArray);
      console.log("send order "+ id)
    }
    catch(error){
      console.log("error", error)
  }
}



  
  const loading = () =>{
    try{
      setIsLoading(true);
      
    }
    catch(error){
      console.log("error", error)
    }finally{
      setTimeout(()=>{
        setIsLoading(false);
      },1000)
      
    }
  }
  
  return (
    <div className='canva'>
      {isLoading && (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Cargando...</p>
            </div>
          )}
      <div className='home-head colorBack borderR'>
        Restaurante Administración
      </div>

      <div className='home-barra'>
        <div className='home-comands colorBack borderR'>
          <button className='comands colorFont'>Home</button>
        </div>
      </div>

      <div className='home-panel'>
        <div>
          <div style={pedidoStyle} className='colorBackWhite'>
            <button onClick={loading}>
              <img src={reload} alt="" width={10} height={10}/>
            </button> Pedidos:</div>
        </div>
        <div> 
        <table className='borderR'>
         
          <tr>
            <th className='box_table'>Nombre</th>
            <th className='box_table'> Precio</th>
            <th className='box_table'>Cantidad</th>
            <th className='box_table'>Acción</th>
            <th className='box_table'>Acción</th>
          </tr>
          {
            pedidos.map((item)=>{
              return(
                <tr key={item.id}>
                  <td className='box_table'>{item.name}</td>
                  <td className='box_table'>{"$ "+item.price}</td>
                  <td className='box_table'>{item.cantidad}</td>
                  <td className='box_table_button'>
                    
                    {
                      item.status === "pendiente" ?(
                        <button className='button_action' onClick={() => {
                          confirmOrder(item.id)
                        }} >Confirmar</button>
                      ) : (
                        <button className='button_action' disabled>Pedido confirmado</button>
                      )
                    }
                    
                    </td>
                    <td className='box_table_button'>
                  {
                    item.status === "confirmado" ?(
                    <button className='button_action' onClick={() => {
                        sendOrder(item.id)
                    }} >Mandar pedido</button>
                    ):(
                      <button className='button_action' disabled>Pedido mandado</button>
                    )
                  }
                  
                  </td>
                </tr>
              )
            })
          }
         
        </table>
        </div>
      </div>
    </div>
  )
}


export default Home
