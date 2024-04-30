import nodemailer from 'nodemailer';
import User from "@/models/users.models";
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/helpers/mailer';
import { connect } from '@/dbConfig/dbConfig';

connect()

export async function POST(request: NextRequest) {
    try {
        // get email 
        const data = await request.json();
        const email = data.email;

        // find in database
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                    data: [],
                    status: 400
                }
            )
        }

        // generate random number
        const passcodes = [123456, 23543, 32344, 423493, 342423, 423423, 236794, 32432, 429763, 432904, 645765];
        const index = Math.floor(Math.random() * passcodes.length);
        const randomPassCode = passcodes[index];

        // send mail
        const mailresponse = await sendEmail(email, randomPassCode)

        const passcode = randomPassCode
        const mail = { mailresponse, passcode }

        return NextResponse.json(
            {
                success: true,
                message: "Email sent successfully",
                data: mail,
                status: 200
            }
        )

    } catch (error: any) {
        throw new Error(error.message);
    }
}