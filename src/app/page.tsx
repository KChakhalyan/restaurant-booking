
import MenuGrid from '@/components/MenuGrid';
import { getDishes } from '@/lib/getDishes';


export default async function Home() {
  const dishes = await getDishes();


  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Our Menu</h1>
      <MenuGrid dishes={dishes} />
    </main>
  );
}
