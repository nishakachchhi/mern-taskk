import { Product } from "../model/product.model.js";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
console.log(__filename);
const __dirname = dirname(__filename);
console.log(__dirname);
const nishaFolderPath = resolve(__dirname, "../..");
console.log(nishaFolderPath);

// const createProduct = async (req, res, next) => {
//   try {
//     const product = await Product.create(req.body);
//     res.status(201).json(product);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

const createProduct = async (req, res, next) => {
  try {
    const { title, description, price } = req.body;
    // console.log(req.files);
    const images = req.files;

    const imageFileNames = images.map((image) => image.filename);

    const product = await Product.create({
      title,
      description,
      price,
      images: imageFileNames,
    });

    res.status(201).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

const getAllPProduct = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProductById = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    // Assuming 'images' is an array of image filenames in the Product model
    const { _id, title, description, price, images } = product;

    // You can customize the response structure based on your needs
    const productWithImages = {
      _id,
      title,
      description,
      price,
      images,
    };

    res.status(200).json(productWithImages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const findData = await Product.findById(req.params.id);

    let imagePath;

    // Check if new files are uploaded
    if (req.files && req.files.length > 0) {
      // Delete existing images if needed
      findData.images.forEach((img) => {
        fs.unlink(
          `${nishaFolderPath}/public/images/${img.split("/")[3]}`,
          (unlink) => {
            if (unlink) {
              console.log("File deleted successfully");
            }
          }
        );
      });

      // Map new file names
      imagePath = req.files.map((image) => image.filename);
    } else {
      // No new files, keep existing images
      imagePath = findData.images;
    }

    const { title, description, price } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        price,
        images: imagePath,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

// const updateProduct = async (req, res, next) => {
//   try {
//     const findData = await Product.findById(req.params.id);
//     let imagePath;

//     // imagePath.forEach((img) =>
//     //   fs.unlink(
//     //     `${nishaFolderPath}/public/images/${img.split("/")[3]}`,
//     //     (unlink) => {
//     //       if (unlink) {
//     //         ("File deleted successfully");
//     //       }
//     //     }
//     //   )
//     // );

//     const { title, description, price } = req.body;
//     // console.log(req.files);
//     const images = req.files;
//     if (images) {
//       imagePath = images.map((image) => image.filename);
//     } else {
//       imagePath = findData.images;
//     }

//     // if (imagePath === 0) {
//     //   imagePath = images.map((image) => image.filename);
//     // }
//     // const imageFileNames = images.map((image) => image.filename);
//     const updatedProduct = await Product.findByIdAndUpdate(
//       req.params.id,
//       {
//         title,
//         description,
//         price,
//         images: imagePath,
//       },
//       { new: true }
//     );
//     if (!updatedProduct) {
//       return res.status(404).json({ error: "Product not found" });
//     }
//     res.status(200).json(updatedProduct);
//   } catch (error) {
//     console.log(error.message);
//     res.status(400).json({ error: error.message });
//   }
// };

const deleteProduct = async (req, res, next) => {
  try {
    const findData = await Product.findById(req.params.id);
    const imagePath = findData.images;

    imagePath.forEach((img) =>
      fs.unlink(
        `${nishaFolderPath}/public/images/${img.split("/")[3]}`,
        (unlink) => {
          if (unlink) {
            ("File deleted successfully");
          }
        }
      )
    );
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(204).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export {
  createProduct,
  getAllPProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
