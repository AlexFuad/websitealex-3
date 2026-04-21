export async function verifyRecaptcha(token) {
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    })

    const result = await response.json()
    
    return {
      success: result.success,
      score: result.score,
      errorCodes: result['error-codes'] || [],
      timestamp: result.challenge_ts
    }
  } catch (error) {
    console.error('reCAPTCHA verification error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

export function getRecaptchaSiteKey() {
  return process.env.RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHhVUM6ga'
}

export function isRecaptchaEnabled() {
  return !!(process.env.RECAPTCHA_SITE_KEY && process.env.RECAPTCHA_SECRET_KEY)
}
