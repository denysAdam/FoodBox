import { useState } from 'react';
import { Container, TextField, Button, Checkbox, FormControlLabel, Box, IconButton, InputAdornment, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './CreateAccount.css';
import { addUser } from '../../store/slices/createUserSlice';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';


export default function CreateAccount() {
    const [showPassword, setShowPassword] = useState(false);
    const [userName, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const dispatch: AppDispatch = useDispatch();
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    
    const isFormValid = userName && email && password && termsAccepted;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (isFormValid) {
            // Логика отправки данных на сервер или в redux
            dispatch(addUser({  userName, email, password,userAdress:'',deliveries: [] }));
            console.log("Account created:", {  userName, email, password,userAdress:'',deliveries: [] });
        } else {
            console.log("Form is not complete");
        }
    };

    return (
        <Container maxWidth="sm" className="create-account">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 4,
                    p: 2,
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: 'white'
                }}
            >
                <Typography variant="h5" component="h2" gutterBottom>
                    Create Account
                </Typography>
                <form className="create-form" noValidate onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        required
                        value={userName}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        id="email"
                        label="E-mail"
                        name="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        id="password"
                        label="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={toggleShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                id="terms"
                                name="terms"
                                color="primary"
                                required
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                            />
                        }
                        label="I agree to the Terms"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={!isFormValid} // Деактивация кнопки, если форма не валидна
                    >
                        Create account
                    </Button>
                </form>
            </Box>
        </Container>
    );
}
