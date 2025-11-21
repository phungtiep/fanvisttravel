import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/next"


import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingButtons from "./components/sections/FloatingButtons";
import HomePage from "./pages/HomePage";
import RouteSGNPhanThiet from "./pages/RouteSGNPhanThiet";
import DatXe from "./pages/Datxe";
import BangGia from "./pages/BangGia";
import TuyenDuong from "./pages/TuyenDuong";
import FAQPage from "./pages/FAQPage";
import LienHe from "./pages/LienHe";

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sgn-phan-thiet" element={<RouteSGNPhanThiet />} />
        <Route path="/dat-xe" element={<DatXe />} />
        <Route path="/bang-gia" element={<BangGia />} />
        <Route path="/tuyen-duong" element={<TuyenDuong />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/lien-he" element={<LienHe />} />
        {/* Thêm các route khác sau này */}
        {/* <Route path="/sgn-muine" element={<RouteSGNMuiNe />} /> */}
      </Routes>
      <FloatingButtons />
      <Footer />
      <SpeedInsights/>
    </BrowserRouter>
  );
}
