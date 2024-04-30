
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/users.models";
import jwt from 'jsonwebtoken'
import { connect } from "@/dbConfig/dbConfig"

connect()
interface JwtPayload {
    id: string
}
export async function GET(request: NextRequest, response: NextResponse) {
    try {
        const token = request.cookies.get('token')?.value || '';
        
        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Token not found",
                    data: [],
                    status: 400
                }
            );
        }
        const { id } = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload ;
        
        const user = await User.findOne({ _id: id }).select('-password -isVerified -isAdmin');

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                    data: [],
                    status: 400
                }
            );
        }
        return NextResponse.json(
            {
                success: true,
                message: "User found",
                data: user,
                status: 200
            }
        );
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
