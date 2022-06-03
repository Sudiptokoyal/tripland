import React from 'react';
import ResponsiveAppBar from './ResponsiveAppBar';
import { Box } from '@mui/material';

function Layout(props) {
  return (
      <>
        <ResponsiveAppBar {...props} />
        <Box sx={{
          height: 'calc(100vh - 64px)',
          overflowY: 'auto',
          overflowX: 'hidden',
          maxWidth: '1536px',
          margin: 'auto'
        }}>
            {props.children}
        </Box>
      </>
  )
}

export default Layout;