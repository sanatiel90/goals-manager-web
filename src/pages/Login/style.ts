import styled from "styled-components";

export const Container = styled.main`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const BoxLogin = styled.div`
    height: 15rem;
    width: 100%;
    max-width: 32.5rem;
    border: solid 1px var(--borderGrey);
    border-radius: 0.25rem;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    text-align: center;

    button {        
        border: 0;

        background-color: var(--primaryBlue);
        

        height: 3.1rem;
        border-radius: 0.25rem;        
        padding: 0 1rem;

        font-size: 1rem;
        font-weight: 700;

        display: flex;        
        align-items: center;

        gap: 0.5rem;

        transition: filter 1s;

        &:hover {
            filter: brightness(0.75) ;
        }        
    }

`;