import * as React from 'react';
import './Login.scss';
import Button from './Button';
import { usePasskeysContext } from './context/PasskeysContext';

export const Login: React.FC = () => {
  const { setShowPasskeyPrompt, signWithPasskey, currentPasskeyInfo } = usePasskeysContext();

  return (
    <div className="login-pane">
      <div className="sign-in">
        <div className="sign-in-title">
          <img src="/howler.png" alt="Howler"/> Howler
        </div>
        {!currentPasskeyInfo ? (
          <div className="sign-in-passkeys">
            <Button
              type="primary"
              onClick={() => {
                setShowPasskeyPrompt({
                  address: "",
                  fid: 0,
                  value: true,
                  message: '',
                  signature: '',
                });
              }}
            >
              Create Account
            </Button>
          </div>
        ) : (
          <div className="sign-in-passkeys">
            <Button
              type="primary"
              onClick={async () => {
                const result = await signWithPasskey(currentPasskeyInfo.address, "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
                console.log(result);
              }}
            >
              Sign In With Passkey
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
