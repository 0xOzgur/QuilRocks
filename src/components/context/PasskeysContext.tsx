'use client';

import React, { FC, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { authenticate, getStoredPasskeys } from "../../passkeys/types";
import '../../../public/wasm_exec.js';

declare const Go: any;
declare function signPayload(largeBlob: any, payload: string): string;
declare function createEd448Keypair(): any; // Dönüş tipini uygun şekilde değiştirin

type PasskeysContextValue = {
  currentPasskeyInfo: {address: string, fid: number, username: string, message: string, signature: string, pfpUrl: string | undefined} | undefined;
  showPasskeyPrompt: {fid: number, username: string, message: string, signature: string, pfpUrl: string | undefined, value: boolean};
  setShowPasskeyPrompt: (state: {address: string, fid: number, username: string, message: string, signature: string, pfpUrl: string | undefined, value: boolean}) => void;
  passkeyRegistrationComplete?: boolean;
  setPasskeyRegistrationComplete: (value: boolean | undefined) => void;
  passkeyRegistrationError?: string;
  setPasskeyRegistrationError: (value: string) => void;
  signWithPasskey: (credentialId: string, payload: string) => Promise<string>;
  isWasmLoaded: boolean | null;
};

type PasskeysContextProps = {
  children: ReactNode;
};

const PasskeysProvider: FC<PasskeysContextProps> = ({ children }) => {
  const [currentPasskeyInfo, setCurrentPassKeyInfo] = useState<{address: string, fid: number, username: string, message: string, signature: string, pfpUrl: string | undefined}>();
  const [showPasskeyPrompt, setShowPasskeyPrompt] = useState<{fid: number, username: string, message: string, signature: string, pfpUrl: string | undefined, value: boolean}>({fid: 0, username: "", signature: "", message: "", pfpUrl: "", value: false});
  const [passkeyRegistrationComplete, setPasskeyRegistrationComplete] = useState<boolean | undefined>();
  const [passkeyRegistrationError, setPasskeyRegistrationError] = useState<string>();
  const signWithPasskey = async (credentialId: string, payload: string) => {
    const cred = await authenticate({credentialId});
    return signPayload(cred.largeBlob, payload);
  }

  const [isWasmLoaded, setIsWasmLoaded] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadWasm = async () => {
      try {
        const go = new Go();
        const result = await WebAssembly.instantiateStreaming(fetch("/main.wasm"), go.importObject);
        go.run(result.instance);
        if (isMounted) {
          setIsWasmLoaded(true);
          console.log('WebAssembly module loaded successfully');
          console.log('createEd448Keypair available:', typeof createEd448Keypair === 'function');
        }
      } catch (error) {
        if (isMounted) {
          console.error('Failed to load WASM:', error);
          setIsWasmLoaded(false);
        }
      }
    };

    loadWasm();

    getStoredPasskeys().then(p => {
      if (isMounted && p.length > 0) {
        setCurrentPassKeyInfo({...(p[0].additionalData!), address: p[0].address});
        setPasskeyRegistrationComplete(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PasskeysContext.Provider value={{
      currentPasskeyInfo,
      showPasskeyPrompt,
      setShowPasskeyPrompt,
      passkeyRegistrationComplete,
      setPasskeyRegistrationComplete,
      passkeyRegistrationError,
      setPasskeyRegistrationError,
      signWithPasskey,
      isWasmLoaded,
    }}>
      {children}
    </PasskeysContext.Provider>
  );
};


const PasskeysContext = createContext<PasskeysContextValue>({
  currentPasskeyInfo: undefined,
  showPasskeyPrompt: undefined as never,
  setShowPasskeyPrompt: () => undefined,
  passkeyRegistrationComplete: undefined,
  setPasskeyRegistrationComplete: () => undefined,
  passkeyRegistrationError: undefined,
  setPasskeyRegistrationError: () => undefined,
  signWithPasskey: async () => undefined as unknown as Promise<string>,
  isWasmLoaded: null,
});

const usePasskeysContext = () => useContext(PasskeysContext);

export { PasskeysProvider, usePasskeysContext };