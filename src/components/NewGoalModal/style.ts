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

    button {
        height: 4rem;
        border: 0;
        border-radius: 0.25rem;
        font-size: 1.4rem;
        font-weight: 600;

        background: var(--green);

        margin-top: 1rem;

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