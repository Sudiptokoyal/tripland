import React, { useEffect, useState } from 'react'
import { Box, Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { connect } from "react-redux";
import { setFlights, setAirports } from '../../store/actions';

import TransportImage from '../../assets/img/transport-scene-4.svg';


const header = {
  backgroundImage: `url(${TransportImage})`,
  height: '30vh',
  width: '100%',
  margin: '1rem 0',
  backgroundPosition: 'left', 
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
  position: 'relative'
}

const initData = {
  value: {  
    from: '',
    to: '',
    depart: new Date(),
    return: null,
  },
  error: {
    from: '',
    depart: '',
    return: '',
    to: ''
  }
}

const Landing = (props) => {
  const [form, setForm] = useState(initData);
  const [searchedFlights, setSearchedFlights] = useState([]);



  useEffect(() => {
    // Get all India major airports
    props.loadAirports();
    props.loadAllFlights();
  }, []);

  const handleChange = (name, value) => {
    setForm((prevState) => {
      return {...prevState, value: {...prevState.value, [name]: value}}
    });
  }

  const searchHandler = () => {
    console.log(form.value)
  }

  return (
    <Box>
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
                  <img src={TransportImage} alt="hero" style={{width: '50%'}} />
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
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={props.airports}
                    sx={{ width: 300 }}
                    onChange={(event, newValue) => {
                      handleChange('from', newValue?.city_name);
                    }}
                    error={!!form.error.to}
                    renderInput={(params) => (
                      <TextField 
                        {...params} 
                        error={!!form.error.from}
                        helperText={form.error.from}
                        id="form" 
                        label="Form" />)}
                  />
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={props.airports}
                    sx={{ width: 300 }}   
                    onChange={(event, newValue) => {
                      handleChange('to', newValue?.city_name);
                    }}
                    renderInput={(params) => (
                      <TextField 
                        {...params} 
                        error={!!form.error.to}
                        helperText={form.error.to}
                        id="to" 
                        label="To" />)}
                  />
                  <DesktopDatePicker
                    label="Depart Date" 
                    inputFormat="MM/dd/yyyy"
                    value={form.value.depart} 
                    onChange={(value) => handleChange('depart', value)}
                    renderInput={(params) => <TextField name="depart" {...params} />}
                  />
                  <DesktopDatePicker
                    label="Return Date" 
                    inputFormat="MM/dd/yyyy"
                    value={form.value.return} 
                    onChange={(value) => handleChange('return', value)}
                    renderInput={(params) => <TextField name="return" {...params} />}
                  />
                <Button variant="contained" size="large" sx={{py: 1}} onClick={searchHandler}>Search</Button>
            </Box>
        </Box>
      </Box>

      {searchedFlights.length && <Box>
          <Grid 
            container 
            spacing={2} 
            direction="row"
            justifyContent="center"
            alignItems="center"
            >
              <Grid item xs={6} md={8}>
                <h1>Flights from  to   </h1>

              </Grid>
              <Grid item xs={6} md={4}>
                <h3>All you need is TRIPLAND</h3>
                <h1>Explore Beautiful Places </h1>
              </Grid>
          </Grid>
      </Box>}
    </Box>
  )
}

const mapStateToProps = (state) => {
  return { 
    airports: state.airport.airports, 
    flights: state.flight.flights 
  }
}

const matchDispatchToProps = (dispatch) => {
  return {
    loadAirports: () => dispatch(setAirports()),
    loadAllFlights: () => dispatch(setFlights())
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(Landing);