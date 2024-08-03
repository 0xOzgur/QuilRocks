"use client";

import React, { FC, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { authenticate, getStoredPasskeys } from "../passkeys/types";

type PasskeysContextValue = {
  currentPasskeyInfo: {address: string, fid: number, username: string, message: string, signature: string, pfpUrl: string | undefined} | undefined;
  setCurrentPasskeyInfo: React.Dispatch<React.SetStateAction<{address: string, fid: number, username: string, message: string, signature: string, pfpUrl: string | undefined} | undefined>>;
  showPasskeyPrompt: {address: string, fid: number, username: string, value: boolean, message: string, signature: string, pfpUrl: string | undefined};
  setShowPasskeyPrompt: React.Dispatch<React.SetStateAction<{address: string, fid: number, username: string, value: boolean, message: string, signature: string, pfpUrl: string | undefined}>>;
  passkeyRegistrationComplete: boolean | undefined;
  setPasskeyRegistrationComplete: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  passkeyRegistrationError: string | undefined;
  setPasskeyRegistrationError: React.Dispatch<React.SetStateAction<string | undefined>>;
  signWithPasskey: (address: string, message: string) => Promise<{signature: string}>;
};

const PasskeysContext = createContext<PasskeysContextValue | undefined>(undefined);

export const PasskeysProvider: FC<{children: ReactNode}> = ({ children }) => {
  const [currentPasskeyInfo, setCurrentPasskeyInfo] = useState<{address: string, fid: number, username: string, message: string, signature: string, pfpUrl: string | undefined} | undefined>(undefined);
  const [showPasskeyPrompt, setShowPasskeyPrompt] = useState<{address: string, fid: number, username: string, value: boolean, message: string, signature: string, pfpUrl: string | undefined}>({address: "", fid: 0, username: "", value: false, message: "", signature: "", pfpUrl: undefined});
  const [passkeyRegistrationComplete, setPasskeyRegistrationComplete] = useState<boolean | undefined>(undefined);
  const [passkeyRegistrationError, setPasskeyRegistrationError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const loadStoredPasskeys = async () => {
      try {
        const storedPasskeys = await getStoredPasskeys();
        if (storedPasskeys.length > 0) {
          setCurrentPasskeyInfo(storedPasskeys[0]);
        }
      } catch (error) {
        console.error("Failed to load stored passkeys:", error);
      }
    };

    loadStoredPasskeys();
  }, []);

  const signWithPasskey = async (address: string, message: string) => {
    try {
      const result = await authenticate(address, message);
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