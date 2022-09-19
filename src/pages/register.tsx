import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { trpc } from '@/utils/trpc';
import { CreateUserInput } from '@/server/router/user.router';
import Button from '@/components/Button';
import Modal from '@/components/Modal';

const Register = () => {
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const router = useRouter();

  const { mutate, error } = trpc.useMutation(['users.register-user'], {
    onSuccess: () => {
      setRegisterSuccess(true);
    },
  });

  const onSubmit = (values: CreateUserInput) => {
    mutate(values);
  };

  return (
    <Modal>
      <h1>Register</h1>
      <form
        className='flex flex-col items-center gap-6 my-8 w-full'
        onSubmit={handleSubmit(onSubmit)}
      >
        {error && <p>{error.message}</p>}
        <input
          type='email'
          placeholder='email@email.com'
          {...register('email')}
          className='border border-gray-300 rounded-lg p-2 w-full'
        />
        <input
          type='text'
          placeholder='name'
          {...register('name')}
          className='border border-gray-300 rounded-lg p-2 w-full'
        />
        <Button type='submit'>Register</Button>
      </form>
      <Button>
        <Link href='/login'>Login</Link>
      </Button>
    </Modal>
  );
};

export default Register;
