import React, {useEffect} from "react";
// import Editingbox2 from "../../components/Editor/Editingbox2";
import Header from '../../components/mypage/Header';
import { useParams } from "react-router-dom";

function Editor2() {
    const {projectId} = useParams();
    useEffect(()=> {
        console.log(projectId);
    }, [projectId]);

    return (
        <div className="edit">
            <Header />
            {projectId} project created!
        </div>
    )
}

export default Editor2;