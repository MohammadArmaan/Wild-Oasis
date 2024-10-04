import styled from "styled-components";

const StyledFormRowVertical = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch; 
  gap: 1.5rem;
  width: 100%; 

  label {
    font-size: 1.4rem;
    font-weight: 500;
  }

  input {
    width: 100%; 
    margin-bottom: 2rem;
  }

  button {
    width: 100%; 
  }
`;

function FormRowVertical({ label, error, children }) {
  return (
    <StyledFormRowVertical>
      {label && <label htmlFor={children.props.id}>{label}</label>}
      {children}
      {error && <span style={{ color: "var(--color-red-700)" }}>{error}</span>}
    </StyledFormRowVertical>
  );
}

export default FormRowVertical;
