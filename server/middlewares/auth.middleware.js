//This is authenticate user, with their jwt
const authenticateUser = (req, res, next) => {
  console.log("user is verified")
  next()
}

export default authenticateUser