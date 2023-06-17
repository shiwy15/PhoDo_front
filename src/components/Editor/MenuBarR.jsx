import * as React from 'react';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const MenuBar =() =>{
    return(
    <div>
        <Paper sx={{width:'60px', position: 'fixed', top: '63px',right: 0, height: '100vh', borderRadius:0, justifyContent: 'center', backgroundColor:'#D951DB' }}>
            <MenuList>
                <MenuItem>
                <ListItemIcon>
                    <Typography variant="inherit">Tool</Typography>
                </ListItemIcon>
                </MenuItem>
                <Divider variant="middle" sx={{ padding:'8px', borderColor: 'rgba(0,0,0,0.3)' }} />
                <MenuItem>
                <ListItemIcon>
                    <p>icon</p>
                </ListItemIcon>
                </MenuItem>
                <MenuItem>
                <ListItemIcon>
                    <p>icon</p>
                </ListItemIcon>

                </MenuItem>
            </MenuList>
        </Paper>
    </div>
)
}

export default MenuBar;
