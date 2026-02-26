export type LinkId = string;

export interface Link {
  id: LinkId;
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
  email?: string;
}
