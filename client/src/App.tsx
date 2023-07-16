import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/Main";
import GlobalStyle from "./styles/globalStyles";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
