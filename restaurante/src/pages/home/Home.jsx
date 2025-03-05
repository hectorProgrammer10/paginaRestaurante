import React from 'react'
import './home.css'
import reload from '../../assets/svg/reload.svg'
import { useState } from 'react'
function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const pedidoStyle={
    fontSize : 'large',
    padding: '10px'
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
  const buttonPedido = () =>{
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
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
            <td><button>confirmar</button></td>
            <td><button>mandar pedido</button></td>
          </tr>
          <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
            <td><button>confirmar</button></td>
            <td><button>mandar pedido</button></td>
          </tr>
         
        </table>
        </div>
      </div>
    </div>
  )
}

export default Home
