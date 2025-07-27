const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('Src'));

// Ruta específica para archivos estáticos
app.use('/Assets', express.static(path.join(__dirname, 'Src/Assets')));
app.use('/Styles', express.static(path.join(__dirname, 'Src/Styles')));
app.use('/js', express.static(path.join(__dirname, 'Src/js')));

// Configuración de Instagram desde variables de entorno
const INSTAGRAM_CONFIG = {
    accessToken: process.env.INSTAGRAM_ACCESS_TOKEN,
    userId: process.env.INSTAGRAM_USER_ID,
    postsLimit: process.env.INSTAGRAM_POSTS_LIMIT || 6,
    demoMode: process.env.INSTAGRAM_DEMO_MODE === 'true'
};

// Ruta para obtener publicaciones de Instagram
app.get('/api/instagram/posts', async (req, res) => {
    try {
        // Verificar si hay token válido
        if (!INSTAGRAM_CONFIG.accessToken || INSTAGRAM_CONFIG.accessToken === 'tu_token_aqui') {
            return res.json({
                success: false,
                message: 'Token de Instagram no configurado',
                data: getDemoPosts()
            });
        }

        // Obtener ID de usuario si no está configurado
        let userId = INSTAGRAM_CONFIG.userId;
        if (!userId) {
            const userResponse = await fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${INSTAGRAM_CONFIG.accessToken}`);
            const userData = await userResponse.json();
            
            if (userData.error) {
                throw new Error(`Error de autenticación: ${userData.error.message}`);
            }
            
            userId = userData.id;
        }

        // Obtener publicaciones
        const response = await fetch(
            `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${INSTAGRAM_CONFIG.accessToken}&limit=${INSTAGRAM_CONFIG.postsLimit}`
        );
        
        const data = await response.json();
        
        if (data.error) {
            throw new Error(`Error al obtener publicaciones: ${data.error.message}`);
        }
        
        res.json({
            success: true,
            data: data.data || []
        });

    } catch (error) {
        console.error('Error en API de Instagram:', error);
        
        // Si hay error y estamos en modo demo, devolver datos de ejemplo
        if (INSTAGRAM_CONFIG.demoMode) {
            res.json({
                success: false,
                message: 'Error en API, usando datos de demostración',
                data: getDemoPosts()
            });
        } else {
            res.status(500).json({
                success: false,
                message: error.message,
                data: []
            });
        }
    }
});

// Datos de demostración
function getDemoPosts() {
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

// Rutas para todas las páginas HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Src/Pages/home.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'Src/Pages/home.html'));
});

app.get('/aboutus', (req, res) => {
    res.sendFile(path.join(__dirname, 'Src/Pages/aboutus.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'Src/Pages/services.html'));
});

app.get('/news', (req, res) => {
    res.sendFile(path.join(__dirname, 'Src/Pages/news.html'));
});

app.get('/officials', (req, res) => {
    res.sendFile(path.join(__dirname, 'Src/Pages/officials.html'));
});

app.get('/history', (req, res) => {
    res.sendFile(path.join(__dirname, 'Src/Pages/history.html'));
});

app.get('/gazette', (req, res) => {
    res.sendFile(path.join(__dirname, 'Src/Pages/gazette.html'));
});

app.get('/test-images', (req, res) => {
    res.sendFile(path.join(__dirname, 'test-images.html'));
});


// Ruta para archivos HTML directos
app.get('/:page.html', (req, res) => {
    const page = req.params.page;
    const filePath = path.join(__dirname, 'Src/Pages', `${page}.html`);
    
    // Verificar si el archivo existe
    if (require('fs').existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('Página no encontrada');
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📱 API de Instagram disponible en http://localhost:${PORT}/api/instagram/posts`);
    console.log(`🔒 Token configurado: ${INSTAGRAM_CONFIG.accessToken ? '✅ Sí' : '❌ No'}`);
}); 