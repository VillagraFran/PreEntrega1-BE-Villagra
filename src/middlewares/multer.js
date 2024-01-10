import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder;
        if (file.filename === "documentImage") {
            folder="document"
        } else if (file.filename === "profileImage") {
            folder="profile"
        } else{
            folder="products"
        }
        cb(null, `../public/${folder}`)
    },
    filename: (req, file, cb) => cb(null, file.originalname)
});

export const uploader = multer({ storage });