
import { Recipe } from '../api/api'

import { Card, CardContent, CardMedia, Typography, Link, Box, Grid, Button } from '@mui/material';
import { useDispatch, useSelector  } from 'react-redux';
import { addToBasket } from '../store/slices/basketSlice';
import { RootState } from '../store/store';


   
  export default function Cards({ label, image, url, calories, totalNutrients, }:Recipe) {
    const dispatch = useDispatch();
    const basket = useSelector((state: RootState) => state.basket.basket);
    const handleAddItem = () => {
        if ( basket.length<5) {
            const item = { label, image }; 
            dispatch(addToBasket(item));
        }
        
    };
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

                {/* Секция информации о питательных веществах */}
                <Box sx={{ mt: 2, mb: 3 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant="h6" color="primary">
                                {Math.round(calories)} kcal
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" color="text.secondary">
                                PROTEIN: {totalNutrients.PROCNT?.quantity.toFixed(1)} g
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" color="text.secondary">
                                FAT: {totalNutrients.FAT?.quantity.toFixed(1)} g
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" color="text.secondary">
                                CARB: {totalNutrients.CHOCDF?.quantity.toFixed(1)} g
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>

                <Link href={url} target="_blank" rel="noopener" variant="body2">
                    View Recipe
                </Link>
                <Button sx={{ ml: 4 }} variant="contained" color="primary"
                    onClick={handleAddItem}>
                    
                    Add
                </Button>
            </CardContent>
        </Card>
    );
}