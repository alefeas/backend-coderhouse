import {fileURLToPath} from 'url'
import { dirname } from 'path'
import bcrypt from "bcrypt"

const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

export const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword = (userDB, password) => bcrypt.compareSync(password, userDB.password)