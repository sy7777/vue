export enum IdentityProvider {
  GOOGLE = "google",
  MICROSOFT = "microsoft",
}

export const MICROSOFT_OAUTH_LOGIN_REDIRECT_URI = `${window.location.origin}/login/oauth/microsoft`;
export const MICROSOFT_OAUTH_SIGNUP_REDIRECT_URI = `${window.location.origin}/signup/oauth/microsoft`;
