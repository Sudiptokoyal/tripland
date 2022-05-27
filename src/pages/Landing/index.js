import React from 'react'
import { Box, Button, TextField } from '@mui/material';
import TransportImage from '../../assets/img/transport-scene-4.svg';
import Grid from '@mui/material/Grid';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


const header = {
  backgroundImage: `url(${TransportImage})`,
  height: '40vh',
  width: '100%',
  margin: '1rem 0',
  backgroundPosition: 'left',
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
  position: 'relative'
}

function index() {

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Box className='glass-card' sx={{width: '80%'}}>
          <Grid 
            container 
            spacing={2} 
            direction="row"
            justifyContent="center"
            alignItems="center"
            >
              <Grid item xs={6} md={8}>
                <img src={TransportImage} alt="hero" style={{width: '60%'}} />
              </Grid>
              <Grid item xs={6} md={4}>
                <h3>All you need is TRIPLAND</h3>
                <h1>Explore Beautiful Places </h1>
              </Grid>
          </Grid>
          <Box
              component="form"
              sx={{
                  display: 'flex',
                  px: 3,
                  '& > :not(style)': { m: 1, width: '100%' },
              }}
              noValidate
              autoComplete="off"
              >
              <TextField id="form" label="Form" variant="filled" />
              <TextField id="to" label="To" variant="filled" />
              {/* <DateTimePicker
                label="Depart"
                renderInput={(params) => <TextField {...params} />}
              />
              <DateTimePicker
                label="Return"
                renderInput={(params) => <TextField {...params} />}
              /> */}

              <TextField id="depart" label="Depart" variant="filled" type="datetime-local" />
              <TextField id="return" label="Return" variant="filled" type="datetime-local"  />
              <Button variant="contained" size="large" sx={{py: 1}}>Search</Button>
          </Box>
      </Box>
    </Box>
  )
}

export default index;