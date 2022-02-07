import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

    :root {
        --primaryBlue: #303F9F;
        --secondaryGreen: #3D5AFE;
        --background: #fff;
        --borderGrey: #616161;
        --fontColorLight: #fff;
        --fontColorDark: #424242;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        @media(max-width: 1080px){
            font-size: 93.75%; //equivale a 15px
        }
        
        @media(max-width: 720px){
            font-size: 87.5%; //equivale a 14px
        }
    }

    body {
        background: var(--background);
        -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button {
        font-family: 'Poppins', sans-serif;        
    }

    button {
        cursor: pointer;
        color: var(--fontColorLight);
    }

    [disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }

    //classes para serem aplicadas aos modais da app; vao sobrescrever as classes nativas do react-modal
    .react-modal-overlay {
        background: transparent;

        position: fixed; 
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        z-index: 1;

        margin-top: 4rem;
        
    }   
    
    .react-modal-content {
        /*width: 100%;
        max-width: 576px;
        background: var(--background);
        padding: 3rem;
        position: relative;
        border-radius: 0.25rem;*/
    }
`;