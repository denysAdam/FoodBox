import  { useState } from 'react';
import { Container, TextField, Button, Checkbox, FormControlLabel, Box, IconButton, InputAdornment, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './CreateAccount.css';

export default function CreateAccount() {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
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
                <form className="create-form" noValidate>
                    <TextField
                        fullWidth
                        margin="normal"
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        required
                    />
                    <span className="error-username"></span>
                    <TextField
                        fullWidth
                        margin="normal"
                        id="email"
                        label="E-mail"
                        name="email"
                        autoComplete="email"
                        required
                    />
                    <span className="error-email"></span>
                    <TextField
                        fullWidth
                        margin="normal"
                        id="password"
                        label="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        required
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
                    <span className="error-password"></span>
                    <FormControlLabel
                        control={<Checkbox id="terms" name="terms" color="primary" required />}
                        label="I agree to the Terms"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={(e) => { e.preventDefault(); }}
                    >
                        Create account
                    </Button>
                </form>
            </Box>
        </Container>
    );
}
