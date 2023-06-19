import React from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

function GallerySearch() {
  return (
    <div className='SearchBox' style={{ display: 'flex', justifyContent: 'center' }}>
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <Button
              variant="contained"
              {...bindTrigger(popupState)}
              style={{ backgroundColor: 'black', color: 'white' }}
            >
              갤러리에서 검색
            </Button>
            <Menu {...bindMenu(popupState)}>
              <MenuItem onClick={popupState.close}>어떤 걸</MenuItem>
              <MenuItem onClick={popupState.close}>말했던~ 거니</MenuItem>
              <MenuItem onClick={popupState.close}>알려줘어</MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
    </div>
  )
}

export default GallerySearch