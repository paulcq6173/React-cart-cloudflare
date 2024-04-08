import { Turnstile } from '@marsidev/react-turnstile';

const TurnstileWidget = () => {
  const siteKey: string = import.meta.env.VITE_SITE_KEY;

  if (!siteKey) {
    console.log('cannot found site key');
    return;
  }

  return (
    <Turnstile
      nonce="8IBTHwOdqNKAWeKl7plt8g=="
      siteKey={siteKey}
      options={{
        action: 'submit-form',
        theme: 'light',
        size: 'compact',
        language: 'en',
      }}
      scriptOptions={{
        appendTo: 'body',
      }}
    />
  );
};

export default TurnstileWidget;
