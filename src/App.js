// login set
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Login/Signup.jsx";
import Forgotpw from "./pages/Login/Forgotpw.jsx";
import Passwordchange from "./pages/Login/Passwordchange.jsx";

//editor set

import Editor2 from "./pages/Editor/Editor2.jsx"
import Editor4 from "./pages/Editor/Editor4.jsx"
import {Modal} from "./pages/Modal/Modal.jsx"

//react query practice set
import Practice from "./pages/Practice/Practice.jsx"
import Practice3 from "./pages/Practice/Practice3.jsx"
import Test from "./pages/Practice/Test.jsx"


//page component
import { MainPage } from './pages/Main/Main.jsx'
import Mypage from "./pages/Mypage/Mypage";
import Myproject from "./pages/Myproject/Myproject";

//routing
import { Routes, Route } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import ProtectedRoutes from "./pages/Login/ProtectedRoutes.jsx";

export const UserContext = createContext();



function App() {
  const [user, setUser] = useState(
    //UserContext
    JSON.parse(localStorage.getItem("user")) || { loggedIn: false }
  );

  
  // useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(user));
  // }, [user]);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          {/* login set */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpw" element={<Forgotpw />} />
          <Route path="/reset/:token" element={<Passwordchange />} />
          
          <Route element={<ProtectedRoutes />}>
            {/* editor set */}
            <Route path="/modal" element={<Modal />} />
            <Route path="/newproject/:projectId" element={<Editor2 />} />
            <Route path="/existingproject" element={<Editor4 />} />

            {/* react query sample */}
            <Route path="/practice" element={<Practice />} />
            <Route path="/practice3" element={<Practice3 />} />
            <Route path="/Test" element={<Test />} />

            {/* My page */}
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/myproject" element={<Myproject />} />

            {/* Main */}
            <Route path="/main" element={<MainPage />} />
            <Route path="/*" element={<MainPage />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </div>
    );
}

export default App;