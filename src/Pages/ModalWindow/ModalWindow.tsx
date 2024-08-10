import { useState } from 'react';
import Login from '../../Log in/in/Login';
import './ModalWindow.css';
import CreateAccount from '../../Log in/out/CreateAccount';
import { Modal, Box, Button } from '@mui/material';

export interface ModalState {
    call: boolean;
    onDestroy: () => void;
}

const ModalWindow: React.FC<ModalState> = ({ call, onDestroy }) => {
    const [logForm, setLogForm] = useState(false);

    if (!call) return null;

    const closeWnd = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target instanceof HTMLElement && event.target.className.includes('modal')) {
            onDestroy();
            setLogForm(false);
        }
    };

    return (
        <Modal open={call} onClose={onDestroy}>
            <Box 
                onClick={closeWnd}
                className="modal"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box 
                    className="modal-content"
                    sx={{
                        maxWidth: '500px',
                        width: '100%',
                        backgroundColor: 'aliceblue',
                        borderRadius: '15px',
                        padding: '1rem',
                        boxShadow: 24,
                    }}
                >
                    <Box className="btns" sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <Button
                            onClick={() => setLogForm(false)}
                            variant="contained"
                            color="primary"
                            className="accept"
                        >
                            Log in
                        </Button>
                        <Button
                            onClick={() => setLogForm(true)}
                            variant="contained"
                            color="secondary"
                            className="reject"
                        >
                            New account
                        </Button>
                    </Box>
                    <Box className="logForms" sx={{ marginTop: '1rem' }}>
                        {!logForm && <Login />}
                        {logForm && <CreateAccount />}
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default ModalWindow;
