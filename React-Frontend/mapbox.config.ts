let mapboxApiKey: string = import.meta.env.VITE_MAPBOX_API;

interface Environment {
  production: boolean;
  mapbox: {
    accessToken: string;
  };
}

export const environment: Environment = {
  production: false,
  mapbox: {
    accessToken: mapboxApiKey,
  },
};

