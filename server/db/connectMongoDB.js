import mongoose from "mongoose";

const connectToMongoDb = async() => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
    console.log(connectionInstance.connection.port)
  } catch(err) {
    console.error("ERROR: ", err)
    process.exit(1)
    // The process.exit() method is used to end the process which is
    //  running at the same time with an exit code in NodeJS
  }
}

export default connectToMongoDb;