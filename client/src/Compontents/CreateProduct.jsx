import { useState } from "react";
import { Link } from "react-router-dom";

function CreateProduct() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    setFormData((prevState) => ({
      ...prevState,
      images: files,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);

      // Convert FileList to an array
      const imageFiles = Array.from(formData.images);

      // Append each file to the FormData
      imageFiles.forEach((file, index) => {
        formDataToSend.append(`images`, file);
      });

      const response = await fetch(
        "http://localhost:3000/products/createProduct",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Response data:", responseData);

      if (response.ok) {
        alert("Successfully Created.....");
      }
      setFormData({
        title: "",
        description: "",
        price: "",
        images: [],
      });
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
              />
            </div>

            <div className="flex justify-between">
              <button
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-2"
                type="submit"
                value="Send"
              >
                Create
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

export default CreateProduct;
