import { useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function RedirectToProject() {
  const { useremail, projectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://hyeontae.shop/project/${useremail}/${projectId}`, {withCredentials: true})
    //axios.get(`http://localhost:4000/project/${useremail}/${projectId}`, {withCredentials: true})
      .then((response) => {
        // do something with response if necessary
        navigate(`/newproject/${projectId}`);
      })
      .catch((error) => {
        // handle error here
        console.log(error)
      });
  }, [useremail, projectId, navigate]);

  return null; // or return a loading indicator
}
export default RedirectToProject;