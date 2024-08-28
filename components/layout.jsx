import AsideBar from "@/components/AsideBar";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <AsideBar />
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
}