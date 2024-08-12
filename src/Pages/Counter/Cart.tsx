
import { Box, Button, Typography, Grid, Divider } from '@mui/material';
import { useDispatch , useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { clearBasket} from '../../store/slices/basketSlice';
import {addDelivery} from '../../store/slices/deliverySlice';
import CartCards from './CartCards';
import { v4 as uuidv4 } from 'uuid';

export default function Cart() {
   
    const dispatch = useDispatch();
    const basket = useSelector((state: RootState) => state.basket.basket);
    const clearBas = () => {
        dispatch(clearBasket());
    }
    const handlePlaceOrder = () => {
        const newDelivery = createNewDelivery();
        console.log('New delivery:', newDelivery);
        dispatch(addDelivery(newDelivery));
        dispatch(clearBasket());       
        console.log('Order placed:', basket);
    };
    const createNewDelivery = () => {
        const labels = basket.map(item => item.label);
        const date = new Date().toISOString().split('T')[0];

        const newDelivery = {
            id: uuidv4(), 
            status: false,
            items: labels, 
            date, 
        };
        return newDelivery;
    };


    return (
        <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '100vh', 
                p: 3 
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 600,
                    p: 3,
                    border: '1px solid',
                    borderColor: 'grey.300',
                    borderRadius: 2,
                    backgroundColor: 'background.paper',
                    boxShadow: 3,
                    textAlign: 'center',
                }}
            >
                {basket.length === 0 ? (
                    <Typography variant="h6" gutterBottom>
                        Your cart is currently empty.
                    </Typography>
                ) : (
                    <>
                        <Typography variant="h5" gutterBottom>
                            Your Orders
                        </Typography>
                        <Grid container spacing={2}>
                            {basket.map((order, index) => (
                                <Grid item xs={12} display="flex" justifyContent="center" alignItems="center" key={index}>
                                    <CartCards {...order}/>
                                </Grid>
                            ))}
                        </Grid>
                        <Button 
                            variant="contained"
                            color="primary"
                            onClick={clearBas}
                            sx={{ mt: 3 }} > Clear Basket</Button>
                        <Divider sx={{ my: 3 }} />
                        
                        <Typography variant="h6">
                            Total: ${basket.length * 5}
                        </Typography>
                    </>
                )}
            </Box>
            {basket.length > 0 && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePlaceOrder}
                    sx={{ mt: 3 }}
                >
                    Place Order
                </Button>
            )}
        </Box>
    );
}
