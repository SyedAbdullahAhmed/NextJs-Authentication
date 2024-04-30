
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/users.models";
import bcrypt from 'bcryptjs'
import { connect } from "@/dbConfig/dbConfig"

connect()

export async function POST(request: NextRequest) {
    try {
        // get data
        const data = await request.json();
        const { email, username, password } = data

        // validate data
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

        // find in database
        const user = await User.findOne({ email }).select("-password -isVerified -isAdmin")
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

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // create user
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
