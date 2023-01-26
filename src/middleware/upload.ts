import multer from "multer";

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, "./uploads/");
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});


const upload = multer({ storage: storage })
export default upload;