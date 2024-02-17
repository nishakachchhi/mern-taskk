import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllPProduct,
  getProductById,
  updateProduct,
} from "../Controllers/product.controller.js";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).array("images", 3);

router.route("/createProduct").post(upload, createProduct);
router.route("/getAllProduct").get(getAllPProduct);
router.route("/getOneProduct/:id").get(getProductById);
router.route("/updateProduct/:id").put(upload, updateProduct);
router.route("/deleteProduct/:id").delete(deleteProduct);

export default router;
