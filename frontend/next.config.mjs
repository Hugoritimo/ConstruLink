// next.config.mjs

import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Ativa o modo estrito do React
  swcMinify: true,       // Habilita a minificação SWC
};

export default withPWA({
  dest: 'public', // Diretório onde o service worker será gerado
  disable: process.env.NODE_ENV === 'development', // Desativa PWA no ambiente de desenvolvimento
});
