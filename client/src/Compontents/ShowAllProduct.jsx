import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ShowAllProduct() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/products/getAllProduct"
        );
        const data = await response.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId) => {
    console.log(productId);
    try {
      window.confirm("Are you sure you want to delete this product?");
      await axios.delete(
        `http://localhost:3000/products/deleteProduct/${productId}`
      );
      const updatedProducts = products.filter(
        (product) => product._id !== productId
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <div className=" flex gap-5 flex-wrap max-w-8xl mx-auto justify-center">
        {products.map((product) => (
          <div className="border shadow-md p-6 m-4 w-[25%]" key={product._id}>
            <h2 className="text-xl font-bold mb-2">{product.title}</h2>
            <p className="mb-2">{product.description}</p>
            <p className="text-gray-600">Price: ${product.price}</p>
            <div className="mt-4 flex gap-2 w-[50px] h-[50px]">
              {product.images.map((image) => (
                <img
                  key={image}
                  src={image}
                  alt={product.title}
                  className="w-full mb-2"
                />
              ))}
            </div>
            <button
              onClick={() => handleDeleteProduct(product._id)}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mt-4 "
            >
              Delete
            </button>
            <Link
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-red-600 mt-4 float-end"
              to={`/updateProduct/${product._id}`}
            >
              Update
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowAllProduct;
