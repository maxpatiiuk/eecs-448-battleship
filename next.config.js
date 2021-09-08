module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  redirects: () => [
    {
      source: '/en/:any*',
      destination: '/',
      permanent: true,
    },
  ],
};
