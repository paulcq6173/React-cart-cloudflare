import Notification from '@/components/Notification';
import useRegister from '@/hooks/useRegister';
import {
  resetMessage,
  selectNotification,
  setMessage,
} from '@/reducers/notifySlice';
import { useAppDispatch, useAppSelector } from '@/reducers/reduxHooks';
import authService from '@/services/authService';
import ErrorHelper from '@/utils/errorHelper';
import TurnstileWidget from '@/utils/turnstileWidget';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const notify = useAppSelector(selectNotification);
  const regHook = useRegister();
  const { registerdata } = regHook;
  // Check input password is wrong or already used.
  const [checkPassword, setPassword] = useState({
    checkpassword: undefined,
  });
  const formRef = useRef<HTMLFormElement>(null);

  const inputStyle = {
    border: notify.includes(t('Error.RegAlreadyUsed'))
      ? '2px solid red'
      : '1px solid grey',
    boxShadow: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  };

  const chkPWStyle = {
    border: notify.includes(t('Error.PWNoMatch'))
      ? '2px solid red'
      : '1px solid grey',
    boxShadow: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  };

  const handleCheckPassword = (e: { target: HTMLInputElement }) => {
    setPassword((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Cloudflare Turnstile only accept multipart/form-data request
    const formData = new FormData(formRef.current!);
    const token = formData.get('cf-turnstile-response') || '';

    try {
      const verifyRes = await authService.verifyToken(token);

      if (!verifyRes) {
        dispatch(setMessage({ message: 'Verify failed' }));
        setTimeout(() => {
          dispatch(resetMessage());
        }, 5000);
        return;
      }

      const response = await authService.register(registerdata);

      switch (response.status) {
        case 200:
          break;
        default:
          if (response.status === 409) {
            dispatch(
              setMessage({ message: t('Error.RegAlreadyUsed'), success: false })
            );
          } else {
            dispatch(setMessage({ message: response.message, success: false }));
          }
          setTimeout(() => {
            dispatch(resetMessage());
          }, 5000);
          return;
      }

      const { message } = response;
      navigate('/mobile/login', { state: { message, success: true } });
    } catch (error: unknown) {
      ErrorHelper(error);
    }
  };

  useEffect(() => {
    if (checkPassword.checkpassword !== registerdata.password) {
      dispatch(setMessage({ message: t('Error.PWNoMatch') }));
    } else {
      dispatch(resetMessage());
    }
  }, [checkPassword, registerdata, t, dispatch]);

  return (
    <div className="flex justify-center items-center">
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="w-screen mt-8 p-2.5 border border-gray-600 rounded-sm bg-gray-50">
          <h3 className="mb-2 p-0 text-center text-base font-medium">
            {t('RegisterTitle')}
          </h3>
          <div className="flex flex-col border-none gap-3.5">
            <input
              id="username"
              placeholder={t('PH.Username')}
              style={inputStyle}
              {...regHook}
            />
            <input
              id="email"
              placeholder={t('PH.Email')}
              style={inputStyle}
              {...regHook}
            />
            <input
              id="password"
              placeholder={t('PH.PW')}
              style={inputStyle}
              {...regHook}
            />
            <input
              type="password"
              id="checkpassword"
              placeholder={t('PH.PWConfirm')}
              onChange={handleCheckPassword}
              style={chkPWStyle}
            />
            <TurnstileWidget />
            <button className="border-none rounded-sm text-[#fafad2] bg-orange-400 cursor-pointer hover:text-white hover:bg-amber-500">
              {t('RegisterBTN')}
            </button>
            <span>{t('AlreadyHaveAccTip')}</span>
            <Link
              to="/login"
              className="no-underline text-inherit hover:text-sky-300"
            >
              <span>{t('LogIn')}</span>
            </Link>
            <Notification />
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
