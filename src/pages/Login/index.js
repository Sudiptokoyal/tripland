import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TravelImage from '../../assets/img/transport-scene-5.svg';
// import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, Link } from 'react-router-dom';
import { auth, addDoc, collection, db } from '../../firebase';
import Alert from '@mui/material/Alert';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { setUser, getUserDetails } from '../../store/actions';
import { connect } from "react-redux";



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
];

const initFormState = {
    value: { name: '', username: '', password: '' },
    error: { username: '', password: '' }
}

const Login = (props) => {
    const [isLogin, setIsLogin] = React.useState(true);
    const [userForm, setUserForm] = React.useState(initFormState)
    const history = useHistory();
    const [loading, setLoading] = React.useState(false);
    const location = useLocation();
    const [showAlert, setShowAlert] = React.useState(false);
    // const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if(location.pathname.includes('login')) setIsLogin(true);
        else setIsLogin(false);
        setShowAlert(false);
        setLoading(false);
    }, [location.pathname]);

    const logInWithEmailAndPassword = (email, password) => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then(res => {
                if(res?.user?.accessToken) {
                    localStorage.setItem('token', res?.user?.accessToken);
                    localStorage.setItem('user', JSON.stringify(res?.user?.providerData[0]));
                    props.setUser({ ...res?.user?.providerData[0], isLoggedIn: true });

                    props.getUserDetails(res.user.uid);
                    // route to home or landing page
                    history.push('/')
                    setLoading(false);
                }
            })
            .catch(err => {
                console.error(err);
                setShowAlert(true);
                setLoading(false);
            });
    }

    const registerWithEmailAndPassword = async (name, email, password) => {        
        setLoading(true);
        try {
          const res = await createUserWithEmailAndPassword(auth, email, password);
          const user = res.user;
          localStorage.setItem('token', user?.accessToken);
          localStorage.setItem('user', JSON.stringify(user?.providerData[0]));
          props.setUser({ ...user?.providerData[0], isLoggedIn: true });
          props.getUserDetails(res.user.uid);

          await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
          });
          // route to home or landing page
          history.push('/')
          setLoading(false);
        } catch (err) {
          console.error(err);
          setShowAlert(true);
          setLoading(false);
        }
      };

    const submitHandler = () => {
        const { username: email, password, name } = userForm.value;
        if(!email) { // Email Validation
            setUserForm((prevState) => (
                {...prevState, 
                    error: {...prevState.error, username: 'This field is required.'}}));
            return;
        }
        if(!password) { // Password validation
            setUserForm((prevState) => (
                {...prevState, 
                    error: {...prevState.error, password: 'This field is required.'}}));
            return;
        } else if ( password.length < 6) {
            setUserForm((prevState) => (
                {...prevState, 
                    error: {...prevState.error, password: 'Minimum 6 characters long required.'}}));
            return;
        }

        if(!isLogin) {
            if (!name) { // Name validation
                setUserForm((prevState) => (
                    {...prevState, 
                        error: {...prevState.error, name: 'This field is required.'}}));
                return;
            } else if (name.length < 3) {
                setUserForm((prevState) => (
                    {...prevState, 
                        error: {...prevState.error, name: 'Minimum 3 characters long required.'}}));
                return;
            }
        }

        if(email && password) {
            if (isLogin) logInWithEmailAndPassword(email, password);
            if (!isLogin && name) registerWithEmailAndPassword(name, email, password)
        }  
    }

    const inputHandler = (e) => {
        setUserForm((prevState) => {
            return {...prevState, value: { ...prevState.value, [e.target.name]: e.target.value } }
        });
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
                        {showAlert && <Alert severity="error">Failed to {isLogin ? 'Login' : 'Sign up'}!</Alert>}
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
                            {!isLogin && <TextField 
                                error={!!userForm.error.name}
                                helperText={userForm.error.name}
                                id="name" 
                                name="name"
                                type="text"
                                placeholder='your name'
                                label="Fullname" 
                                variant="filled" 
                                value={userForm.value.name}
                                onChange={inputHandler} />}
                            <TextField 
                                error={!!userForm.error.username}
                                helperText={userForm.error.username}
                                id="username" 
                                name="username"
                                type="email"
                                placeholder='your@mail.com'
                                label="Email" 
                                variant="filled" 
                                value={userForm.value.username}
                                onChange={inputHandler} />
                            <TextField 
                                error={!!userForm.error.password}
                                helperText={userForm.error.password}
                                id="password" 
                                label="Password" 
                                name="password"
                                type="password" 
                                variant="filled" 
                                value={userForm.value.password}
                                onChange={inputHandler}
                                 />
                            <Button variant="contained" size="large" sx={{py: 2}} onClick={submitHandler}>{
                                loading ? <CircularProgress /> : 
                                isLogin ? 'Login' : 'Register'}
                            </Button>
                        </Box>
                        {isLogin && <p>Not registered yet? <Link to="/signup">Register</Link> here!!</p>}
                        {!isLogin && <p>Already signin? <Link to="/login">Login</Link> here!!</p>}
                    </Box>
                    <small>{isLogin ? quotes[0] : quotes[1]}</small>
                </Grid>
            </Grid>
        </Box>
    )
}

const matchDispatchToProps = (dispatch) => {
    return {
        setUser: (data) => dispatch(setUser(data)),
        getUserDetails: (uid) => dispatch(getUserDetails(uid))
    }
}

export default connect(null, matchDispatchToProps)(Login);
