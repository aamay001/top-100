export interface ItunesAlbumFeed {
  feed: ITunesFeed;
}

export interface ITunesFeed {
  author: ITunesAuthor;
  entry: ITunesAlbum[];
  updated: NestedLabel;
  rights: NestedLabel;
  title: NestedLabel;
  icon: NestedLabel;
  link: Link[];
  id: NestedLabel;
}

export interface ITunesAuthor {
  name: NestedLabel;
  uri: NestedLabel;
}

export interface NestedLabel {
  label: string;
}

export interface ITunesAlbum {
  "im:name": NestedLabel;
  "im:image": IMImage[];
  "im:itemCount": NestedLabel;
  "im:price": IMPrice;
  "im:contentType": EntryIMContentType;
  rights: NestedLabel;
  title: NestedLabel;
  link: Link;
  id: ID;
  "im:artist": IMArtist;
  category: Category;
  "im:releaseDate": IMReleaseDate;
}

export interface Category {
  attributes: CategoryAttributes;
}

export interface CategoryAttributes {
  "im:id": string;
  term: string;
  scheme: string;
  label: string;
}

export interface ID {
  label: string;
  attributes: IDAttributes;
}

export interface IDAttributes {
  "im:id": string;
}

export interface IMArtist {
  label: string;
  attributes: IMArtistAttributes;
}

export interface IMArtistAttributes {
  href: string;
}

export interface EntryIMContentType {
  "im:contentType": IMContentTypeIMContentType;
  attributes: IMContentTypeAttributes;
}

export interface IMContentTypeAttributes {
  term: string;
  label: string;
}

export interface IMContentTypeIMContentType {
  attributes: IMContentTypeAttributes;
}

export interface IMImage {
  label: string;
  attributes: IMImageAttributes;
}

export interface IMImageAttributes {
  height: string;
}

export interface IMPrice {
  label: string;
  attributes: IMPriceAttributes;
}

export interface IMPriceAttributes {
  amount: string;
  currency: string;
}

export interface IMReleaseDate {
  label: Date;
  attributes: NestedLabel;
}

export interface Link {
  attributes: LinkAttributes;
}

export interface LinkAttributes {
  rel: string;
  type?: string;
  href: string;
}
