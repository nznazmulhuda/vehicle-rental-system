import dotenv from "dotenv"

dotenv.config()

const config = {
  port: process.env.PORT,
  connection_string: process.env.CONNECTION_STRING
}

export default config