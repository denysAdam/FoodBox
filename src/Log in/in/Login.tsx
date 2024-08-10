
import { Container, TextField, Checkbox, FormControlLabel, Button, Box, } from '@mui/material';
import './Login.css';

export default function Login() {
    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 4,
                    p: 2,
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <form className="login-form" noValidate>
                    <TextField
                        fullWidth
                        margin="normal"
                        id="email"
                        label="E-mail"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        required
                    />
                    <span className="error-email"></span>
                    <TextField
                        fullWidth
                        margin="normal"
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                    />
                    <span className="error-password"></span>
                    <FormControlLabel
                        control={<Checkbox id="remember" name="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        onClick={(e) => { e.preventDefault(); }}
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Log in
                    </Button>
                </form>
            </Box>
        </Container>
    );
}
