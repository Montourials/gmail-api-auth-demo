import _buildPageUrl from "./build-page-url.js";
import _buildServerUrl from "./build-server-url.js";

//all URLS are URIs, but not all URIs are URLs
export const { buildPageUrl } = _buildPageUrl;
export const { buildServerUrl } = _buildServerUrl;

export default {
  buildPageUrl,
  buildServerUrl,
};
