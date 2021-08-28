import { FC, useContext } from 'react';
import { useUser } from '@context/UserContext';

const AdminLayout: FC = ({ children }) => {
  const { signIn } = useUser();

  return (
    <>
      <header>
        <button onClick={signIn}>login</button>
      </header>
      <main>{children}</main>
      <footer>fsfs</footer>
    </>
  );
};

export default AdminLayout;
