import { Link } from "react-router-dom";

import ModalWindow from "../ModalWindow/ModalWindow";

import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {  logout } from "../../store/slices/loginSlice";
import { RootState } from "../../store/store";
import { openModal, closeModal } from '../../store/slices/modalWindSlice';

export default function Header() {
    const modalWndState = useSelector((state: RootState) => state.modal.isOpen);
    const dispatch = useDispatch();
    const loginState = useSelector((state: RootState) => state.login.login);


    return (
        <>
            <AppBar position="fixed" sx={{ background: 'rgb(73, 100, 155)', gridArea: 'head', width: '100vw', zIndex: 10, borderBottom: '1px solid rgb(124, 123, 123)' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        FoodBox logo
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                </Toolbar>
            </AppBar>
            <Toolbar /> 
            <ModalWindow call={modalWndState} onDestroy={() => dispatch(closeModal())} />
        </>
    )
}
