import React, { createContext, useReducer, useContext, Dispatch } from 'react';

import ActionMap from '../utils/actionMap';

type UserAccount = {
  id: string;
  email: string;
};

type AuthState = {
  isAuthenticated: boolean;
  userAccount?: UserAccount | null;
};

export enum AuthEvent {
  LOGIN = 'AUTH/LOGIN',
  ALREADY_LOGGEDIN = 'AUTH/ALREADY_LOGGEDIN',
  LOGOUT = 'AUTH/LOGOUT'
}

type Messages = {
  [AuthEvent.LOGIN]: {
    userAccount: UserAccount;
  };
  [AuthEvent.ALREADY_LOGGEDIN]: {
    userAccount: UserAccount;
  };
  [AuthEvent.LOGOUT]: {};
};

type Actions = ActionMap<Messages>[keyof ActionMap<Messages>];

const authReducer = (state: AuthState, action: Actions): AuthState => {
  switch (action.type) {
    case AuthEvent.LOGIN:
      return {
        isAuthenticated: true,
        userAccount: action.payload.userAccount
      };
    case AuthEvent.ALREADY_LOGGEDIN:
      return {
        isAuthenticated: true,
        userAccount: action.payload.userAccount
      };
    case AuthEvent.LOGOUT:
      return {
        isAuthenticated: false,
        userAccount: null
      };
  }
};

const AuthStateContext = createContext<Partial<AuthState>>({});
const AuthDispatchContext = createContext<Dispatch<Actions>>(() => null);

export interface AuthProviderProps {
  children: React.ReactNode | React.ReactNode[] | null;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    userAccount: null
  });

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);
