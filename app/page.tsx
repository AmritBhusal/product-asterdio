import { getProducts } from "@/services/productService";
import { getCategories } from "@/services/categoryService";
import HomeContent from "@/components/home/HomeContent";

export default async function Home() {
  const [productsData, categories] = await Promise.all([
    getProducts({ limit: 12 }),
    getCategories(),
  ]);

  return (
    <HomeContent
      initialProducts={productsData.products}
      initialTotal={productsData.total}
      categories={categories}
    />
  );
}