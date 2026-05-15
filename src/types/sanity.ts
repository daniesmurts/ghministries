export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  caption?: string;
}

export interface SanityReference {
  _ref: string;
  _type: 'reference';
}

export type SanityBlock = {
  _key: string;
  _type: string;
  [key: string]: unknown;
};

export interface SanityEvent extends SanityDocument {
  title: string;
  slug: { current: string };
  startDateTime: string;
  endDateTime?: string;
  description?: string | SanityBlock[];
  body?: SanityBlock[];
  coverImage?: SanityImage;
  type?: string;
  location?: {
    venueName?: string;
    city?: string;
    address?: string;
    isOnline?: boolean;
    coordinates?: { lat: number; lng: number };
  };
  speakers?: Array<{
    name: string;
    title?: string;
  }>;
}

export interface SanitySermon extends SanityDocument {
  title: string;
  slug: { current: string };
  speaker: string;
  date: string;
  duration?: string;
  thumbnail?: SanityImage;
  videoUrl?: string;
  audioUrl?: string;
  series?: SanityReference;
  body?: SanityBlock[];
}

export interface SanityLeader extends SanityDocument {
  name: string;
  role: string;
  title: string; // Added from component usage
  tier: 'global' | 'executive'; // Added from component usage
  shortBio?: string;
  fullBio?: SanityBlock[];
  photo?: string; // URL from Sanity (usually projected)
  image?: SanityImage;
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
    [key: string]: string | undefined;
  };
}
