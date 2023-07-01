import PictureMaterial from "../../components/Report/PictureMaterial";
import QuillEditor from '../../components/Report/Quill';

function Report() {
    return (
        <div className="edit" style={{backgroundColor: '#000'}}>
            <div className="edit absolute left-5 h-screen w-1/3"
                 style={{marginTop: '60px', borderRadius: '15px', border: '2px solid #391d44', 
                 boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)', backgroundColor: '#fff'}}>
                <QuillEditor/>
            </div>
            <div className ="picture absolute right-5 w-2/3" style={{marginTop: '60px'}}>
                <PictureMaterial/>
            </div>

        </div>
    )
}

export default Report;