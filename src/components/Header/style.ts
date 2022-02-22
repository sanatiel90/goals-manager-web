import styled from "styled-components";

//const screenWidth = window.screen.width;
//const marginBoxUser = screenWidth - (screenWidth - 1120) - 10;

export const HeaderContainer = styled.header`
    width: 100%;
    background-color: var(--primaryBlue);
`;

export const Content = styled.div`

    max-width: 1120px;
    margin: 0 auto;

    height: 4rem;    
    padding: 0 1.2rem;
    
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;    
`;

export const HeaderLogo = styled.h3`
    font-size: 1.5rem;
    font-style: italic;       
    margin-left: 1rem; 

    a {
        text-decoration: none;
        color: var(--fontColorLight);
    }

`;

export const HeaderInfo = styled.div`
    display: flex;
    flex-direction: row; 

    nav {
        margin-right: 0.6rem;     
        
        @media(max-width: 720px){
            display: none;
        }
    }

    
`;

export const HeaderMenu = styled.ul`
    list-style: none;     
`;

export const MenuItem = styled.li`
    display: inline-block;
    padding: 1.20rem;
    
                
    a {
        text-decoration: none;
        color: var(--fontColorLight);
        cursor: pointer;                
    }    

    span {
        color: var(--fontColorLight);
        cursor: pointer;                
    }

    transition: background-color 0.5s;

    &:hover {
        background-color: #3F51B5;
    }
`;


export const UserPicture = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;

    button {
        border: 0;   
        background: none;        
    }

    

    img {
        height: 2.5rem;
        width: 2.5rem;
        border-radius: 50%;

        transition: filter 0.5s;    

        &:hover {
            filter: brightness(0.8);
        }
    }
`;

