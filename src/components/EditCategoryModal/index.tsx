import { useState, useContext, FormEvent, useEffect } from 'react';
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import { CategoriesContext } from '../../contexts/CategoriesContext';
import { useGoal } from '../../hooks/useGoal';
import { FormContainer, InputForm, SpanError, RadioBoxButton } from './style';
import imgCheck from './../../assets/images/check-circle.svg';
import { useCategory } from '../../hooks/useCategory';


interface CategoryType {
    id: string;
    title: string;
    userId: string;
}


interface EditCategoryModalProps {
    isOpen: boolean;
    handleCloseModal: () => void;
    category: CategoryType
}

export function EditCategoryModal({isOpen, handleCloseModal, category}: EditCategoryModalProps) {    

    const [title, setTitle] = useState('');
    
        

    useEffect(() => {
        setTitle(category.title);        
    }, [category.title]);

    const [errorTitle, setErrorTitle] = useState(false);
    
    const { updateCategory } = useCategory();

    async function handleUpdateCategory(event: FormEvent){
        event.preventDefault();        

        if(!title){
            setErrorTitle(true);
        }
      
        if(!title) {            
            return;
        }        

        const categoryInput = {            
            id: category.id,
            title,
            userId: category.userId,            
        }

        try {
            await updateCategory(categoryInput);        

            handleCloseModal();    

            setTitle('');
            
            toast.success("Categoria atualizada com sucesso!", {
                position: 'top-center',
                autoClose: 2000
            })

            alert('Categoria atualizada com sucesso!')

            if(errorTitle) {
                setErrorTitle(false);
            }            

        } catch (error) {
            toast.error("Erro ao atualizar Categoria", {
                position: 'top-center',
                autoClose: 2000
            })

            alert('Erro ao atualizar Categoria');
        }        
    }
    
            
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleCloseModal} 
            overlayClassName='react-modal-basic'
            className='react-modal-basic-content'
        >
           
            <FormContainer onSubmit={handleUpdateCategory}>
                <p>Editar Meta</p>

                <InputForm     
                    errorInput={errorTitle}                
                    type="text" 
                    placeholder='Descrição'
                    value={title}
                    onChange={event => setTitle(event.target.value)} />

                    

                <button type='submit'>Atualizar</button>

            </FormContainer>
            <ToastContainer />            
        </Modal>
        
    );
}

