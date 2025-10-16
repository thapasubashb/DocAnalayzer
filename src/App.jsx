import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Home from "./components/pages/Home";
import Featuresection from "./components/pages/Featuresection";
import WhatYouGetPage from "./components/pages/WhatYouGetPage";
import FAQPage from "./components/pages/FAQPage";
import Footer from "./components/layouts/Footer";
import CaseFile from "./Cases/page";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Featuresection />
              <WhatYouGetPage />
              <FAQPage />
              <Footer />
            </>
          }
        />
        <Route path="/file" element={<CaseFile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
