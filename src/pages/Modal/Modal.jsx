import React, { useState, useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {request} from '../../utils/axios-utils'
import { useNavigate } from 'react-router-dom';


const postProject = (data) => {
    return request({url: 'project', method: 'POST', data })
  }

export const Modal = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(true);
    const [projectName, setProjectName] = useState("");
    const [projectId, setProjectId] = useState(null);

    
    const handleProjectNameChange = (event) => {
        setProjectName(event.target.value);
    };

    const handleSend = async () => {
        try {
          const response = await postProject({name: projectName});
          console.log(response);
          const id = response.data.id;
          setProjectId(id);
          console.log(`Project created with ID: ${id}`);
          navigate(`/newproject/${id}`);
        } catch (error) {
          console.error(error);
        }
      };
    

    return (
        <Dialog
            open={showModal}
            onClose={() => setShowModal(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"새 프로젝트 이름을 써주세요! 👨🏻‍💼"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    새 프로젝트 이름
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Project Name"
                    type="text"
                    fullWidth
                    value={projectName}
                    onChange={handleProjectNameChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setShowModal(false)} color="primary">
                    Cancel
                </Button>
                <Button 
                onClick={handleSend}
                 color="primary" autoFocus>
                    Send
                </Button>
            </DialogActions>
        </Dialog>
    );
}