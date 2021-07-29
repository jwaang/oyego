import styled from "styled-components";

const Button = ({ onClickFunction, text, variant, size }) => {
  return (
    <CardButton type="submit" onClick={onClickFunction} variant={variant} size={size}>
      {text}
    </CardButton>
  );
};

export default Button;

const CardButton = styled.button`
  ${({ variant }) => {
    if (!variant || variant === "primary") return "background-color: #2ea44f;";
    else if (variant === "secondary") return "background-color: #e03131;";
  }};
  background-image: linear-gradient(180deg, hsla(0, 0%, 100%, 0.15), hsla(0, 0%, 100%, 0));
  ${({ variant }) => {
    if (!variant || variant === "primary") return "border-color: #2ea44f;";
    else if (variant === "secondary") return "border-color: #e03131;";
  }};
  box-shadow: 0 1px 1px rgb(18 21 26 / 8%);
  color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
  ${({ size }) => {
    if (!size || size === "large") return "font-size: 1rem;";
    else if (size === "compact") return "font-size: .6rem;";
  }};
  font-weight: 500;
  ${({ size }) => {
    if (!size || size === "large") return "line-height: 1.5rem;";
  }};
  ${({ size }) => {
    if (!size || size === "large") return "padding: 0.5rem 1rem;";
    else if (size === "compact") return "padding: 0.25rem .5rem;";
  }};
  text-align: center;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  vertical-align: middle;
  width: 100%;

  :hover {
    background-color: #50555b;
  }
`;
