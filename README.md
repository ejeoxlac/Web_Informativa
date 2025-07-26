# 🌐 WEBInformativa - Sitio Web Informativo de Cabimas

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18+-blue.svg)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38B2AC.svg)](https://tailwindcss.com/)
[![Instagram API](https://img.shields.io/badge/Instagram_API-Secure-orange.svg)](https://developers.facebook.com/docs/instagram-basic-display-api)

> Sitio web informativo moderno para la ciudad de Cabimas, Venezuela. Incluye integración segura con la API de Instagram y diseño responsive.

## 📋 Tabla de Contenidos

- [🚀 Características](#-características)
- [🛠️ Tecnologías](#️-tecnologías)
- [📦 Instalación](#-instalación)
- [⚙️ Configuración](#️-configuración)
- [🚀 Uso](#-uso)
- [🔒 Seguridad](#-seguridad)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🌐 Páginas Disponibles](#-páginas-disponibles)
- [📱 API de Instagram](#-api-de-instagram)
- [🤝 Contribuir](#-contribuir)
- [📄 Licencia](#-licencia)

## 🚀 Características

- ✅ **Diseño Responsive** - Optimizado para móviles, tablets y desktop
- ✅ **API de Instagram Segura** - Integración protegida con tokens ocultos
- ✅ **Navegación Moderna** - Interfaz intuitiva y accesible
- ✅ **Contenido Dinámico** - Publicaciones de Instagram en tiempo real
- ✅ **Optimización SEO** - Meta tags y estructura semántica
- ✅ **Carga Rápida** - Optimizado para rendimiento
- ✅ **Seguridad Avanzada** - Tokens protegidos en variables de entorno

## 🛠️ Tecnologías

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con Tailwind CSS
- **JavaScript ES6+** - Funcionalidad interactiva
- **Tailwind CSS** - Framework de utilidades CSS

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **Instagram Basic Display API** - Integración con redes sociales

### Herramientas de Desarrollo
- **npm** - Gestor de paquetes
- **nodemon** - Recarga automática en desarrollo
- **dotenv** - Variables de entorno

## 📦 Instalación

### Prerrequisitos
- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [npm](https://www.npmjs.com/) (incluido con Node.js)
- Cuenta de Instagram Business/Creator

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/WEBInformativa.git
   cd WEBInformativa
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp env.example .env
   ```

4. **Editar el archivo `.env`**
   ```env
   # Token de Instagram (REQUERIDO)
   INSTAGRAM_ACCESS_TOKEN=tu_token_aqui
   # ID de usuario de Instagram (OPCIONAL)
   INSTAGRAM_USER_ID=
   # Número de publicaciones a mostrar
   INSTAGRAM_POSTS_LIMIT=6
   # Modo de demostración (true/false)
   INSTAGRAM_DEMO_MODE=true
   ```

## ⚙️ Configuración

### Configurar Token de Instagram

1. Ve a [Facebook Developers](https://developers.facebook.com/)
2. Crea una nueva app o usa una existente
3. Configura Instagram Basic Display
4. Conecta tu cuenta de Instagram Business/Creator
5. Genera un token de acceso de larga duración
6. Reemplaza `tu_token_aqui` en el archivo `.env`

### Variables de Entorno

| Variable | Descripción | Requerido | Valor por Defecto |
|----------|-------------|-----------|-------------------|
| `INSTAGRAM_ACCESS_TOKEN` | Token de acceso de Instagram | ✅ Sí | - |
| `INSTAGRAM_USER_ID` | ID de usuario de Instagram | ❌ No | Auto-detectado |
| `INSTAGRAM_POSTS_LIMIT` | Número de publicaciones | ❌ No | 6 |
| `INSTAGRAM_DEMO_MODE` | Modo demostración | ❌ No | true |

## 🚀 Uso

### Desarrollo
```bash
# Iniciar servidor de desarrollo
npm run dev

# El servidor estará disponible en:
# http://localhost:3000
```

### Producción
```bash
# Iniciar servidor de producción
npm start

# El servidor estará disponible en:
# http://localhost:3000
```

### Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia el servidor de producción |
| `npm run dev` | Inicia el servidor de desarrollo con nodemon |
| `npm install` | Instala las dependencias |

## 🔒 Seguridad

### Protecciones Implementadas

- ✅ **Tokens Ocultos** - Variables de entorno protegidas
- ✅ **API Proxy** - Servidor backend como intermediario
- ✅ **CORS Configurado** - Políticas de seguridad
- ✅ **Archivos Ignorados** - `.env` no se sube a Git
- ✅ **Validación de Tokens** - Verificación de autenticación

### Archivos de Seguridad

- `.gitignore` - Configurado para ignorar archivos sensibles
- `.env` - Variables de entorno (NO se sube a Git)
- `env.example` - Plantilla para configuración

## 📁 Estructura del Proyecto

```
WEBInformativa/
├── 📄 server.js              # Servidor Express
├── 📄 package.json           # Configuración del proyecto
├── 📄 .env                   # Variables de entorno (NO en Git)
├── 📄 .gitignore            # Archivos ignorados por Git
├── 📄 env.example           # Plantilla de variables
├── 📄 SECURITY_GUIDE.md     # Guía de seguridad
├── 📁 Src/
│   ├── 📁 Pages/            # Páginas HTML
│   │   ├── home.html        # Página principal
│   │   ├── aboutus.html     # Sobre nosotros
│   │   ├── services.html    # Servicios
│   │   ├── news.html        # Noticias
│   │   ├── officials.html   # Funcionarios
│   │   ├── history.html     # Historia
│   │   └── gazette.html     # Gaceta
│   ├── 📁 js/               # JavaScript
│   │   ├── instagram-api-secure.js  # API segura de Instagram
│   │   └── imgcarousel.js   # Carousel de imágenes
│   ├── 📁 Styles/           # Estilos CSS
│   └── 📁 Assets/           # Recursos (imágenes, etc.)
└── 📁 node_modules/         # Dependencias (NO en Git)
```

## 🌐 Páginas Disponibles

| Página | URL | Descripción |
|--------|-----|-------------|
| 🏠 **Home** | `/` | Página principal con información general |
| 👥 **About Us** | `/aboutus` | Información sobre la organización |
| 🛠️ **Services** | `/services` | Servicios disponibles |
| 📰 **News** | `/news` | Noticias y actualizaciones |
| 👨‍💼 **Officials** | `/officials` | Información de funcionarios |
| 📚 **History** | `/history` | Historia de la ciudad |
| 📋 **Gazette** | `/gazette` | Gaceta oficial |

## 📱 API de Instagram

### Características

- ✅ **Integración Segura** - Token oculto en servidor
- ✅ **Carga Dinámica** - Publicaciones en tiempo real
- ✅ **Soporte de Videos** - Thumbnails con redirección
- ✅ **Modo Demo** - Datos de ejemplo sin token
- ✅ **Manejo de Errores** - Fallbacks elegantes

### Endpoints

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/instagram/posts` | GET | Obtiene publicaciones de Instagram |

### Ejemplo de Respuesta

```json
{
  "success": true,
  "data": [
    {
      "id": "123456789",
      "caption": "¡Bienvenidos a Cabimas! 🌅",
      "media_type": "IMAGE",
      "media_url": "https://...",
      "permalink": "https://instagram.com/p/...",
      "timestamp": "2024-01-01T12:00:00Z"
    }
  ]
}
```

## 🤝 Contribuir

1. **Fork** el proyecto
2. **Crea** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre** un Pull Request

### Guías de Contribución

- Mantén el código limpio y documentado
- Sigue las convenciones de nomenclatura
- Prueba tus cambios antes de hacer commit
- Actualiza la documentación si es necesario

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Contacto

- **Desarrollador:** Ejeoxlac
- **GitHub:** [@ejeoxlac](https://github.com/ejeoxlac)
- **Proyecto:** [WEBInformativa](https://github.com/ejeoxlac/Web_Informativa)

## 🙏 Agradecimientos

- [Instagram Basic Display API](https://developers.facebook.com/docs/instagram-basic-display-api)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express.js](https://expressjs.com/)
- [Node.js](https://nodejs.org/)

---

<div align="center">

**⭐ Si este proyecto te ha sido útil, ¡dale una estrella en GitHub!**

</div>
