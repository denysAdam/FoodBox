
import { Box, Typography, Link, Container, Grid } from '@mui/material';
import './Footer.css';

export default function Footer() {
    return (
        <Box 
            component="footer" 
            sx={{ 
                py: 3, 
                px: 2, 
                mt: 'auto', 
                gridArea: 'footer',
                borderTop:`1px solid gray`,
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Footer Title
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Some description or additional text can go here.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Links
                        </Typography>
                        <Link href="#" color="inherit" underline="none">
                            Link 1
                        </Link><br/>
                        <Link href="#" color="inherit" underline="none">
                            Link 2
                        </Link><br/>
                        <Link href="#" color="inherit" underline="none">
                            Link 3
                        </Link><br/>
                        <Link href="#" color="inherit" underline="none">
                            Link 4
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Social Media
                        </Typography>
                        <Link href="#" color="inherit" underline="none">
                            Facebook
                        </Link><br/>
                        <Link href="#" color="inherit" underline="none">
                            Twitter
                        </Link><br/>
                        <Link href="#" color="inherit" underline="none">
                            Instagram
                        </Link><br/>
                        <Link href="#" color="inherit" underline="none">
                            LinkedIn
                        </Link>
                    </Grid>
                </Grid>
                <Box mt={5}>
                    <Typography variant="body2" color="text.secondary" align="center">
                        {'© '}
                        <Link color="inherit" href="#">
                            Your Website
                        </Link>{' '}
                        {new Date().getFullYear()}
                        {'. All rights reserved.'}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
