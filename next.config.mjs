/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Позволяет обрабатывать большие объемы данных, необходимые для Plasmic
  staticPageGenerationTimeout: 120,
  // Улучшение производительности
  swcMinify: true,
  // Настройка для правильной обработки маршрутов
  trailingSlash: false,
};

export default nextConfig;
