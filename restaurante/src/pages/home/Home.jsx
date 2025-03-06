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
        const response = await axios.get("http://localhost:80/order");
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
      const response = await axios.get("http://localhost:80/order");
      console.log(response.data);
      setPedidos(response.data.map(item => ({ ...item, status: 'pendiente' })));
    } catch (error) {
      console.log("error", error);
    }
  };

  const confirmOrder = (id) => {
    setPedidos((prevPedidos) =>
      prevPedidos.map((item) => (item.id === id ? { ...item, status: 'confirmado' } : item))
    );
    const response = axios.post("localhost:80/order/confirm",{id_order:id})
    console.log(response);
    console.log("Confirm order " + id);
  };

  const sendOrder = (id) => {
    setPedidos((prevPedidos) =>
      prevPedidos.map((item) => (item.id === id ? { ...item, status: 'enviado' } : item))
    );
    const response = axios.post("localhost:80/order/send",{id_order:id})
    console.log(response);
    console.log("Send order " + id);
  };

  const loading = () => {
    getOrders();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
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
                  <td className='box_table'>{item.place}</td> {/* Verifica que `price` sea correcto */}
                  <td className='box_table'>{item.cantidad}</td>
                  <td className='box_table_button'>
                    {item.status === "pendiente" ? (
                      <button className='button_action' onClick={() => confirmOrder(item.id)}>Confirmar</button>
                    ) : (
                      <button className='button_action' disabled>Pedido confirmado</button>
                    )}
                  </td>
                  <td className='box_table_button'>
                    {item.status === "confirmado" ? (
                      <button className='button_action' onClick={() => sendOrder(item.id)}>Mandar pedido</button>
                    ) : (
                      <button className='button_action' disabled>Pedido mandado</button>
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
