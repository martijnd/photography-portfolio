import { groq } from "next-sanity";
import { client } from "./client";
import { RootImage } from "./types";

export async function getAllCategories() {
  const categories = await client.fetch(
    groq`*[_type=='category'] {
      title, slug, cover_image-> {
        image {
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
      }
    }`
  );

  return categories.map(
    ({
      title,
      slug,
      cover_image,
    }: {
      title: string;
      slug: string;
      cover_image: RootImage;
    }) => ({
      title,
      slug,
      cover_image: {
        url: cover_image.image.asset.url,
        width: cover_image.image.asset.metadata.dimensions.width,
        height: cover_image.image.asset.metadata.dimensions.height,
      },
    })
  );
}

export async function getCategoryPhotosBySlug(slug: string) {
  const categories = await client.fetch(
    groq`*[_type=='category' && slug.current == '${slug}'] {
      title, 
      slug, 
      "photos": *[_type == 'photo' && references(^._id)] {
        title,
        image {
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
      },
      cover_image -> {
        image {
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
      }
    }`
  );
  return categories.map(
    ({
      title,
      slug,
      photos,
      cover_image,
    }: {
      title: string;
      slug: string;
      photos: any[];
      cover_image: RootImage;
    }) => ({
      title,
      slug,
      cover_image: {
        url: cover_image.image.asset.url,
        width: cover_image.image.asset.metadata.dimensions.width,
        height: cover_image.image.asset.metadata.dimensions.height,
      },
      photos: photos.map((photo) => ({
        title: photo.title,
        url: photo.image.asset.url,
        width: photo.image.asset.metadata.dimensions.width,
        height: photo.image.asset.metadata.dimensions.height,
      })),
    })
  )[0];
}
