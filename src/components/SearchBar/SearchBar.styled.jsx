import styled from '@emotion/styled';

export const Bar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #3f51b5;
  color: #fff;
  padding-top: 12px;
  padding-bottom: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80px;
  z-index: 1;
`;

export const SearchForm = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 3px;
  overflow: hidden;
  min-height: 50px;
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: inset 0px 0px 8px 0px #33333347;
`;
