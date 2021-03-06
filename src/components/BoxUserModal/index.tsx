import Modal from 'react-modal';

import { BoxUser } from './style';

Modal.setAppElement('#root');

interface BoxUserModalProps {
    isOpen: boolean;
    user?: {
        avatar: string;
        name: string;
    },
    handleLogout: () => void;
    handleCloseModal: () => void;
}

export function BoxUserModal({ isOpen, user, handleLogout, handleCloseModal }: BoxUserModalProps) {    
    return(
        
        <Modal 
            isOpen={isOpen} 
            onRequestClose={handleCloseModal}
            overlayClassName='react-modal-box-user'
            className='react-modal-content'
            >
            <BoxUser>
                    <img src={user?.avatar} alt="" /> 
                    <span>Olá, {user?.name}</span> 
                    <button onClick={handleLogout}> Sair</button>
              </BoxUser>  
        </Modal>
    )
}