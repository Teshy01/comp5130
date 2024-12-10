// Image URLs for both JPG and WebP
export interface ImageUrls {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
  }
  
  // Trailer data structure
  export interface Trailer {
    youtube_id: string;
    url: string;
    embed_url: string;
  }
  
  // Title structure
  export interface Title {
    type: string;
    title: string;
  }
  
  // Aired date structure
  export interface AiredDate {
    from: {
      day: number;
      month: number;
      year: number;
    };
    to: {
      day: number;
      month: number;
      year: number;
    };
    string: string;
  }
  
  // Broadcast information structure
  export interface Broadcast {
    day: string;
    time: string;
    timezone: string;
    string: string;
  }
  
  // Producer, Licensor, Studio, Genre, etc. (same structure)
  export interface Entity {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }
  
  // The main structure for the Anime data
  export interface AnimeData {
    mal_id: number;
    url: string;
    images: {
      jpg: ImageUrls;
      webp: ImageUrls;
    };
    trailer: Trailer;
    approved: boolean;
    titles: Title[];
    title: string;
    title_english: string;
    title_japanese: string;
    title_synonyms: string[];
    type: string;
    source: string;
    episodes: number;
    status: string;
    airing: boolean;
    aired: {
      from: string;
      to: string;
      prop: AiredDate;
    };
    duration: string;
    rating: string;
    score: number;
    scored_by: number;
    rank: number;
    popularity: number;
    members: number;
    favorites: number;
    synopsis: string;
    background: string;
    season: string;
    year: number;
    broadcast: Broadcast;
    producers: Entity[];
    licensors: Entity[];
    studios: Entity[];
    genres: Entity[];
    explicit_genres: Entity[];
    themes: Entity[];
    demographics: Entity[];
  }
  
  // The response from the API, with a data object containing the Anime data
  export interface AnimeApiResponse {
    data: AnimeData;
  }