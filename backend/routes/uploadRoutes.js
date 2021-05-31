import express from "express"
import multer from 'multer'
import path from "path"
const router = express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb) { //cb-callback function
       cb(null,'uploads/') 
    },
    filename(req, file, cb) {
        cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)//getting dynamic extension of file name and adding filename with date to make diffrence in file
    }
})

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
    
    if (extname && mimetype)
    {
       return cb(null,true)
    } else {
        cb('Images only!')
        }
}
const upload = multer({
    storage, //if we place only storage then it allow all type of file to upload 
    fileFilter: function (req, file, cb) {
        checkFileType(file,cb)
    }
})


router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
})

export default router;