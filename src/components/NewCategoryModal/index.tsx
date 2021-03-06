import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { FormContainer, InputForm } from './style';
import { useAuth } from './../../hooks/useAuth';

import 'react-toastify/dist/ReactToastify.css';

import { addDoc, collection, getFirestore } from 'firebase/firestore';

import React from 'react';
import { toast, ToastContainer } from 'react-toastify';

interface NewCategoryModalProps {
    isOpen: boolean;
    handleCloseModal: () => void;
}

export function NewCategoryModal({ isOpen, handleCloseModal }: NewCategoryModalProps) {

    const [title, setTitle] = useState('');
    const [errorTitle, setErrorTitle] = useState(false);
    const { user } = useAuth();

    async function handleNewCategory(event: FormEvent) {
        event.preventDefault();

        if(!title){
            setErrorTitle(true);
            return;
        }

        try {
            const db = getFirestore();
            await addDoc(collection(db, 'categories'), {
                title,
                userId: user?.id
            });            

            setTitle('');           
            
            toast.success("Categoria criada com sucesso!", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000              
            });
            
            //alert('Categoria criada com sucesso!');

            if(errorTitle) {
                setErrorTitle(false);
            }
        
            handleCloseModal();

        } catch (error) {           
            toast.error("Erro ao criar categoria", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000              
            });
            //alert('Erro ao criar categoria');
        }               
    }


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleCloseModal}
            overlayClassName='react-modal-basic'
            className='react-modal-basic-content'
        >
            <FormContainer onSubmit={handleNewCategory} >
                <p>Nova Categoria</p>

                <InputForm 
                    errorTitle={errorTitle}                    
                    type="text" 
                    placeholder='Descri????o'  
                    value={title}
                    onChange={(event) => setTitle(event.target.value)} />
                
                <button type='submit'>Cadastrar</button>
            </FormContainer>
            <ToastContainer />     
        </Modal>
    )
}