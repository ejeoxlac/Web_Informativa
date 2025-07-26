# 🔒 Guía de Seguridad para API de Instagram

## ⚠️ Problema de Seguridad

**NUNCA expongas tu token de Instagram en el código del cliente** porque:
- ✅ Cualquiera puede ver el código fuente del navegador
- ✅ El token puede ser robado y usado por otros
- ✅ Puede resultar en límites de API excedidos
- ✅ Compromete la seguridad de tu cuenta

## ✅ Solución Implementada

### Arquitectura Segura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Cliente       │    │   Servidor      │    │   Instagram     │
│   (Frontend)    │    │   (Backend)     │    │   API           │
│                 │    │                 │    │                 │
│ ❌ Sin Token    │───▶│ ✅ Token Oculto │───▶│ ✅ API Calls    │
│ ✅ Solo UI      │    │ ✅ Variables ENV │    │ ✅ Datos        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Configuración Paso a Paso

### 1. Instalar Dependencias

```bash
npm install express cors dotenv
npm install --save-dev nodemon
```

### 2. Crear Archivo de Variables de Entorno

Copia `env.example` como `.env`:

```bash
cp env.example .env
```

Edita `.env` con tus datos reales:

```env
# Token de Instagram (REQUERIDO)
INSTAGRAM_ACCESS_TOKEN=IGQWRP...tu_token_real_aqui...XYZ

# ID de usuario de Instagram (OPCIONAL)
INSTAGRAM_USER_ID=

# Número de publicaciones a mostrar
INSTAGRAM_POSTS_LIMIT=6

# Modo de demostración (true/false)
INSTAGRAM_DEMO_MODE=false
```

### 3. Iniciar el Servidor

```bash
# Desarrollo
npm run dev

# Producción
npm start
```

### 4. Usar el Cliente Seguro

En tus páginas HTML, usa el script seguro:

```html
<!-- Script seguro (NO contiene token) -->
<script src="Src/js/instagram-api-secure.js"></script>
```

## 🔧 Archivos del Sistema Seguro

### Backend (Servidor)
- `server.js` - Servidor Express con API segura
- `package.json` - Dependencias del proyecto
- `.env` - Variables de entorno (NO subir a Git)

### Frontend (Cliente)
- `Src/js/instagram-api-secure.js` - Cliente sin token
- `Src/Pages/*.html` - Páginas que usan el cliente seguro

### Configuración
- `env.example` - Ejemplo de variables de entorno
- `SECURITY_GUIDE.md` - Esta guía de seguridad

## 🛡️ Medidas de Seguridad

### ✅ Implementadas
- **Token oculto**: Solo en variables de entorno del servidor
- **API proxy**: Todas las llamadas pasan por el backend
- **CORS configurado**: Control de acceso desde el frontend
- **Error handling**: Manejo seguro de errores
- **Fallback**: Datos de demo si hay problemas

### 🔒 Archivos Protegidos
```
✅ .env                    # Variables de entorno (NO subir a Git)
✅ server.js              # Lógica del servidor
✅ package.json           # Dependencias
❌ instagram-api.js       # Versión antigua (con token expuesto)
❌ instagram-api-secure.js # Cliente seguro (sin token)
```

## 📋 Comandos Útiles

### Desarrollo
```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Verificar configuración
node -e "require('dotenv').config(); console.log('Token:', process.env.INSTAGRAM_ACCESS_TOKEN ? '✅ Configurado' : '❌ No configurado')"
```

### Producción
```bash
# Instalar dependencias
npm install --production

# Iniciar servidor
npm start

# Con PM2 (recomendado)
pm2 start server.js --name "web-informativa"
```

## 🌐 Despliegue Seguro

### Opciones de Hosting

#### 1. **Vercel** (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel

# Configurar variables de entorno
vercel env add INSTAGRAM_ACCESS_TOKEN
```

#### 2. **Heroku**
```bash
# Instalar Heroku CLI
# Crear app
heroku create web-informativa

# Configurar variables
heroku config:set INSTAGRAM_ACCESS_TOKEN=tu_token_aqui

# Desplegar
git push heroku main
```

#### 3. **Railway**
```bash
# Instalar Railway CLI
npm i -g @railway/cli

# Login y crear proyecto
railway login
railway init

# Configurar variables
railway variables set INSTAGRAM_ACCESS_TOKEN=tu_token_aqui

# Desplegar
railway up
```

## 🔍 Verificación de Seguridad

### Checklist
- [ ] **Token NO está en el código del cliente**
- [ ] **Archivo .env está en .gitignore**
- [ ] **Servidor maneja todas las API calls**
- [ ] **Variables de entorno configuradas**
- [ ] **CORS configurado correctamente**
- [ ] **Error handling implementado**

### Pruebas
```bash
# Verificar que el token no está expuesto
grep -r "IGQWRP" Src/js/ || echo "✅ Token no encontrado en cliente"

# Verificar variables de entorno
node -e "require('dotenv').config(); console.log('Variables:', Object.keys(process.env).filter(k => k.includes('INSTAGRAM')))"
```

## 🚨 Consideraciones Importantes

### Variables de Entorno
- **NUNCA** subas `.env` a Git
- **SIEMPRE** usa `env.example` como plantilla
- **CONFIGURA** las variables en tu servidor de producción

### Token de Instagram
- **ROTA** el token periódicamente (cada 60 días)
- **MONITOREA** el uso de la API
- **CONFIGURA** límites de rate limiting

### Seguridad del Servidor
- **USA HTTPS** en producción
- **CONFIGURA** CORS apropiadamente
- **IMPLEMENTA** rate limiting
- **MONITOREA** logs de acceso

## 📞 Soporte

### Problemas Comunes

#### Error: "Token no configurado"
```bash
# Verificar archivo .env
cat .env

# Verificar variables en el servidor
node -e "require('dotenv').config(); console.log(process.env.INSTAGRAM_ACCESS_TOKEN)"
```

#### Error: "CORS policy"
```javascript
// En server.js, verificar configuración CORS
app.use(cors({
    origin: ['http://localhost:3000', 'https://tudominio.com']
}));
```

#### Error: "Cannot find module"
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

## ✅ Conclusión

Con esta implementación:

1. **🔒 Tu token está seguro** - Solo en el servidor
2. **🚀 Funciona en producción** - Listo para desplegar
3. **📱 Cliente limpio** - Sin información sensible
4. **🛡️ Seguridad robusta** - Múltiples capas de protección

¡Tu API de Instagram ahora es completamente segura! 🎉 