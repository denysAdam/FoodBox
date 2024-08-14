
import Login from '../../Log in/in/Login';
import './ModalWindow.css';
import CreateAccount from '../../Log in/out/CreateAccount';
import { Modal, Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { openLogin, openCreate, closeModal } from '../../store/slices/modalWindSlice';
import { RootState } from '../../store/store';
export interface ModalState {
    call: boolean;
    onDestroy: () => void;
}

const ModalWindow: React.FC<ModalState> = ({ call, onDestroy }) => {
    

    const dispatch = useDispatch();
    const modalWndStatePage = useSelector((state: RootState) => state.modal.formType);


    if (!call) return null;

    const closeWnd = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target instanceof HTMLElement && event.target.className.includes('modal')) {
            onDestroy();
            dispatch(closeModal());
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
                            onClick={() => dispatch(openLogin())}
                            variant="contained"
                            color="primary"
                            className="accept"
                        >
                            Log in
                        </Button>
                        <Button
                            onClick={() => dispatch(openCreate())}
                            variant="contained"
                            color="secondary"
                            className="reject"
                        >
                            New account
                        </Button>
                    </Box>
                    <Box className="logForms" sx={{ marginTop: '1rem' }}>
                        {modalWndStatePage === 'login' && <Login />}
                        {modalWndStatePage === 'signup'  && <CreateAccount />}
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default ModalWindow;
