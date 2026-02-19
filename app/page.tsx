import { Suspense } from "react";
import { getProducts, getProductsByCategory, searchProducts } from "@/services/productService";
import { getCategories } from "@/services/categoryService";
import HomeContent from "@/components/home/HomeContent";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = (params.search as string) || "";
  const category = (params.category as string) || "";
  const sortBy = (params.sort as string) || "title";
  const order = (params.order as "asc" | "desc") || "asc";

  const fetchParams = {
    limit: 12,
    skip: (page - 1) * 12,
    sortBy,
    order,
  };

  const [productsData, categories] = await Promise.all([
    search
      ? searchProducts(search, fetchParams)
      : category
        ? getProductsByCategory(category, fetchParams)
        : getProducts(fetchParams),
    getCategories(),
  ]);

  return (
    <Suspense>
      <HomeContent
        initialProducts={productsData.products}
        initialTotal={productsData.total}
        categories={categories}
        searchParams={params}
      />
    </Suspense>
  );
}