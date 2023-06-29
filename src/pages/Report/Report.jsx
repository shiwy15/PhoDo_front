import Header from '../../components/mypage/Header';
import PictureMaterial from "../../components/Report/PictureMaterial";
import QuillEditor from '../../components/Report/Quill';

function Report() {
    return (
        <div className="edit">
            <Header />
            <div className ="edit absolute left-0 h-screen w-1/2"
                 style={{paddingTop: '60px'}}>
                <QuillEditor/>
            </div>
            <div className ="picture absolute right-0 w-1/2" style={{paddingTop: '60px'}}>
                <PictureMaterial/>
            </div>

        </div>
    )
}

export default Report;