import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
    // site: process.env.NEXTAUTH_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
    providers: [
        Providers.Credentials({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: {  label: "Password", type: "password" }
            },
            authorize: async(credentials, req) => {
                const user = {}
                let isAllowedToSignIn = false
                if(credentials.username == process.env.USERNAME && credentials.password == process.env.PASSWORD) {
                    isAllowedToSignIn = true

                    user.username = credentials.username
                }

                if (isAllowedToSignIn) {
                    return { name: user.username }
                } else {
                    return false     
                }
            },
        }),
    ],
    callbacks: {
        async signIn(user, account, profile) {
            if (user) {
                return user;
            }
            else {
                return false;
            }
        },
        async jwt(token, user) {
            if (user) {
                token.user = user
            }

            return token
        },
    
        async session(session, token) {
            session.accessToken = token

            return session
        }
    },
    pages: {
        signIn: '/admin/login',
        signOut: '/admin/dashboard',
        error: '/admin/login'
    }
}

export default (req, res) => NextAuth(req, res, options)
