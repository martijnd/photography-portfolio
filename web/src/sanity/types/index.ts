export interface RootImage {
  image: Image;
}

export interface Image {
  asset: Asset;
}

export interface Asset {
  url: string;
  metadata: Metadata;
}

export interface Metadata {
  dimensions: Dimensions;
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface Category {
  title: string;
  slug: { current: string };
  cover_image: RootImage;
}
