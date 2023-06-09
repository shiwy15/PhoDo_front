import { Routes, Route } from "react-router-dom"

//pages
import Login from "./pages/Login/Login.jsx";
import Mypage from "./pages/Mypage/Mypage.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </div>
  );
}

export default App;
