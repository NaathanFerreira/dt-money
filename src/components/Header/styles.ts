import styled from 'styled-components'

export const Container = styled.header`
  background: var(--blue);
`

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  // 2rem em cima, 1rem nas laterais, 10rem somente em baixo
  padding: 2rem 1rem 12rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    font-size: 1rem;
    color: #fff;
    background: var(--blue-light);
    border: 0;
    padding: 0 2rem;
    border-radius: 0.25rem;
    height: 3rem;

    // toda vez que a propriedade filter for alterada, ele faz uma transição de 0.2 segundos
    transition: filter 0.2s;

    &:hover {
      // deixa o botão mais escurinho quando passar o mouse por cima
      filter: brightness(0.9);
    }
  }
`