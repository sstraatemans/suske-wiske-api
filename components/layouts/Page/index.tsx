import { FC } from 'react';

const PageLayout: FC = ({ children }) => {
  return (
    <>
      <header>header</header>
      <main>{children}</main>
      <footer>footer</footer>
    </>
  );
};

export default PageLayout;
