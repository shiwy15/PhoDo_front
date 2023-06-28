import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import PhoneIcon from '@mui/icons-material/Phone';
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/ExitToApp';

//Link용
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

//store 호출용
import { useUserStore } from '../store';
import {request} from '../../utils/axios-utils';


const Header = () => {
  const navigate = useNavigate();
  const userName = useUserStore(state => state.userName);


  const handleLogout = async () => {
    try {
      // Make a GET request to the logout endpoint
      const response = await request({
        url: '/logout',
        method: 'GET' // assuming your logout endpoint uses a GET request
      });

      // If the request was successful, navigate to '/'
      if (response.status === 200) {
        console.log('log out!')
        navigate('/');
      } else {
        console.log('Logout failed');
      }
    } catch (error) {
      console.log('Error during logout:', error);
    }
  };
  
  return (
    <div className='fixed top-0' style={{zIndex: 200}}>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', backgroundColor:'white', width: '100vw', height: '60px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <Link to="/Main">
          <img src="/name.png" alt="logo" className="h-12 w-auto" />
          </Link>
          <Link to="/mypage" color="inherit" className="ml-10 border-purple-700 border rounded px-3" style={{ fontSize: '22px', fontWeight: 'bold', borderRadius: '8px', borderWidth: '3px', backgroundColor: 'orange'}}>
            My page
          </Link>
          <Link to="/myproject" color="inherit" className="ml-4 border-purple-700 border rounded px-3" style={{ fontSize: '22px', fontWeight: 'bold', borderRadius: '8px', borderWidth: '3px', backgroundColor: 'orange'}}>
            My project
          </Link>
          {/* <Link href="/myphodo" color="inherit" sx={{ ml: 2 }}>
            members
          </Link> */}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className='text-2xl'>  환영합니다! {userName} 님</span>

          <IconButton sx={{ ml: 1 }} onClick={handleLogout}>
            <LogoutIcon/>
          </IconButton>
          {/* <Avatar variant="outlined" size="small" sx={{ ml: 1 }}>
            A
          </Avatar> */}
        </div>
      </Toolbar>
    </div>
  )
}
export default Header;
