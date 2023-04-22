import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "ats95s7n",
  dataset: "production",
  useCdn: true, // set to `true` to fetch from edge cache
  apiVersion: "2021-10-21", // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
});

export async function getAllPhotos() {
  const photos = await client.fetch(
    `*[_type=='photo'] {
      title, image {
        asset -> {
          url,
          metadata {
            dimensions {
              width, 
              height
            }
          }
        }
      }
    }`
  );
  console.log(photos[0]);
  return photos.map(({ title, image }: { title: string; image: any }) => ({
    url: image.asset.url,
    title,
    width: image.asset.metadata.dimensions.width,
    height: image.asset.metadata.dimensions.height,
  }));
}

// uses GROQ to query content: https://www.sanity.io/docs/groq
export async function getPhotosForCategory(categoryName: string) {
  const photos = await client.fetch(
    `*[_type=='category' && title == '${categoryName}']{
    title,
      "photos": *[_type=='photo' && references(^._id)] {
        image {
        asset -> {
          url
        }
      }
    }
  }`
  );
  return photos;
}
