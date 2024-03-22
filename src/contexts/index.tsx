'use client';

import { AuthProvider} from './AuthContext';

export const Providers = ({ children } : {children : React.ReactNode}) => {
    return <AuthProvider>{children}</AuthProvider>;
}