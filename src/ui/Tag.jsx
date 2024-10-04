import styled, { css } from "styled-components";

const Tag = styled.span`
    width: fit-content;
    text-transform: uppercase;
    font-size: 1.1rem;
    font-weight: 600;
    padding: 0.4rem 1.2rem;
    border-radius: 100px;

    /* Make these dynamic, based on the received prop */
    color: var(--color-${(props) => props.type}-700);
    background-color: var(--color-${(props) => props.type}-100);

    @media (max-width: 516px) {
        font-size: 0.9rem;
    }

    @media (max-width: 375px) {
    ${(props) =>
      props.$hiddenOnSmallScreen
        ? css`
          font-size: 0;
          padding: 0;
          width: 0;
        `
        : css`
          margin-left: 7rem;
        `}
  }
`;

Tag.defaultProps = {
    $hiddenOnSmallScreen: false,
  };

export default Tag;
