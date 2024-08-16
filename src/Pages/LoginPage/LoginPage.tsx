import { Box, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

import { openModal, openLogin, openCreate } from '../../store/slices/modalWindSlice';

export default function LoginPage() {

    const dispatch = useDispatch();
    
    
    const loginForm = () => {
        dispatch(openLogin());
        dispatch(openModal());
    };
    const signUpForm = () => {
        dispatch(openCreate());
        dispatch(openModal());
    };
    
    return (
            <Box 
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',   
                        justifyContent: 'center',  
                        alignItems: 'center',      
                        height: '100vh',            
                        width: '100%',             
                        gap: 2,                   
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        Welcome to FoodBox
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 4 }}>
                        Please log in to access your account.
                    </Typography>
                    
                    <Button 
                        color="inherit" 
                        variant="contained"
                        sx={{ 
                            width: '200px',
                            marginBottom: 2,
                        }}
                        onClick={loginForm}
                    >
                        Login
                    </Button>
                    <Button 
                        color="inherit" 
                        variant="outlined"
                        sx={{ 
                            width: '200px',
                        }}
                        onClick={signUpForm}
                    >
                        Sign Up
                    </Button>
            </Box>
    )
}