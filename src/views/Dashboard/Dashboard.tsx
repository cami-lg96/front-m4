"use client"; 

import React, { useState, useEffect } from 'react';
import { getUserData, isAuthenticated } from '@/helpers/auth';
import { IUser } from '@/interface/userInterface'; 
import { useRouter } from 'next/navigation';

const UserDashboard: React.FC = () => {

  const [user, setUser] = useState<IUser | null>(null); 
 const [loading, setLoading] = useState(true);
  const router = useRouter();

    useEffect(() => {
        const userData = getUserData();
        try {
           if (userData) {
            setUser(userData); 
        } else {
            console.log("No user data available"); 
        } 
        } finally {
            setLoading(false);
          }  
       
    }, []);

    if (loading) {
        return <p  className="flex flex-col items-center  h-screen p-4">Loading...</p>;
     }
   
     if (!isAuthenticated()) {
        return (
         <div className="flex flex-col items-center  h-screen p-4">
           <h1 className="text-xl font-bold p-4" >You need to login to view your dashboard.</h1>
           <button
           className="transition-colors text-sm bg-white border border-slate-600  rounded  text-slate-900 text-hover shadow-md p-2"
             onClick={() => router.push("/login")}
           >
             Login
           </button>
         </div>
       );
     }

    return (
        <div className=" flex justify-center items-center p-2 m-2">
            <h1 className="w-full text-2xl font-bold md:w-1/2"> User Dashboard....  </h1>
           
            {user ? (
                <div className="w-full flex flex-col justify-center  bg-white rounded p-2 m-2 md:w-1/2">
                    <div className="flex m-2 ">
                      <p className="text-lg text-slate-800 font-semibold p-4">Email:  </p>
                      <p className='text-lg p-4'> {user.email}</p>
                    </div>
                    <div className="flex m-2  ">
                      <p className="text-lg text-slate-800 font-semibold px-4">Name:   </p>
                      <p className='text-lg px-4'> {user.name}</p>
                    </div>
                    <div className="flex m-2 ">
                      <p className="text-lg text-slate-800 font-semibold p-4">Address:  </p>
                      <p className='text-lg p-4'>  {user.address}</p>
                    </div>
                    <div className="flex m-2 ">
                      <p className="text-lg text-slate-800 font-semibold px-4">Phone:  </p>
                      <p className='text-lg px-4'> {user.phone} </p>
                    </div>
                </div>
            ) : (
                <p>You need to login to access this page.</p> 
            )}
        </div>
    );
};

export default UserDashboard;
