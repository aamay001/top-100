interface Album {
  name: string,
  images: {
    small: string,
    medium: string,
    large: string,
  }
  trackCount: number,
  price: {
    amount: number,
    currency: string,
  }
  title: string,
  link:  string,
  id: number,
  artist: string,
  category: {
    id: number,
    name: string,
  },
  releaseDate: {
    value: Date,
    text: string,
  }, 
  rights: string,
}