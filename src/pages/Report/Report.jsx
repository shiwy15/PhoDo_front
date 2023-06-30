import PictureMaterial from "../../components/Report/PictureMaterial";
import QuillEditor from '../../components/Report/Quill';

function Report() {
    return (
        <div className="edit">
            <div className ="edit absolute left-0 h-screen w-1/2"
                 style={{marginTop: '60px'}}>
                <QuillEditor/>
            </div>
            <div className ="picture absolute right-0 w-1/2" style={{marginTop: '60px'}}>
                <PictureMaterial/>
            </div>

        </div>
    )
}

export default Report;