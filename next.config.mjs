/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
  images: {
    domains: [
      "cdn.open-pr.com", // <- add all external image hosts you need
      "i.cbc.ca",
      "www.travelandtourworld.com",
      "another-domain.com" // optional
      
    ],     

   
  },
};

export default nextConfig;
