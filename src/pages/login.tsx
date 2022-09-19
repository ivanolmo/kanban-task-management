import { NextPage } from 'next';
import dynamic from 'next/dynamic';

const LoginForm = dynamic(() => import('@/components/Auth/LoginForm'), {
  ssr: false,
});

const LoginPage: NextPage = () => {
  return (
    <>
      <LoginForm />
    </>
  );
};

export default LoginPage;
