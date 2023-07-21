'use client';

import { ISlot } from '@/interfaces/ap';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { PiFunnelFill, PiPencilSimpleFill } from 'react-icons/pi';
import moment from 'moment';
import { useAuth } from '@/contexts/AuthContext';
import Edit from '@/components/Edit';

export default function Upcoming() {
    const { user } = useAuth();

    const [page, setPage] = useState<'active' | 'upcoming'>('active');
    const [isFilter, setIsFilter] = useState<boolean>(false);
    const [activeSlots, setActiveSlots] = useState<ISlot[] | null>(null);
    const [upcomingSlots, setUpcomingSlots] = useState<ISlot[] | null>(null);
    const [selectedEditSlot, setSelectedEditSlot] = useState<number | null>(
        null
    );

    const fetchActiveSlots = async () => {
        await axios
            .get(process.env.NEXT_PUBLIC_API_URL + '/ap/active')
            .then((res) => setActiveSlots(res.data.data))
            .catch((error) => {
                console.error(error);
            });
    };
    const fetchUpcomingSlots = async () => {
        await axios
            .get(process.env.NEXT_PUBLIC_API_URL + '/ap/upcoming')
            .then((res) => setUpcomingSlots(res.data.data))
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        fetchActiveSlots();
        fetchUpcomingSlots();

        setPage(
            (localStorage.getItem('page') as 'active' | 'upcoming') || 'active'
        );
    }, []);

    return (
        <>
            <div className="space-y-4 pb-28">
                {page === 'active'
                    ? activeSlots
                          ?.filter((slot) => {
                              if (isFilter) {
                                  return user?.selectedDepartments.includes(
                                      slot.department
                                  );
                              }
                              return true;
                          })
                          .map((slot, index) => {
                              const start = moment(slot.start).format('HH:mm');
                              const end = moment(slot.end).format('HH:mm');

                              const contactRegex =
                                  /(.+?) \((\d{3}-\d{3}-\d{4})\)/;

                              const contactMatches =
                                  slot.contact.match(contactRegex);

                              return (
                                  <div
                                      key={index}
                                      className="w-full rounded-xl shadow-md bg-white px-6 py-4 space-y-2"
                                  >
                                      <h3 className="font-semibold text-primary-500 space-x-4 w-full justify-between flex items-center">
                                          <span>
                                              {`#${slot.slot} | ${start} - ${end}`}
                                          </span>
                                          {user?.superuser && (
                                              <span
                                                  onClick={() => {
                                                      setSelectedEditSlot(
                                                          slot.slot
                                                      );
                                                  }}
                                                  className="text-lg rounded-lg text-neutral-300"
                                              >
                                                  <PiPencilSimpleFill />
                                              </span>
                                          )}
                                      </h3>
                                      <h3 className="font-bold text-neutral-700 text-lg">
                                          {slot.event}
                                      </h3>
                                      <p className="text-sm text-neutral-500 font-bold">
                                          {slot.department} |{' '}
                                          <a
                                              href={`tel:${
                                                  contactMatches
                                                      ? contactMatches[2]
                                                      : ''
                                              }`}
                                          >
                                              {slot.contact}
                                          </a>
                                      </p>
                                  </div>
                              );
                          })
                    : upcomingSlots
                          ?.filter((slot) => {
                              const currentTime = moment();
                              const startTime = moment(
                                  moment(slot.start).format('HH:mm:ss'),
                                  'HH:mm:ss'
                              );

                              return startTime.isAfter(currentTime);
                          })
                          .filter((slot) => {
                              if (isFilter) {
                                  return user?.selectedDepartments.includes(
                                      slot.department
                                  );
                              }
                              return true;
                          })
                          .map((slot, index) => {
                              const start = moment(slot.start).format('HH:mm');
                              const end = moment(slot.end).format('HH:mm');

                              const contactRegex =
                                  /(.+?) \((\d{3}-\d{3}-\d{4})\)/;

                              const contactMatches =
                                  slot.contact.match(contactRegex);

                              return (
                                  <div
                                      key={index}
                                      className="w-full rounded-xl shadow-md bg-white px-6 py-4 space-y-2"
                                  >
                                      <h3 className="font-semibold text-primary-500 space-x-4 w-full justify-between flex items-center">
                                          <span>
                                              {`#${slot.slot} | ${start} - ${end}`}
                                          </span>
                                          {user?.superuser && (
                                              <span
                                                  onClick={() => {
                                                      setSelectedEditSlot(
                                                          slot.slot
                                                      );
                                                  }}
                                                  className="text-lg rounded-lg text-neutral-300"
                                              >
                                                  <PiPencilSimpleFill />
                                              </span>
                                          )}
                                      </h3>
                                      <h3 className="font-bold text-neutral-700 text-lg">
                                          {slot.event}
                                      </h3>
                                      <p className="text-sm text-neutral-500 font-bold">
                                          {slot.department} |{' '}
                                          <a
                                              href={`tel:${
                                                  contactMatches
                                                      ? contactMatches[2]
                                                      : ''
                                              }`}
                                          >
                                              {slot.contact}
                                          </a>
                                      </p>
                                  </div>
                              );
                          })}
            </div>

            {selectedEditSlot && (
                <div className="z-40 fixed bottom-0 left-0 right-0 rounded-t-3xl bg-neutral-50 shadow-3xl flex justify-center items-center px-2 py-6">
                    <Edit
                        slot={selectedEditSlot}
                        onFinished={() => {
                            fetchActiveSlots();
                            fetchUpcomingSlots();
                            setSelectedEditSlot(null);
                        }}
                    />
                </div>
            )}

            {selectedEditSlot && (
                <div
                    onClick={() => setSelectedEditSlot(null)}
                    className="z-30 fixed top-0 bottom-0 left-0 right-0 bg-black/10 backdrop-blur-sm"
                ></div>
            )}

            <div className="z-20 fixed bottom-4 left-4 right-4 h-16 bg-white shadow-md rounded-2xl flex justify-between items-center font-bold text-gray-300 p-2.5 pr-4 space-x-4">
                <div className="flex w-full h-full">
                    <button
                        onClick={() => {
                            setPage('active');
                            localStorage.setItem('page', 'active');
                        }}
                        className={`w-full h-full rounded-lg ${
                            page === 'active'
                                ? 'bg-primary-500 text-white'
                                : 'text-gray-400'
                        }`}
                    >
                        ปัจจุบัน
                    </button>
                    <button
                        onClick={() => {
                            setPage('upcoming');
                            localStorage.setItem('page', 'upcoming');
                        }}
                        className={`w-full h-full rounded-lg ${
                            page === 'upcoming'
                                ? 'bg-primary-500 text-white'
                                : 'text-gray-400'
                        }`}
                    >
                        อนาคต
                    </button>
                </div>
                <button
                    onClick={() => setIsFilter(!isFilter)}
                    className={`h-full aspect-square grid place-content-center text-xl rounded-lg ${
                        isFilter && 'bg-primary-500 text-white'
                    }`}
                >
                    <PiFunnelFill />
                </button>
            </div>
            <div className="z-10 fixed bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-neutral-50 to-transparent pointer-events-none"></div>
        </>
    );
}
