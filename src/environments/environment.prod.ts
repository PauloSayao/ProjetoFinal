export const environment = {
  production: true,
  apiUrl: 'https://api-trufas.onrender.com', // Production API URL
  version: '1.0.0',
  enableDebug: false,
  
  // API endpoints (optional but recommended)
  endpoints: {
    auth: {
      login: '/login',
      register: '/register',
      logout: '/logout'
    },
    products: '/produtos',
    orders: '/pedidos'
  },

  // Security settings
  security: {
    minPasswordLength: 6,
    sessionTimeout: 3600 // in seconds (1 hour)
  },

  // Feature flags (optional)
  features: {
    enableAnalytics: false,
    enableExperimentalFeatures: false
  },

  // External services (optional)
  externalServices: {
    googleMapsKey: '',
    recaptchaSiteKey: ''
  }
};