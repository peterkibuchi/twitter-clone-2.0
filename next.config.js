/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.js"));

/** @type {import("next").NextConfig} */
const config = {
  images: { domains: ["images.clerk.com"] },

  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};
export default config;
