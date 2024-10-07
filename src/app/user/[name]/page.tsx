"use client"
import { useEffect, useState } from 'react';
import { getUserData, isAuthenticated } from "@/helpers/auth";
import UserDashboard from "@/views/Dashboard/Dashboard";
import Link from "next/link";
import { IUser } from '@/interface/userInterface'; 

const DashboardPage = ({ params }: { params: { name: string } }) => {
    const [userData, setUserData] = useState<IUser | null>(null); 
    const isUserAuthenticated = isAuthenticated();

    useEffect(() => {
        const data = getUserData();
        if (data) {
            setUserData(data); 
        }
    }, []);

    return (
        <div className=' p-4 m-4'>
            <h1 className=' p-4 m-4 text-2xl flex justify-center items-center'>Welcome {params.name}!</h1>
            {isUserAuthenticated && userData ? (
                <UserDashboard />
            ) : (
                <div className="p-4 m-4">
                    <p className="text-red-600">You need to login to access this page.</p>
                    <Link href="/login" className="text-blue-500 hover:underline">
                        Go to Login
                    </Link>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
