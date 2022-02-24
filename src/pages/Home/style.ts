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

    @media(max-width: 720px) {
        
    }


`;

interface CardInfoProps {
    flexAmount?: number;
}

export const CardInfo = styled.div<CardInfoProps>`
    flex: ${(props) => props.flexAmount ? props.flexAmount : 1};    

    display: flex;
    align-items: center;
    justify-content: center;    

    
    text-align: start;
`;

interface StatusBadgeProps {
    statusColor: string;
}

export const StatusBadge = styled.p<StatusBadgeProps>`    
    padding: 0.6rem;
    border-radius: 50%;
    width: 100%;
    max-width: 6.25rem;    
    text-align: center;
    color: var(--fontColorLight);
    font-size: 0.8rem;

    background: ${(props) => props.statusColor }; 
    
`;

interface IconButtonProps {
    actionType: 'edit' | 'delete' | 'update'
}

const colorIconButton = {
    edit: '#303F9F',
    delete: '#D32F2F',    
    update: '#4CAF50',    
}

export const IconButton = styled.button<IconButtonProps>`         
    margin-right: 0.4rem;
    padding: 0.20rem;
    background: transparent;    
    
    border-radius: 6px;
    
    border: solid 2px ${(props) => transparentize(0.2,colorIconButton[props.actionType]) };     
    
    display: flex;
    align-items: center;
    justify-content: center;

    transition: background-color 0.2s;

    &:hover {        
        background-color: ${(props) => darken(0,colorIconButton[props.actionType]) };
    }    

    img {
        height: 1.25rem;
        width: 1.25rem;              
    }
   
`;

interface NoGoalProps {
    isVisible: boolean;
}

export const NoGoal = styled.div<NoGoalProps>`
    display: ${props => props.isVisible ? 'flex' : 'none'};
    
    background: #fff;
    
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2 {
        font-size: 1.5rem;
        font-weight: 600;
    }

    p {
        margin-top: 1rem;
        font-size: 1.5rem;
        font-weight: bold;
        padding: 1rem 2rem;
        background: var(--secondaryBlue);
        border-radius: 0.25rem;
        color: #fff;

        cursor: pointer;

        transition: filter 0.5s;

        &:hover {
            filter: brightness(0.8);
        }
    }
`;

export const FilterOptions = styled.div`
    background: #90CAF9;    
    padding: 1rem;    

    width: 100%;
    
    border-radius: 0.25rem;

    font-size: 1.1rem;

    display: flex;
    flex-direction: row;
    align-items: center;
    
    input {
        margin-right: 0.5rem;     
        height: 1rem;
        width: 1rem;        
    }

    label {
        margin-right: 1rem;
    }

    span {
        margin-left: 1rem;
        margin-right: 0.5rem;
    }

    select {                
        padding: 0.5rem;
        border-radius: 0.25rem;
        font-size: 1rem;
        border: 1px solid #BDBDBD;
    }

    @media(max-width:720px) {
        font-size: 0.8rem;
        input {            
            height: 1.3rem;
            width: 1.3rem;
        }

        label {
            margin-right: 0.5rem;
        }

        span {
            margin-left: 0.5rem;
            margin-right: 0.5rem;
        }


        select {
            padding: 0.4rem;        
            font-size: 0.8rem;
        }
    }
`;


interface TableContainerProps {
    isVisible: boolean;
}

export const TableContainer = styled.div<TableContainerProps>`
    display: ${props => !props.isVisible && 'none'};

    margin-top: 1rem;    

    table {        
        width: 100%;
        border-spacing: 0.2rem 0.6rem; //prop que coloca espaçamento entre elementos da table

        th {            
            font-weight: 400;
            padding: 1rem 1rem;
            text-align: left;
        }

        td {            
            padding: 1rem;
            border: 0;
            background: #E3F2FD;            
            border-radius: 0.25rem;     
            
            button {
                @media(max-width: 720px) {
                    margin-bottom: 0.4rem;
                }
            }
                    

            &:last-child {
                @media(min-width: 720px){
                    display: flex;
                    height: 4.4rem;
                }                
            }
        }        
    }
`;