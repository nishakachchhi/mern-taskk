import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateProduct from "./Compontents/CreateProduct";
import ShowAllProduct from "./Compontents/ShowAllProduct";
import UpdateProduct from "./Compontents/UpdateProduct";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<CreateProduct />} />
          <Route path="/ShowListing" element={<ShowAllProduct />} />
          <Route path="/updateProduct/:id" element={<UpdateProduct />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
