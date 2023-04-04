import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SigninPage from "./routes/SigninPage/SigninPage";
import SignUpPage from "./routes/registerationPage/Registration";
import AllImages from "./routes/imagesPage/imagesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SigninPage />} />
        <Route path="/registration" element={<SignUpPage />} />
        <Route path="/images" element={<AllImages />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
