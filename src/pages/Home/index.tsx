import { Header } from '../../components/Header';

import { Container, Content, CardGoal, CardInfo, StatusBadge, IconButton } from './style';

import editIcon from './../../assets/images/edit-icon.svg';
import trashIcon from './../../assets/images/trash-icon.svg';

export function Home(){
    
    return(
        <Container>                        
            <Header />
            <Content>
                <CardGoal>
                    <CardInfo flexAmount={1.5} ><span>Terminar curso react</span></CardInfo>
                    <CardInfo><span>Estudos</span></CardInfo>
                    <CardInfo><span>25/06/2022</span></CardInfo>
                    <CardInfo><StatusBadge status={'open'} >Aberto</StatusBadge></CardInfo>
                    <CardInfo>
                        <IconButton actionType={'edit'} ><img src={editIcon} alt="Editar" /></IconButton>
                        <IconButton actionType={'delete'} ><img src={trashIcon} alt="Deletar" /></IconButton>
                    </CardInfo>

                </CardGoal>                

                <CardGoal>
                    <CardInfo flexAmount={1.5}><span>Aprender andar de Bike</span></CardInfo>
                    <CardInfo><span>Skills</span></CardInfo>
                    <CardInfo><span>25/06/2022</span></CardInfo>
                    <CardInfo><StatusBadge status={'finished'}>Concluído</StatusBadge></CardInfo>
                    <CardInfo>
                        <IconButton actionType={'edit'} ><img src={editIcon} alt="Editar" /></IconButton>
                        <IconButton actionType={'delete'} ><img src={trashIcon} alt="Deletar" /></IconButton>
                    </CardInfo>
                </CardGoal>

                <CardGoal>
                    <CardInfo flexAmount={1.5}><span>Viajar para Guaramiranga</span></CardInfo>
                    <CardInfo><span>Lazer</span></CardInfo>
                    <CardInfo><span>25/06/2022</span></CardInfo>
                    <CardInfo><StatusBadge status={'late'}>Atrasado</StatusBadge></CardInfo>
                    <CardInfo>
                        <IconButton actionType={'edit'} ><img src={editIcon} alt="Editar" /></IconButton>
                        <IconButton actionType={'delete'} ><img src={trashIcon} alt="Deletar" /></IconButton>
                    </CardInfo>
                    
                </CardGoal>
            </Content>
        </Container>       
    );
}