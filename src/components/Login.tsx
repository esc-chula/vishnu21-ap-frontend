import NongpoonImage from '@/public/nongpoon.png';
import Image from 'next/image';
import { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';

export default function Login({
    loginHandler,
}: {
    loginHandler: (studentId: string) => void;
}): JSX.Element {
    const [studentId, setStudentId] = useState<string>('');

    const isStudentIdValid = /^653\d{5}21$/.test(studentId);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <div className="flex flex-col items-center justify-center h-screen w-full text-center space-y-8 pb-6 bg-white">
            <div className="relative w-28 h-28 rounded-full bg-white overflow-hidden border-8 border-white shadow-lg">
                <Image src={NongpoonImage} alt="" fill />
            </div>
            <div className="space-y-1">
                <h1 className="font-bold text-3xl text-neutral-800">
                    ใครหน่ะ?!
                </h1>
                <p className="text-sm text-neutral-500">
                    กรอกรหัสนิสิตเพื่อยืนยันตัวหน่อย
                </p>
            </div>
            <input
                type="text"
                className="outline-none bg-transparent border-2 border-neutral-300 rounded-lg px-3 py-1.5"
                placeholder="หกห้าสาม..."
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
            />
            <button
                onClick={() => {
                    if (isLoading) return;
                    loginHandler(studentId);
                    setIsLoading(true);
                }}
                className={`bg-neutral-800 text-white rounded-lg p-4 text-lg shadow-md duration-300 ${
                    isStudentIdValid
                        ? 'opacity-100 pointer-events-auto'
                        : 'pointer-events-none opacity-0'
                }`}
            >
                <FiArrowRight />
            </button>
        </div>
    );
}
