import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 bg-white shadow-sm flex justify-between items-center">
      <h1 className="text-xl font-semibold">Rekords</h1>
      <Button variant="outline">Sync</Button>
      <div className="bg-blue-500 text-white p-4">Tailwind is working</div>
    </nav>
  );
}