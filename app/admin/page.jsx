import React from "react";
import Layout from "@/components/layout";
import Image from "next/image";
import Link from "next/link";

const Adminpage = () => {
  return (
    <Layout>
      <div className="grid grid-cols-2 gap-4 p-4">
        {/* First Row: 2 Cards */}
        <Link href="/admin/doctor-register">
          <div className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg">
            <Image
              src="/images/doctor-register.png"
              alt="Doctor Register"
              width={100}
              height={100}
              className="mb-4"
            />
            <p>Doctor Register</p>
          </div>
        </Link>
        <Link href="admin/staff-register">
          <div className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg">
            <Image
              src="/images/staff-register.png"
              alt="Staff Register"
              width={100}
              height={100}
              className="mb-4"
            />
            <p>Staff Register</p>
          </div>
        </Link>

        {/* Second Row: 3 Cards */}
        <div className="col-span-2 grid grid-cols-3 gap-4">
          <Link href="admin/animal-owner-records">
            <div className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg">
              <Image
                src="/images/animal-owner-records.png"
                alt="Animal Owner Records"
                width={100}
                height={100}
                className="mb-4"
              />
              <p>Animal Owner Records</p>
            </div>
          </Link>
          <Link href="/admin/staff-details">
            <div className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg">
              <Image
                src="/images/staff-records.png"
                alt="Essential Records"
                width={100}
                height={100}
                className="mb-4"
              />
              <p>Staff Records</p>
            </div>
          </Link>
          <Link href="admin/doctor-details">
            <div className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg">
              <Image
                src="/images/appointment-records.png"
                alt="Appointment Records"
                width={100}
                height={100}
                className="mb-4"
              />
              <p>Doctor Records</p>
            </div>
          </Link>
        </div>

        {/* Third Row: 2 Cards */}
        <Link href="/treatment-records">
          <div className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg">
            <Image
              src="/images/treatment-records.png"
              alt="Treatment Records"
              width={100}
              height={100}
              className="mb-4"
            />
            <p>Treatment Records</p>
          </div>
        </Link>
        <Link href="/financial-records">
          <div className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg">
            <Image
              src="/images/financial-records.png"
              alt="Financial Records"
              width={100}
              height={100}
              className="mb-4"
            />
            <p>Financial Records</p>
          </div>
        </Link>
      </div>
    </Layout>
  );
};

export default Adminpage;
