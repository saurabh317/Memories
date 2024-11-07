import { User } from "../models/user.model.js"

export default class UserController {
  static registerUser = async(req, res) => {
    // check if the user has entered all the required credentials
    const { userName, email, password } = req.body
    console.log(req.cookies.accessToken)
    console.log( userName, email, password)
    if (!userName || !email || !password) {
      res.status(401).json({
        status: 400,
        message: "All the fields are required⚠️"
      })
      return
    }

    // check if the user already exists in the db
    const userExist = await User.findOne({
      $or: [{ userName }, { email }]
    })


    if (userExist) {
      res.status(401).json({
        status: 400,
        message: "user already exist❌"
      })
      return
    }

    // if not exist then add new user to the db
    User.create({
      userName: userName,
      email: email,
      password: password
    }).then(() => {
      res.status(201).json({
        status: 200,
        message: 'user created successfully✅'
      })
    }).catch(() => {
      res.status(501).json({
        status: 501,
        message: 'something went wrong while creating a new user😟'
      })
    })
  }

  static signIn = async(req, res, next) => {
    // check if the user has entered all the required credentials
    const { email, password } = req.body
    if (!email || !password) {
      res.status(401).json({
        status: 400,
        message: "All the fields are required⚠️"
      })
      return
    }

    // check if this user exists in db
    const user = await User.findOne({
      $or: [{ email }]
    })

    if (!user) {
      res.status(401).json({
        status: 400,
        message: "user doesn't exist❌"
      })
      return
    }

    // check for valid credentials and signin and return jwt token
    const validPassword = await user.isPasswordCorrect(password)
    if (validPassword) {
      const token = user.generateAccessToken()
      res.cookie("accessToken", token, { maxAge: 9000000 })
      res.status(201).json({
        status: 200,
        userId: user._id,
        userName: user.userName,
        token: token,
        message: 'user logged in successfully'
      })
    }

  }

}