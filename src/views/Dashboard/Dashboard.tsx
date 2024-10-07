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
        <div className=" flex justify-center items-center p-4 m-8">
            <h1 className="w-full text-2xl font-bold md:w-1/2"> User Dashboard....  </h1>
           
            {user ? (
                <div className="w-full flex flex-col justify-center  bg-white rounded p-4 m-8 md:w-1/2">
                    <p>Email:   {user.email}</p>
                    <p>Name:   {user.name}</p>
                    <p>Address:   {user.address}</p>
                    <p>Phone:   {user.phone}</p>
                </div>
            ) : (
                <p>You need to login to access this page.</p> 
            )}
        </div>
    );
};

export default UserDashboard;
