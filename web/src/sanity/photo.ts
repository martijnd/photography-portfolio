import { groq } from "next-sanity";
import { client } from "./client";

export async function getAllPhotos() {
  const photos = await client.fetch(
    groq`*[_type=='photo'] {
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
    groq`*[_type=='category' && title == '${categoryName}']{
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
