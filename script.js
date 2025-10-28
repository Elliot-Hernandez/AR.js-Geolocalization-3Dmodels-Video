const contentData = [
    {
        text: `Text: ---\Text: "---"\Text: ---`,
        modelSrc: "./../3Dmodel.glb"
    }
];

let currentIndex = 0;

const videoEl = document.createElement('video');
videoEl.setAttribute('loop', 'true');
videoEl.setAttribute('crossorigin', 'anonymous');
videoEl.setAttribute('playsinline', 'true');
videoEl.setAttribute('webkit-playsinline', 'true');
/* videoPlane.setAttribute('autoplay'); */

window.onload = () => {
    const scene = document.querySelector('a-scene');
    const location = { lat: 0.00000, lng: 0.00000};

    const containerEntity = document.createElement('a-entity');
    containerEntity.setAttribute('gps-entity-place', `latitude: ${location.lat}; longitude: ${location.lng};`);

/*     const rotationWrapper = document.createElement('a-entity');
    rotationWrapper.setAttribute('rotation', '0 0 0'); */

    const modelEntity = document.createElement('a-entity');
    modelEntity.setAttribute('id', 'model-entity');
    modelEntity.setAttribute('scale', '1 1 1');
    modelEntity.setAttribute('position', '0 0 0');

    const videoPlane = document.createElement('a-plane');
    videoPlane.setAttribute('id', 'video-plane');
    videoPlane.setAttribute('position', '0 0 0');
    videoPlane.setAttribute('width', '1');
    videoPlane.setAttribute('height', '1');
    videoPlane.setAttribute('material', 'src', videoEl);

    containerEntity.appendChild(videoPlane);
    containerEntity.appendChild(modelEntity);
    scene.appendChild(containerEntity);

    videoEl.src = "vids/VideoWeb.mp4";
    videoEl.load();
    videoPlane.setAttribute('visible', true);

    const playPauseContainer = document.querySelector('#play-pause-container');
    const playButton = document.querySelector('#play-button');
    const pauseButton = document.querySelector('#pause-button');

    playPauseContainer.style.display = 'flex';
    videoEl.pause();
    playButton.style.display = 'block';
    pauseButton.style.display = 'none';

    const updateContent = (index) => {
        const data = contentData[index];
        const topBar = document.querySelector('#info-text');

        topBar.innerText = data.text;

        if (data.modelSrc) {
            modelEntity.setAttribute('gltf-model', data.modelSrc);
            modelEntity.setAttribute('visible', true);
        } else {
            modelEntity.setAttribute('visible', false);
        }
    }

    const nextButton = document.querySelector('#next-button');
    const prevButton = document.querySelector('#prev-button');

    playButton.addEventListener('click', () => { videoEl.play(); playButton.style.display = 'none'; pauseButton.style.display = 'block'; });
    pauseButton.addEventListener('click', () => { videoEl.pause(); playButton.style.display = 'block'; pauseButton.style.display = 'none'; });
    nextButton.addEventListener('click', () => { currentIndex = (currentIndex + 1) % contentData.length; updateContent(currentIndex); });
    prevButton.addEventListener('click', () => { currentIndex = (currentIndex - 1 + contentData.length) % contentData.length; updateContent(currentIndex); });

    const minScale = 2;
    const maxScale = 30;
    let initialPinchDistance = 0;
    let currentModelScale = 12;
    const rotationSpeed = 0.4;
    let isDragging = false;
    let initialDragX = 0;
    let initialDragY = 0;
    let initialModelRotationX = 0;
    let initialModelRotationY = 0;

    function getTouchDistance(touches) {
        const touch1 = touches[0];
        const touch2 = touches[1];
        const dx = touch1.pageX - touch2.pageX;
        const dy = touch1.pageY - touch2.pageY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    const canvas = scene.canvas;

    canvas.addEventListener('touchstart', (event) => {
        if (event.touches.length === 2) {
            event.preventDefault();
            initialPinchDistance = getTouchDistance(event.touches);
            currentModelScale = modelEntity.object3D.scale.x;
            isDragging = false;
        } else if (event.touches.length === 1) {
            event.preventDefault();
            isDragging = true;
            initialDragX = event.touches[0].pageX;
            initialDragY = event.touches[0].pageY;
            const currentRotation = modelEntity.getAttribute('rotation') || { x: 0, y: 0, z: 0 };
            initialModelRotationX = currentRotation.x;
            initialModelRotationY = currentRotation.y;
        }
    }, { passive: false });

    canvas.addEventListener('touchmove', (event) => {
        if (event.touches.length === 2) {
            event.preventDefault();
            const newDistance = getTouchDistance(event.touches);
            const pinchRatio = newDistance / initialPinchDistance;
            let newScale = currentModelScale * pinchRatio;
            newScale = Math.max(minScale, Math.min(maxScale, newScale));
            modelEntity.setAttribute('scale', `${newScale} ${newScale} ${newScale}`);
        } else if (event.touches.length === 1 && isDragging) {
            event.preventDefault();
            const currentDragX = event.touches[0].pageX;
            const currentDragY = event.touches[0].pageY;
            const deltaX = currentDragX - initialDragX;
            const deltaY = currentDragY - initialDragY;
            const newRotationY = initialModelRotationY + (deltaX * rotationSpeed);
            let newRotationX = initialModelRotationX + (deltaY * rotationSpeed);
            newRotationX = Math.max(-90, Math.min(90, newRotationX));
            const currentRotation = modelEntity.getAttribute('rotation') || { x: 0, y: 0, z: 0 };
            modelEntity.setAttribute('rotation', `${newRotationX} ${newRotationY} ${currentRotation.z}`);
        }
    }, { passive: false });
    canvas.addEventListener('touchend', (event) => {
        if (event.touches.length < 2) {
            isDragging = false;
        }
        if (event.touches.length < 1) {
            initialPinchDistance = 0;
        }
    });

    updateContent(currentIndex);
};