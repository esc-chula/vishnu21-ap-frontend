'use client';
import Loading from '@/app/loading';
import Login from '@/components/auth/Login';
import { IUser } from '@/interfaces/user';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextProps {
    user?: IUser | null;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
});

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [user, setUser] = useState<IUser | null>(null);

    const loginHandler = (studentId: string) => {
        localStorage.setItem('studentId', studentId);
        setUser({
            studentId,
        });
    };

    useEffect(() => {
        const studentId = localStorage.getItem('studentId');
        if (studentId) {
            setUser({
                studentId,
            });
            setIsLoading(false);
        }
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    if (!user) {
        return <Login loginHandler={loginHandler} />;
    }

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a UserProvider');
    }
    return context;
};
