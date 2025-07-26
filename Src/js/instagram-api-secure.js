// Cliente seguro para la API de Instagram
// Esta versión NO contiene el token de acceso

class InstagramAPISecure {
    constructor() {
        this.apiUrl = '/api/instagram/posts';
        this.postsLimit = 6;
        this.demoMode = true;
    }

    // Obtener las publicaciones desde el servidor
    async getPosts() {
        try {
            const response = await fetch(this.apiUrl);
            const data = await response.json();
            
            if (!data.success) {
                console.warn('API Response:', data.message);
            }
            
            return data.data || [];
        } catch (error) {
            console.error('Error al obtener publicaciones:', error);
            return this.getDemoPosts();
        }
    }

    // Datos de demostración (fallback)
    getDemoPosts() {
        return [
            {
                id: 'demo_1',
                caption: '¡Bienvenidos a Cabimas! 🌅 Hermoso atardecer en nuestro puerto petrolero. #Cabimas #Venezuela #PuertoPetrolero',
                media_type: 'IMAGE',
                media_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
                permalink: 'https://instagram.com/demo',
                timestamp: new Date().toISOString()
            },
            {
                id: 'demo_2',
                caption: 'Trabajando por el desarrollo de nuestra ciudad 💪 #Desarrollo #Cabimas #Futuro',
                media_type: 'IMAGE',
                media_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
                permalink: 'https://instagram.com/demo',
                timestamp: new Date(Date.now() - 86400000).toISOString()
            },
            {
                id: 'demo_3',
                caption: 'Celebrando la cultura y tradiciones de Cabimas 🎉 #Cultura #Tradición #Cabimas',
                media_type: 'VIDEO',
                media_url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=300&h=200&fit=crop',
                thumbnail_url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=300&h=200&fit=crop',
                permalink: 'https://instagram.com/demo',
                timestamp: new Date(Date.now() - 172800000).toISOString()
            }
        ];
    }

    // Formatear fecha de Instagram
    formatDate(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleDateString('es-VE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Obtener texto del caption (primeras 100 caracteres)
    getCaptionPreview(caption) {
        if (!caption) return 'Sin descripción';
        return caption.length > 100 ? caption.substring(0, 100) + '...' : caption;
    }

    // Obtener imagen según el tipo de media
    getMediaUrl(post) {
        if (post.media_type === 'VIDEO') {
            return post.thumbnail_url || post.media_url;
        }
        return post.media_url;
    }

    // Crear HTML para una publicación
    createPostHTML(post, index) {
        const mediaUrl = this.getMediaUrl(post);
        const videoUrl = post.media_type === 'VIDEO' ? post.media_url : null;
        const caption = this.getCaptionPreview(post.caption);
        const date = this.formatDate(post.timestamp);
        const mediaType = post.media_type === 'VIDEO' ? 'video' : 'image';
        const isDemo = post.id.startsWith('demo_');

        // Crear el elemento de media (video o imagen)
        const mediaElement = post.media_type === 'VIDEO' 
            ? `<div class="relative w-full h-full group cursor-pointer" onclick="window.open('${post.permalink}', '_blank')">
                   <img class="w-full h-full object-cover rounded-lg" 
                        src="${post.thumbnail_url || post.media_url}" 
                        alt="Video de Instagram ${index + 1}"
                        onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04MCA2MEwxNDAgMTAwTDgwIDE0MFY2MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+'">
                   <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black bg-opacity-30 rounded-lg">
                       <div class="bg-black bg-opacity-70 rounded-full p-4">
                           <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                               <path d="M8 5v14l11-7z"/>
                           </svg>
                       </div>
                   </div>
               </div>`
            : `<img class="w-full h-full object-cover rounded-lg" src="${mediaUrl}" alt="Publicación de Instagram ${index + 1}">`;

        return `
            <div class="bg-gray-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${isDemo ? 'border-2 border-yellow-300' : ''}">
                ${isDemo ? '<div class="bg-yellow-100 text-yellow-800 text-center py-2 text-sm font-semibold">Modo Demostración</div>' : ''}
                <div class="flex flex-col lg:flex-row">
                    <div class="w-full lg:w-1/3 h-48 lg:h-48 relative">
                        ${mediaElement}
                        ${post.media_type === 'VIDEO' ? '<div class="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">🎥</div>' : ''}
                    </div>
                    <div class="p-6 flex-1">
                        <div class="flex items-center justify-between mb-3">
                            <h2 class="text-xl sm:text-2xl font-bold text-gray-800">Publicación ${index + 1}</h2>
                            <span class="text-sm text-gray-500">${date}</span>
                        </div>
                        <p class="text-gray-700 text-sm sm:text-base mb-4 leading-relaxed">
                            ${caption}
                        </p>
                        <div class="flex flex-wrap gap-2 mb-4">
                            <span class="bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full">#instagram</span>
                            <span class="bg-pink-100 text-pink-800 text-xs font-semibold px-3 py-1 rounded-full">#cabimas</span>
                            <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">#${mediaType}</span>
                        </div>
                        <a href="${post.permalink}" target="_blank" rel="noopener noreferrer" 
                           class="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
                            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                            Ver en Instagram
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    // Crear mensaje de configuración
    createConfigMessage() {
        return `
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <div class="flex items-start">
                    <div class="flex-shrink-0">
                        <svg class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </div>
                    <div class="ml-3">
                        <h3 class="text-lg font-medium text-blue-800 mb-2">API Segura Configurada</h3>
                        <div class="text-blue-700 text-sm space-y-2">
                            <p><strong>✅ Seguridad implementada:</strong></p>
                            <ul class="list-disc list-inside space-y-1 ml-4">
                                <li>Token de Instagram oculto en el servidor</li>
                                <li>Variables de entorno protegidas</li>
                                <li>API calls manejadas por el backend</li>
                                <li>Cliente sin información sensible</li>
                            </ul>
                            <p class="mt-3 text-xs">Los datos se obtienen de forma segura desde el servidor.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Renderizar las publicaciones en el contenedor
    async renderPosts(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('Contenedor no encontrado:', containerId);
            return;
        }

        // Mostrar loading
        container.innerHTML = `
            <div class="flex justify-center items-center py-12">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                <span class="ml-3 text-gray-600">Cargando publicaciones de Instagram...</span>
            </div>
        `;

        try {
            const posts = await this.getPosts();
            
            if (posts.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-12">
                        <div class="text-gray-500 mb-4">
                            <svg class="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-700 mb-2">No se pudieron cargar las publicaciones</h3>
                        <p class="text-gray-500">Verifica la configuración del servidor o intenta más tarde.</p>
                    </div>
                `;
                return;
            }

            // Mostrar mensaje de configuración segura
            const configMessage = this.createConfigMessage();

            // Crear HTML para todas las publicaciones
            const postsHTML = posts.map((post, index) => this.createPostHTML(post, index)).join('');
            
            container.innerHTML = `
                ${configMessage}
                <div class="space-y-6">
                    ${postsHTML}
                </div>
            `;

        } catch (error) {
            console.error('Error al renderizar publicaciones:', error);
            container.innerHTML = `
                <div class="text-center py-12">
                    <div class="text-red-500 mb-4">
                        <svg class="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-700 mb-2">Error al cargar publicaciones</h3>
                    <p class="text-gray-500">${error.message}</p>
                </div>
            `;
        }
    }
}

// Inicializar la API cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    const instagramAPI = new InstagramAPISecure();
    
    // Renderizar publicaciones en el contenedor de Instagram
    if (document.getElementById('instagram-posts')) {
        instagramAPI.renderPosts('instagram-posts');
    }
    
    // Agregar funcionalidades adicionales para imágenes y videos
    setTimeout(() => {
        const mediaElements = document.querySelectorAll('#instagram-posts .group');
        mediaElements.forEach(element => {
            // Agregar efecto de hover mejorado
            element.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
            
            // Agregar transición suave
            element.style.transition = 'transform 0.2s ease-in-out';
        });
    }, 1000);
});

// Exportar para uso global
window.InstagramAPISecure = InstagramAPISecure; 