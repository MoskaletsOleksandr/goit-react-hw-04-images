import styled from '@emotion/styled';

export const List = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;
  margin: 0 auto;
  padding: 0;
  list-style: none;
  justify-content: center;
  align-items: start;
`;
