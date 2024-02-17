import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

function UpdateProduct() {
  const params = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    images: [],
  });

  const [product, setProduct] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const img = useRef(product.images);
  const handleImageChange = (e) => {
    const files = e.target.files;
    setFormData((prevState) => ({
      ...prevState,
      images: files,
    }));
  };

  // const getOldUpdatedData = () => {};
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/products/getOneProduct/${params.id}`
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [params.id]);

  useEffect(() => {
    setFormData({
      title: product.title || "",
      description: product.description || "",
      price: product.price || "",
      images: product.images || [],
    });
  }, [product]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);

      // // Convert FileList to an array
      // const imageFiles = Array.from(formData.images);

      // // Append each file to the FormData
      // imageFiles.forEach((file, index) => {
      //   formDataToSend.append(`images`, file);
      //   console.log(file);
      // });

      // Check if there are new files before appending them to the FormData
      if (formData.images.length > 0) {
        // Convert FileList to an array
        const imageFiles = Array.from(formData.images);

        // Append each file to the FormData
        imageFiles.forEach((file, index) => {
          formDataToSend.append(`images`, file);
          console.log(file);
        });
      }

      const response = await fetch(
        `http://localhost:3000/products/updateProduct/${params.id}`,
        {
          method: "PUT",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Response data:", responseData);
      alert("Successfully Created.....");
      // setFormData({
      //   title: "",
      //   description: "",
      //   price: "",
      //   images: [],
      // });
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <>
      <div className="bg-gray-100  h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
          <form onSubmit={handleFormSubmit} encType="multipart/form-data">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Name"
              >
                Title:
              </label>
              <input
                className="w-full border rounded px-3 py-2 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Email"
              >
                Description
              </label>
              <textarea
                rows="4"
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                name="description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Email"
              >
                Price:
              </label>
              <input
                className="w-full border rounded px-3 py-2 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-4 mb-4">
              <input
                className="p-3 border border-gray-300 rounded w-full"
                onChange={handleImageChange}
                type="file"
                name="images"
                accept="image/*"
                multiple
                // ref={img}
              />
            </div>

            {/* <div>
              Selected Files:
              {formData.images &&
                Array.from(formData.images).map((file, index) => (
                  <div key={index}>{file.name}</div>
                ))}
            </div> */}

            {/* <div className="flex flex-wrap gap-2">
              {formData.images &&
                formData.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Product Image ${index + 1}`}
                    className="mt-4 flex gap-2 w-[50px] h-[50px]"
                  />
                ))}
            </div> */}

            <div className="flex justify-between">
              <button
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-2"
                type="submit"
                value="Send"
              >
                Update
              </button>
            </div>
          </form>
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-2">
            <Link to="/ShowListing">See All Products</Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default UpdateProduct;
