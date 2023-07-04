import * as React from 'react';
// import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import '../../../src/index.css'

const MainFeaturedPost = () => {
  const post = {
    title: 'Photo 업무를 함께 DO!',
    description: '서로 어떻게 공유하느냐가 업무 효율을 좌우합니다.\n동료들에게 일일이 묻고 물어 저 멀리 자료를 찾아 떠나던 과거는 이제 안녕!',
    description2: 'PhoDo는 효율이 중요한 당신을 위한 사진 중심 협업 사이트입니다.',
    linkText: 'Project 만들기',
  };

  return (
    <Box
      sx={{
        position: 'relative',
        color: '#ffffff',
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'transparent',
      }}
    >
      <Box>
        // eslint-disable-next-line 
        <Box sx={{marginBottom: '10px', marginTop: '80px'}}>
          <Typography variant="IBM Plex Sans KR" color="black" gutterBottom sx={{ fontSize: '90px', fontWeight: 'bold'}}>
          <span style={{ color: '#8F44AD' }}>Photo</span> 업무를 함께 DO!
          </Typography>
        </Box>
        {/* <Typography variant="IBM Plex Sans KR" color="black" paragraph sx={{ fontSize: '40px', fontWeight: 'bold' }}>
          {post.description.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </Typography> */}
        <Typography variant="IBM Plex Sans KR" color="black" gutterBottom sx={{ fontSize: '40px', fontWeight: 'bold' }}>
        서로 어떻게 공유하느냐가 업무 효율을 좌우합니다.<br />
        동료들에게 일일이 묻고 물어 저 멀리 자료를 찾아 떠나던 과거는 이제 안녕!<br />
        PhoDo는 효율이 중요한 당신을 위한 <span style={{ color: '#FF9300'}}>사진 중심 협업 사이트</span>입니다.
        </Typography>
        // eslint-disable-next-line 
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '40px'}}>
          <Button variant="IBM Plex Sans KR" href="/modal" sx={{ border: '4px solid black', 'marginRight':'25px', color: 'white', fontSize: '30px', fontWeight: 'bold', bgcolor: '#8F44AD', borderColor: 'black', borderRadius: '10px' }}>
            {post.linkText}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MainFeaturedPost;
