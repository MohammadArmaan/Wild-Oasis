import styled, { css } from "styled-components";

const Row = styled.div`
    display: flex;

    ${(props) =>
        props.type === "horizontal" &&
        css`
            justify-content: space-between;
            align-items: center;

            @media(max-width: 778px){
                flex-direction: column;
                gap: 3rem;
            }
        `}

    ${(props) =>
        props.type === "vertical" &&
        css`
            flex-direction: column;
            gap: 1.6rem;
        `}
`;

Row.defaultProps = {
    type: "vertical",
};

export default Row;

