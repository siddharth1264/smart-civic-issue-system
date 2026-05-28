import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/user" element={<UserPage />} />

        <Route path="/admin" element={<AdminPage />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;