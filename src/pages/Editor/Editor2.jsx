import React, {useEffect} from "react";
import Header from '../../components/mypage/Header';
import { useParams } from "react-router-dom";
import Editingbox2 from "../../components/Editor/Editingbox2";

function Editor2() {
    return (
        <div className="edit">
            <Header />
            <Editingbox2/>
        </div>
    )
}

export default Editor2;