import { Header } from '../../components/Header';

import { Container, Content, IconButton, NoGoal, TableContainer } from './style';

import editIcon from './../../assets/images/edit-icon.svg';
import trashIcon from './../../assets/images/trash-icon.svg';
import { useModal } from '../../hooks/useModal';
import { NewGoalModal } from '../../components/NewGoalModal';

import { useState } from 'react';
import { useCategory } from '../../hooks/useCategory';
import { EditCategoryModal } from '../../components/EditCategoryModal';
import { ToastContainer } from 'react-toastify';
import { NewCategoryModal } from '../../components/NewCategoryModal';

interface CategoryType {
    id: string;
    title: string;
    userId: string;
}

export function CategoriesDetail(){    

    const { categories, deleteCategory, findCategory } = useCategory();    
    
    
    const { newGoalModal, newCategoryModal, editCategoryModal } = useModal() ;      
    const [categoryEdit, setCategoryEdit] = useState({} as CategoryType);    

    async function handleDeleteCategory(id: string) {
        if(window.confirm('Deseja realmente excluir essa categoria?')){
            await deleteCategory(id);
        }        
    }
    

    async function handleEditCategory(id: string){                        
        const category = await findCategory(id);                
        if(category){            
            setCategoryEdit(category);
            editCategoryModal.handleOpen();
        }
    }

    return(
        <Container>                        
            <Header />
            <Content>                                                                    
                    <TableContainer isVisible={categories.length > 0} >            
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ flex: 5 }}>Descrição</th>       
                                    <th style={{ flex: 1 }}>Ações</th>                             
                                </tr>
                            </thead>
                            <tbody>
                                { categories.map(category => (
                                    <tr key={category.id} > 
                                        <td style={{ flex: 5 }} ><span>{category.title}</span></td>                                                                                                                        
                                        <td style={{ flex: 1 }} >
                                            <IconButton onClick={() => handleEditCategory(category.id)}  actionType={'edit'} ><img src={editIcon} alt="Editar" /></IconButton>                                            
                                            <IconButton onClick={() => handleDeleteCategory(category.id)} actionType={'delete'} ><img src={trashIcon} alt="Deletar" /></IconButton>                                            
                                        </td>                                                                                                                                                
                                    </tr>   
                                 )) }
                            </tbody>
                        </table>     
                    </TableContainer>        

                    <ToastContainer />        
                               
                    <NoGoal isVisible={categories.length === 0}>
                        <h2>Você ainda não tem nenhuma categoria cadastrada! </h2>
                        <p onClick={newCategoryModal.handleOpen} >Cadastrar categoria</p>
                    </NoGoal> 

                <NewGoalModal
                    isOpen={newGoalModal.isOpen}
                    handleCloseModal={newGoalModal.handleClose}
                />   

                <NewCategoryModal
                    isOpen={newCategoryModal.isOpen}
                    handleCloseModal={newCategoryModal.handleClose}
                />  

                <EditCategoryModal
                    isOpen={editCategoryModal.isOpen}
                    handleCloseModal={editCategoryModal.handleClose}
                    category={categoryEdit}
                />
                                          
            </Content>
            
        </Container>       
    );
}

