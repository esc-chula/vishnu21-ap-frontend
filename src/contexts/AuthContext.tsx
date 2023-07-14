'use client';
import Loading from '@/app/loading';
import Login from '@/components/Login';
import { IUser } from '@/interfaces/user';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextProps {
    user: IUser | null;
    logoutHandler: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    logoutHandler: () => {},
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

    const logoutHandler = () => {
        // reset user selected ap in db

        // remove local storage
        localStorage.removeItem('studentId');
        setUser(null);
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
        <AuthContext.Provider value={{ user, logoutHandler }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a UserProvider');
    }
    return context;
};
