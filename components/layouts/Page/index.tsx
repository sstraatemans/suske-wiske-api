import { FC } from 'react';
import { Container } from '@components/.';

const PageLayout: FC = ({ children }) => {
  return (
    <>
      <header>header</header>
      <Container>
        <main>{children}</main>
      </Container>
      <footer>footer</footer>
    </>
  );
};

export default PageLayout;
