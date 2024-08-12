import { BasketItem } from "../../store/slices/basketSlice";
import { useDispatch  } from 'react-redux';

import { deleteFromBasket } from "../../store/slices/basketSlice";
import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
export default function CartCards({label, image}: BasketItem) {
    const dispatch = useDispatch();
    
    const handleDelete = () => {
        dispatch(deleteFromBasket( label ));
    }
    return (
        <Card sx={{ maxWidth: 345, m: 2 }}> 
            <CardMedia
                component="img"
                height="140"
                image={image}
                alt={label}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {label}
                </Typography>
                <Button 
                    variant="contained"
                    color="primary"
                    onClick={handleDelete}
                    sx={{ mt: 3 }} > Delete</Button>
            </CardContent>
        </Card>
    )
}
