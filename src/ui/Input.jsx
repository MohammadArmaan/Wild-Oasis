import styled from "styled-components";

const Input = styled.input`
    border: 1px solid var(--color-grey-300);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-sm);
    box-shadow: var(--shadow-sm);
    padding: 0.8rem 1.2rem;

    @media (max-width: 778px) {
        width: 100%;
    }

    @media (max-width: 516px) {
        width: 50%;
    }

    @media (max-width: 516px) {
        width: ${(props) => (props.$formType === "modal" ? "50%" : "100%")};
    }

    @media (max-width: 375px) {
        width: ${(props) => (props.$formType === "modal" ? "30%" : "100%")};
    }
`;

Input.defaultProps = {
    $formType: "form",
};

export default Input;
