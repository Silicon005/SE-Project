import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="bg-white overflow-hidden">
      <div className="relative isolate px-6 pt-14 lg:px-8 overflow-hidden ">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 ">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] "></div>
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 overflow-hidden ">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Rukmini Enterprises
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
            Forging Strength Since 1997 – Trusted Electrodes, Trusted Performance
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
            Delivering BIS-certified welding excellence since 1997 – trusted brands like Pilot, Marshal, Supersparc, 
            and Maharaja, crafted with quality raw materials for unmatched performance across India.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/products"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                View Products
              </Link>
              <Link
                to="/admin"
                className="text-sm font-semibold leading-6 text-gray-900 flex items-center"
              >
                Admin Login <span aria-hidden="true" className="ml-1">→</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
        </div>
      </div>
    </div>
  );
};