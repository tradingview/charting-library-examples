// vite.config.ts
import {defineConfig} from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
    plugins: [solidPlugin()],
    css: {
        modules: {
            scopeBehaviour: 'local', // Default is 'local', which scopes class names
            generateScopedName: '[name]__[local]___[hash:base64:5]', // Customize the naming pattern
        },
    },
});
