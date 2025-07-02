import userModel from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import sendEmail from '../config/sendEmail.js'
import verifyEmailTemplate from "../utils/veriyEmailTemplate.js";

export async function registerUserController(request, response) {
  try {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      return response.status(400).json({
        message: "Provide Email , Name, Password",
        error: true,
        success: true,
      });
    }
    const user = await userModel.findOne({ email });

    if (user) {
      return response.json({
        message: "Already Registered Email",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10)
    const hasPassword = await bcryptjs.hash(password,salt)

    const payload = {
        name,
        email,
        password : hasPassword
    }

    const newuser = new userModel(payload)
    const save = await newuser.save()

    const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`

    const verificationEmail = await sendEmail({
        sendTo : email,
        subject : "Verify email from Blinkyt",
        html:  verifyEmailTemplate({
            name,
            url: verifyEmailUrl
        })
    })

    return response.json({
      message: "User Register Successfully",
      error: false,
      success: true,
      data: save
    })

  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: true,
    });
  }
}
