"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",

    })
    const [password, setPassword] = useState({
        input: "",
        confirm: "",
    })
    const [email, setEmail] = useState("")
    const [passcode, setPasscode] = useState("")
    const [passcode2, setPasscode2] = useState("")
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form1, setForm1] = useState(true);
    const [form2, setForm2] = useState(false);
    const [form3, setForm3] = useState(false);
    const [form4, setForm4] = useState(false);


    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            alert(response.data.message)

            router.push("/profile");
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    const onForgotPassword = () => {
        setForm1(false)
        setForm2(true)
    }
    const onForgotPassword2 = async () => {

        try {
            const response = await axios.post("/api/users/findemail", { email });
            alert(response.data.message)
            if (!response.data) {
                alert("error occured");
                return
            }
            setPasscode2(response.data.data.passcode)
            setForm2(false)
            setForm3(true)
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        }
    }
    const onForgotPassword3 = () => {

        if (+passcode !== +passcode2) {
            alert("Passcode does not match")
            return
        }
        setForm3(false)
        setForm4(true)
    }
    const onForgotPassword4 = async () => {
        if (password.input !== password.confirm) {
            alert("Password does not match")
            return
        }
        const data = {
            email: email,
            password: password.confirm
        }
        try {
            const response = await axios.patch("/api/users/updateUserInfo", data)
            console.log(response);
            alert(response.data.message)

            router.push('/profile')
            setForm4(false)
            setForm1(true)

        } catch (error: any) {
            console.log("Login failed", error.message);
        }


    }

    const handleChange2 = (e: any) => {
        const { name, value } = e.target;
        setPassword({ ...password, [name]: value });
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold mb-4">{loading ? "Processing" : "Login"}</h1>
            <hr />

            {form1 && <>
                <label htmlFor="email">Email</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="email"
                    type="text"
                    name="email"
                    value={user?.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="password"
                    type="password"
                    name="password"
                    value={user?.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <label htmlFor="forgotPassword" className="text-blue-500 cursor-pointer" onClick={onForgotPassword}>Forgot Password?</label>
                <button
                    onClick={onLogin}
                    className={` p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${buttonDisabled ? 'bg-blue-500 hover:bg-blue-600 text-white  cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}>{buttonDisabled ? "No Login" : "Login here"}</button>
                <Link href="/signup">Visit Signup page</Link>
            </>}

            {form2 && <>
                <label htmlFor="email">Email</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="email"
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <button
                    onClick={onForgotPassword2}
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-blue-500 hover:bg-blue-600 text-white">Submit</button>
            </>}

            {form3 && <>
                <label htmlFor="passcode">Input Passcode</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="passcode"
                    type="text"
                    name="passcode"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Passcode"
                    required
                />
                <button
                    onClick={onForgotPassword3}
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-blue-500 hover:bg-blue-600 text-white">Submit</button>
            </>}

            {form4 && <>
                <label htmlFor="newPassword">New Password</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="newPassword"
                    type="password"
                    name="input"
                    value={password?.input}
                    onChange={handleChange2}
                    placeholder="New Password"
                    required
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="confirmPassword"
                    type="password"
                    name="confirm"
                    value={password?.confirm}
                    onChange={handleChange2}
                    placeholder="Confirm Password"
                    required
                />
                <button
                    onClick={onForgotPassword4}
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-blue-500 hover:bg-blue-600 text-white">Submit</button>
            </>}
        </div>

    )

}