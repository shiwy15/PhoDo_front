import PictureMaterial from "../../components/Report/PictureMaterial";
import QuillEditor from '../../components/Report/Quill';
import NavBar from "../../components/form/Navbar";

function Report() {
    return (
        <>
        <NavBar/>
        <div className="edit" style={{backgroundColor: '#000'}}>
            <div className="edit absolute left-10 h-screen w-2/5"
                 style={{marginTop: '80px', borderRadius: '15px', border: '2px solid #391d44', 
                 boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)', backgroundColor: '#fff'}}>
                <QuillEditor/>
            </div>
            <div className ="picture absolute right-10 w-1/2" style={{marginTop: '80px'}}>
                <PictureMaterial/>
            </div>

        </div>
        </>
    )
}

export default Report;