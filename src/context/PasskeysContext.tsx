"use client";

import React, { FC, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { authenticate, getStoredPasskeys, StoredPasskey, PasskeyAuthenticationResult } from "../passkeys/types";

type CurrentPasskeyInfo = {
  address: string;
  fid: number;
  username: string;
  message: string;
  signature: string;
  pfpUrl: string | undefined;
};

type PasskeysContextValue = {
  currentPasskeyInfo: CurrentPasskeyInfo | undefined;
  setCurrentPasskeyInfo: React.Dispatch<React.SetStateAction<CurrentPasskeyInfo | undefined>>;
  showPasskeyPrompt: {address: string, fid: number, username: string, value: boolean, message: string, signature: string, pfpUrl: string | undefined};
  setShowPasskeyPrompt: React.Dispatch<React.SetStateAction<{address: string, fid: number, username: string, value: boolean, message: string, signature: string, pfpUrl: string | undefined}>>;
  passkeyRegistrationComplete: boolean | undefined;
  setPasskeyRegistrationComplete: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  passkeyRegistrationError: string | undefined;
  setPasskeyRegistrationError: React.Dispatch<React.SetStateAction<string | undefined>>;
  signWithPasskey: (address: string, message: string) => Promise<PasskeyAuthenticationResult>;
};

const PasskeysContext = createContext<PasskeysContextValue | undefined>(undefined);

export const PasskeysProvider: FC<{children: ReactNode}> = ({ children }) => {
  const [currentPasskeyInfo, setCurrentPasskeyInfo] = useState<CurrentPasskeyInfo | undefined>(undefined);
  const [showPasskeyPrompt, setShowPasskeyPrompt] = useState<{address: string, fid: number, username: string, value: boolean, message: string, signature: string, pfpUrl: string | undefined}>({address: "", fid: 0, username: "", value: false, message: "", signature: "", pfpUrl: undefined});
  const [passkeyRegistrationComplete, setPasskeyRegistrationComplete] = useState<boolean | undefined>(undefined);
  const [passkeyRegistrationError, setPasskeyRegistrationError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const loadStoredPasskeys = async () => {
      try {
        const storedPasskeys = await getStoredPasskeys();
        if (storedPasskeys.length > 0) {
          const storedPasskey = storedPasskeys[0];
          setCurrentPasskeyInfo({
            address: storedPasskey.address,
            fid: storedPasskey.additionalData?.fid ?? 0,
            username: storedPasskey.additionalData?.username ?? "",
            message: storedPasskey.additionalData?.message ?? "",
            signature: storedPasskey.additionalData?.signature ?? "",
            pfpUrl: storedPasskey.additionalData?.pfpUrl
          });
        }
      } catch (error) {
        console.error("Failed to load stored passkeys:", error);
      }
    };

    loadStoredPasskeys();
  }, []);

  const signWithPasskey = async (address: string, message: string): Promise<PasskeyAuthenticationResult> => {
    try {
      const result = await authenticate({ credentialId: address });
      return result;
    } catch (error) {
      console.error("Failed to sign with passkey:", error);
      throw error;
    }
  };

  return (
    <PasskeysContext.Provider
      value={{
        currentPasskeyInfo,
        setCurrentPasskeyInfo,
        showPasskeyPrompt,
        setShowPasskeyPrompt,
        passkeyRegistrationComplete,
        setPasskeyRegistrationComplete,
        passkeyRegistrationError,
        setPasskeyRegistrationError,
        signWithPasskey,
      }}
    >
      {children}
    </PasskeysContext.Provider>
  );
};

export const usePasskeysContext = () => {
  const context = useContext(PasskeysContext);
  if (context === undefined) {
    throw new Error("usePasskeysContext must be used within a PasskeysProvider");
  }
  return context;
};