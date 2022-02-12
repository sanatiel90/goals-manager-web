import { Header } from '../../components/Header';

import { Container, Content, CardGoal, CardInfo, StatusBadge, IconButton, NoGoal } from './style';

import editIcon from './../../assets/images/edit-icon.svg';
import trashIcon from './../../assets/images/trash-icon.svg';
import { useGoal } from '../../hooks/useGoal';
import { useModal } from '../../hooks/useModal';
import { NewGoalModal } from '../../components/NewGoalModal';


export function Home(){
    
    const { goals } = useGoal();   
    const { newGoalModal } = useModal() ;    
    
    return(
        <Container>                        
            <Header />
            <Content>
                { goals.length > 0 ? goals.map(goal => (
                    
                    <CardGoal key={goal.id} >
                        <CardInfo flexAmount={1.5} ><span>{goal.title}</span></CardInfo>
                        <CardInfo><span>{goal.category}</span></CardInfo>
                        <CardInfo><span>{Intl.DateTimeFormat('pt-BR', {timeZone: 'UTC'}).format(new Date(goal.deadline))}</span></CardInfo>
                        <CardInfo><StatusBadge status={'open'} >{goal.status}</StatusBadge></CardInfo>
                        <CardInfo>
                            <IconButton actionType={'edit'} ><img src={editIcon} alt="Editar" /></IconButton>
                            <IconButton actionType={'delete'} ><img src={trashIcon} alt="Deletar" /></IconButton>
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
                                          
            </Content>

            
        </Container>       
    );
}

