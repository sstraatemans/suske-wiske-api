import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuthUser } from '@context/.';

type Props = {};

const AdminLayout: FC<Props> = ({ children }) => {
  const { signOut, isLoggedIn, isLoading, user } = useAuthUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push('/login');
    }
  }, [isLoading, isLoggedIn, router]);

  if (isLoading || !isLoggedIn) return <div>...loading</div>;

  return (
    <>
      <header>
        <button onClick={signOut}>logout {user?.displayName}</button>
        <nav>
          <ul>
            <li>
              <Link href='/admin'>
                <a>series</a>
              </Link>
            </li>
            <li>
              <Link href='/admin/albums'>
                <a>albums</a>
              </Link>
            </li>
            <li>
              <Link href='/admin/characters'>
                <a>characters</a>
              </Link>
            </li>
            <li>
              <Link href='/admin/tools'>
                <a>tools</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
};

export default AdminLayout;
