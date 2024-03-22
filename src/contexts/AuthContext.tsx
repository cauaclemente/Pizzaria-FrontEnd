import { createContext, ReactNode, useState } from "react";

import { api } from "../service/apiClient"

import { destroyCookie, setCookie, parseCookies } from "nookies";
import Router from "next/router";

import { toast } from "react-toastify"


type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean ; 
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credenials: SignUpProps) => Promise<void>
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

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut(){
    try{
        destroyCookie(undefined, "@lapizza.token")
        Router.push('/')
    }catch{
        console.log("Erro ao deslogar")
    }
}

export function AuthProvider({ children }: AuthProviderProps){
    const [user, setUser] = useState<UserProps>(null);
    const isAuthenticated = !!user;

    async function signIn({email, password}: SignInProps) {
        try{
            const response = await api.post('/session', {
                email,
                password
            })

            const { id, name, token } = response.data;
            
            setCookie(undefined, "@lapizza.token", token, {
                maxAge: 60 * 60 * 24 * 30, //Expira em 1 mes
                path: '/'
            })

            setUser({
                id,
                name,
                email,
            })

            //passar para proximas requisição o token
            api.defaults.headers["Authorization"] = `Bearer ${token}`

            toast.success("Bem vindo" + name)
            Router.push('/dashboard')
                
        }catch{
            toast.error("Erro ao acessar")
        }
    }

    async function signUp({ name, email, password}: SignUpProps) {
        try{
            const response = await api.post('/users', {
                name,
                email,
                password
            })
            toast.success("Conta criada com sucesso ")
            Router.push('/')
        }catch{
            toast.error("Erro ao cadastrar")
        }
    }

    return(
        <AuthContext.Provider value={{
            user,
            isAuthenticated, 
            signIn,
            signOut,
            signUp,
            }}>
                
            {children}    
        </AuthContext.Provider>
    );
}
