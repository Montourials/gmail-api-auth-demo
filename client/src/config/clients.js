export const GCLIENT = () => window.google;

export const GIS = () => GCLIENT().accounts?.id;
export const OAUTH = () => GCLIENT().accounts?.oauth2;

export default {
  GCLIENT,

  GIS,
  OAUTH,
};
