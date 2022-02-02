import Modal from 'react-modal';

import { BoxUser } from './style';

interface BoxUserModalProps {
    isOpen: boolean;
    user?: {
        avatar: string;
        name: string;
    },
    handleLogout: () => void;
}

export function BoxUserModal({ isOpen, user, handleLogout }: BoxUserModalProps) {    
    return(
        
        <Modal isOpen={isOpen} >
            <BoxUser>
                    <img src={user?.avatar} alt="" /> 
                    <span>Olá, {user?.name}</span> 
                    <button onClick={handleLogout}> Sair</button>
              </BoxUser>  
        </Modal>
    )
}