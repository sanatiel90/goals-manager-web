import { useState, useContext, FormEvent } from 'react';
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import { CategoriesContext } from '../../contexts/CategoriesContext';
import { useGoal } from '../../hooks/useGoal';
import { FormContainer, InputForm, SpanError } from './style';

interface NewGoalModalProps {
    isOpen: boolean;
    handleCloseModal: () => void;
}

export function NewGoalModal({isOpen, handleCloseModal}: NewGoalModalProps) {    

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [deadline, setDeadline] = useState('');    
    const [errorTitle, setErrorTitle] = useState(false);
    const [errorDeadline, setErrorDeadline] = useState(false);    
    const [errorDeadlineWrong, setErrorDeadlineWrong] = useState(false);

    const { categories }  = useContext(CategoriesContext);    
    const { createNewGoal } = useGoal();

    async function handleNewGoal(event: FormEvent){
        event.preventDefault();                

        if(!title){
            setErrorTitle(true);
        }

        if(!deadline){
            setErrorDeadline(true);                     
        }
      
        if(!title || !deadline) {            
            return;
        }
                
        /*if(new Date(deadline).getTime() < new Date().getTime()){
            setErrorDeadline(true);    
            setErrorDeadlineWrong(true);   
            return;
        }       */

        const goalInput = {
            title,
            category,
            deadline
        }

        try {
            await createNewGoal(goalInput);        

            handleCloseModal();    

            setTitle('');
            setCategory('');
            setDeadline('');

            toast.success("Meta criada com sucesso!", {
                position: 'top-center',
                autoClose: 2000
            })

            alert('Meta criada com sucesso!');

            if(errorTitle) {
                setErrorTitle(false);
            }

            if(errorDeadline) {
                setErrorDeadline(false);
            }

            if(errorDeadlineWrong) {
                setErrorDeadlineWrong(false);
            }

        } catch (error) {
            toast.error("Erro ao criar meta", {
                position: 'top-center',
                autoClose: 2000
            })
            alert('Erro ao criar meta');
        }        
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

                <InputForm     
                    errorInput={errorTitle}                
                    type="text" 
                    placeholder='Descrição'
                    value={title}
                    onChange={event => setTitle(event.target.value)} />

                <div>
                    <span>Categoria</span>
                    <select value={category} onChange={event => setCategory(event.target.value)} placeholder='Categoria'>
                            <option key="" value="">-</option>
                        { categories.map(cat => (
                            <option key={cat.id} value={cat.title}>{cat.title}</option>
                        )) }                
                    </select>
                </div>        

                <div>
                    <span>Prazo</span>
                    { errorDeadlineWrong && <SpanError>Prazo não pode ser anterior ou igual à data atual</SpanError> } 
                    <InputForm                         
                        errorInput={errorDeadline}
                        type="date" 
                        placeholder='Prazo'                         
                        value={deadline}
                        onChange={event => setDeadline(event.target.value)} />
                </div>

                <button type='submit'>Cadastrar</button>

            </FormContainer>
            <ToastContainer />            
        </Modal>
        
    );
}

