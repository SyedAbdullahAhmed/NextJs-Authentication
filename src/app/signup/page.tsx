"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";


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
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            console.log(user);
            toast("Login success");
            router.push("/login");
        } catch (error: any) {
            console.log("Signup failed", error.message);
            toast.error(error.message);
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
            <hr className="w-full border-b-2 border-gray-300 mb-4" />
            <label htmlFor="username" className="text-gray-800">Username</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-gray-800"
                id="username"
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                placeholder="Username"
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
            />
            <button
                onClick={onSignup}
                className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${buttonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                disabled={buttonDisabled}
            >
                {buttonDisabled ? "No signup" : "Signup"}
            </button>
            <Link href="/login" className="text-blue-500 hover:underline">Visit login page</Link>
        </div>
    )

}



