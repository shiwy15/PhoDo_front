import PictureMaterial from "../../components/Report/PictureMaterial";
import QuillEditor from '../../components/Report/Quill';
import NavBar from "../../components/form/Navbar";
import Container from "react-bootstrap/Container";



function Report() {
    return (
        <>
        <NavBar/>
        <Container fluid className="project-section">            
            <div className="edit absolute left-20 h-screen w-2/5"
                 style={{marginTop: '130px', borderRadius: '15px', border: '2px solid #391d44', 
                 boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)', backgroundColor: '#fff'}}>
                <QuillEditor/>
            </div>
            <div className ="picture absolute right-20 w-1/2" style={{marginTop: '80px'}}>
                <PictureMaterial/>
            </div>

        </Container>
        </>
    )
}

export default Report;