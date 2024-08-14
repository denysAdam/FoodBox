import { Container, TextField, Checkbox, FormControlLabel, Button, Box, Typography } from '@mui/material';
import './Login.css';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { setEmail, setPassword, checkCredentialsAsync, resetForm} from "../../store/slices/loginLogicSlice";
import { login } from "../../store/slices/loginSlice";
import { closeModal } from "../../store/slices/modalWindSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useRef } from 'react';
import {  setUserByCredentials} from "../../store/slices/userLogicSlice";

export default function Login() {
    const dispatch: AppDispatch = useDispatch();
    const rememberMeRef = useRef<HTMLInputElement>(null); 
    const { email, password, isFormValid, errorMessage } = useSelector((state: RootState) => state.loginLogic);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setEmail(e.target.value));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPassword(e.target.value));
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Проверяем валидность формы перед проверкой учетных данных
        if (!isFormValid) {
            return;
        }
    
        try {
            // Проверяем учетные данные асинхронно
            const checkedCreden = checkCredentialsAsync({ email, password });
            const resultAction = await dispatch(checkedCreden);
            const result = unwrapResult(resultAction);
    
            // Обновляем состояние в зависимости от результата проверки
            if (result.valid) {
                if (rememberMeRef.current?.checked === false) {
                    dispatch(resetForm());
                }
                dispatch(setUserByCredentials({ email, password }));
                dispatch(login());
                dispatch(closeModal());
                
            } else {
                console.error(result.errorMessage);
            }

        } catch (error) {
            // Обработка ошибки, если запрос завершился с ошибкой
            console.error("Failed to login: ", error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 4,
                    p: 2,
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <form className="login-form" noValidate onSubmit={handleLogin}>
                    <TextField
                        fullWidth
                        margin="normal"
                        id="email"
                        label="E-mail"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        required
                        value={email}
                        onChange={handleEmailChange}
                    />
                    
                    <TextField
                        fullWidth
                        margin="normal"
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    
                    {errorMessage && (
                        <Typography color="error" variant="body2">
                            {errorMessage}
                        </Typography>
                    )}
                    <FormControlLabel
                        control={<Checkbox id="remember" name="remember" color="primary"  inputRef={rememberMeRef}/>}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={!isFormValid} // Кнопка отключена, если форма недействительна
                    >
                        Log in
                    </Button>
                </form>
            </Box>
        </Container>
    );
}
