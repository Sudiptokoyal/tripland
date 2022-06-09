import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { format } from 'date-fns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { connect } from "react-redux";
import { setFlights, setAirports } from '../../store/actions';

import TransportImage from '../../assets/img/transport-scene-4.svg';
import { useHistory } from 'react-router-dom';
import { doc, db, updateDoc, } from '../../firebase';


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
  const history = useHistory();



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
    if(!form.value.from || !form.value.to) {
      // Set error
      setForm((prevState) => ({...prevState, 
        error: {...prevState.error, from: 'This field is required.', to: 'This field is required.' }}));
    } else {
      // Reset error
      
      setForm((prevState) => ({...prevState, 
        error: {...prevState.error, from: '', to: '' }}));


      setTimeout(() => {
        const {from, to} = form.value;
        const flights = props.flights.filter(e => e.arrivalPlace.includes(to.toLowerCase()) && e.departurePlace.includes(from.toLowerCase()))
        setSearchedFlights(flights || []);
        console.log(flights, to, from)
      }, 2000)
    }
  }

  const bookHandler = (flightData) => {
    if(!props.user.isLoggedIn) {
      history.push('/login?returnUrl=/')
    }
    
    const {uid: id} = props.user;
    const userDocRef = doc(db, 'users', id)
    console.log(userDocRef)
    updateDoc(userDocRef, { flights: flightData})
      .then((res) => {
        console.log(res)
      }).catch(err => console.log);
  }

  return (
    <Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Box className='glass-card' sx={{width: '85%'}}>
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
                    px: '1.5%',
                    flexWrap: 'wrap',
                    '& > :not(style)': { m: '0.5%', width: '24%' },
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
                        id="from" 
                        label="from" />)}
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
            </Box>
            <Button variant="contained" size="large" sx={{py: 2, width: '15rem', mb: -3.5, mt: 2}} onClick={searchHandler}>Search</Button>
        </Box>
      </Box>

      <Box sx={{my: 6, width: '85%', mx: 'auto'}}>
          <Grid 
            container 
            spacing={2} 
            direction="row"
            justifyContent="center"
            alignItems="center"
            >
              <Grid item xs={6} md={8}>
                {!!searchedFlights.length && <Box sx={{ p: 1}} className="glass-card">
                  <h2>Flights from {form.value.from}  to  {form.value.to} </h2>
                  <List>
                    {searchedFlights.map(e => (
                      <ListItem disablePadding 
                      secondaryAction={
                        <Button variant="contained" onClick={bookHandler}>
                          Book  ₹{e.price}
                        </Button>

                      }>
                        <ListItemButton>
                          <ListItemIcon>
                            <Avatar src="https://promos.makemytrip.com/notification/xhdpi//116X116-Indigo-2512022.jpg" alt="Indigo flight" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={e.airline.toUpperCase()}
                            secondary={`${e.departurePlace}, ${format(new Date(e.departureDate), 'HH:mm')} => ${e.arrivalPlace}, ${format(new Date(e.arrivaleDate), 'HH:mm')}`} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>}
              </Grid>
              <Grid item xs={6} md={4}>
                <Box sx={{ p: 1}} className="glass-card">
                  <h3>Special Offers</h3>
                  <List>
                    {[1,2].map(e => (
                    <ListItem disablePadding key={e}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Avatar src="https://promos.makemytrip.com/notification/xhdpi//116X116-Taj-Generic-14022022.jpg" alt="tag hotel" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Save Up to 25%* on Your Booking @ Taj Hotels"
                          secondary="& enjoy memorable stays." />
                      </ListItemButton>
                    </ListItem>
                    ))}
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <Avatar src="https://promos.makemytrip.com/notification/xhdpi//116X116-Indigo-2512022.jpg" alt="Indigo flight" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="IndiGo’s Flight Sale is LIVE NOW!"
                          secondary="Book tickets starting @ JUST Rs. 1,299!" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Box>
              </Grid>
          </Grid>
      </Box>
    </Box>
  )
}

const mapStateToProps = (state) => {
  return { 
    airports: state.airport.airports, 
    flights: state.flight.flights,
    user: state.user
  }
}

const matchDispatchToProps = (dispatch) => {
  return {
    loadAirports: () => dispatch(setAirports()),
    loadAllFlights: () => dispatch(setFlights())
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(Landing);