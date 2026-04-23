import adapter from '@sveltejs/adapter-static';
import {mdsvex} from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  compilerOptions: {
    runes: ({filename}) =>
        filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
    experimental: {
      async: true,
    }
  },
  kit: {
    adapter: adapter(),
    paths: {
      base: process.env.NODE_ENV === "production" ? "/portfolio" : "",
    }
  },
  preprocess: [mdsvex({extensions: ['.svx', '.md']})],
  extensions: ['.svelte', '.svx', '.md']
};

export default config;
