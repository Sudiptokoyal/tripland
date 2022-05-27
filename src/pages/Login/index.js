import React from 'react';
// import { useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import FamilyImage from '../../assets/img/family8.svg';
import TravelImage from '../../assets/img/transport-scene-5.svg';
import Link from '@mui/material/Link';

/*
const loginStyles = {
    familyImg: {
        height: "50%",
        width: "75%"
    },
    brandTitle: {
        fontSize: '50px',
        fontWeight: '600',
        lineHeight: 1,
        marginBottom: 0,
        paddingRight: "2rem",
        textAlign: 'left'
    }
} */



const quotes = [
    "Traveling – it leaves you speechless, then turns you into a storyteller",
    "The world is a book and those who do not travel read only one page."
]

const Login = () => {
    const [isLogin, setIsLogin] = React.useState(true);
    // const history = useHistory();

    const submitHandler = () => {
        // route to home or landing page
        // history.push('/')
    }

    return (
        <Box sx={{ flexGrow: 1, p: 5, 
            backgroundImage: `url(${TravelImage})`,
            height: '100%',
            backgroundPosition: 'left',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat'
        }}
            >
            <Grid 
            container 
            spacing={2} 
            direction="row"
            justifyContent="center"
            alignItems="center"
            height="100%"
            >
                <Grid item xs={6} md={7}>
                    {/* <Box>
                        <h1 style={loginStyles.brandTitle}>{isLogin ? quotes[0] : quotes[1]}</h1>
                        <img src={loginStyles.FamilyImage} alt="Family" style={familyImg} />
                    </Box> */}
                </Grid>
                <Grid item xs={6} md={5}>
                    <Box className='glass-card' sx={{m: 1}}>
                        <h1>{isLogin ? 'Welcome back' : 'Register to explore'} </h1>
                        <Box
                            component="form"
                            sx={{
                                display: 'flex',
                                p: 3,
                                justifyContent: 'center',
                                flexDirection: 'column',
                                '& > :not(style)': { my: 1, width: '100%' },
                            }}
                            noValidate
                            autoComplete="off"
                            >
                            <TextField id="username" label="Username" variant="filled" />
                            <TextField id="password" label="Password" type="password" variant="filled" />
                            <Button variant="contained" size="large" sx={{py: 2}} onClick={submitHandler}>{isLogin ? 'Login' : 'Register'}</Button>
                        </Box>
                        {isLogin && <p>Not registered yet? <Link>Register</Link> here!!</p>}
                        {!isLogin && <p>Already signin? <Link>Login</Link> here!!</p>}
                    </Box>
                    <small>{isLogin ? quotes[0] : quotes[1]}</small>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Login;