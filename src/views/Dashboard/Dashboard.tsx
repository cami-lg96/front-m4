"use client"; 

import React, { useState, useEffect } from 'react';
import { getUserData } from '../../helpers/auth';
import { IUser } from '@/interface/userInterface'; 

const UserDashboard: React.FC = () => {

  const [user, setUser] = useState<IUser | null>(null); 

    useEffect(() => {
        const userData = getUserData();
        if (userData) {
            setUser(userData); 
        } else {
            console.log("No user data available"); 
        }
    }, []);


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
