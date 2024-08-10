import  { useState } from 'react';
import { Box, Typography, Grid, TextField, Button } from '@mui/material';

export default function Account() {
    // Состояния для редактирования данных пользователя
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('john.doe@example.com');
    const [address, setAddress] = useState('1234 Elm Street, Apt 101, Springfield, IL');
    const [phone, setPhone] = useState('(555) 123-4567');

    const handleSave = () => {
        // Логика для сохранения данных
        console.log('Saved:', { name, email, address, phone });
    };

    return (
        <Box  sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Account Information
            </Typography>
            <Grid container spacing={4}>
                {/* Account Data*/}
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            p: 3,
                            border: '1px solid',
                            borderColor: 'grey.300',
                            borderRadius: 2,
                            backgroundColor: 'background.paper',
                            boxShadow: 3,
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Your Details
                        </Typography>
                        <TextField
                            fullWidth
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Address"
                            variant="outlined"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Phone"
                            variant="outlined"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Save
                        </Button>
                    </Box>
                </Grid>

                {/* Deliveries */}
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            p: 3,
                            border: '1px solid',
                            borderColor: 'grey.300',
                            borderRadius: 2,
                            backgroundColor: 'background.paper',
                            boxShadow: 3,
                            mb: 4,
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Upcoming Deliveries
                        </Typography>
                        <Typography variant="body1">
                            Order #12345 - Expected delivery: August 15, 2024
                        </Typography>
                        <Typography variant="body1">
                            Order #12346 - Expected delivery: August 20, 2024
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            p: 3,
                            border: '1px solid',
                            borderColor: 'grey.300',
                            borderRadius: 2,
                            backgroundColor: 'background.paper',
                            boxShadow: 3,
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Past Deliveries
                        </Typography>
                        <Typography variant="body1">
                            Order #12343 - Delivered: August 1, 2024
                        </Typography>
                        <Typography variant="body1">
                            Order #12344 - Delivered: July 28, 2024
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
