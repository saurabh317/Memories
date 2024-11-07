import multer from 'multer';

const diskStorage = multer.diskStorage({
  filename: (req, file, cb) => {
    console.log(file)
    const name = Math.random().toString()+"-"+file.originalname
    cb(null, name)
  },
  destination: (req, file, cb) => {
    console.log(file)
    cb(null, 'public/images')
  }
})

export const uploadFile = multer(
  {
    storage: diskStorage
  }
)