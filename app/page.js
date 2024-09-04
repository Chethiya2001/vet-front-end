import AsideBar from "@/components/AsideBar";
import Layout from "@/components/layout";
import Image from "next/image";

export default function Home() {

  return (
    <Layout>
      <h1 className="text-3xl text-center items-center mt-40 mb-10 font-bold text-black">
        Welcome to Vet Vantage Veterinary Clinics
        <br /> Management System
      </h1>
      <Image
        src="/main.png"
        alt="Vet Vantage Management System"
        width={500}
        height={300}
        className="mx-auto pt-5 py-5 "
      />
    </Layout>
  );
}
