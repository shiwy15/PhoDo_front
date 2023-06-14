// login set
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Login/Signup.jsx";
import Forgotpw from "./pages/Login/Forgotpw.jsx";
import Passwordchange from "./pages/Login/Passwordchange.jsx";

//editor set
import Editor from "./pages/Editor/Editor.jsx"

//react query practice set
import Practice from "./pages/Practice/Practice.jsx"
import Practice2 from "./pages/Practice/Practice2.jsx"

import { MainPage } from './pages/Main/Main.jsx'
import Mypage from "./pages/Mypage/Mypage";

import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Routes>
        {/* login set */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpw" element={<Forgotpw />} />
        <Route path="/reset/:token" element={<Passwordchange />} />

        {/* editor set */}
        <Route path="/editor" element={<Editor />} />

        {/* react query sample */}
        <Route path="/practice" element={<Practice />} />
        <Route path="/practice2" element={<Practice2 />} />

        {/* My page */}
        <Route path="/mypage" element={<Mypage />} />

        {/* Main */}
        <Route path="/" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;