import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/Main";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}
