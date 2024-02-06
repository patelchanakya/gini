module.exports = {
    experimental: {
        serverActions: true,
    },
    async rewrites() {
        return [
            {
                source: '/api/transcribe/:path*',
                destination: 'https://patelchanakya--newer-app-fastapi-app.modal.run/api/transcribe/:path*',
            },
        ]
    },
};
