
import { Recipe } from '../api/api'

import { Card, CardContent, CardMedia, Typography, Link, Box, Grid, Button } from '@mui/material';

export default function Cards({ label, image, url, calories, totalNutrients, }:Recipe) {
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
                <Button sx={{ ml: 4 }} variant="contained" color="primary">
                    Add
                </Button>
            </CardContent>
        </Card>
    );
}