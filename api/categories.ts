import apiClient from "./axios";
import { Category } from "@/types/product";

export async function getCategories(): Promise<Category[]> {
    const { data } = await apiClient.get<Category[]>("/products/categories");
    return data;
}
