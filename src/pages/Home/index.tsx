import { Header } from '../../components/Header';

import { Container, Content, StatusBadge, IconButton, NoGoal, FilterOptions, TableContainer } from './style';

import editIcon from './../../assets/images/edit-icon.svg';
import trashIcon from './../../assets/images/trash-icon.svg';
import checkIcon from './../../assets/images/check-circle.svg';

import { useGoal } from '../../hooks/useGoal';
import { useModal } from '../../hooks/useModal';
import { NewGoalModal } from '../../components/NewGoalModal';

import { status } from './../../shared/status';
import { EditGoalModal } from '../../components/EditGoalModal';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { collection, getFirestore, onSnapshot, orderBy, OrderByDirection, query, where } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';

interface GoalType {
    id: string;
    title: string;
    category: string;
    deadline: string;
    status: string;
    userId: string;
    createdAt: string;
}

export function Home(){

    const { user } = useAuth();

    const [goals, setGoals] = useState<GoalType[]>([]);
    
    const { deleteGoal, findGoal, updateCurrentStatus, updateGoal } = useGoal();   
    const { newGoalModal, editGoalModal } = useModal() ;      
    const [goalEdit, setGoalEdit] = useState({} as GoalType);

    const [finishedGoalsFilter, setFinishedGoalsFilter] = useState(true);
    const [lateGoalsFilter, setLateGoalsFilter] = useState(true);
    const [openGoalsFilter, setOpenGoalsFilter] = useState(true);
    const [orderClause, setOrderClause] = useState('deadline');

    useEffect(() => {
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
    }, [finishedGoalsFilter, lateGoalsFilter, openGoalsFilter, orderClause, user, updateCurrentStatus]);

    

    async function handleDeleteGoal(id: string) {
        if(window.confirm('Deseja realmente excluir essa meta?')){
            await deleteGoal(id);
        }        
    }
    

    async function handleEditGoal(id: string){                        
        const goal = await findGoal(id);                
        if(goal){            
            setGoalEdit(goal);
            editGoalModal.handleOpen();
        }
    }

    async function handleFinishGoal(id: string){
        let goal = await findGoal(id);                
        if(goal && window.confirm('Deseja finalizar essa meta?')){            
            goal.status = 'finished';
            await updateGoal(goal);
            toast.success('Meta finalizada!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000              
            });                           
        }
    }

    return(
        <Container>                        
            <Header />
            <Content>
                    { goals.length > 0 &&
                      <>
                        <FilterOptions>
                            <input 
                                type="checkbox" 
                                id='finished-goals' 
                                checked={finishedGoalsFilter} 
                                onChange={() => finishedGoalsFilter ? setFinishedGoalsFilter(false) : setFinishedGoalsFilter(true) } />
                            <label htmlFor='finished-goals' >Finalizadas</label>
                            
                            <input 
                                type="checkbox" 
                                id='late-goals' 
                                checked={lateGoalsFilter}
                                onChange={() => lateGoalsFilter ? setLateGoalsFilter(false) : setLateGoalsFilter(true) } />
                            <label htmlFor='late-goals' >Atrasadas</label>

                            <input 
                                type="checkbox" 
                                id='open-goals' 
                                checked={openGoalsFilter}
                                onChange={() => openGoalsFilter ? setOpenGoalsFilter(false) : setOpenGoalsFilter(true) } />
                            <label htmlFor='open-goals' >Em Aberto</label>

                            <span>Ordernar por</span>
                            <select value={orderClause} onChange={event => setOrderClause(event.target.value)} >
                                <option value={'deadline'}>Prazo</option>
                                <option value={'status'}>Status</option>
                                <option value={'category'}>Categoria</option>
                            </select>
                        </FilterOptions>   
                                                              
                      </>      
                    }                
                                        
                    <TableContainer isVisible={goals.length > 0} >            
                        <table>
                            <thead>
                                <tr>
                                    <th>Descri????o</th>
                                    <th>Categoria</th>
                                    <th>Criada em</th>
                                    <th>Prazo</th>
                                    <th>Status</th>
                                    <th>A????es</th>
                                </tr>
                            </thead>
                            <tbody>
                                { goals.map(goal => (
                                    <tr key={goal.id} > 
                                        <td><span>{goal.title}</span></td>
                                        <td><span>{goal.category}</span></td>
                                        <td><span>{goal.createdAt.substring(0, 10)}</span></td>
                                        <td><span>{Intl.DateTimeFormat('pt-BR', {timeZone: 'UTC'}).format(new Date(goal.deadline))}</span></td>
                                        <td><StatusBadge statusColor={status[goal.status].color} ><span>{status[goal.status].desc}</span></StatusBadge></td>
                                        <td>
                                            <IconButton onClick={() => handleEditGoal(goal.id)}  actionType={'edit'} ><img src={editIcon} alt="Editar" /></IconButton>                                            
                                            <IconButton onClick={() => handleDeleteGoal(goal.id)} actionType={'delete'} ><img src={trashIcon} alt="Deletar" /></IconButton>                                            
                                            {goal.status !== 'finished' && <IconButton onClick={() => handleFinishGoal(goal.id)} actionType={'update'} ><img src={checkIcon} alt="Atualizar" /></IconButton> } 
                                        </td>                                                                                                                                                
                                    </tr>   
                                 )) }
                            </tbody>
                        </table>     
                    </TableContainer>

                    <ToastContainer />                 
                               
                    <NoGoal isVisible={goals.length === 0}>
                        <h2>Voc?? ainda n??o tem nenhuma meta cadastrada! </h2>
                        <p onClick={newGoalModal.handleOpen} >Cadastrar meta</p>
                    </NoGoal> 

                <NewGoalModal
                    isOpen={newGoalModal.isOpen}
                    handleCloseModal={newGoalModal.handleClose}
                />   

                <EditGoalModal
                    isOpen={editGoalModal.isOpen}
                    handleCloseModal={editGoalModal.handleClose}
                    goal={goalEdit}
                />
                                          
            </Content>
            
        </Container>       
    );
    
}

