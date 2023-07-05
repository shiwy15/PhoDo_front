import PictureMaterial from "../../components/Report/PictureMaterial";
import QuillEditor from '../../components/Report/Quill';
import NavBar from "../../components/form/Navbar";
import Container from "react-bootstrap/Container";



function Report() {
    return (
        <>
        <NavBar/>
        <Container fluid className="project-section">            
            <div className="edit-view">
                <QuillEditor/>
            </div>
            <div className ="picture-view absolute right-20 w-1/2">
                <PictureMaterial/>
            </div>

        </Container>
        </>
    )
}

export default Report;