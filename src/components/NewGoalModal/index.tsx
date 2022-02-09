import { useState, useContext } from 'react';
import Modal from 'react-modal';
import { CategoriesContext } from '../../contexts/CategoriesContext';
import { FormContainer } from './style';

interface NewGoalModalProps {
    isOpen: boolean;
    handleCloseModal: () => void;
}

export function NewGoalModal({isOpen, handleCloseModal}: NewGoalModalProps) {    

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [deadline, setDeadline] = useState('');        

    const { categories }  = useContext(CategoriesContext);    
            
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleCloseModal} 
            overlayClassName='react-modal-basic'
            className='react-modal-basic-content'
        >
           
            <FormContainer>
                <p>Nova Meta</p>

                <input 
                    type="text" 
                    placeholder='Descrição'
                    value={title}
                    onChange={event => setTitle(event.target.value)} />

                <select name="category" placeholder='Categoria'>
                    { categories.map(cat => (
                        <option key={cat.id} value={cat.title}>{cat.title}</option>
                    )) }                
                </select>

                <div>
                    <span>Prazo</span>
                    <input 
                        type="date" 
                        placeholder='Prazo' 
                        value={deadline}
                        onChange={event => setDeadline(event.target.value)} />
                </div>

                <button type='submit'>Cadastrar</button>

            </FormContainer>

        </Modal>
    );
}