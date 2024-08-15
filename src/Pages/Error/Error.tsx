import { Container, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
export default function Error() {
    return(
        <Container maxWidth="sm" sx={{ py: 8, height: '100vh' }}>
            <Box
                sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 8,
                p: 2,
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: 'white',
                }}
            >
                <Typography variant="h1" component="h1" gutterBottom color="error">
                404
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                Page Not Found
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                The page you are looking for does not exist.
                </Typography>
                <Button
                variant="contained"
                color="error"
                component={RouterLink}
                to="/"
                sx={{ mt: 3 }}
                >
                Go back to Home
                </Button>
            </Box>
        </Container>
    );
}