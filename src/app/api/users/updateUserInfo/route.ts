import User from "@/models/users.models";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig"

connect()

export async function PATCH(request: NextRequest) {
    try {
        // get data
        const {email,password} = await request.json();

        // validate data
        if (!email || !password) {
            return NextResponse.json({
                success: false,
                message: "Missing email or password!!",
                data: [],
                status: 400
            })
        }

        // find user in db
        const user = await User.findOne({email}).select('-password');
        if (!user) {
            return  NextResponse.json({
                success: false,
                message: "User not found!!",
                data: user,
                status: 404
            })
        }

        // update password
        user.password = password;
        await user.save();
        
        return  NextResponse.json({
            success: true,
            message: "Updated successfully!!",
            data: user,
            status: 200
        })

    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Failed to update user",
                data: [],
                status: 400
            }
        );
        
    }
}