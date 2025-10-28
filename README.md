# Proyecto WebAR con Geolocalización usando A-Frame y AR.js, con modelos 3D interactivos, optimización Draco y reproductor de video.

# Galería de Arte WebAR basada en GPS

Una aplicación de Realidad Aumentada (WebAR) que utiliza A-Frame y AR.js para mostrar una galería de arte virtual, anclada a una coordenada GPS específica.

El proyecto despliega X modelos 3D diferentes junto con un reproductor de video persistente. Los usuarios pueden navegar por la galería, interactuar con los modelos 3D y controlar la reproducción del video.

## Características Principales

* **Realidad Aumentada Basada en Geolocalización:** El contenido solo aparece cuando el usuario está en la ubicación GPS definida (`gps-entity-place`).
* **Galería de Contenido Dinámico:** El usuario puede navegar entre 11 obras de arte diferentes (modelos 3D y texto descriptivo) usando botones de "Siguiente" y "Anterior".
* **Reproductor de Video Persistente:** Un plano de video se mantiene estático y visible (con su propio `look-at`), con controles de "Play/Pausa", mientras los modelos 3D cambian.
* **Interacción 3D Completa:** Los usuarios pueden manipular los modelos 3D con gestos táctiles:
    * **Rotación Orbital:** Arrastrar con un dedo para rotar el modelo en los ejes X e Y (con un límite vertical de 90°).
    * **Zoom:** Pellizcar con dos dedos para escalar el modelo.
* **Alta Optimización (Draco):** Carga modelos `.glb` comprimidos con Draco, reduciendo drásticamente los tiempos de carga de cada obra.
* **Estabilización de GPS (Anti-Temblor):** Utiliza `position-smoothing` y `arjs-device-orientation-controls` para reducir el "temblor" o "drift" causado por la imprecisión del GPS y la brújula del teléfono.

## Tecnologías Utilizadas

* **A-Frame (v1.5.0):** Para la estructura 3D/WebXR.
* **AR.js (v3.4+):** Para las capacidades de Realidad Aumentada (módulos Core y GPS).
* **THREE.js:** El motor 3D subyacente que usa A-Frame.
* **HTML5 & CSS:** Para la interfaz de usuario (botones y barra de texto).
* **JavaScript (ES6+):** Para toda la lógica de la aplicación (carga de contenido, botones e interacciones táctiles).

## Cómo Probarlo

Para ejecutar este proyecto, necesitas:

1.  **Servidor Local (Requerido):** No puedes abrir el `index.html` directamente en el navegador. Debes correr el proyecto en un servidor local (ej. `npm install -g http-server` y luego `http-server`).
2.  **HTTPS (Requerido):** El acceso a la cámara y al GPS del navegador solo funciona en un contexto seguro (`https://`). Herramientas como `ngrok` pueden crear un túnel HTTPS a tu servidor local.
3.  **Dispositivo Móvil:** Accede a la URL HTTPS desde tu teléfono (con el GPS activado).
4.  **Ubicación:** Debes estar físicamente en (o muy cerca de) las coordenadas GPS especificadas en `script.js` (o simularlas usando las herramientas de desarrollador de tu navegador).

------------------------------------------------------------------------

# Location-Based WebAR Project using A-Frame and AR.js, with Interactive 3D Models, Draco Optimization, and Video Player.

# GPS-Based WebAR Art Gallery

An Augmented Reality (WebAR) application that uses A-Frame and AR.js to display a virtual art gallery, anchored to a specific GPS coordinate.

The project displays X different 3D models alongside a persistent video player. Users can navigate through the gallery, interact with the 3D models, and control the video playback.

## Key Features

* **Geolocation-Based Augmented Reality:** Content only appears when the user is at the defined GPS location (`gps-entity-place`).
* **Dynamic Content Gallery:** The user can navigate between 11 different artworks (3D models and descriptive text) using "Next" and "Previous" buttons.
* **Persistent Video Player:** A video plane remains static and visible (with its own `look-at`), featuring "Play/Pause" controls, while the 3D models are swapped.
* **Full 3D Interaction:** Users can manipulate the 3D models with touch gestures:
    * **Orbital Rotation:** Drag with one finger to rotate the model on the X and Y axes (with a 90° vertical limit).
    * **Zoom:** Pinch with two fingers to scale the model.
* **High Optimization (Draco):** Loads Draco-compressed `.glb` models, drastically reducing the loading time for each artwork.
* **GPS Stabilization (Anti-Drift):** Uses `position-smoothing` and `arjs-device-orientation-controls` to reduce the "jitter" or "drift" caused by GPS and phone compass inaccuracies.

## Technologies Used

* **A-Frame (v1.5.0):** For the 3D/WebXR structure.
* **AR.js (v3.4+):** For Augmented Reality capabilities (Core and GPS modules).
* **THREE.js:** The underlying 3D engine used by A-Frame.
* **HTML5 & CSS:** For the user interface (buttons and text bar).
* **JavaScript (ES6+):** For all application logic (content loading, buttons, and touch interactions).

## How to Test It

To run this project, you need:

1.  **Local Server (Required):** You cannot open the `index.html` file directly in the browser. You must run the project on a local server (e.g., `npm install -g http-server` and then `http-server`).
2.  **HTTPS (Required):** Browser access to the camera and GPS only works in a secure context (`https://`). Tools like `ngrok` can create an HTTPS tunnel to your local server.
3.  **Mobile Device:** Access the HTTPS URL from your phone (with GPS activated).
4.  **Location:** You must be physically at (or very near) the GPS coordinates specified in `script.js` (or simulate them using your browser's developer tools).
