import styled from "styled-components";

const Input = ({ onChangeFunction, onKeyPressFunction }) => {
  return <InputWrapper type="text" onChange={(e) => onChangeFunction(e.target.value)} onKeyPress={(e) => onKeyPressFunction(e)} />;
};

export default Input;

const InputWrapper = styled.input`
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.5;
  color: #111928;
  background-color: #f3f4f6;
  background-clip: padding-box;
  border: 1px solid #d1d5db;
  -webkit-appearance: none;
  appearance: none;
  border-radius: 0.55rem;
  box-shadow: 0;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  &:focus {
    border-color: #a7e961;
    outline: 0;
  }
`;
