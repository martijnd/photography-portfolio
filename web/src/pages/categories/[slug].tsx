import BaseLayout from "@/components/base-layout";
import { getAllCategories, getCategoryPhotosBySlug } from "@/sanity/category";
import { Category } from "@/sanity/types";
import Image from "next/image";
import { useState } from "react";

interface Photo {
  title: string;
  url: string;
  width: number;
  height: number;
}
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
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [galleryActive, setGalleryActive] = useState(false);
  return (
    <BaseLayout title={category.title}>
      <h1 className="py-12 text-center text-3xl text-slate-900">
        {category.title}
      </h1>
      <div className="grid gap-4 md:grid-cols-3">
        {category.photos.map((photo, index) => (
          <button
            key={photo.url}
            onClick={() => {
              setActivePhotoIndex(index);
              setGalleryActive(true);
            }}
          >
            <Image
              className="rounded"
              alt={category.title}
              src={photo.url + "?w=1920&h=1080&fit=crop&q=100"}
              width={1000}
              height={1000}
            />
          </button>
        ))}
        {galleryActive && (
          <Gallery
            allPhotos={category.photos}
            activePhotoIndex={activePhotoIndex}
            onIncrement={() => setActivePhotoIndex((curr) => curr + 1)}
            onDecrement={() => setActivePhotoIndex((curr) => curr - 1)}
            onClose={() => setGalleryActive(false)}
          />
        )}
      </div>
    </BaseLayout>
  );
}

function Gallery({
  activePhotoIndex,
  allPhotos,
  onIncrement,
  onDecrement,
  onClose,
}: {
  activePhotoIndex: number;
  allPhotos: Photo[];
  onIncrement: () => void;
  onDecrement: () => void;
  onClose: () => void;
}) {
  const activePhoto = allPhotos[activePhotoIndex];
  return (
    <div className="fixed inset-0 bg-white">
      <div
        id="controls-carousel"
        className="relative h-full w-full p-4 md:p-20"
        data-carousel="static"
      >
        <div className="relative h-full overflow-hidden rounded-lg">
          <div className="duration-700 ease-in-out" data-carousel-item="active">
            <Image
              className="absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
              src={activePhoto.url}
              width={activePhoto.width}
              height={activePhoto.height}
              alt={activePhoto.url}
            />
          </div>
        </div>
        <button
          type="button"
          className="group absolute left-0 top-0 z-30 flex h-full items-center justify-center px-4 focus:outline-none"
          disabled={activePhotoIndex === 0}
          onClick={onDecrement}
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full group-focus:outline-none group-focus:ring-4 group-focus:ring-white group-enabled:bg-white/30 group-enabled:group-hover:bg-black/10">
            <svg
              aria-hidden="true"
              className="h-6 w-6 text-white dark:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="group absolute right-0 top-0 z-30 flex h-full items-center justify-center px-4 focus:outline-none"
          disabled={activePhotoIndex === allPhotos.length - 1}
          onClick={onIncrement}
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full group-focus:outline-none group-focus:ring-4 group-focus:ring-white group-enabled:bg-white/30 group-enabled:group-hover:bg-black/10">
            <svg
              aria-hidden="true"
              className="h-6 w-6 text-white dark:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
        <div className="absolute top-8 flex w-full items-center justify-between px-4 text-center text-gray-700 md:pr-40">
          <span>{activePhoto.title}</span>
          <button onClick={onClose} className="h-6 w-6 text-3xl font-light">
            &times;
          </button>
        </div>
      </div>
    </div>
  );
}
