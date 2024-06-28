import path from "path";
import multer from "multer";
import { Router } from "express";

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname);
        cb(null, `${file.originalname}-${Date.now()}${extname}`);
    }
})

const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg?g|png|webp/;
    const mimetypes = /image\/jpe?g|img\/png|image\/webp/;

    const extname = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;

    if (filetypes.test(extname) && mimetypes.test(mimetype)) {
        cb(null, true)
    } else {
        cb(new Error("Images only"));
    }
}

const upload = multer({storage, fileFilter})
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
    uploadSingleImage(req, res, (error) => {
        if (error) {
            res.status(400).send({message: error.message})
        } else if (req.file) {
            res.status(200).send({
                message: "Image uploaded successfully",
                image: `${req.file.path}`
            }) 
        } else {
            res.status(400).send({message: "No image file provided"});
        }
    })
})

export default router;