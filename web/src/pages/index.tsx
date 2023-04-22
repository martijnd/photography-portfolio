import Image from "next/image";
import { getAllCategories } from "@/sanity/category";
import Link from "next/link";
import BaseLayout from "@/components/base-layout";

export async function getServerSideProps() {
  const categories = await getAllCategories();
  return {
    props: { categories },
  };
}

interface Category {
  title: string;
  cover_image: {
    url: string;
    width: number;
    height: number;
  };
}
export default function Home({ categories }: { categories: Category[] }) {
  return (
    <BaseLayout>
      <h1 className="py-12 text-center text-3xl text-slate-900">Portfolio</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {categories.map((category) => (
          <Link
            href={`/categories/${category.title.toLowerCase()}`}
            className="group relative grid place-items-center overflow-hidden rounded transition-transform duration-300 hover:scale-110"
            key={category.cover_image.url}
          >
            <div className="relative">
              <div className="group-hover:bg-black/duration-300 absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/60"></div>
              <Image
                alt={category.title}
                src={category.cover_image.url + "?w=1920&h=1080&fit=crop&q=100"}
                width={1000}
                height={1000}
              />
            </div>
            <h2 className="absolute text-2xl font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {category.title}
            </h2>
          </Link>
        ))}
      </div>
    </BaseLayout>
  );
}
