'use client';
import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../Button';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import Input from '../inputs/Input';
import Heading from '../Heading';
import Modal from './Modal';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = async data => {
    setIsLoading(true);
    try {
      const callback = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      setIsLoading(false);

      if (callback?.ok) {
        toast.success('Logged in');
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error during sign in:', error);
      toast.error('An error occurred during sign in.');
    }
  };
  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div
        className="
      text-neutral-500 text-center mt-4 font-light"
      >
        <p>
          First time using Airbnb?
          <span
            onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer
              hover:underline
            "
          >
            {' '}
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
  return (
    <Modal
      isOpen={loginModal.isOpen}
      actionLabel="Continue"
      onClose={loginModal.onClose}
      title="Login"
      body={bodyContent}
      footer={footerContent}
      onSubmit={handleSubmit(onSubmit)}
      disabled={isLoading}
    />
  );
};

export default LoginModal;
