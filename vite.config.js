import { defineConfig } from 'vite'

export default defineConfig({
    base: '/',
    build: {
        rollupOptions: {
            input: {
                main: './index.html',
                reports: './reports.html',
                press: './press.html',
                pressDetail: './press-detail.html',
                adminLogin: './admin/login.html',
                adminIndex: './admin/index.html',
                adminPressList: './admin/press-list.html',
                adminPressWrite: './admin/press-write.html'
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
