import LiffProvider from '@/contexts/LiffContext';
import './globals.css';
import { IBM_Plex_Sans_Thai } from 'next/font/google';
import AuthProvider from '@/contexts/AuthContext';

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
    subsets: ['thai'],
    weight: ['100', '200', '300', '400', '500', '600', '700'],
});

export const metadata = {
    title: 'น้องปูน',
    description: 'วิดนุต้องรอด',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={ibmPlexSansThai.className}>
                <LiffProvider>
                    <AuthProvider>
                        <>{children}</>
                    </AuthProvider>
                </LiffProvider>
            </body>
        </html>
    );
}
