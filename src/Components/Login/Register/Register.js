import React from 'react';
import { Box, Button, TextField, Grid, Avatar, Divider, Chip, Fab, Typography, Stack, IconButton } from '@mui/material';
import { useForm } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import LockIcon from '@material-ui/icons/Lock';
import { AccountCircle, PhotoCamera } from '@material-ui/icons';
import Avatar_img from '../Login/img/undraw_profile_pic_ic5t.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import Tooltip from '@mui/material/Tooltip';
import useAuth from '../../../Hooks/useAuth';
import NavigationBar from '../../Shared/NavigationBar/NavigationBar';
import { styled } from '@mui/material/styles';
import uploadImage from '../../../Hooks/useImgUpload';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },

    loginContainer: {
        backgroundImage: ` linear-gradient(#005593,#0fBccf)`,
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    LoginButton: {
        backgroundImage: `linear-gradient(to right,#00bccf, #005593)`
    },
    fromContainer: {
        boxShadow: '1px 2px 5px 1px  #ffff',
        backgroundColor: 'white',
        height: 550,
        width: 340,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px'
    },
    paper: {
        height: 300,
        width: 300,
    },
    abater: {
        height: '100px !important',
        width: '100px !important',
        margin: '-180px 0 0px 100px',
        boxShadow: '1px -5px 30px #ffff'

    },



}));
const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, signInWithGoogle } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [userPhoto, setUserPhoto] = React.useState('');

    const onSubmit = data => {
        registerUser(data.email, data.password, data.name, userPhoto, location, navigate)
    };

    const handleImgUpload = img => {
        uploadImage(img)
            .then(res => {
                setUserPhoto(res.data.data.url);
            })
    }

    const Input = styled('input')({
        display: 'none',
    });

    const classes = useStyles();
    return (
        <>
            <NavigationBar />
            <Box className={classes.loginContainer}>
                <Box >

                    <Grid container className={classes.root}>
                        <Grid item xs={12}>
                            <Grid container justifyContent="center">
                                <Grid className={classes.fromContainer}>
                                    <Box className={classes.paper}>
                                        <Avatar
                                            className={classes.abater}
                                            src={Avatar_img}

                                        />
                                        <Typography variant='h6'>Register</Typography>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <TextField
                                                size='small'
                                                type='name'
                                                placeholder='Your Full Name'
                                                className={classes.textField}
                                                label={<span><AccountCircle />Your Full Name</span>}
                                                width={1}
                                                sx={{
                                                    width: 1,

                                                }}
                                                {...register("name",
                                                    { required: true })} />

                                            {errors.name && <span style={{ color: 'red' }}>This field is required</span>}
                                            <br />
                                            <br />
                                            <TextField
                                                size='small'
                                                type='email'
                                                placeholder='Email'
                                                className={classes.textField}
                                                label={<span><AccountCircle /> Email</span>}
                                                width={1}
                                                sx={{
                                                    width: 1,

                                                }}
                                                {...register("email",
                                                    { required: true })} />

                                            {errors.email && <span style={{ color: 'red' }}>This field is required</span>}
                                            <br />
                                            <br />
                                            <TextField
                                                size='small'
                                                type='password'
                                                placeholder='Password'
                                                className={classes.textField}
                                                label={<span><LockIcon />Password</span>}
                                                sx={{ width: 1 }}
                                                {...register("password",
                                                    { required: true })} />

                                            {errors.password && <span style={{ color: 'red' }}>This field is required</span>}
                                            <br />

                                            <Stack>
                                                <label htmlFor="icon-button-file">
                                                    <Input
                                                        onChange={e => handleImgUpload(e.target.files[0])}
                                                        accept="image/png, image/jpg, image/jpeg"
                                                        id="icon-button-file" type="file" />
                                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                                        <PhotoCamera />
                                                    </IconButton>
                                                    Image
                                                </label>
                                            </Stack>



                                            <Button type="Login"
                                                variant="contained"
                                                className={classes.LoginButton}
                                                sx={{ display: 'block', width: 1 }}
                                            >Login</Button>
                                        </form>
                                        <br />
                                        <Divider>
                                            <Chip label="or" />
                                        </Divider>
                                        <br />
                                        <Box sx={{ display: 'flex', justifyContent: ' space-around' }}>
                                            <Tooltip title="Google" arrow>
                                                <Fab onClick={() => signInWithGoogle(location, navigate)}
                                                    sx={{ width: 1 }}
                                                    variant="extended" size="small" color="primary" aria-label="add">
                                                    <GoogleIcon sx={{ mr: 1 }} />
                                                    Google sing in
                                                </Fab>
                                            </Tooltip>
                                        </Box>
                                        <br />
                                        <Divider><Chip label="🙃" /></Divider>
                                        <Box textAlign='center'> <span>All Ready Register? Please </span>
                                            <Link to='/login'
                                                style={{
                                                    textDecoration: 'none',
                                                    color: '#005593',
                                                    fontWeight: 'bold'
                                                }}
                                            ><Button>Login now</Button></Link>
                                        </Box>

                                    </Box>
                                </Grid>

                            </Grid>
                        </Grid>

                    </Grid>
                </Box>
            </Box>
        </>
    );
};



export default Register;