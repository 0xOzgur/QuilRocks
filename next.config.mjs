/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    webpack: (config, { isServer }) => {
      config.experiments = {
        ...config.experiments,
        asyncWebAssembly: true,
      };
  
      config.output.webassemblyModuleFilename = isServer
        ? '././static/wasm/[modulehash].wasm'
        : 'static/wasm/[modulehash].wasm';
  
      return config;
    },
  };
  
  export default nextConfig;