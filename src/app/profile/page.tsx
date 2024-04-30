"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ProfilePage() {

    const router = useRouter()
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        username: '',
        email: '',
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/users/currentUser');
                alert(response.data.message)
                setData(response.data.data);
                console.log(response);
                if(response.data.success === false) {
                    router.push('/login')
                }
                
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    const onLogout = async() => {
        try {
            const response = await axios.get('/api/users/logout')
            alert(response.data.message)
            router.push('/login')
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }


    return (
        <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-4">Profile</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
                <p className="text-gray-800">{data.username}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                <p className="text-gray-800">{data.email}</p>
            </div>
            <button onClick={onLogout} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-red-300">Logout</button>
        </div>
    </div>
    )

}



