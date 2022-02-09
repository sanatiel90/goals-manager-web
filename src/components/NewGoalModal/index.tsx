import Modal from 'react-modal';
import { FormContainer } from './style';

interface NewGoalModalProps {
    isOpen: boolean;
    handleCloseModal: () => void;
}

export function NewGoalModal({isOpen, handleCloseModal}: NewGoalModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleCloseModal} 
            overlayClassName='react-modal-basic'
            className='react-modal-basic-content'
        >

            <FormContainer>
                <p>Nova Meta</p>

                <input type="text" placeholder='Descrição' />

                <select name="category" id=""  placeholder='Categoria'>
                    <option value="">Lazer</option>
                    <option value="">Estudos</option>
                </select>

                <div>
                    <span>Prazo</span>
                    <input type="date" placeholder='Prazo' />
                </div>

                <button type='submit'>Cadastrar</button>

            </FormContainer>

        </Modal>
    );
}