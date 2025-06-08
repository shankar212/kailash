import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <main className="p-8 max-w-4xl mx-auto">{children}</main>
    </div>
  );
}
