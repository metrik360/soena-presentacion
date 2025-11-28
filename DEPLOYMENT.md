# 🚀 Guía de Despliegue en GitHub Pages

## Opción 1: Despliegue rápido (Recomendado)

### Requisitos
- Cuenta en GitHub
- Git instalado
- GitHub CLI (opcional pero recomendado)

### Pasos

#### 1. Crear repositorio en GitHub
```bash
# Opción A: Usando GitHub web
# 1. Ve a https://github.com/new
# 2. Nombre: soena-presentacion
# 3. Descripción: "Presentación comercial SOENA - Plan de Transformación Operacional"
# 4. Privado o Público (elige según necesidad)
# 5. NO INICIALICES con README (ya tenemos uno)
# 6. Click en "Create repository"

# Opción B: Usando GitHub CLI
gh repo create soena-presentacion --public --source=. --remote=origin --push
```

#### 2. Conectar con tu repositorio remoto
```bash
# Reemplaza TU_USUARIO con tu username de GitHub
git remote add origin https://github.com/TU_USUARIO/soena-presentacion.git
git branch -M main
git push -u origin main
```

#### 3. Habilitar GitHub Pages
```bash
# Opción A: Desde GitHub web
# 1. Ve a tu repositorio en GitHub
# 2. Settings → Pages
# 3. Source: "Deploy from a branch"
# 4. Branch: "main" | Folder: "/ (root)"
# 5. Click "Save"

# Opción B: Verificar que ya está habilitado
# La presentación se publicará automáticamente en:
# https://TU_USUARIO.github.io/soena-presentacion/
```

#### 4. Verificar despliegue
- Espera 1-2 minutos
- Ve a: `https://TU_USUARIO.github.io/soena-presentacion/`
- ¡Listo! Tu presentación está en línea

---

## Opción 2: Despliegue con Actions (CI/CD)

### Setup automático
```bash
# GitHub Actions detectará automáticamente que es un sitio estático
# y lo despliegará sin configuración adicional
```

Para ver el estado:
1. Ve a tu repositorio en GitHub
2. Actions → Deployments
3. Verifica que el último workflow pasó (✅)

---

## Opción 3: Despliegue en otros servicios

### Netlify (10 segundos)
```bash
# 1. Ve a https://app.netlify.com
# 2. "Add new site" → "Import an existing project"
# 3. Conecta tu repositorio GitHub
# 4. Deploy settings ya están configurados
# 5. Click "Deploy site"
# 6. Tu URL será: https://soena-[random].netlify.app
```

### Vercel (10 segundos)
```bash
# 1. Ve a https://vercel.com
# 2. "Import Project"
# 3. Selecciona tu repositorio
# 4. Click "Deploy"
# 5. Tu URL será: https://soena-[random].vercel.app
```

---

## 🔍 Verificación Post-Despliegue

### Checklist
- [ ] La presentación carga en el navegador
- [ ] Navegación con teclado funciona (flechas, espacio)
- [ ] Swipe en móvil funciona
- [ ] Todos los 15 slides son accesibles
- [ ] Los estilos se cargan correctamente
- [ ] El logo y colores aparecen bien
- [ ] Pantalla completa funciona (F)
- [ ] Impresión funciona (Ctrl/Cmd+P)

### Pruebas de navegadores
- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Chrome Mobile
- ✅ Safari iOS

---

## 📊 URLs Finales

Después del despliegue, tu presentación estará disponible en:

```
https://TU_USUARIO.github.io/soena-presentacion/
```

Comparte esta URL en:
- Email comercial
- Presentación en video conferencia
- QR en materiales impresos
- Landing page de propuesta

---

## 🔧 Actualizaciones Futuras

Para hacer cambios:

```bash
# 1. Editar archivos localmente
# 2. Hacer commit
git add .
git commit -m "Descripción del cambio"

# 3. Push a GitHub
git push origin main

# GitHub Pages se actualizará automáticamente en 1-2 minutos
```

---

## 📧 Soporte y Problemas

### La presentación no se ve
- [ ] Verifica que habilitaste GitHub Pages
- [ ] Espera 2-3 minutos tras el primer push
- [ ] Limpia caché del navegador (Ctrl+Shift+Del)

### Estilos no cargan
- [ ] Verifica que styles.css está en la raíz
- [ ] Comprueba la consola (F12) para errores
- [ ] Asegúrate que no hay caracteres especiales en nombres

### Script no funciona
- [ ] Verifica que script.js está en la raíz
- [ ] Abre consola (F12) y revisa errores
- [ ] Script es vanilla JS, sin dependencias

---

## 💡 Tips

1. **Privacidad**: Si es confidencial, crea repo privado
2. **Dominio propio**: Puedes conectar un dominio personalizado en Settings > Pages
3. **Analítica**: GitHub Pages no incluye análisis; usa Google Analytics si necesitas
4. **Performance**: GitHub Pages sirve contenido estático muy rápido (< 100ms)
5. **Historial**: Todos los cambios quedan en Git para auditoría

---

## 🎉 ¡Listo!

Tu presentación SOENA está lista para impresionar.

**URL a compartir:** `https://TU_USUARIO.github.io/soena-presentacion/`

---

**Última actualización:** Noviembre 2025
**Estado:** Producción ✅
