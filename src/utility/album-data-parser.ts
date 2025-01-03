import { ITunesAlbum, ItunesAlbumFeed } from '../types/itunes-album-feed';

const parseSingleAlbum = (albumObject: ITunesAlbum): Album => {
  const {
    'im:name': name,
    'im:image': images,
    'im:itemCount': trackCount,
    'im:price': price,
    title,
    link,
    id,
    'im:artist': artist,
    category,
    'im:releaseDate': releaseDate,
    rights,
  } = albumObject;

  const album: Album = {
    name: name.label,
    images: {
      small: images.filter(i => i.attributes.height === '55' )[0].label,
      medium: images.filter(i => i.attributes.height === '60' )[0].label,
      large: images.filter(i => i.attributes.height === '170' )[0].label,
    },
    trackCount: parseInt(trackCount.label, 10),
    price: {
      amount: parseFloat(price.attributes.amount),
      currency: price.attributes.currency,
    },
    title: title.label,
    link: link.attributes.href,
    id: parseInt(id.attributes['im:id'], 10),
    artist: artist.label,
    category: category.attributes.label,
    releaseDate: {
      value: new Date(releaseDate.label),
      text: releaseDate.attributes.label,
    },
    year: new Date(releaseDate.label).getFullYear().toString(),
    rights: rights.label,
  };

  return album;
}

const parseAlbumData = (payload: ItunesAlbumFeed): Album[] => {
  const albums: Album[] = [];

  for (const itunesAlbum of payload.feed.entry) {
    const album = parseSingleAlbum(itunesAlbum);
    albums.push(album);
  }

  return albums;
}

const getFeedMeta = (payload: ItunesAlbumFeed): AlbumFeedMeta => {
  const albumFeedMeta: AlbumFeedMeta = {
    updated: new Date(payload.feed.updated.label),
    rights: payload.feed.rights.label,
    title: payload.feed.title.label,
    icon: payload.feed.icon.label,
    link: payload.feed.link.filter(l => l.attributes.rel === 'self')[0].attributes.href,
    id: payload.feed.id.label,
  };

  return albumFeedMeta;
}

export {
  parseAlbumData,
  getFeedMeta,
}