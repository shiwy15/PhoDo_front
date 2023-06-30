import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import image1 from './factory_inital.png'

//components
import Sidebar from "../../components/mypage/SidebarL"
import Projectenterbar from "../../components/myproject/Projectenterbar"
import axios from 'axios';

function Myproject() {

  const [projects, setProjects] = useState([]);

  const ProjectCard = ({ project }) => {
    return (
      <>
      <Card sx={{ maxWidth: 350 }}>
        <CardActionArea>
          <CardContent>
            <CardMedia 
            component="img"
            height ="120"
            image= {image1}
            />
            <Typography gutterBottom variant="h5" component="div">
              프로젝트 이름: {project.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              프로젝트 아이디: {project._id}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <br/>
      </>
    );
  };

  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://hyeontae.shop/project');
        setProjects(response.data);
        console.log(response)
      } catch (error) {
        console.error('Error fetching projects', error);
      }
    };

    fetchProjects();
  }, []);


  return (
    <div className= "Myproject">
      <div className="fixed w-60 left-0"> < Sidebar /> </div>
      
      <div className="fixed right-0 w-96 h-screen bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] dark:bg-zinc-800">
        <Projectenterbar/>
      </div>
      
      <div className="ml-60 mt-16 mr-96 px-2 flex flex-wrap space-x-4" sx={{height:"calc(100vh-60px)"}}> 
        {projects.map(project => <ProjectCard key={project.id} project={project} />)}
      </div>
    </div>
  );
}

export default Myproject;