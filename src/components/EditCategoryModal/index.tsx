import { useState, FormEvent, useEffect } from 'react';
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import { FormContainer, InputForm } from './style';
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

            if(errorTitle) {
                setErrorTitle(false);
            }            

        } catch (error) {
            toast.error("Erro ao atualizar Categoria", {
                position: 'top-center',
                autoClose: 2000
            })            
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

