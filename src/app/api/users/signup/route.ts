
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/users.models";
import bcrypt from 'bcryptjs'
import { connect } from "@/dbConfig/dbConfig"

connect()

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        console.log(data);
        const { email, username, password } = data

        if (!email || !username || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please provide all the fields",
                    data: [],
                    status: 400
                }
            );
        }

        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User already exists",
                    data: [],
                    status: 400
                }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const savedUser = await User.create({
            email, username, password: hashedPassword
        })

        if (!savedUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Failed to create user",
                    data: [],
                    status: 400
                }
            );
        }
        return NextResponse.json(
            {
                success: true,
                message: "Data Saved successfully!!",
                data: savedUser,
                status: 201
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Failed to create user",
                data: [],
                status: 400
            }
        );
    }

}
