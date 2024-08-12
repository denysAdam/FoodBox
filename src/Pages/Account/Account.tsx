import  { useState } from 'react';
import { Box, Typography, Grid, TextField, Button, Checkbox } from '@mui/material';
import { useDispatch, useSelector  } from 'react-redux';
import { RootState } from '../../store/store';
import {completeDelivery,removeDelivery} from '../../store/slices/deliverySlice';
export default function Account() {
    // Состояния для редактирования данных пользователя
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('john.doe@example.com');
    const [address, setAddress] = useState('1234 Elm Street, Apt 101, Springfield, IL');
    const [phone, setPhone] = useState('(555) 123-4567');

    const dispatch = useDispatch();
    const deliveries = useSelector((state: RootState) => state.delivery.delivery);
    const upcomingDeliveries = deliveries.filter(item => !item.status);
    const handleSave = () => {
        // Логика для сохранения данных
        console.log('Saved:', { name, email, address, phone });
    };

    const handleCompleteDelivery = (id: string) => {
        dispatch(completeDelivery(id));
        dispatch(removeDelivery(id));  // Удаляем доставку после завершения
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
                            Deliveries
                        </Typography>
                        <Typography variant="body1">
                            {upcomingDeliveries.length} upcoming deliveries
                        </Typography>
                        <Typography variant="body1">
                        {deliveries.map((delivery, index) => (
                                <Grid container key={index} alignItems="center" spacing={2}>
                                    <Grid item xs={9}>
                                        <Typography variant="body1">
                                            Order #{delivery.id.split('-')[0]} - Expected delivery: {delivery.date}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Checkbox
                                            checked={delivery.status}
                                            onChange={() => handleCompleteDelivery(delivery.id)}
                                            color="primary"
                                            inputProps={{ 'aria-label': 'Mark delivery as complete' }}
                                        />
                                    </Grid>
                                </Grid>
                        ))}
                        </Typography>
                    </Box>

                </Grid>
            </Grid>
        </Box>
    );
}
