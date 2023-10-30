import { Routes, Route } from "react-router-dom";
import './App.css';
import './books.css';
import Layout from "./components/Layout";
import Home from "./components/Home";
// import Signup from "./components/Signup";
// import Login from "./components/Login";
import Create from "./components/create";
import View from "./components/View";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/view/:id" element={<View />} />
          {/* <Route path="/signin" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Page404 />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
