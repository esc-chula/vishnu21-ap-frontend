'use client';
import { useAuth } from '@/contexts/AuthContext';
import { useLiff } from '@/contexts/LiffContext';

export default function Home() {
    const liff = useLiff();
    const { user } = useAuth();

    return <div>{user?.studentId}</div>;
}
