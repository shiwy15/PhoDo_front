// login set
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Login/Signup.jsx";
import Forgotpw from "./pages/Login/Forgotpw.jsx";
import Passwordchange from "./pages/Login/Passwordchange.jsx";

//editor set

import Editor2 from "./pages/Editor/Editor2.jsx"
import Editor4 from "./pages/Editor/Editor4.jsx"

//react query practice set
import Practice from "./pages/Practice/Practice.jsx"
import Practice3 from "./pages/Practice/Practice3.jsx"
import Test from "./pages/Practice/Test.jsx"

import { MainPage } from './pages/Main/Main.jsx'
import Mypage from "./pages/Mypage/Mypage";
import Myproject from "./pages/Myproject/Myproject";
import { Routes, Route } from "react-router-dom"

// import ForcedDirectedTree from "./pages/Editor/forcedTree.jsx"
// import VennDiagram from "./pages/Editor/venndiagram.jsx"

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
        <Route path="/newproject" element={<Editor2 />} />
        <Route path="/existingproject" element={<Editor4 />} />

        {/* react query sample */}
        <Route path="/practice" element={<Practice />} />
        <Route path="/practice3" element={<Practice3 />} />
        <Route path="/Test" element={<Test />} />

        {/* My page */}
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/myproject" element={<Myproject />} />

        {/* Main */}
        <Route path="/" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;