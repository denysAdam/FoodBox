import  { useCallback, useEffect, useRef, useState } from 'react';
import { CircularProgress, Container, TextField, Button, Typography, Box, Grid, FormControlLabel, FormGroup, Checkbox, FormControl, FormLabel } from '@mui/material';
import { fetchRecipes, Recipe } from '../../api/api';
import RecipeCards from '../../Cards/RecipeCards';
import fillters from '../../TextContent/Boxes/filters.json';
import './Boxes.css';

export default function Boxes() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [healthParam, setHealthParam] = useState<string[]>([]);
    const [cuisineTypeParam, setCuisineTypeParam] = useState<string[]>([]);
    const [activeFilters, setActiveFilters] = useState<'search' | 'health' | 'cuisineType'>('search');
    const queryRef = useRef<HTMLInputElement>(null);
    const app_id = '38094cba'; 
    const app_key = '8933deda9602d01b00245b1af645e833'; 

    
    
    const handleFetch = useCallback(async (query: string = '') => {
        setLoading(true);
    
        let url = `https://api.edamam.com/search?q=${query}&app_id=${app_id}&app_key=${app_key}`;
        
        if (healthParam.length > 0) {
            const health = healthParam.join(',');
            url += `&health=${health}`;
        }
        
        if (cuisineTypeParam.length > 0) {
            const cuisineType = cuisineTypeParam.join(',');
            url += `&cuisineType=${cuisineType}`;
        }
    
        const data = await fetchRecipes(url);
        if (data) {
            const fetchedRecipes = data.hits.map(hit => hit.recipe);
            setRecipes(fetchedRecipes);
        }
        setLoading(false);
    }, [healthParam, cuisineTypeParam]);

    useEffect(() => {
        // Выполняем запрос с дефолтными значениями при монтировании компонента
        handleFetch('chicken');
    }, [handleFetch]);

    const handleSearch = () => {
        const query = queryRef.current?.value || '';
        handleFetch(query);
    };

    const handleHealthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;

        if (checked) {
            setHealthParam([...healthParam, name]);
        } else {
            setHealthParam(healthParam.filter((filter) => filter !== name));
        }
    };
    
    const handleCuisineTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;

        if (checked) {
            setCuisineTypeParam([...cuisineTypeParam, name]);
        } else {
            setCuisineTypeParam(cuisineTypeParam.filter((filter) => filter !== name));
        }

    }

    
    
    return (
        <Container  maxWidth="lg" sx={{ mt: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#f5f5f5',
                        borderRadius: 2,
                        p: 2,
                        boxShadow: 3,
                    }}
                >
                    <Button
                        variant={activeFilters === 'search' ? 'contained' : 'outlined'}
                        onClick={() => setActiveFilters('search')}
                    >
                        Search
                    </Button>
                    <Button
                        variant={activeFilters === 'health' ? 'contained' : 'outlined'}
                        onClick={() => setActiveFilters('health')}
                    >
                        Health
                    </Button>
                    <Button
                        variant={activeFilters === 'cuisineType' ? 'contained' : 'outlined'}
                        onClick={() => setActiveFilters('cuisineType')}
                    >
                        Cuisine Type
                    </Button>
                </Box>
            </Box>

            {activeFilters === 'search' && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mt: 5,
                        backgroundColor: '#f5f5f5',
                        borderRadius: 2,
                        p: 2,
                        boxShadow: 3,
                    }}
                >
                    <TextField
                        inputRef={queryRef}
                        id="search"
                        label="Type one or more keywords"
                        variant="outlined"
                        sx={{ mr: 2, flex: 1 }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSearch}
                        sx={{ height: '100%' }}
                    >
                        Fetch
                    </Button>
                </Box>
            )}


            <Grid container spacing={4}  justifyContent="center">
                
                <Grid item xs={12} sm={8} md={9}>
                    {/* Health Filters start  */}
                    {activeFilters === 'health' && (
                        
                        <FormControl component="fieldset" sx={{ mb: 3 }}>
                            <FormLabel component="legend">Allergies</FormLabel>
                            <FormGroup row>
                                {fillters.health.map((filter) => (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name={filter}
                                                checked={healthParam.includes(filter)}
                                                onChange={handleHealthChange}
                                                color="primary"
                                            />
                                    }
                                    label={filter}
                                    key={filter}
                                />
                                ))}
                            </FormGroup>
                        </FormControl>)}
                        {/* Health Filters end */}
                        {/* Cuisine Type start  */}

                        { activeFilters === 'cuisineType' && <FormControl component="fieldset" sx={{ mb: 3 }}>
                        <FormLabel component="legend"> Cuisine Type</FormLabel>

                        <FormGroup row>
                            {fillters.cuisineType.map((filter) => (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name={filter}
                                            checked={cuisineTypeParam.includes(filter)}
                                            onChange={handleCuisineTypeChange}
                                            color="primary"
                                        />
                                    }
                                    label={filter}
                                    key={filter}
                                />
                            ))}
                            
                        </FormGroup>
                        </FormControl>}

                        {/* Cuisine Type end     */}

                        
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, height: '100vh' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        recipes.length > 0 ? (
                            
                            <Grid container  spacing={3} sx={{  mt: 4 }}>
                                
                                {recipes.map((recipe, index) => (
                                    <Grid item xs={12} sm={6} md={4}   key={index}>
                                        <RecipeCards {...recipe} />
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            <Typography variant="body1" sx={{ mt: 4, textAlign: 'center' }}>
                                Nothing matches your request
                            </Typography>
                        )
                    ) 
                    }
                </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}><Button variant='contained' sx={{ mt: 5 }}>More</Button></Box>
        </Container>
    );
}
