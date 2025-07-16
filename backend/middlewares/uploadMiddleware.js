// In uploadMiddleware.js
import multer from 'multer'

const storage = multer.memoryStorage()

const fileFilter = (req,file,cb)=>{

  const allowedTypes = ["image/jpeg","image/png","image/jpg"]

  if(allowedTypes.includes(file.mimetype)){
    cb(null , true)
  }
  else{
    cb(new Error("only jpeg and png allowed",false))
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter
})

export default upload;