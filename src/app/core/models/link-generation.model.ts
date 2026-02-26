import {Link} from './link.model';


export interface GenerateLinkRequest {
  originalUrl: string;
  email?: string;
}

export interface GenerateLinkResponse {
  link: Link;
}
