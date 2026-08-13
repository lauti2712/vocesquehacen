# Voces que Hacen — Setup en Firebase

## 1. Crear el proyecto
1. Entrá a https://console.firebase.google.com → **Agregar proyecto**.
2. Nombre: `vocesquehacen` (o el que quieras). Podés desactivar Google Analytics, no hace falta.

## 2. Crear la app web y copiar la config
1. En la consola, ícono **</> (Web)** para registrar una app web.
2. Ponele un apodo (ej: `web`). NO hace falta Firebase Hosting (usamos GitHub Pages).
3. Firebase te muestra un objeto `firebaseConfig = { apiKey: ..., ... }`.
   Copiá esos valores dentro de **config.js**.

## 3. Activar Authentication (login del admin)
1. Menú izquierdo → **Authentication** → **Comenzar**.
2. Pestaña **Sign-in method** → habilitá **Correo electrónico/contraseña** → Guardar.
3. Pestaña **Users** → **Agregar usuario** → poné tu email y una contraseña.
   Con esas credenciales entrás a `admin.html`.

## 4. Crear la base de datos Firestore
1. Menú izquierdo → **Firestore Database** → **Crear base de datos**.
2. Elegí ubicación (ej: `southamerica-east1` — São Paulo).
3. Empezá en **modo de producción** (las reglas las ponemos en el paso 5).
4. No hace falta crear colecciones a mano: `episodios` y `marcas` se crean
   solas la primera vez que guardes un episodio o una marca desde el admin.

## 5. Reglas de seguridad (MUY IMPORTANTE)
En **Firestore Database → pestaña Reglas**, pegá esto tal cual y **Publicar**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Episodios: el público ve solo los publicados; el admin (logueado) ve y edita todo
    match /episodios/{doc} {
      allow read:  if resource.data.publicado == true || request.auth != null;
      allow create, delete: if request.auth != null;
      // el admin puede editar todo; el público SOLO puede sumar el contador de aperturas
      allow update: if request.auth != null
        || request.resource.data.diff(resource.data).affectedKeys().hasOnly(['aperturas']);
    }

    // Marcas: el público ve solo las visibles; el admin ve y edita todo
    match /marcas/{doc} {
      allow read:  if resource.data.visible == true || request.auth != null;
      allow write: if request.auth != null;
    }

    // Redes sociales del footer: mismo criterio
    match /redes/{doc} {
      allow read:  if resource.data.visible == true || request.auth != null;
      allow write: if request.auth != null;
    }

    // Textos editables de la página: lectura pública, escritura solo admin
    match /config/{doc} {
      allow read:  if true;
      allow write: if request.auth != null;
    }

    // Estadísticas: cualquiera puede sumar contadores (visitas/clics);
    // solo el admin las lee en el panel
    match /stats/{doc} {
      allow read:  if request.auth != null;
      allow write: if true;
    }
  }
}
```

Qué hace esto:
- Cualquiera puede LEER episodios publicados y marcas visibles (para la página pública).
- Solo vos, logueado, podés crear / editar / borrar.
- Sin estas reglas, o bien la página no carga nada, o bien cualquiera podría escribir.

## 6. Subir a GitHub Pages
Subí al repo: `index.html`, `admin.html`, `config.js` y la carpeta `logos/`.
(Los `.sql` y este `.md` NO se suben, son solo para vos.)

---

### Nota sobre la apiKey
La `apiKey` de Firebase va en el código del cliente y es pública por diseño —
no es una contraseña. Lo que realmente protege tus datos son las reglas del paso 5.
