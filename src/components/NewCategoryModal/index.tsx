import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { FormContainer } from './style';

import { addDoc, collection, doc, getFirestore, setDoc } from 'firebase/firestore';

interface NewCategoryModalProps {
    isOpen: boolean;
    handleCloseModal: () => void;
}

export function NewCategoryModal({ isOpen, handleCloseModal }: NewCategoryModalProps) {

    const [title, setTitle] = useState('');

    async function handleNewCategory(event: FormEvent) {
        event.preventDefault();

        if(!title){
            console.log('Preencha a descrição!');
        }

       const db = getFirestore();
       const categoryRef = await addDoc(collection(db, 'categories'), {
           title
       });

       console.log(categoryRef.id);

       setTitle('');

       //cadastrado com sucesso       

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