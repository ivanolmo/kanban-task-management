import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { trpc } from '@/utils/trpc';
import { CreateUserInput } from '@/server/router/user.router';
import Button from '../Button';
import Modal from '../Modal';

const VerifyToken = ({ hash }: { hash: string }) => {
  const router = useRouter();
  const { data, isLoading } = trpc.useQuery([
    'users.verify-otp',
    {
      hash,
    },
  ]);

  if (isLoading) {
    return <p>Verifying...</p>;
  }

  router.push(data?.redirect.includes('login') ? '/' : data?.redirect || '/');

  return <p>Redirecting...</p>;
};

const LoginForm = () => {
  const [success, setSuccess] = useState(false);
  // const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const router = useRouter();

  const { handleSubmit, register } = useForm<CreateUserInput>();

  const { mutate, error } = trpc.useMutation(['users.request-otp'], {
    onSuccess: () => {
      setSuccess(true);
    },
  });

  const onSubmit = (values: CreateUserInput) => {
    mutate({ ...values, redirect: router.asPath });
  };

  const hash = router.asPath.split('#token=')[1];

  if (hash) {
    return <VerifyToken hash={hash} />;
  }

  return (
    <Modal>
      <h1>Login</h1>
      <form
        className='flex flex-col items-center gap-6 my-8 w-full'
        onSubmit={handleSubmit(onSubmit)}
      >
        {error && <p>{error.message}</p>}
        {success && <p>Check your email</p>}
        <input
          type='email'
          placeholder='email@email.com'
          {...register('email')}
          className='border border-gray-300 rounded-lg p-2 w-full'
        />
        <Button type='submit'>Login</Button>
      </form>
    </Modal>
  );
};

export default LoginForm;
