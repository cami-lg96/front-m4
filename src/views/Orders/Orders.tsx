
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/helpers/auth";
import { getUserOrders } from "@/helpers/orders.helper";
import { IOrder } from "@/interface/orderInterface";

const UserOrders: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}'); 
        const token = userData.token;
        console.log('Fetching orders with token:', token);

  
        if (!token) {
          console.error("Token is missing");
          setError("User is not authenticated");
          setLoading(false);
          return;
        }
  
        try {
          const data = await getUserOrders(token); 
          setOrders(data);
        } catch (err) {
          if (err instanceof Error) {
            console.error("Error fetching orders:", err.message);
            setError("Failed yo fetch user orders console chatch (err)");
          } else {
            setError("An unexpected error occurred");
          }
        } finally {
          setLoading(false);
        }
      };
  
      fetchOrders();
    }, []);

  if (loading) {
     return <p  className="flex flex-col items-center justify-center h-screen p-4">Loading...</p>;
  }

  if (!isAuthenticated()) {
     return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <h1 className="text-xl font-bold p-4" >You need to login to view your orders.</h1>
        <button
        className="transition-colors text-sm bg-white border border-slate-600  rounded  text-slate-900 text-hover shadow-md p-2"
          onClick={() => router.push("/login")}
        >
          Login
        </button>
      </div>
    );
  }

  

  if (error) {
    return (
      <div  className="flex flex-col items-center justify-center h-screen p-4">
        <h1 className="text-xl font-bold p-4">{error}</h1>
      </div>
    );
  }

  return (
    <div >
      <h1 className="text-2xl font-bold p-4 m-4">User Orders:</h1>
      {orders.length === 0 ? (
        <div  className="flex flex-col items-center justify-center h-screen p-4">
          <h1 className="text-xl font-bold p-4">No orders found.</h1>
          <button
          className="transition-colors text-sm bg-white border border-slate-600  rounded  text-slate-900 text-hover shadow-md p-2"
          onClick={() => router.push("/store")}
          >
            Go to Store
          </button>
        </div>
      ) : (
        <div className="flex justify-center  flex-col m-4 p-4 border-y-8 border-slate-500">
          {orders.map((order) => (
            <div key={order.id} className="p-4 m-8 text-lg font-semibold shadow-md border rounded-sm bg-white" style={{margin:"1rem"}}>
              <div className="flex justify-between">
                <h2 className="text-sm">Order ID: {order.id}</h2>
                <p className="text-sm">Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className="flex justify-center">Products List:</p>
              <ul >
                {order.products.map((product, index) => (
                  <li key={index} className="flex flex-row items-center gap-4 w-full border-b-4 border-b-slate-900">
                     <div className=" m-4 p-4">
                         <img 
                          style={{ height: '7rem', objectFit: 'contain' }} 
                          src={product.image} alt={product.name} />
                       </div>
                    <p className="text-lg text-slate-800 font-semibold"> {product.name} </p>
                    <p className="text-slate-600 font-normal text-sm p-4"> Price: ${product.price} </p>
                    <hr />
                  </li>
                ))}
              </ul>
                  <div className="flex justify-between items-center">
                    <p className="p-4">
                    Total price: $
                    {order.products.reduce(
                    (total, product) => total + product.price,
                    0
                   )}
                   </p>
                   <p className="flex-none text-sm text-slate-600 p-4">Status: {order.status}</p>
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  
  );
};

export default UserOrders;

