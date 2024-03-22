'use client'

import { createContext, ReactNode, useState } from "react";

type AuthContextData = {
    user: UserProps | null;
    isAuthenticated:  string | boolean ; 
    signIn: (credentials: SignInProps) => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps){
    const [user, setUser] = useState<UserProps>(null);
    const isAuthenticated = !!user;

    async function signIn() {
        alert("Clicou login");
    }

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            <>{children}</>     
        </AuthContext.Provider>
    );
}
