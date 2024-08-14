import  { useCallback, useEffect, useRef, useState } from 'react';
import { CircularProgress, Container, TextField, Button, Typography, Box, Grid, FormControlLabel, FormGroup, Checkbox, FormControl, FormLabel } from '@mui/material';
import { fetchRecipes} from '../../api/api';
import RecipeCards from '../../Cards/RecipeCards';
import fillters from '../../TextContent/Boxes/filters.json';
import './Boxes.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { addRecipes, setRecipes } from '../../store/slices/recipeSlice';
import {setActiveFilter } from '../../store/slices/activeFiltersSlice';
import LoginPage from '../LoginPage/LoginPage';

export default function Boxes() {
    const [loading, setLoading] = useState<boolean>(false);
    const [healthParam, setHealthParam] = useState<string[]>([]);
    const [cuisineTypeParam, setCuisineTypeParam] = useState<string[]>([]);
    const [, setPage] = useState<number>(1);
    const containerRef = useRef<HTMLDivElement>(null);
    const queryRef = useRef<HTMLInputElement>(null);
    const app_id = '38094cba'; 
    const app_key = '8933deda9602d01b00245b1af645e833'; 
    const loginState = useSelector((state: RootState) => state.login.login);
    const recipes = useSelector((state: RootState) => state.recipes.recipes);
    const activeFilter = useSelector((state: RootState) => state.activeFilters.activeFilter);
    const dispatch = useDispatch();

    
    
    const handleFetch = useCallback(async (query: string = '', page: number = 1) => {
        setLoading(true);
        const from = (page - 1) * 21;
        const to = page * 21;
    
        let url = `https://api.edamam.com/search?q=${query}&app_id=${app_id}&app_key=${app_key}&from=${from}&to=${to}`;
        
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
            if (page === 1) {
                dispatch(setRecipes(fetchedRecipes));  
            } else {
                dispatch(addRecipes(fetchedRecipes)); 
            }
        }
        setLoading(false);
        if (containerRef.current) {
            containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [healthParam, cuisineTypeParam, dispatch]);

    useEffect(() => {
        handleFetch('chicken', 1);
    }, [handleFetch]);

    const handleSearch = () => {
        const query = queryRef.current?.value || '';
        setPage(1);
        handleFetch(query, 1);
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

    const handleMore = () => {
        setPage(prevPage => {
            const nextPage = prevPage + 1;
            handleFetch(queryRef.current?.value || '', nextPage);
            return nextPage;
        });
    }
    
    
    return (
        <Container >
            {loginState ?(
                <Container  maxWidth="lg" sx={{ mt: 5 }} ref={containerRef}>
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
                            variant={activeFilter === 'search' ? 'contained' : 'outlined'}
                            onClick={() => dispatch(setActiveFilter('search'))}
                            
                        >
                            Search
                        </Button>
                        <Button
                            variant={activeFilter === 'health' ? 'contained' : 'outlined'}
                            onClick={() => dispatch(setActiveFilter('health'))}
                        >
                            Health
                        </Button>
                        <Button
                            variant={activeFilter === 'cuisineType' ? 'contained' : 'outlined'}
                            onClick={() => dispatch(setActiveFilter('cuisineType'))}
                        >
                            Cuisine
                        </Button>
                    </Box>
                </Box>

                {activeFilter === 'search' && (
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
                            onKeyDown={(e) => {if (e.key === 'Enter') handleSearch()}}
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
                        {activeFilter === 'health' && (
                            
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

                            { activeFilter === 'cuisineType' && <FormControl component="fieldset" sx={{ mb: 3 }}>
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
                                        <Grid item xs={12} sm={6} md={4}   key={index} >
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
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}><Button onClick={handleMore} variant='contained' sx={{ mt: 5 }}>More</Button></Box>
            </Container>
            ):(
                <LoginPage></LoginPage>
            )}
            
        </Container>
    );
}
