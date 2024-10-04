import styled, { css } from "styled-components";

const Form = styled.form`
    ${(props) =>
        props.type === "regualar" &&
        css`
            padding: 2.4rem 4rem;

            /* Box */
            background-color: var(--color-grey-0);
            border: 1px solid var(--color-grey-100);
            border-radius: var(--border-radius-md);

            @media (max-width: 516px) {
                padding: 2rem;
            }
        `}

    ${(props) =>
        props.type === "modal" &&
        css`
            width: 80rem;
        `}
    
  overflow: hidden;
    font-size: 1.4rem;
`;

Form.defaultProps = {
    type: "regualar",
};

export default Form;
