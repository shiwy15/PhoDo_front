import React from 'react';

import { Box, Typography, TextField, MenuItem } from '@mui/material';


function Nodechangebar(){

    return (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ padding: '5px' }}> 
        <Box sx={{ width: '75%' }}>
            <MenuItem>
            <Typography variant="h6" sx={{ marginBottom: '10px' }}>
            🗂️ 노드 관리툴
            </Typography>
            </MenuItem>

            <Box sx = {{padding: '7px'}}>
            <TextField 
      id="outlined-basic" 
      label= "선택한 노드 이름"
      variant="outlined"
      color="secondary"
      fullWidth
      sx={{
        width: '100%', 
        height: '5%',// Adjust the width as needed
        '& .MuiInputLabel-root': {
          fontSize: '14px', // Adjust the font size as needed
        },
        '& .MuiOutlinedInput-input': {
        //   padding: '10px', // Adjust the input padding as needed
          fontSize: '14px', // Adjust the font size as needed
        },
      }}
    />
    </Box>
        </Box>
        </Box>

    )

}





export default Nodechangebar;