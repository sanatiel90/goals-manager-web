import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { FormContainer } from './style';

import { useAuth } from './../../hooks/useAuth';

import { addDoc, collection, getFirestore } from 'firebase/firestore';

interface NewCategoryModalProps {
    isOpen: boolean;
    handleCloseModal: () => void;
}

export function NewCategoryModal({ isOpen, handleCloseModal }: NewCategoryModalProps) {

    const [title, setTitle] = useState('');
    const { user } = useAuth();

    async function handleNewCategory(event: FormEvent) {
        event.preventDefault();

        if(!title){
            console.log('Preencha a descrição!');
        }

        try {
            const db = getFirestore();
            await addDoc(collection(db, 'categories'), {
                title,
                userId: user?.id
            });            

            setTitle('');

            handleCloseModal();

        } catch (error) {
           console.log('Erro ao criar categoria');
        }
       
        console.log('Categoria criada com sucesso!');         

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

                <input 
                    type="text" 
                    placeholder='Descrição'  
                    value={title}
                    onChange={(event) => setTitle(event.target.value)} />
                
                <button type='submit'>Cadastrar</button>
            </FormContainer>

        </Modal>
    )
}