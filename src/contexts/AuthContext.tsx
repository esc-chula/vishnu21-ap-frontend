'use client';
import axios from 'axios';
import Loading from '@/app/loading';
import Login from '@/components/Login';
import { IUser } from '@/interfaces/user';
import { createContext, useContext, useEffect, useState } from 'react';
import { useLiff } from './LiffContext';

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
    const liff = useLiff();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [user, setUser] = useState<IUser | null>(null);

    const loginHandler = async (studentId: string) => {
        localStorage.setItem('studentId', studentId);

        if (liff?.isInClient()) {
            const lineUserData = await liff?.getProfile();

            await axios.post(process.env.NEXT_PUBLIC_API_URL + '/user', {
                studentId,
                displayName: lineUserData?.displayName,
                userId: lineUserData?.userId,
            });
        }

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
