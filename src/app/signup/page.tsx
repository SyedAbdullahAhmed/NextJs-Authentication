"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function SignupPage() {

    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleChange = (e: any) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const onSignup = async () => {
        try {
            if(user.password.length < 8) {
                alert("Password must have 8 letters")
                return
            }
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            alert(response.data.message)
            console.log(response);
            if(!response.data.success) {
                return
            }
            router.push("/login");
            
        } catch (error: any) {
            console.log("Signup failed", error.message);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold mb-4">{loading ? "Processing" : "Signup"}</h1>
            <label htmlFor="username" className="text-gray-800">Username</label>
            <input
                className="text-left p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-gray-800"
                id="username"
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                placeholder="Username"
                required
            />
            <label htmlFor="email" className="text-gray-800">Email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-gray-800"
                id="email"
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <label htmlFor="password" className="text-gray-800">Password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-gray-800"
                id="password"
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Password"
                required
            />
            <button
                onClick={onSignup}
                className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${buttonDisabled ? 'bg-blue-500 hover:bg-blue-600 text-white  cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                disabled={buttonDisabled}
            >
                {buttonDisabled ? "No signup" : "Signup"}
            </button>
            <Link href="/login" className="text-blue-500 hover:underline">Visit login page</Link>
        </div>
    )

}



