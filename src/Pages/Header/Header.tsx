import { Link } from "react-router-dom";
import ModalWindow from "../ModalWindow/ModalWindow";
import { AppBar, Toolbar, Typography, Button, Box, List, ListItemText, Drawer, IconButton, ListItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {  logout } from "../../store/slices/loginSlice";
import { RootState } from "../../store/store";
import { openModal, closeModal } from '../../store/slices/modalWindSlice';
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';


export default function Header() {
    const modalWndState = useSelector((state: RootState) => state.modal.isOpen);
    const dispatch = useDispatch();
    const loginState = useSelector((state: RootState) => state.login.login);
    const [mobileResponse, setMobileResponse]= useState(false);

    const handleResize = () => {
        setMobileResponse(!mobileResponse);
    };
    const drawerBox = (
        <Box sx={{ width: 250 }} onClick={handleResize}>
            <List>
                <ListItem button component={Link} to="/">
                    <ListItemText primary="About us" />
                </ListItem>
                <ListItem button component={Link} to="/boxes">
                    <ListItemText primary="Manage boxes" />
                </ListItem>
                <ListItem button component={Link} to="/cart">
                    <ListItemText primary="Basket" />
                </ListItem>
                <ListItem button component={Link} to="/account">
                    <ListItemText primary="Account" />
                </ListItem>
                {loginState ? (
                    <ListItem button onClick={() => dispatch(logout())}>
                        <ListItemText primary="Log out" />
                    </ListItem>
                ) : (
                    <ListItem button onClick={() => dispatch(openModal())}>
                        <ListItemText primary="Log in" />
                    </ListItem>
                )}
            </List>
        </Box>
    )
    
    return (
        <>
            <AppBar position="fixed" sx={{ background: 'rgb(73, 100, 155)', gridArea: 'head', width: '100vw', zIndex: 10, borderBottom: '1px solid rgb(124, 123, 123)' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        FoodBox logo
                    </Typography>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                        <Button component={Link} to="/" color="inherit" sx={{ marginRight: '30px' }}>About us</Button>
                        <Button component={Link} to="/boxes" color="inherit" sx={{ marginRight: '30px' }}>Manage boxes</Button>
                        <Button component={Link} to="/cart" color="inherit" sx={{ marginRight: '30px' }}>Basket</Button>
                        <Button component={Link} to="/account" color="inherit" sx={{ marginRight: '30px' }}>Account</Button>
                        {loginState ? (
                            <Button onClick={() => dispatch(logout())} color="inherit" sx={{ marginRight: '30px', border: '2px solid rgb(236, 236, 236)', borderRadius: '20px' }}>Log out</Button>
                        ) : (
                            <Button onClick={() => dispatch(openModal())} color="inherit" sx={{ marginRight: '30px', border: '2px solid rgb(236, 236, 236)', borderRadius: '20px' }}>Log in</Button>
                        )}
                    </Box>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleResize}
                        sx={{ display: { md: 'none' } }}
                    >
                        <MenuIcon  />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Toolbar /> 
            <Drawer
                variant="temporary"
                open={mobileResponse}
                onClose={handleResize}
                ModalProps={{
                    keepMounted: true, 
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
                }}
            >
                {drawerBox}
            </Drawer>
            <ModalWindow call={modalWndState} onDestroy={() => dispatch(closeModal())} />
        </>
    )
}
