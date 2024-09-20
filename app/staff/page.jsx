import Layout from "@/components/layout";
import Image from "next/image";
import Link from "next/link";
const Staffpage = () => {
  return (
    <Layout>
      <div className="grid grid-cols-2 gap-4 p-4">
        {/* First Row: 2 Cards */}
        <Link href="staff/make-appointment">
          <div className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg">
            <Image
              src="/images/doctor-register.png"
              alt="Doctor Register"
              width={100}
              height={100}
              className="mb-4"
            />
            <p>Make Appointment</p>
          </div>
        </Link>
        <Link href="staff/payments">
          <div className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg">
            <Image
              src="/images/staff-register.png"
              alt="Staff Register"
              width={100}
              height={100}
              className="mb-4"
            />
            <p>Payments</p>
          </div>
        </Link>

        {/* Second Row: 3 Cards */}
        <div className="col-span-2 grid grid-cols-3 gap-4">
          <Link href="staff/aminal-owner-register">
            <div className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg">
              <Image
                src="/images/animal-owner-records.png"
                alt="Animal Owner Records"
                width={100}
                height={100}
                className="mb-4"
              />
              <p>Animal Owner Register</p>
            </div>
          </Link>
          <Link href="/staff/inventrory">
            <div className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg">
              <Image
                src="/images/essential-records.png"
                alt="Essential Records"
                width={100}
                height={100}
                className="mb-4"
              />
              <p>Manage Inverntory</p>
            </div>
          </Link>
          <Link href="staff/display-appoiment">
            <div className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg">
              <Image
                src="/images/appointment-records.png"
                alt="Appointment Records"
                width={100}
                height={100}
                className="mb-4"
              />
              <p>Appointment Records</p>
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

export default Staffpage;
