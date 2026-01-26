import { defineConfig } from 'vite'

export default defineConfig({
    base: '/',
    build: {
        rollupOptions: {
            input: {
                main: './index.html',
                reports: './reports.html'
            }
        }
    },
    server: {
        // start-server-and-test or localtunnel often use random domains,
        // so we allow all hosts to prevent "Blocked request" errors.
        allowedHosts: true,
        host: true, // Ensure it listens on network interfaces
        hmr: {
            clientPort: 443 // Force client to use HTTPS port for websocket (crucial for localtunnel)
        }
    }
})
