import { useState } from 'react';
import { FiCheckSquare, FiSquare } from 'react-icons/fi';

export default function APSelection(): JSX.Element {
    const departments = {
        ดำเนินการ: [
            {
                name: 'ฝ่ายประสาน',
                shortName: 'COOR',
            },
            {
                name: 'ฝ่ายแผน',
                shortName: 'PLAN',
            },
        ],
        กิจกรรม: [
            {
                name: 'ฝ่าย Activity',
                shortName: 'ACT',
            },
            {
                name: 'ฝ่าย Entertainment',
                shortName: 'ENT',
            },
            {
                name: 'ฝ่าย Content',
                shortName: 'CONTENT',
            },
            {
                name: 'ฝ่าย MC',
                shortName: 'MC',
            },
        ],
        'อำนวยการ 1': [
            {
                name: 'ฝ่ายสวัสดิการ',
                shortName: 'WELFARE',
            },
            {
                name: 'ฝ่ายพลัสดุ',
                shortName: 'SUPPLY',
            },
            {
                name: 'ฝ่ายสถานที่',
                shortName: 'PLACE',
            },
            {
                name: 'ฝ่ายพยาบาล',
                shortName: 'MED',
            },
        ],
        'อำนวยการ 2': [
            {
                name: 'ฝ่ายทะเบียน',
                shortName: 'REG',
            },
            {
                name: 'ฝ่าย PR',
                shortName: 'PR',
            },
            {
                name: 'ฝ่าย IT',
                shortName: 'IT',
            },
        ],

        การเงิน: [
            {
                name: 'ฝ่ายการเงิน',
                shortName: 'FINANCE',
            },
        ],
    };

    const [selectedAP, setSelectedAP] = useState<string[]>([]);

    return (
        <div className="w-full rounded-xl shadow-md bg-white px-6 py-4 space-y-2">
            {Object.keys(departments).map((department) => (
                <div key={department} className="py-2">
                    <p className="font-medium text-neutral-500">{department}</p>
                    {departments[department as keyof typeof departments].map(
                        (ap) => (
                            <button
                                key={ap.shortName}
                                className="flex items-center space-x-3 py-2 mt-2 w-full"
                                onClick={() => {
                                    if (selectedAP.includes(ap.shortName)) {
                                        setSelectedAP(
                                            selectedAP.filter(
                                                (selected) =>
                                                    selected !== ap.shortName
                                            )
                                        );
                                    } else {
                                        setSelectedAP([
                                            ...selectedAP,
                                            ap.shortName,
                                        ]);
                                    }
                                }}
                            >
                                {selectedAP.includes(ap.shortName) ? (
                                    <FiCheckSquare className="text-2xl text-primary-500" />
                                ) : (
                                    <FiSquare className="text-2xl text-neutral-300" />
                                )}
                                <p className="font-medium text-neutral-500">
                                    {ap.name}
                                </p>
                            </button>
                        )
                    )}
                </div>
            ))}
        </div>
    );
}
