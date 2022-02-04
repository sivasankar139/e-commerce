import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout';
import db from '../fireConfig';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId =JSON.parse(localStorage.getItem('currentUser')).user.uid
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      setLoading(true);
      const orderResult = await getDocs(collection(db, "orders"));
      const ordersArray = [];
      orderResult.forEach((doc) => {
        
        ordersArray.push(doc.data());
        setLoading(false);
      });

      setOrders(ordersArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
      <div>
          <Layout loading={loading}>
              {orders.filter(obj=>obj.userId === userId).map((order)=>{
                 return <table className="table mt-3 order">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {order.cartItems.map((item) => {
                      return (
                        <tr>
                          <td>
                            <img src={item.imageURL} height={80} width={80} />
                          </td>
                          <td>{item.name}</td>
                          <td>{item.price}</td>
                          
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              })}
          </Layout>
      </div>
  )
};

export default OrdersPage;
