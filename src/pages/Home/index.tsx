import { Header } from '../../components/Header';

import { Container, Content, CardGoal, CardInfo, StatusBadge, IconButton, NoGoal } from './style';

import editIcon from './../../assets/images/edit-icon.svg';
import trashIcon from './../../assets/images/trash-icon.svg';
import { useGoal } from '../../hooks/useGoal';
import { useModal } from '../../hooks/useModal';
import { NewGoalModal } from '../../components/NewGoalModal';

import { status } from './../../shared/status';
import { EditGoalModal } from '../../components/EditGoalModal';
import { useState } from 'react';

interface GoalType {
    id: string;
    title: string;
    category: string;
    deadline: string;
    status: string;
    userId: string;
    createdAt: Date;
}

export function Home(){
    
    const { goals, deleteGoal, findGoal } = useGoal();   
    const { newGoalModal, editGoalModal } = useModal() ;      
    const [goalEdit, setGoalEdit] = useState({} as GoalType);
    

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

    return(
        <Container>                        
            <Header />
            <Content>
                { goals.length > 0 ? goals.map(goal => (
                    
                    <CardGoal key={goal.id} >
                        <CardInfo flexAmount={1.5} ><span>{goal.title}</span></CardInfo>
                        <CardInfo><span>{goal.category}</span></CardInfo>
                        <CardInfo><span>{Intl.DateTimeFormat('pt-BR', {timeZone: 'UTC'}).format(new Date(goal.deadline))}</span></CardInfo>
                        <CardInfo><StatusBadge statusColor={status[goal.status].color} >{status[goal.status].desc}</StatusBadge></CardInfo>
                        <CardInfo>
                            <IconButton onClick={() => handleEditGoal(goal.id)}  actionType={'edit'} ><img src={editIcon} alt="Editar" /></IconButton>
                            <IconButton onClick={() => handleDeleteGoal(goal.id)} actionType={'delete'} ><img src={trashIcon} alt="Deletar" /></IconButton>
                        </CardInfo>
                    </CardGoal>                        
                )) :                 
                    <NoGoal>
                        <h2>Você ainda não tem nenhuma meta cadastrada! </h2>
                        <p onClick={newGoalModal.handleOpen} >Cadastrar meta</p>
                    </NoGoal> }

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

