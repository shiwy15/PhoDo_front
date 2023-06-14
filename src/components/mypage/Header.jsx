import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import PhoneIcon from '@mui/icons-material/Phone';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/ExitToApp';

export const Header = () => {
  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <img src="/name.png" alt="logo" className="h-10 w-auto" />

          <Link href="/mypage" color="inherit" sx={{ ml: 2 }}>
            Mypage
          </Link>
          <Link href="/myproject" color="inherit" sx={{ ml: 2 }}>
            My project
          </Link>
          <Link href="/myphodo" color="inherit" sx={{ ml: 2 }}>
            members
          </Link>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton sx={{ ml: 1 }}>
            <LogoutIcon />
          </IconButton>
          <IconButton sx={{ ml: 1 }}>
            <PhoneIcon />
          </IconButton>
          <Avatar variant="outlined" size="small" sx={{ ml: 1 }}>
            A
          </Avatar>
        </div>
      </Toolbar>
    </React.Fragment>
  )
}
export default Header;
