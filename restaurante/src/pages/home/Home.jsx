import React, { useEffect, useState } from 'react';
import './home.css';
import reload from '../../assets/svg/reload.svg';
import axios from 'axios';

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [pedidos, setPedidos] = useState([]);

  const pedidoStyle = {
    fontSize: 'large',
    padding: '10px',
  };

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/order");
        console.log(response.data);
        setPedidos(response.data.map(item => ({ ...item, status: 'pendiente' })));
      } catch (error) {
        console.log("error", error);
      }
    };
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/order");
      console.log(response.data);
      setPedidos(response.data.map(item => ({ ...item, status: 'pendiente' })));
    } catch (error) {
      console.log("error", error);
    }
  };

  const confirmOrder = async (id) => {
    try {
      setPedidos((prevPedidos) =>
        prevPedidos.map((item) => (item.id === id ? { ...item, status: 'confirmado' } : item))
      );
  
      // Verificar el contenido del body antes de enviar la solicitud
      const requestBody = { "id_order": id };
      console.log("Request Body:", requestBody);
  
      const response = await axios.post("http://localhost:8080/order/confirm", requestBody);
      console.log(response.data);
      console.log("Confirm order " + id);
    } catch (error) {
      console.log("Error confirming order:", error.response?.data || error.message);
    }
  };
  
  const sendOrder = async (id) => {
    console.log(id)
    try {
      
      setPedidos((prevPedidos) =>
        prevPedidos.map((item) => (item.id === id ? { ...item, status: 'enviado' } : item))
      );
      const requestBody = { "id_order": id };
      const response = await axios.post("http://localhost:8080/order/send", requestBody);
      console.log(response.data);
      console.log("Send order " + id);
    } catch (error) {
      console.log("Error sending order:", error.response?.data || error.message);
    }
  };

  const loading = () => {
    
    setIsLoading(true);
    
    try{
      getOrders();
    }catch{
      console.log("error")
    }finally{
      setIsLoading(false);
    }

  };

  return (
    <div className='canva'>
      {isLoading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Cargando...</p>
        </div>
      )}

      <div className='home-head colorBack borderR'>Restaurante Administración</div>

      <div className='home-barra'>
        <div className='home-comands colorBack borderR'>
          <button className='comands colorFont'>Home</button>
        </div>
      </div>

      <div className='home-panel'>
        <div>
          <div style={pedidoStyle} className='colorBackWhite'>
            <button onClick={loading}>
              <img src={reload} alt="Reload" width={10} height={10} />
            </button>
            Pedidos:
          </div>
        </div>

        <div>
          <table className='borderR'>
            <thead>
              <tr>
                <th className='box_table'>Nombre</th>
                <th className='box_table'>Lugar de entrega</th>
                <th className='box_table'>Cantidad</th>
                <th className='box_table'>Acción</th>
                <th className='box_table'>Acción</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((item) => (
                <tr key={item.id}>
                  <td className='box_table'>{item.name}</td>
                  <td className='box_table'>{item.place}</td> 
                  <td className='box_table'>{item.cantidad}</td>
                  <td className='box_table_button'>
                    {item.status === "pendiente" ? (
                      <button className='button_action' onClick={() => confirmOrder(item.id_order)}>Confirmar</button>
                    ) : (
                      <button className='button_action' disabled>Pedido confirmado</button>
                    )}
                  </td>
                  <td className='box_table_button'>
                    {item.status === "enviado" ? (
                      <button className='button_action' disabled>Pedido mandado</button>
                      
                    ) : (
                      <button className='button_action' onClick={() => sendOrder(item.id_order)}>Mandar pedido</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;