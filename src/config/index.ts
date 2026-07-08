import dotenv from "dotenv"

dotenv.config()

const config = {
  port: process.env.PORT,
  connection_string: process.env.CONNECTION_STRING,
  salt_round: process.env.SALT_ROUND,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expiresin: process.env.JWT_EXPIREIN
}

export default config