import MobileTopNavBar from '@/mobile/components/MobileTopNav';
import { useTranslation } from 'react-i18next';
import MobileRegisterForm from '../components/forms/MobileRegisterForm';

export const ErrMesI18N = (message: string) => {
  const { t } = useTranslation();
  let i18NErr: string = '';

  if (message.includes('already used')) {
    i18NErr = t('Error.RegAlreadyUsed');
  }

  return i18NErr;
};

/**
 * Handle register process.
 *
 * Include:
 * User input pw value check: useState + useEffect + onChange
 *
 * @event changeEvent - Monitoring that user input password
 * @event FormEvent - Handle form submit
 */
const Register = () => {
  return (
    <div className="registerContainer">
      <MobileTopNavBar />
      <MobileRegisterForm />
    </div>
  );
};

export default Register;
