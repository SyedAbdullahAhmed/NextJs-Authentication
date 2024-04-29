import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json(
            {
                success: true,
                message: "Logout successful",
                data: [],
                status: 200
            }
        )
        response.cookies.set("token", "",
            {
                httpOnly: true, expires: new Date(0)
            });
        return response;
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
                data: [],
                status: 500
            }
        );
    }

}