# DocuMind - POC Análisis de Documentos PDF

Una aplicación web desarrollada con Next.js 14+ que permite subir archivos PDF, visualizarlos y extraer palabras clave automáticamente usando OpenAI.

## 🚀 Características

- **Subida de archivos PDF**: Interfaz drag & drop para cargar documentos
- **Visualización de PDF**: Visor integrado con navegación entre páginas
- **Extracción de palabras clave**: Análisis automático usando OpenAI GPT
- **Arquitectura limpia**: Implementación con Clean Architecture/Hexagonal
- **UI moderna**: Interfaz oscura con Material UI
- **TypeScript**: Tipado estático completo

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 14+ (App Router), React 18, TypeScript
- **UI**: Material UI (MUI), CSS-in-JS
- **PDF**: react-pdf (pdfjs-dist)
- **Backend**: Next.js API Routes, pdf-parse
- **IA**: OpenAI Node SDK
- **Arquitectura**: Clean Architecture / Hexagonal

## 📁 Estructura del Proyecto

```
src/
├── app/                          # Next.js App Router
│   ├── analyze/                  # Página principal
│   │   ├── page.tsx             # Componente principal
│   │   └── components/          # Componentes UI
│   ├── api/analyze/             # API endpoint
│   ├── layout.tsx               # Layout raíz
│   └── globals.css              # Estilos globales
├── core/                        # Lógica de dominio
│   ├── domain/                  # Entidades y puertos
│   └── application/             # Casos de uso y servicios
├── infrastructure/              # Adaptadores externos
│   ├── pdf/                     # Extractor de texto PDF
│   └── llm/                     # Cliente OpenAI
├── composition/                 # Inyección de dependencias
└── lib/                         # Utilidades
```

## 🚀 Instalación y Configuración

### 1. Instalar dependencias

Con Yarn (recomendado y configurado en el proyecto):
```bash
yarn install
```

O con npm (alternativo):
```bash
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
OPENAI_API_KEY=sk-tu-api-key-aqui
OPENAI_MODEL=gpt-4o-mini
MAX_UPLOAD_MB=20
```

### 3. Ejecutar en desarrollo

Con Yarn:
```bash
yarn dev
```

O con npm:
```bash
npm run dev
```

### 4. Abrir la aplicación

Navega a [http://localhost:3000/analyze](http://localhost:3000/analyze)

## 📖 Uso

1. **Subir PDF**: Arrastra un archivo PDF o usa el botón "Seleccionar archivo"
2. **Visualizar**: El PDF se mostrará inmediatamente en la columna izquierda
3. **Analizar**: La aplicación extraerá automáticamente el texto y generará palabras clave
4. **Revisar**: Las palabras clave aparecerán como chips de colores en la columna derecha

### Categorías de Palabras Clave

- **Persona** (azul): Nombres de personas
- **Organización** (cian): Empresas, instituciones
- **Fecha** (verde): Fechas importantes
- **Cantidad** (rojo): Montos, números
- **Ubicación** (naranja): Lugares, direcciones
- **Tema/Otro** (gris): Conceptos generales

## 🏗️ Arquitectura

### Clean Architecture

El proyecto implementa una arquitectura limpia con las siguientes capas:

- **Dominio**: Entidades y puertos (interfaces)
- **Aplicación**: Casos de uso y servicios de aplicación
- **Infraestructura**: Adaptadores para servicios externos
- **Presentación**: Componentes UI y API routes

### Flujo de Datos

1. Usuario sube PDF → Componente UI
2. UI llama API `/api/analyze` → API Route
3. API Route ejecuta `AnalyzePdfUseCase` → Caso de Uso
4. Caso de Uso orquesta:
   - `PdfParseTextExtractor` → Extrae texto
   - `OpenAIKeywordExtractor` → Genera palabras clave
5. Resultado regresa a UI → Muestra chips

## 🔧 Scripts Disponibles

Con Yarn:
```bash
yarn dev         # Desarrollo
yarn build       # Construcción para producción
yarn start       # Servidor de producción
yarn lint        # Linter ESLint
```

Con npm:
```bash
npm run dev      # Desarrollo
npm run build    # Construcción para producción
npm run start    # Servidor de producción
npm run lint     # Linter ESLint
```

## 🚨 Limitaciones

- **Tamaño máximo**: 20MB por archivo (configurable)
- **Formato**: Solo archivos PDF
- **Persistencia**: Sin base de datos, todo en memoria
- **Concurrencia**: Una análisis a la vez por sesión

## 🔒 Seguridad

- API key de OpenAI solo en servidor
- Validación de tipos de archivo
- Límites de tamaño de archivo
- Manejo de errores robusto

## 🐛 Solución de Problemas

### Error: "OPENAI_API_KEY environment variable is required"
- Verifica que el archivo `.env.local` existe
- Confirma que la API key es válida

### Error al cargar PDF
- Verifica que el archivo es un PDF válido
- Confirma que el tamaño no excede el límite

### Palabras clave vacías
- Revisa que el PDF contiene texto extraíble
- Verifica la conectividad con OpenAI

## 📝 Licencia

Este es un proyecto de demostración (POC) para fines educativos.
