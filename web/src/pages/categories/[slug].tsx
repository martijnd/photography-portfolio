import BaseLayout from "@/components/base-layout";
import { getAllCategories, getCategoryPhotosBySlug } from "@/sanity/category";
import { Category } from "@/sanity/types";
import Image from "next/image";

export async function getStaticPaths() {
  const categories = await getAllCategories();
  return {
    paths: categories.map((cat: Category) => ({
      params: { slug: cat.slug.current },
    })),
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const category = await getCategoryPhotosBySlug(params.slug);
  return {
    props: { category },
  };
}

interface Photo {
  url: string;
  width: number;
  height: number;
}

export default function Category({
  category,
}: {
  category: {
    cover_image: string;
    title: string;
    slug: string;
    photos: Photo[];
  };
}) {
  console.log(category);
  return (
    <BaseLayout>
      <h1>{category.title}</h1>
      <div className="grid grid-cols-3">
        {category.photos.map((photo) => (
          <Image
            key={photo.url}
            alt={category.title}
            src={photo.url + "?w=1920&h=1080&fit=crop&q=100"}
            width={1000}
            height={1000}
          />
        ))}
      </div>
    </BaseLayout>
  );
}
