import { darken } from "polished";
import styled from "styled-components";

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;

    gap: 1rem;

    p {
        text-align: center;
        font-weight: 600;
        font-size: 1.5rem;
    }

    select {                
        padding: 1rem;
        font-size: 1rem;
        border: 1px solid #BDBDBD;
    }

    div {
        display: flex;
        flex-direction: column;

        span {
            font-size: 0.8rem;
            opacity: 0.6;
        }
    }

    button[type="submit"] {
        height: 4rem;
        border: 0;
        border-radius: 0.25rem;
        font-size: 1.4rem;
        font-weight: 600;

        background: var(--green);

        margin-top: 0.5rem;

        transition: filter 0.5s;

        &:hover {
            filter: brightness(0.8);
        }
    }

`;

interface InputFormProps {
    errorInput: boolean;
}

export const InputForm = styled.input<InputFormProps>`
    font-size: 1rem;
    height: 2rem;
    padding: 1.5rem;
    width: 100%;
    border-radius: 0.25rem;

    border: 1px solid ${props => props.errorInput ? '#D50000' : '#BDBDBD' } ;

`;

export const SpanError = styled.span `
    color: #D50000;
`;

interface RadioBoxButtonProps {
    isChecked: boolean;
}

export const RadioBoxButton = styled.button<RadioBoxButtonProps>`

    height: 4rem;
    border: 1px solid #d7d7d7;
    border-radius:0.25rem;

    background: ${(props) => props.isChecked ? '#33cc95' : 'transparent' } ;  
    
    //color: ${(props) => props.isChecked ? 'black' : 'black' } ;          

    display: flex;
    align-items: center;
    justify-content: center;

    transition: border-color 0.2s;

    &:hover {
        border-color: ${darken(0.8, '#d7d7d7')};
    }

    img {
        height: 24px;
        width: 24px;           
    }

    span {
        display: inline-block;
        color: #424242;
        font-weight: 600;
        margin-left: 1rem;
        font-size: 1rem;        
    }
`;