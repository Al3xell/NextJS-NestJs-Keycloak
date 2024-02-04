import NextAuth from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: UserInfo,
    access_token?: string,
    refresh_token?: string,
    error?: string,
  }

  interface UserInfo {
    firstName: string,
    lastName: string,
    email: string,
    phone?: string,
    roles: string[],
    birthdate?: string
  }
  interface Profile {
    given_name: string,
    family_name: string,
    birthdate: string,
    roles: string[],
    email: string,
    attributes: { [key: string]: string }
  }

  interface JWT {
    access_token: string,
    expires_at: number,
    refresh_token: string,
    given_name: string,
    family_name: string,
    email: string,
    phone: string,
    error?: "RefreshAccessTokenError",
    roles: string[],
    user: UserInfo
  }

}