import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const config: StorybookConfig = {
  stories: ['../package/home/src/**/*.stories.@(js|jsx|ts|tsx|mdx)', '../storybook/src/stories/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-onboarding',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [tsconfigPaths({
        projects: ['../package/home/tsconfig.paths.json'],
      })],
      resolve: {
        alias: {
          '@common': new URL('../package/home/src/common', import.meta.url).pathname.replace(/\\/g, '/'),
          '@ui-kit': new URL('../package/home/src/ui-kit', import.meta.url).pathname.replace(/\\/g, '/'),
          '@config': new URL('../package/home/src/config', import.meta.url).pathname.replace(/\\/g, '/'),
          '@domain': new URL('../package/home/src/domain', import.meta.url).pathname.replace(/\\/g, '/'),
          '@pages': new URL('../package/home/src/pages', import.meta.url).pathname.replace(/\\/g, '/'),
          '@store': new URL('../package/home/src/store', import.meta.url).pathname.replace(/\\/g, '/'),
          '@asset': new URL('../package/home/src/asset', import.meta.url).pathname.replace(/\\/g, '/'),
          '@router': new URL('../package/home/src/Router.tsx', import.meta.url).pathname.replace(/\\/g, '/'),
        },
      },
    });
  },
};

export default config;

