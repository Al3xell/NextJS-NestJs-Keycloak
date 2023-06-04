import { profile } from "console";
import NextAuth, { NextAuthOptions } from "next-auth"
import { JWT } from "next-auth/jwt"
import { OAuthConfig } from "next-auth/providers"
import KeycloakProvider, { KeycloakProfile } from "next-auth/providers/keycloak"
import { signOut } from "next-auth/react";
/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken({ token }: { token: JWT }) {
    try {
        if (token.provider === "keycloak") {
            const details = {
                client_id: process.env.KEYCLOAK_CLIENT_ID,
                client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
                grant_type: 'refresh_token',
                refresh_token: token.refresh_token,
            };
            const formBody: string[] = [];
            Object.entries(details).forEach(([key, value]: [string, any]) => {
                const encodedKey = encodeURIComponent(key);
                const encodedValue = encodeURIComponent(value);
                formBody.push(encodedKey + '=' + encodedValue);
            });
            const formData = formBody.join('&');
            const url = `${process.env.KEYCLOAK_BASE_URL}/token`;

            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                method: "POST",
                body: formData,
            })
            const refreshedTokens = await response.json()
            if (!response.ok) {
                throw refreshedTokens
            }

            return {
                ...token,
                accessToken: refreshedTokens.access_token,
                accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
                refreshToken: refreshedTokens.refresh_token ?? token.refresh_token, // Fall back to old refresh token
            }
        }
    } catch (error) {
        console.error(error)
        return {
            ...token,
            error: "RefreshAccessTokenError",
        }
    }
}



export const authOptions: NextAuthOptions = {
    providers: [
        KeycloakProvider({
            clientId: process.env.KEYCLOAK_CLIENT_ID || "nextjs-keycloak",
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET || "dummy_secret",
            issuer: process.env.KEYCLOAK_ISSUER
        }),
    ],
    jwt:{
        maxAge: 30*60,
    },

    callbacks: {
        async signIn({ user, account, profile }) {
            // console.log(account)
            return true
        },
        async jwt({ token, account, user }) {
            
            if (account) {
                token.id_token = account.id_token
                token.access_token = account.access_token
                token.refresh_token = account.refresh_token
                token.expires_at = account.expires_at
                token.refresh_expires_in = account.refresh_expires_in
                token.provider = account.provider
            } else {
                token = await refreshAccessToken({ token })
            }
            return token
        },
        async session({session, token}) {
            if (token) {
              session.user = token.user as any
              session.access_token = token.access_token as string
              session.error = token.error as string
            }
            console.log(session)
            return session
          },
    },
    events: {
        async signOut({ token }: { token: JWT }) {
            if (token.provider === "keycloak") {
                const issuerUrl = (authOptions.providers.find(p => p.id === "keycloak") as OAuthConfig<KeycloakProfile>).options!.issuer!
                const logOutUrl = new URL(`${issuerUrl}/protocol/openid-connect/logout`)
                logOutUrl.searchParams.set("id_token_hint", token.id_token as string)
                await fetch(logOutUrl);
            }
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

