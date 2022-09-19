import Link from 'next/link';

import { useUserContext } from 'src/context/UserContext';

const AuthCheck = (props: { children: React.ReactNode }) => {
  const user = useUserContext();

  return user ? (
    <>{props.children}</>
  ) : (
    <div className='grid h-screen'>
      <div className='place-self-center'>
        <Link href='/login'>
          <a className='text-blue border-b border-blue'>
            You must be signed in to view this page!
          </a>
        </Link>
      </div>
    </div>
  );
};

export default AuthCheck;
