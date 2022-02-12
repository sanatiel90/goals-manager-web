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
    errorTitle: boolean;
}

export const InputForm = styled.input<InputFormProps>`
    font-size: 1rem;
    height: 2rem;
    padding: 1.5rem;
    width: 100%;
    border-radius: 0.25rem;
    border: 1px solid ${props => props.errorTitle ? '#D50000' : '#BDBDBD'} ; //#BDBDBD
`;