import { Header } from '../../components/Header';

import { Container, Content, ActionsMenu, StatusBadge, IconButton, NoGoal, FilterOptions, TableContainer } from './style';

import editIcon from './../../assets/images/edit-icon.svg';
import trashIcon from './../../assets/images/trash-icon.svg';
import { useGoal } from '../../hooks/useGoal';
import { useModal } from '../../hooks/useModal';
import { NewGoalModal } from '../../components/NewGoalModal';

import { status } from '../../shared/status';
import { EditGoalModal } from '../../components/EditGoalModal';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { collection, getFirestore, onSnapshot, orderBy, OrderByDirection, query, where } from 'firebase/firestore';
import { useCategory } from '../../hooks/useCategory';
import { EditCategoryModal } from '../../components/EditCategoryModal';

interface GoalType {
    id: string;
    title: string;
    category: string;
    deadline: string;
    status: string;
    userId: string;
    createdAt: string;
}

interface CategoryType {
    id: string;
    title: string;
    userId: string;
}

export function CategoriesDetail(){
    const { user } = useAuth();

    const { categories, deleteCategory, findCategory } = useCategory();

    const [goals, setGoals] = useState<GoalType[]>([]);
    
    const { deleteGoal, findGoal } = useGoal();   
    const { newGoalModal, editGoalModal, newCategoryModal, editCategoryModal } = useModal() ;      
    const [categoryEdit, setCategoryEdit] = useState({} as CategoryType);

    /*useEffect(() => {
        if(user) {
            let goalsFirebase: GoalType[] = []; //array aux
            const goalsRef = collection(getFirestore(), 'goals'); //pega a ref
            
            const statusChecked = [];
            finishedGoalsFilter && statusChecked.push('finished');
            lateGoalsFilter && statusChecked.push('late');
            openGoalsFilter && statusChecked.push('open');   
            
            let orderDirection: OrderByDirection = 'asc';
            if(orderClause === 'status') {
                orderDirection = 'desc';
            } 

            const queryGoals = query(goalsRef, 
                                        where('userId', '==', user.id),                                                                                
                                        where('status', 'in', statusChecked),
                                        orderBy(orderClause, orderDirection)                                                                                                      
                                    ); //monta query

            //pega os dados em tempo real e coloca num array
            onSnapshot(queryGoals, goalsSnapshot => {
                goalsFirebase = [];
                goalsSnapshot.forEach(goal => {

                    //se o status nao estiver finalizado, olhar se esta atrasado ou em atencao
                    let currentStatus = goal.data().status;                                                            
                    if(currentStatus !== 'finished'){      
                        const currentDeadline = goal.data().deadline;   
                        
                        if(new Date(currentDeadline).getTime() > new Date().getTime() && currentStatus !== 'open'){
                            currentStatus = 'open';
                        }                          

                        if(new Date(currentDeadline).getTime() < new Date().getTime() && currentStatus !== 'late'){                            
                            currentStatus = 'late';
                        }       
                        
                        if(new Date(currentDeadline).getTime() === new Date().getTime() && currentStatus !== 'caution'){                           
                            currentStatus = 'caution';
                        }  
                    }

                    //se tiver mudado o status, atualizar no banco
                    if(currentStatus !== goal.data().status) {                        
                         updateCurrentStatus(goal.id, currentStatus);
                    }

                    goalsFirebase.push({
                        id: goal.id,
                        title: goal.data().title,
                        category: goal.data().category,
                        deadline: goal.data().deadline,
                        status: currentStatus,
                        userId: goal.data().userId,
                        createdAt: goal.data().createdAt,
                    });
                });

                setGoals(goalsFirebase);
            })
               
            //unsubscribe();           
        }
    }, [finishedGoalsFilter, lateGoalsFilter, openGoalsFilter, orderClause, user]);*/

    

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
                    { categories.length > 0 &&
                      <>                        
                        <ActionsMenu>
                            <button onClick={newGoalModal.handleOpen} >+ Meta</button>
                            <button >+ Cat.</button>
                            <button>- Cat.</button>
                        </ActionsMenu>                                                              
                      </>      
                    }                
                                        
                    <TableContainer isVisible={categories.length > 0} >            
                        <table>
                            <thead>
                                <tr>
                                    <th>Descrição</th>       
                                    <th>Ações</th>                             
                                </tr>
                            </thead>
                            <tbody>
                                { categories.map(category => (
                                    <tr key={category.id} > 
                                        <td ><span>{category.title}</span></td>                                                                                                                        
                                        <td>
                                            <IconButton onClick={() => handleEditCategory(category.id)}  actionType={'edit'} ><img src={editIcon} alt="Editar" /></IconButton>                                            
                                            <IconButton onClick={() => handleDeleteCategory(category.id)} actionType={'delete'} ><img src={trashIcon} alt="Deletar" /></IconButton>                                            
                                        </td>                                                                                                                                                
                                    </tr>   
                                 )) }
                            </tbody>
                        </table>     
                    </TableContainer>                
                               
                    <NoGoal isVisible={categories.length === 0}>
                        <h2>Você ainda não tem nenhuma categoria cadastrada! </h2>
                        <p onClick={newCategoryModal.handleOpen} >Cadastrar categoria</p>
                    </NoGoal> 

                <NewGoalModal
                    isOpen={newGoalModal.isOpen}
                    handleCloseModal={newGoalModal.handleClose}
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

