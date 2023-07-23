import NextAuth from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      firstName: string,
      lastName: string,
      email: string,
      roles: string[],
    },
    access_token?: string,
    refresh_token?: string,
    error?: string,
  }

  interface JWT {
    access_token: string,
    expires_at: number,
    refresh_token: string,
    given_name: string,
    family_name: string,
    resource_access: {
      [key: string]: {
        roles: string[]
      },
    },
    email: string,
    error?: "RefreshAccessTokenError"
  }
}