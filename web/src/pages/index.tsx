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
      <h1>Portfolio website</h1>
      <div className="grid grid-cols-3 gap-4">
        {categories.map((category) => (
          <Link
            href={`/categories/${category.title.toLowerCase()}`}
            className="group relative grid place-items-center overflow-hidden rounded transition-transform hover:scale-110"
            key={category.cover_image.url}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/60"></div>
              <Image
                alt={category.title}
                src={category.cover_image.url + "?w=1920&h=1080&fit=crop&q=100"}
                width={1000}
                height={1000}
              />
            </div>
            <h2 className="absolute text-2xl font-bold text-white ">
              {category.title}
            </h2>
          </Link>
        ))}
      </div>
    </BaseLayout>
  );
}
