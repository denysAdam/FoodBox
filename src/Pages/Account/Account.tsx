import { useEffect, useState } from 'react';
import { Box, Typography, Grid, TextField, Button, Checkbox, Container, InputAdornment, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { completeDelivery, removeDelivery } from '../../store/slices/deliverySlice';
import { updateUserDetails } from '../../store/slices/userLogicSlice';
import LoginPage from '../LoginPage/LoginPage';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function Account() {
    // Управляемое состояние для отображения пароля
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const dispatch = useDispatch();
    const loginState = useSelector((state: RootState) => state.login.login);
    const currentUser = useSelector((state: RootState) => state.userLogic.currentUser);
    const currentUserId = useSelector((state: RootState) => state.userLogic.currentUserId);
    const deliveries = useSelector((state: RootState) => state.delivery.delivery);
    const upcomingDeliveries = deliveries.filter(delivery => delivery.idUser === currentUserId).filter(item => !item.status);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        if (currentUser) {
            setName(currentUser.name);
            setEmail(currentUser.email);
            setPassword(currentUser.password);
            setAddress(currentUser.address);
            setPhone(currentUser.phone);
        }
    }, [currentUser]);

    const handleSave = () => {
        if (currentUser) {
            dispatch(updateUserDetails({
                name,
                email,
                password,
                address,
                phone,
            }));
            console.log('Saved:', { name, email, password, address, phone });
        }
    };

    const handleCompleteDelivery = (id: string) => {
        dispatch(completeDelivery(id));
        dispatch(removeDelivery(id));  // Удаляем доставку после завершения
    };

    return (
        <Container>
            {loginState ? (
                <Box sx={{ flexGrow: 1, p: 3 }}>
                    <Typography variant="h4" gutterBottom>
                        Account Information
                    </Typography>
                    <Grid container spacing={4}>
                        {/* Account Data */}
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
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    variant="outlined"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    sx={{ mb: 2 }}
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
                                
                                {deliveries
                                    .filter(delivery => delivery.idUser === currentUserId)
                                    .map((delivery, index) => (
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
                                    ))
                                }
                                
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            ) : (
                <LoginPage />
            )}
        </Container>
    );
}
