import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import sendEmail from "../config/sendEmail.js";
import verifyEmailTemplate from "../utils/veriyEmailTemplate.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";

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

    const salt = await bcryptjs.genSalt(10);
    const hasPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      password: hasPassword,
    };

    const newuser = new userModel(payload);
    const save = await newuser.save();

    const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;

    const verificationEmail = await sendEmail({
      sendTo: email,
      subject: "Verify email from Blinkyt",
      html: verifyEmailTemplate({
        name,
        url: verifyEmailUrl,
      }),
    });

    return response.json({
      message: "User Register Successfully",
      error: false,
      success: true,
      data: save,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: true,
    });
  }
}

export async function verifyEmailController(request, response) {
  try {
    const { code } = request.body;

    const user = await userModel.findOne({ _id: code });

    if (!user) {
      return response.status(400).json({
        message: "Invalid Verification Code",
        error: true,
        success: false,
      });
    }

    const updateUser = await userModel.updateOne(
      { _id: code },
      {
        verify_email: true,
      }
    );

    return response.json({
      message: "Email Verified Successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: true,
    });
  }
}

// Login Controller

export async function loginController(request, response) {
  try {
    const { email, password } = request.body;

    const user = await userModel.findOne({ email });

    if (!email || !password) {
      return response.status(400).json({
        message: "Provide Email and Password",
        error: true,
        success: false,
      });
    }

    if (!user) {
      return response.status(400).json({
        message: "Invalid Email or Password",
        error: true,
        success: false,
      });
    }

    if (user.status !== "Active") {
      return response.status(400).json({
        message: "Your Account is not Active",
        error: true,
        success: false,
      });
    }

    const checkPassword = await bcryptjs.compare(password, user.password);

    if (!checkPassword) {
      return response.status(400).json({
        message: "Invalid Password",
        error: true,
        success: false,
      });
    }

    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    response.cookie("accessToken", accessToken, cookiesOption);
    response.cookie("refreshToken", refreshToken, cookiesOption);

    return response.json({
      message: "Login Successfully",
      error: false,
      success: true,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function logoutController(request, response) {
  try {

    const userid = request.userId; // Get user ID from the request object, set by auth middleware

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    response.clearCookie("accessToken", cookiesOption);
    response.clearCookie("refreshToken", cookiesOption);

    const removeRefreshToken =  await userModel.findByIdAndUpdate(
      userid,{
        refresh_token: "",
      })


    return response.json({
      message: "Logout Successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
