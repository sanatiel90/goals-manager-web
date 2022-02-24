import { useState, useContext, FormEvent, useEffect } from 'react';
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import { CategoriesContext } from '../../contexts/CategoriesContext';
import { useGoal } from '../../hooks/useGoal';
import { FormContainer, InputForm, SpanError, RadioBoxButton } from './style';
import imgCheck from './../../assets/images/check-circle.svg';

interface GoalType {
    id: string;
    title: string;
    category: string;
    deadline: string;
    status: string;
    userId: string;
    createdAt: string;
}


interface EditGoalModalProps {
    isOpen: boolean;
    handleCloseModal: () => void;
    goal: GoalType
}

export function EditGoalModal({isOpen, handleCloseModal, goal}: EditGoalModalProps) {    

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [deadline, setDeadline] = useState('');        
    const [status, setStatus] = useState('');        

    useEffect(() => {
        setTitle(goal.title);
        setCategory(goal.category);
        setDeadline(goal.deadline);
        setStatus(goal.status)
    }, [goal.title, goal.category, goal.deadline, goal.status]);

    const [errorTitle, setErrorTitle] = useState(false);
    const [errorDeadline, setErrorDeadline] = useState(false);    
    const [errorDeadlineWrong, setErrorDeadlineWrong] = useState(false);

    const { categories }  = useContext(CategoriesContext);    
    const { updateGoal } = useGoal();

    async function handleUpdateGoal(event: FormEvent){
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

        if(new Date(deadline).getTime() < new Date().getTime()){
            setErrorDeadline(true);    
            setErrorDeadlineWrong(true);   
            return;
        }

        const goalInput = {            
            id: goal.id,
            title,
            category,
            deadline,
            status,
            userId: goal.userId,
            createdAt: goal.createdAt
        }

        try {
            await updateGoal(goalInput);        

            handleCloseModal();    

            setTitle('');
            setCategory('');
            setDeadline('');

            toast.success("Meta atualizada com sucesso!", {
                position: 'top-center',
                autoClose: 2000
            })            

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
            toast.error("Erro ao atualizar meta", {
                position: 'top-center',
                autoClose: 2000
            })            
        }        
    }

    function handleChangeStatus(){
        status !== 'finished' ? setStatus('finished') : setStatus(goal.status);
    }


            
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleCloseModal} 
            overlayClassName='react-modal-basic'
            className='react-modal-basic-content'
        >
           
            <FormContainer onSubmit={handleUpdateGoal}>
                <p>Editar Meta</p>

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
                
                <RadioBoxButton
                    type='button'                    
                    onClick={handleChangeStatus}
                    isChecked={ status === 'finished' }
                >
                    <img src={imgCheck} alt="Check" />
                    <span>Marcar como concluída</span>
                </RadioBoxButton>

                <button type='submit'>Atualizar</button>

            </FormContainer>
            <ToastContainer />            
        </Modal>
        
    );
}

