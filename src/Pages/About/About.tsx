
import { Link } from 'react-router-dom';
import content  from '../../TextContent/AboutText/aboutText.json';
import { Container, Typography, Grid, Card, CardContent, CardMedia,  Button, List, ListItem } from '@mui/material';
export default function About() {
    interface AboutFoodBoxText {
        aboutFoodBox: {
            title: string;
            description: string;
            howItWorks: {
                title: string;
                steps: string[];
            };
            benefits: {
                title: string;
                points: {
                    title: string;
                    description: string;
                }[];
            };
            whyChooseUs: {
                title: string;
                points: string[];
            };
        }
    } 
    const { aboutFoodBox }  = content as AboutFoodBoxText;
    return (
        <Container className='about' maxWidth="lg" sx={{ mt: 4, gridArea: 'main' }}>
            <Typography variant="h3" align="center">
                {aboutFoodBox.title}
            </Typography>

            <Typography variant="body1" align="center" mt={2} sx={{ fontSize: '1.2rem' }}>
                {aboutFoodBox.description}
            </Typography>

            {/* How it works section */}
            <Grid container mt={2}  spacing={4}>
                {aboutFoodBox.howItWorks.steps.map((step, index) => (
                    <Grid container item spacing={2} key={index} direction={index % 2 === 0 ? 'row' : 'row-reverse'}>
                        <Grid item xs={12} md={6}>
                            <CardMedia
                                component="img"
                                height="350"
                                image={`/Images/HowItWorks${index + 1}.jpg`}
                                alt={`Step ${index + 1}`}
                                sx={{  borderRadius: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} container alignItems="center">
                            <CardContent>
                                <Typography variant="h5" component="h3">
                                    Step {index + 1}
                                </Typography>
                                <Typography variant="body1">
                                    {step}
                                </Typography>
                                
                                <Button component={Link} to="/boxes" variant="contained" color="success" sx={{ mt: 2 }}>
                                    Get 60% off 1st box + 30% for next 2 boxes!
                                </Button>
                                
                                
                            </CardContent>
                        </Grid>
                    </Grid>
                ))}

            </Grid>

            {/* Benefits section */}

            <Typography variant="h4" align="center" mt={4}> {aboutFoodBox.benefits.title}</Typography>

            <Grid container mt={2}  spacing={4}>
                {aboutFoodBox.benefits.points.map((point, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h5" component="h4" align="center" mt={1} fontWeight={'bold'}>
                                    {point.title}
                                </Typography>
                                <Typography variant="h6" component="h3">
                                    {point.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            
            {/* whyChooseUs section */}

            <Typography variant="h4" align="center" mt={6}> {aboutFoodBox.whyChooseUs.title}</Typography>

            <List >
                {aboutFoodBox.whyChooseUs.points.map((point, index) => (
                    <ListItem sx={{ height: '100%' }} key={index}>
                        <Grid item xs={12} md={4} >
                        
                            <CardContent>
                                <Typography variant="h6" component="h3">
                                    {index + 1}. {point}
                                </Typography>
                            </CardContent>
                        
                        </Grid>
                    </ListItem>
                ))}
            </List>

        </Container> 
    )
}