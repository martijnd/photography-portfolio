import Image from "next/image";
import { Inter } from "next/font/google";
import { getAllPhotos } from "@/utils/sanity";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps() {
  const photos = await getAllPhotos();
  return {
    props: { photos },
  };
}

export default function Home({ photos }: { photos: any }) {
  console.log(photos);

  return (
    <main className={`min-h-screen ${inter.className}`}>
      <h1>Portfolio website</h1>
      <div className="grid grid-cols-4 gap-4 p-4">
        {photos.map((photo: any) => (
          <Image
            className="hover:scale-110 transition-transform"
            alt={photo.title}
            key={photo.url}
            src={photo.url + "?w=1000"}
            width={500}
            height={200}
          />
        ))}
      </div>
    </main>
  );
}
