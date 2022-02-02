import { darken, transparentize } from "polished";
import styled from "styled-components";


export const Container = styled.div`
    height: 100vh;    
    margin: 0 auto;     

`;

export const Content = styled.div`
    max-width: 1120px;
    margin: 0 auto;    
    margin-top: 3.1rem;
    
    border-radius: 0.25rem;
    //border: 1px solid #1A237E;    
`;

export const CardGoal = styled.div`
    background: #E3F2FD;

    height: 4rem;    
    padding: 1rem;
    
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    margin: 1rem;
    border-radius: 0.25rem;

    font-weight: 500;
    font-size: 1rem;

`;

interface CardInfoProps {
    flexAmount?: number;
}

export const CardInfo = styled.div<CardInfoProps>`
    flex: ${(props) => props.flexAmount ? props.flexAmount : 1};    

    display: flex;
`;

interface StatusBadgeProps {
    status: 'open' | 'finished' | 'late' | 'caution'
}

const colorStatus = {
    open: '#5C6BC0',
    finished: '#2E7D32',    
    late: '#D32F2F',
    caution: '#F57C00'
}

export const StatusBadge = styled.p<StatusBadgeProps>`    
    padding: 0.6rem;
    border-radius: 50%;
    width: 100%;
    max-width: 6.25rem;    
    text-align: center;
    color: var(--fontColorLight);
    font-size: 0.8rem;

    background: ${(props) => colorStatus[props.status] };
    
`;

interface IconButtonProps {
    actionType: 'edit' | 'delete'
}

const colorIconButton = {
    edit: '#303F9F',
    delete: '#D50000',        
}

export const IconButton = styled.button<IconButtonProps>`
    border: 0;        
    margin-right: 1rem;
    padding: 0.20rem;
    
    //border-radius: 50%;
    border-radius: 6px;

    background: ${(props) => transparentize(0.6,colorIconButton[props.actionType]) };
    
    display: flex;
    align-items: center;
    justify-content: center;

    transition: filter 0.5s;

    &:hover {
        //filter: brightness(0.4);
        background: ${(props) => darken(0.1,colorIconButton[props.actionType]) };
    }

    

    img {
        height: 20px;
        width: 20px;        
    }
   
`;