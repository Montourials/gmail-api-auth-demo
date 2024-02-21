///Google env configuration

export const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

export const SCOPES = {
  gmail: "https://mail.google.com/",
};

export default {
  CLIENT_ID,
  SCOPES,
};
