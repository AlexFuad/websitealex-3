import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { User } from '../models/index.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const { email, password, recaptchaToken } = credentials

          // Validate reCAPTCHA token
          const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
          })

          const recaptchaResult = await recaptchaResponse.json()
          
          if (!recaptchaResult.success) {
            throw new Error('reCAPTCHA verification failed. Please try again.')
          }

          // Find user in database
          const user = await User.findByCredentials(email, password)
          
          if (!user) {
            throw new Error('Invalid email or password')
          }

          // Update last login
          user.last_login = new Date()
          await user.save()

          return {
            id: user._id.toString(),
            email: user.email,
            username: user.username,
            role: user.role,
            profile_image: user.profile_image
          }
        } catch (error) {
          console.error('Auth error:', error)
          throw new Error(error.message || 'Authentication failed')
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Persist additional user info to JWT
      if (user) {
        token.id = user.id
        token.email = user.email
        token.username = user.username
        token.role = user.role
        token.profile_image = user.profile_image
      }

      if (account) {
        token.accessToken = account.access_token
      }

      return token
    },
    async session({ session, token }) {
      // Send user info to session
      session.user = {
        id: token.id,
        email: token.email,
        username: token.username,
        role: token.role,
        profile_image: token.profile_image
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login?error=true',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development'
}

export default NextAuth(authOptions)
