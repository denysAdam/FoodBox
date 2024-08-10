import { Link } from "react-router-dom";

import ModalWindow from "../ModalWindow/ModalWindow";
import { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

export default function Header() {
    const [modalState, setModalState] = useState(false);
    const [loginState, setLoginState] = useState(false);

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
                            <Button onClick={() => setLoginState(false)} color="inherit" sx={{ marginRight: '30px', border: '2px solid rgb(236, 236, 236)', borderRadius: '20px' }}>Log out</Button>
                        ) : (
                            <Button onClick={() => setModalState(true)} color="inherit" sx={{ marginRight: '30px', border: '2px solid rgb(236, 236, 236)', borderRadius: '20px' }}>Log in</Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            <Toolbar /> 
            <ModalWindow call={modalState} onDestroy={() => setModalState(false)} />
        </>
    )
}
