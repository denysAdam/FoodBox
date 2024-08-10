import  { useState } from 'react';
import { Box, Button, Typography, Grid, Divider } from '@mui/material';

export default function Cart() {
    const [orders, setOrders] = useState([]); // Вначале корзина пустая

    const handlePlaceOrder = () => {
        // Логика для обработки заказа
        console.log('Order placed:', orders);
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
                {orders.length === 0 ? (
                    <Typography variant="h6" gutterBottom>
                        Your cart is currently empty.
                    </Typography>
                ) : (
                    <>
                        <Typography variant="h5" gutterBottom>
                            Your Orders
                        </Typography>
                        <Grid container spacing={2}>
                            {orders.map((order, index) => (
                                <Grid item xs={12} key={index}>
                                    {/* <Typography variant="body1">
                                        {order.name} - {order.quantity} items - ${order.totalPrice}
                                    </Typography> */}
                                </Grid>
                            ))}
                        </Grid>
                        <Divider sx={{ my: 3 }} />
                        {/* <Typography variant="h6">
                            Total: ${orders.reduce((sum, order) => sum + order.totalPrice, 0)}
                        </Typography> */}
                    </>
                )}
            </Box>
            {orders.length > 0 && (
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
