import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SoulmatesPage from "./pages/SoulmatesPage";
import "./App.css";
import SoulmateName from "./pages/SoulmateName";
import RequestPage from "./pages/RequestPage";
import SoulmateBirthday from "./pages/SoulmateBirthday";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/k-pop-soulmates" element={<SoulmatesPage />} />

        {/* <Route path="/request" element={<RequestPage />} /> */}
        {/* 
        <Route path="/soulmate-name" element={<SoulmateName />} />
        <Route path="/soulmate-birthday" element={<SoulmateBirthday />} /> */}
      </Routes>
    </>
  );
}

export default App;
