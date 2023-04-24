import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, path.resolve(__dirname, '../../public/img'))
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }
})

export const uploader = multer({storage})