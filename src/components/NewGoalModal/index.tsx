import { useState, useContext, FormEvent } from 'react';
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import { CategoriesContext } from '../../contexts/CategoriesContext';
import { useGoal } from '../../hooks/useGoal';
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
    const { createNewGoal } = useGoal();

    async function handleNewGoal(event: FormEvent){
        event.preventDefault();
        const goalInput = {
            title,
            category,
            deadline
        }
        

        await createNewGoal(goalInput);        

        showToast();

        handleCloseModal();
    }

    function showToast() {
        return toast('Meta cadastrada com sucesso!');
    }
            
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleCloseModal} 
            overlayClassName='react-modal-basic'
            className='react-modal-basic-content'
        >
           
            <FormContainer onSubmit={handleNewGoal}>
                <p>Nova Meta</p>

                <input 
                    type="text" 
                    placeholder='Descrição'
                    value={title}
                    onChange={event => setTitle(event.target.value)} />

                <select value={category} onChange={event => setCategory(event.target.value)} placeholder='Categoria'>
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