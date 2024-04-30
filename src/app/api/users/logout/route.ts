import { NextResponse,NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const response = NextResponse.json(
            {
                success: true,
                message: "Logout successful",
                data: [],
                status: 200
            }
        )
        console.log(request.cookies.get('token'));
        
        response.cookies.set("token", "",
        {
            httpOnly: true, expires: new Date(0)
        });
        console.log(request.cookies.get('token'));
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