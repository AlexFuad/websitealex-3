'use client'

import { useState, useEffect } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, Mail, AlertCircle, Shield, CheckCircle } from 'lucide-react'
import { verifyRecaptcha, getRecaptchaSiteKey, isRecaptchaEnabled } from '../../../lib/recaptcha.js'

export default function AdminLogin() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [recaptchaToken, setRecaptchaToken] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)

  const errorParam = searchParams.get('error')
  
  useEffect(() => {
    if (errorParam) {
      setError('Login failed. Please check your credentials and try again.')
    }
  }, [errorParam])

  useEffect(() => {
    // Load reCAPTCHA script
    if (isRecaptchaEnabled()) {
      const script = document.createElement('script')
      script.src = 'https://www.google.com/recaptcha/api.js'
      script.async = true
      script.defer = true
      document.head.appendChild(script)

      script.onload = () => {
        window.grecaptcha.ready(() => {
          window.grecaptcha.render('recaptcha-container', {
            sitekey: getRecaptchaSiteKey(),
            callback: (token) => {
              setRecaptchaToken(token)
            }
          })
        })
      }
    }

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Validate form
      if (!email || !password) {
        setError('Email and password are required')
        setIsLoading(false)
        return
      }

      if (!recaptchaToken && isRecaptchaEnabled()) {
        setError('Please complete the reCAPTCHA verification')
        setIsLoading(false)
        return
      }

      // Verify reCAPTCHA if enabled
      if (isRecaptchaEnabled()) {
        setIsVerifying(true)
        const recaptchaResult = await verifyRecaptcha(recaptchaToken)
        setIsVerifying(false)

        if (!recaptchaResult.success) {
          setError('reCAPTCHA verification failed. Please try again.')
          setIsLoading(false)
          return
        }

        // Check score threshold (0.5 is recommended)
        if (recaptchaResult.score < 0.5) {
          setError('reCAPTCHA verification failed. Please try again.')
          setIsLoading(false)
          return
        }
      }

      // Attempt login
      const result = await signIn('credentials', {
        email,
        password,
        recaptchaToken,
        redirect: false
      })

      if (result.error) {
        setError(result.error.message || 'Login failed. Please try again.')
      } else {
        // Check if user is admin
        const session = await getSession()
        if (session?.user?.role === 'admin') {
          router.push('/admin/dashboard')
        } else {
          setError('Access denied. Admin privileges required.')
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass-card-dark rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4"
            >
              <Shield className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-gray-400 text-sm">Enter your credentials to access the admin panel</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-400 text-sm font-medium">{error}</span>
              </div>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 p-1 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* reCAPTCHA */}
            {isRecaptchaEnabled() && (
              <div className="mb-6">
                <div id="recaptcha-container" className="flex justify-center" />
                {isVerifying && (
                  <div className="mt-2 text-center">
                    <div className="inline-flex items-center space-x-2 text-blue-400">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-r-2 border-t-2 border-l-2 border-blue-400"></div>
                      <span className="text-sm">Verifying reCAPTCHA...</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading || isVerifying}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {isLoading || isVerifying ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-r-2 border-t-2 border-l-2 border-white"></div>
                  <span>
                    {isVerifying ? 'Verifying...' : 'Signing in...'}
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Sign In</span>
                </div>
              )}
            </motion.button>
          </form>

          {/* Additional Options */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              <a href="/forgot-password" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                Forgot your password?
              </a>
            </p>
          </div>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg"
          >
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <p className="text-blue-400 text-sm font-medium mb-1">Protected Area</p>
                <p className="text-gray-400 text-xs">
                  This area is protected by reCAPTCHA and requires administrator privileges. 
                  Unauthorized access attempts are logged and monitored.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
