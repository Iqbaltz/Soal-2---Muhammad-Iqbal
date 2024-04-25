import { Province } from "@/src/entities/location";
import DropdownList from "./components/dropdown-list";

const fetchProvinces: () => Promise<Province[]> = async () => {
  const response = await fetch(
    `https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`
  );
  const data = await response.json();
  return data;
};

export default async function Home() {
  const provinces = await fetchProvinces();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="mb-4">Pilih Lokasi</h1>
        <DropdownList provinces={provinces} />
      </div>
    </main>
  );
}
