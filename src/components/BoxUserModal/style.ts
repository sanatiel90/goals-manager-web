import styled from "styled-components";

export const BoxUser = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    max-width: 13.75rem;
    padding: 1.25rem;
    border-radius: 0.4rem;

    position: absolute;    
    right: 0.35rem;    
    z-index: 1;
    
    margin-top: 0.35rem;    

    background: var(--background);

    border: 1px solid var(--borderGrey); 

    margin-right: 0.35rem;    

    @media(min-width: 1366px) {
        margin-right: 1rem;
    }

    @media(min-width: 1920px) {
        margin-right: 20rem;
    }

    img {
        height: 3.75rem;
        width: 3.75rem;
        border-radius: 50%;        
    }

    span {
        margin-top: 0.6rem;
        margin-bottom: 0.6rem;
        font-size: 1rem;        
        text-align: center;
    }

    button {        
        border: 0;
        height: 2rem;
        border-radius: 0.25rem;
        background: var(--secondaryGreen);
        color: var(--fontColorLight);

        width: 80%;

        padding: 0 1rem;

        font-size: 1rem;
        font-weight: bold;
    }
`;