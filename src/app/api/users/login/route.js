import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcrycpt from "bcryptjs"
import  jwt  from "jsonwebtoken";

connect();

export async function POST(request){
try {
    const reqBody = await request.json()
    const {email, password} = reqBody;
    const user = await User.findOne({email})
    if(!user){
        return NextResponse.json({error : 
            "user does not exist"
        }, {status: 400})
    }
    const validPassword = await bcrycpt.compare(password, user.password)
    const tokenData = {
        id : user._id,
        username : user.username,
        email : user.email
    }
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn : "1h"} )

    const response = NextResponse.json({
        message : "Login Succesful",
        succes : true,
    })
    response.cookies.set("token", token, {
        httpOnly: true,
    })
    return response
} catch (error) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
}
}