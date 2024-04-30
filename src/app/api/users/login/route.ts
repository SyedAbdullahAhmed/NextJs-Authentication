
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/users.models";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { connect } from "@/dbConfig/dbConfig"

connect()
export async function POST(request: NextRequest, response: NextResponse) {
    try {
        // get data
        const data = await request.json();
        const { email, password } = data

        // validate data
        if (!email || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please provide all the fields",
                    data: [],
                    status: 400
                }
            );
        }

        // find in database
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User does not exist",
                    data: [],
                    status: 400
                }
            );
        }

        // check if passoword is valid or not
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid password",
                    data: [],
                    status: 400
                }
            );
        }

        // token data
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username
        }

        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' });
        
        // create response
        const response = NextResponse.json({
            success: true,
            message: "User login successfully!!",
            data: user,
            status: 200
        })

        // set token in response
        response.cookies.set("token", token, {
            httpOnly: true,

        })
        
        return response;
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Failed to login user",
                data: [],
                status: 400
            }
        );
    }

}
