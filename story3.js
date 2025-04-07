const scene3 = new THREE.Scene();
const loaderElement = document.getElementById('loader');
const progressBar = document.getElementById('file');
const loaded = document.getElementById('loaded');
loaded.innerHTML = 'Loading: Initializing...';
let loadedModelsCount = 0;
let activeHud = null;

const totalModels = 0;
// Device capability detection - only detect truly low-end devices
const isMobile =
	/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	);
const isLowEndDevice =
	navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4; // Only consider very low-end
// Movement variables
const movement = {
	forward: 0,
	backward: 0,
	left: 0,
	right: 0,
	interact: false,
};
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
// Camera setup with standard far plane
const camera3 = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	500
);
camera3.position.set(-0.2, 0, 10);
// camera3.lookAt(1, 0, 9);
// Renderer with standard settings
const renderer3 = new THREE.WebGLRenderer({
	// antialias: !isLowEndDevice,
	precision: isLowEndDevice ? 'highp' : 'highp',
	powerPreference: 'high-performance',
	antialias: true, // Enable antialiasing for mobile
	precision: 'highp',
	alpha: false, // Disable alpha for better performance
	stencil: false,
});
// Use device's native pixel ratio
const pixelRatio = Math.min(window.devicePixelRatio, 2);
renderer3.setSize(window.innerWidth, window.innerHeight);
renderer3.setPixelRatio(pixelRatio);
// Append renderer
const container3 = document.getElementById('story3');
const bod = document.getElementById('bod');
if (container3) {
	container3.appendChild(renderer3.domElement);
} else {
	console.error('Element with id="story3" not found.');
}
// Loading manager with improved progress tracking

if (isMobile == true) {
	document.getElementById('text').innerText =
		'\n\nLong press to move.\n\n Move your finger to look around.';
}
const loadingManager = new THREE.LoadingManager(
	() => {
		console.log('All assets loaded');
		setTimeout(() => {
			loaderElement.style.animation = 'fadeOut 0.5s ease-in-out forwards';
			setTimeout(() => {
				loaderElement.style.display = 'none';
				directions.style.display = 'block';

				setTimeout(() => {
					directions.style.animation =
						'fadeOut 0.5s ease-in-out forwards';
					setTimeout(() => {
						directions.style.display = 'none';
					}, 500);
				}, 5000);
			}, 500);
		}, 100);
		// Add touch controls for mobile after loading completes
		if (isMobile) {
			addTouchControls();
		}
	},
	(itemUrl, itemsLoaded, itemsTotal) => {
		const progress = (itemsLoaded / itemsTotal) * 100;
		progressBar.value = Math.ceil(progress);
		loaded.innerHTML = `Loading: ${itemUrl.split('/').pop()} (${Math.round(
			progress
		)}%)`;
		console.log(`Loading ${itemUrl}: ${Math.round(progress)}%`);
	},
	(url) => {
		console.error(`Error loading: ${url}`);
	}
);
// Standard lighting setup with all original lights
const isMobileBrightnessBoost = isMobile ? 8 : 0; // Brightness boost for mobile
const lg1 = new THREE.PointLight(0xffffff, 5 + isMobileBrightnessBoost, 6); //last light
lg1.position.set(0, -2, -11);
scene3.add(lg1);
const lg2 = new THREE.PointLight(0xffffff, 5 + isMobileBrightnessBoost, 5); //second last light
lg2.position.set(0, -2, -9);
scene3.add(lg2);
const lg3 = new THREE.PointLight(0xffffff, 5 + isMobileBrightnessBoost, 7);
lg3.position.set(0, -1.7, -6);
scene3.add(lg3);
const lg4 = new THREE.PointLight(0xffffff, 5 + isMobileBrightnessBoost, 6);
lg4.position.set(0, -2, 0);
scene3.add(lg4);
const lg5 = new THREE.PointLight(0xffffff, 5 + isMobileBrightnessBoost, 6);
lg5.position.set(0, -2, 10);
scene3.add(lg5);
const lg6 = new THREE.PointLight(0xffffff, 5, 5);
lg6.position.set(0, -2, 7);
scene3.add(lg6);
const blueLightRight3 = new THREE.PointLight(
	0x0000ff,
	7 + isMobileBrightnessBoost,
	5
);
blueLightRight3.position.set(0, -3, -9);
scene3.add(blueLightRight3);
const blueLightRight4 = new THREE.PointLight(
	0x0000ff,
	6 + isMobileBrightnessBoost,
	1
);
blueLightRight4.position.set(0, -3, -2.5);
scene3.add(blueLightRight4);
const outsideLight = new THREE.PointLight(
	0xff0000,
	7 + isMobileBrightnessBoost,
	20
);
outsideLight.position.set(-4, 1, -10);
scene3.add(outsideLight);
const outsideLight3 = new THREE.PointLight(
	0xff0000,
	7 + isMobileBrightnessBoost,
	20
);
outsideLight3.position.set(-4, 0.1, -4);
scene3.add(outsideLight3);
// Optimized light flickering

let flickerTimer = null;

function flickerLight() {
	if (flickerTimer) return; // Prevent multiple concurrent flickers

	const originalIntensity = 5;
	const flickerDuration = 500;

	// Use a more intense range for flickering and faster interval
	flickerTimer = setInterval(() => {
		const randomIntensity = 5 + Math.random() * 12; // Intensity range between 5 and 8
		lg3.intensity = randomIntensity;
		lg1.intensity = randomIntensity;
		lg5.intensity = randomIntensity;
	}, 50); // Shorter interval for more frequent flickers

	// Reset the lights after the flicker duration
	setTimeout(() => {
		clearInterval(flickerTimer);
		flickerTimer = null;

		// Reset intensities with higher values as well
		lg3.intensity = Math.random() < 0.5 ? 7 : 0; // Randomly switch between high and off
		lg1.intensity = 7; // Keep high intensity
		lg5.intensity = originalIntensity; // Reset to the original intensity
	}, flickerDuration);
}
// Standard flickering interval
setInterval(flickerLight, 5000);
// Controls setup
const controls3 = new THREE.PointerLockControls(camera3, document.body);
scene3.add(controls3.getObject());
// Simplified UI handling
// Event listeners with throttling for better performance
let keyEventThrottleTimer = null;
const keyEventThrottleDelay = 10;
// Initialize variables needed by interaction system
let hud = 'na';
let clicked = false;
let interactionTextElement = null;
let lastInteractionCheck = 0;
let hudTransitionInProgress = false;
const interactionCheckInterval = 100;
// Touch look controls variables
let touchLookActive = false;
let touchX = 0;
let touchY = 0;
let touchLookSensitivity = 0.07;

// FIX: Add a flag to track input processing state
let isProcessingInput = false;
// FIX: Add a debounce timer for interaction events
let interactionDebounceTimer = null;
const interactionDebounceDelay = 300; // ms

// FIX: Add key state tracking to prevent stuck movement
const keyStates = {
	KeyW: false,
	KeyS: false,
	KeyA: false,
	KeyD: false,
};

function addTouchControls() {
	// Create touch look/move area (covers most of the screen)
	const touchArea = document.createElement('div');
	touchArea.id = 'touch-area';
	Object.assign(touchArea.style, {
		position: 'fixed',
		top: '0',
		left: '0',
		width: '100%',
		height: '80%',
		zIndex: '900',
		pointerEvents: 'auto',
	});

	// Touch state variables
	let touchActive = false;
	let touchStartX = 0;
	let touchStartY = 0;
	let lastTouchX = 0;
	let lastTouchY = 0;
	let lastTapTime = 0;
	let isMovingForward = false;
	let isMovingBackward = false;
	const doubleTapThreshold = 100;
	const touchLookSensitivity = 0.005; // Adjusted sensitivity

	touchArea.addEventListener('touchstart', (e) => {
		e.preventDefault();

		directions.style.animation = 'fadeOut 0.5s ease-in-out forwards';
		setTimeout(() => {
			directions.style.display = 'none';
		}, 500);

		if (isProcessingInput) return;

		touchActive = true;
		touchStartX = e.touches[0].clientX;
		touchStartY = e.touches[0].clientY;
		lastTouchX = touchStartX;
		lastTouchY = touchStartY;

		// Double tap detection
		const now = performance.now();
		if (now - lastTapTime < doubleTapThreshold) {
			isMovingBackward = true;
			movement.backward = 1;
		} else {
			isMovingForward = true;
			movement.forward = 1;
		}
		lastTapTime = now;
	});

	touchArea.addEventListener('touchmove', (e) => {
		if (!touchActive) return;
		e.preventDefault();

		const touch = e.touches[0];
		const deltaX = touch.clientX - lastTouchX;
		const deltaY = touch.clientY - lastTouchY;

		// Update camera rotation
		const euler = new THREE.Euler(0, 0, 0, 'YXZ');
		euler.setFromQuaternion(camera3.quaternion);

		// Horizontal rotation (around Y axis)
		euler.y -= deltaX * touchLookSensitivity;

		// Vertical rotation (around X axis)
		euler.x -= deltaY * touchLookSensitivity;

		// Clamp vertical rotation to prevent over-rotation
		euler.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.x));

		// Apply the rotation
		camera3.quaternion.setFromEuler(euler);

		// Update last touch position
		lastTouchX = touch.clientX;
		lastTouchY = touch.clientY;
	});

	touchArea.addEventListener('touchend', (e) => {
		e.preventDefault();
		touchActive = false;

		// Stop movement
		if (isMovingForward) {
			isMovingForward = false;
			movement.forward = 0;
		}
		if (isMovingBackward) {
			isMovingBackward = false;
			movement.backward = 0;
		}
	});

	document.body.appendChild(touchArea);

	// Create interact button on the right

	// FIX: Add debounce to interact button to prevent multiple rapid activations
	interactButton.addEventListener('touchstart', (e) => {
		e.stopPropagation();

		// FIX: Prevent multiple rapid interactions
		if (isProcessingInput || interactionDebounceTimer) return;

		console.log('Interact button pressed');
		isProcessingInput = true;
		movement.interact = true;
		clicked = true;
		interactButton.style.backgroundColor = 'rgba(255, 165, 0, 0.9)';

		// FIX: Set a debounce timer to prevent rapid repeated interactions
		interactionDebounceTimer = setTimeout(() => {
			interactionDebounceTimer = null;
		}, interactionDebounceDelay);
	});

	interactButton.addEventListener('touchend', (e) => {
		e.stopPropagation();
		console.log('Interact button released');
		movement.interact = false;
		clicked = false;
		interactButton.style.backgroundColor = 'rgba(255, 165, 0, 0.7)';

		// FIX: Reset processing flag after a short delay to ensure UI has time to respond
		setTimeout(() => {
			isProcessingInput = false;
		}, 100);
	});

	document.body.appendChild(interactButton);
	// Add visual indicator for movement state
	const moveIndicator = document.createElement('div');
	moveIndicator.id = 'move-indicator';
	Object.assign(moveIndicator.style, {
		position: 'fixed',
		bottom: '110px',
		left: '20px',
		padding: '5px 10px',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		color: 'white',
		borderRadius: '5px',
		fontSize: '14px',
		opacity: '0',
		transition: 'opacity 0.3s',
		zIndex: '1002',
	});
	document.body.appendChild(moveIndicator);
	// Function to update the movement indicator
	// function updateMoveIndicator() {
	// 	if (isMovingForward) {
	// 		moveIndicator.textContent = '';
	// 		moveIndicator.style.opacity = '1';
	// 	} else if (isMovingBackward) {
	// 		moveIndicator.textContent = '';
	// 		moveIndicator.style.opacity = '1';
	// 	} else {
	// 		moveIndicator.style.opacity = '0';
	// 	}
	// 	requestAnimationFrame(updateMoveIndicator);
	// }
	// updateMoveIndicator();
	console.log('New touch controls added with long-press movement');
}

// document.addEventListener('mousedown', () => {

// 	controls3.lock();
// });

let pressTimer = null;
let pressStarted = false;
const PRESS_DURATION = 500; // 1 second in milliseconds

// Add visual feedback element
const pressIndicator = document.createElement('div');
pressIndicator.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 3px;
    background: rgba(255, 255, 255, 0.2);
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
    z-index: 1000;
`;

// Add the fill line
const fillLine = document.createElement('div');
fillLine.style.cssText = `
    width: 0%;
    height: 100%;
    background: white;
    transition: width ${PRESS_DURATION}ms linear;
`;

pressIndicator.appendChild(fillLine);
document.body.appendChild(pressIndicator);

function startPressAnimation() {
	pressIndicator.style.opacity = '1';
	fillLine.style.width = '100%';
}

function stopPressAnimation() {
	pressIndicator.style.opacity = '0';
	fillLine.style.width = '0%';
}

document.addEventListener('mousedown', (e) => {
	// Don't start press timer if HUD is open or controls are already locked
	if (
		activeHud == 'about_me' ||
		activeHud == 'projects' ||
		controls3.isLocked
	)
		return;
	directions.style.animation = 'fadeOut 0.5s ease-in-out forwards';
	setTimeout(() => {
		directions.style.display = 'none';
	}, 500);
	pressStarted = true;
	startPressAnimation();

	pressTimer = setTimeout(() => {
		if (pressStarted) {
			controls3.lock();
			stopPressAnimation();
		}
	}, PRESS_DURATION);
});

document.addEventListener('mouseup', () => {
	if (!pressStarted) return; // Only respond if we started a press

	pressStarted = false;
	if (pressTimer) {
		clearTimeout(pressTimer);
		pressTimer = null;
	}
	stopPressAnimation();
});

document.addEventListener('mousemove', (e) => {
	if (pressStarted) {
		// Cancel the press if mouse moves too much
		const moveThreshold = 5;
		if (
			Math.abs(e.movementX) > moveThreshold ||
			Math.abs(e.movementY) > moveThreshold
		) {
			pressStarted = false;
			if (pressTimer) {
				clearTimeout(pressTimer);
				pressTimer = null;
			}
			stopPressAnimation();
		}
	}
});

// Clean up when pointer lock changes
document.addEventListener('pointerlockchange', () => {
	if (!document.pointerLockElement) {
		pressStarted = false;
		if (pressTimer) {
			clearTimeout(pressTimer);
			pressTimer = null;
		}
		stopPressAnimation();
	}
});

// Clean up when tab/window loses focus
document.addEventListener('visibilitychange', () => {
	if (document.hidden) {
		pressStarted = false;
		if (pressTimer) {
			clearTimeout(pressTimer);
			pressTimer = null;
		}
		stopPressAnimation();
	}
});

window.addEventListener('blur', () => {
	pressStarted = false;
	if (pressTimer) {
		clearTimeout(pressTimer);
		pressTimer = null;
	}
	stopPressAnimation();
});

// FIX: New function to update movement based on key states
function updateMovementFromKeyStates() {
	// Set movement values based on current key states
	movement.forward = keyStates.KeyW ? 1 : 0;
	movement.backward = keyStates.KeyS ? 1 : 0;
	movement.left = keyStates.KeyA ? 1 : 0;
	movement.right = keyStates.KeyD ? 1 : 0;
	directions.style.animation = 'fadeOut 0.5s ease-in-out forwards';
	setTimeout(() => {
		directions.style.display = 'none';
	}, 500);
	// If opposing keys are pressed, cancel out the movement
	if (movement.forward && movement.backward) {
		movement.forward = 0;
		movement.backward = 0;
	}

	if (movement.left && movement.right) {
		movement.left = 0;
		movement.right = 0;
	}
}

// FIX: Function to reset all movement when focus is lost
function resetAllMovement() {
	// Reset all key states
	for (let key in keyStates) {
		keyStates[key] = false;
	}

	// Reset all movement values
	movement.forward = 0;
	movement.backward = 0;
	movement.left = 0;
	movement.right = 0;

	// Reset interaction state
	movement.interact = false;
	clicked = false;
	isProcessingInput = false;

	if (interactionDebounceTimer) {
		clearTimeout(interactionDebounceTimer);
		interactionDebounceTimer = null;
	}
}

// Enhanced model loading with better error handling and fallbacks
const loader3 = new THREE.GLTFLoader(loadingManager);
let helmet3, blackhole;
// Load corridor model with fallback
loadModelWithLOD('./assets/spaceship_corridor/scene.gltf', function (gltf) {
	helmet3 = gltf.scene;
	scene3.add(helmet3);
	helmet3.position.set(-0.2, -1.5, -2.5);
	helmet3.rotation.y = THREE.MathUtils.degToRad(90);
	// Create clone regardless of device
	const helmetClone = helmet3.clone();
	helmetClone.rotation.y = -helmet3.rotation.y;
	helmetClone.position.x = helmet3.position.x + 0.4;
	helmetClone.position.z = helmet3.position.z + 3.2;
	scene3.add(helmetClone);
});

function loadModelWithLOD(path, callback, fallbackCallback) {
	// Track loading attempt
	let loadAttempted = false;
	let loadTimeout;
	// Set a timeout to detect loading failures
	loadTimeout = setTimeout(() => {
		if (!loadAttempted) {
			console.warn(`Loading timeout for ${path}, using fallback`);
			if (fallbackCallback) fallbackCallback();
		}
	}, 15000); // 15 seconds timeout
	loader3.load(
		path,
		function (gltf) {
			loadAttempted = true;
			clearTimeout(loadTimeout);
			// Try-catch to handle any post-processing errors
			try {
				callback(gltf);
			} catch (e) {
				console.error('Error in model callback:', e);
				if (fallbackCallback) fallbackCallback();
			}
		},
		// Progress callback - useful for debugging
		function (xhr) {
			if (xhr.lengthComputable) {
				const percentComplete = (xhr.loaded / xhr.total) * 100;
				console.log(`${path} loading: ${Math.round(percentComplete)}%`);
				// if (percentComplete < 100) {

				// }
			}
		},
		function (error) {
			loadAttempted = true;
			clearTimeout(loadTimeout);
			console.error(`An error occurred while loading ${path}:`, error);
			if (fallbackCallback) fallbackCallback();
		}
	);
}

// Create simple corridor fallback
function createCorridorFallback() {
	// Create a simple corridor with basic geometry
	const corridorGeometry = new THREE.BoxGeometry(2, 2, 30);
	const corridorMaterial = new THREE.MeshBasicMaterial({
		color: 0x333344,
		side: THREE.BackSide,
	});
	const corridor = new THREE.Mesh(corridorGeometry, corridorMaterial);
	corridor.position.set(0, -1, 0);
	scene3.add(corridor);
	// Add floor
	const floorGeometry = new THREE.PlaneGeometry(2, 30);
	const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x222233 });
	const floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.rotation.x = -Math.PI / 2;
	floor.position.set(0, -2, 0);
	scene3.add(floor);
	console.log('Using corridor fallback geometry');
}

// Create simple blackhole fallback
function createBlackholeFallback() {
	const blackholeGeometry = new THREE.SphereGeometry(10, 16, 16);
	const blackholeMaterial = new THREE.MeshBasicMaterial({
		color: 0x000000,
		transparent: true,
		opacity: 0.8,
	});
	blackhole = new THREE.Mesh(blackholeGeometry, blackholeMaterial);
	blackhole.position.set(-350, -1, -6);
	scene3.add(blackhole);
	// Add glow effect
	const glowGeometry = new THREE.SphereGeometry(12, 16, 16);
	const glowMaterial = new THREE.MeshBasicMaterial({
		color: 0x0000ff,
		transparent: true,
		opacity: 0.2,
		side: THREE.BackSide,
	});
	const glow = new THREE.Mesh(glowGeometry, glowMaterial);
	glow.position.copy(blackhole.position);
	scene3.add(glow);
	console.log('Using blackhole fallback geometry');
}

// Optimized text loading
const fontLoader = new THREE.FontLoader();
fontLoader.load('assets/Hyper Scrypt Stencil_Regular.json', function (font) {
	// Create text with standard detail
	const textGeometry = new THREE.TextGeometry(
		'\n                        \n\n                        ',
		{
			font: font,
			size: 0.1,
			height: 0.01,
			curveSegments: 12,
			bevelEnabled: true,
			bevelThickness: 0.001,
			bevelSize: 0.00009,
			bevelOffset: 0.00009,
			bevelSegments: 20,
		}
	);
	const textMaterial = new THREE.MeshStandardMaterial({
		color: 0xffffa500,
		metalness: -4,
		roughness: 0.2,
	});
	const floatingText = new THREE.Mesh(textGeometry, textMaterial);
	floatingText.position.set(-1.2, -0.1, 6.9);
	floatingText.rotation.y = 14.135;
	scene3.add(floatingText);
});

// Load information panel
loadModelWithLOD(
	'./assets/sci-fi_information_panel/scene.gltf',
	function (gltf) {
		helmet3 = gltf.scene;
		helmet3.position.set(-0.7, -1.5, 3);
		helmet3.rotation.y = THREE.MathUtils.degToRad(90);
		scene3.add(helmet3);
		const geometry = new THREE.PlaneGeometry(0.5, 0.3);
		const material = new THREE.MeshBasicMaterial({
			color: 0xff00ffff,
			side: THREE.DoubleSide,
		});
		const square = new THREE.Mesh(geometry, material);
		square.position.set(-0.55, -0.4, 3);
		const tilt = new THREE.Quaternion();
		const rotate = new THREE.Quaternion();
		tilt.setFromAxisAngle(
			new THREE.Vector3(1, 0, 0),
			THREE.MathUtils.degToRad(15)
		);
		rotate.setFromAxisAngle(
			new THREE.Vector3(0, 1, 0),
			THREE.MathUtils.degToRad(-90)
		);
		square.quaternion.multiplyQuaternions(rotate, tilt);
		scene3.add(square);
	}
);

// Load full screen model
loadModelWithLOD('./assets/full_screen/scene.gltf', function (gltf) {
	const full_screen = gltf.scene;
	full_screen.position.set(1.02, -0.5, -2.5);
	full_screen.rotation.y = THREE.MathUtils.degToRad(-90);
	full_screen.scale.set(0.05, 0.05, 0.05);
	scene3.add(full_screen);
	const geometry = new THREE.PlaneGeometry(1.6, 1.1);
	const material = new THREE.MeshBasicMaterial({
		color: 0xff00ffff,
		side: THREE.DoubleSide,
	});
	const square = new THREE.Mesh(geometry, material);
	square.position.set(1.09, -0, -2.5);
	square.rotation.y = THREE.MathUtils.degToRad(90);
	scene3.add(square);
});

// Load blackhole with fallback
loadModelWithLOD(
	'./assets/blackhole/scene.gltf',
	function (gltf) {
		blackhole = gltf.scene;
		scene3.add(blackhole);
		blackhole.position.set(-350, -1, -6);
		blackhole.rotation.y = THREE.MathUtils.degToRad(110);
		blackhole.rotation.x = THREE.MathUtils.degToRad(30);
		blackhole.rotation.z = THREE.MathUtils.degToRad(15);
		blackhole.scale.set(200, 200, 200);
	},
	createBlackholeFallback
);

// Post-processing setup
const composer = new THREE.EffectComposer(renderer3);
const renderPass = new THREE.RenderPass(scene3, camera3);
composer.addPass(renderPass);
// Add post-processing effects for all devices except very low-end ones
let grainPass;
if (!isLowEndDevice) {
	// Grain Shader
	const grainShader = {
		uniforms: {
			tDiffuse: { value: null },
			time: { value: 0.0 },
			amount: { value: 0.1 },
		},
		vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
		fragmentShader: `
            uniform sampler2D tDiffuse;
            uniform float time;
            uniform float amount;
            varying vec2 vUv;
            float random(vec2 co) {
                return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
            }
            void main() {
                vec4 color = texture2D(tDiffuse, vUv);
                float grain = random(vUv + time) * amount;
                color.rgb += vec3(grain);
                gl_FragColor = color;
            }
        `,
	};
	grainPass = new THREE.ShaderPass(grainShader);
	composer.addPass(grainPass);
	// Add Bloom Effect
	const bloomPass = new THREE.UnrealBloomPass(
		new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2),
		0.5,
		0.4,
		0.1
	);
	composer.addPass(bloomPass);
	// Add FXAA
	const fxaaPass = new THREE.ShaderPass(THREE.FXAAShader);
	fxaaPass.uniforms['resolution'].value.set(
		1 / (window.innerWidth * 0.75),
		1 / (window.innerHeight * 0.75)
	);
	composer.addPass(fxaaPass);
} else {
	const grainShader = {
		uniforms: {
			tDiffuse: { value: null },
			time: { value: 0.0 },
			amount: { value: 0.156 },
		},
		vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
		fragmentShader: `
            uniform sampler2D tDiffuse;
            uniform float time;
            uniform float amount;
            varying vec2 vUv;
            float random(vec2 co) {
                return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
            }
            void main() {
                vec4 color = texture2D(tDiffuse, vUv);
                float grain = random(vUv + time) * amount;
                color.rgb += vec3(grain);
                gl_FragColor = color;
            }
        `,
	};
	grainPass = new THREE.ShaderPass(grainShader);
	composer.addPass(grainPass);
	// Add Bloom Effect
	const bloomPass = new THREE.UnrealBloomPass(
		new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2),
		0.1,
		0.4,
		0.1
	);
	composer.addPass(bloomPass);
	// Add FXAA
	const fxaaPass = new THREE.ShaderPass(THREE.FXAAShader);
	fxaaPass.uniforms['resolution'].value.set(
		1 / (window.innerWidth * 0.75),
		1 / (window.innerHeight * 0.75)
	);
	composer.addPass(fxaaPass);
}

// Add transition styles to all HUD elements on page load
document.addEventListener('DOMContentLoaded', () => {
	// Find all potential HUD elements
	const hudElements = ['about_me', 'projects', 'about_this']
		.map((id) => document.getElementById(id))
		.filter((el) => el);
	// Apply initial styles
	hudElements.forEach((el) => {
		if (el) {
			el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
			el.style.opacity = '0';
			el.style.display = 'none';
		}
	});
});

const handleKeyDown = (event) => {
	if (event.code === 'Escape') {
		controls3.unlock();
		return;
	}
	// Handle K key for interaction
	if (event.code === 'KeyK') {
		if (isProcessingInput || interactionDebounceTimer) return;
		isProcessingInput = true;
		movement.interact = true;
		clicked = true;
		// Set debounce timer
		interactionDebounceTimer = setTimeout(() => {
			interactionDebounceTimer = null;
		}, interactionDebounceDelay);
		return;
	}
	// Track key state
	if (event.code in keyStates) {
		keyStates[event.code] = true;
		// Update movement based on current key states
		updateMovementFromKeyStates();
	}
};

const handleKeyUp = (event) => {
	// Handle K key immediately
	if (event.code === 'KeyK') {
		movement.interact = false;
		clicked = false;
		// Reset processing flag after a short delay
		setTimeout(() => {
			isProcessingInput = false;
		}, 100);
		return;
	}
	// Update key state
	if (event.code in keyStates) {
		keyStates[event.code] = false;
		// Update movement based on current key states
		updateMovementFromKeyStates();
	}
};

// FIX: Improved HUD management with safeguards against multiple operations
function openHud(hudId) {
	if (hudTransitionInProgress) {
		console.log('HUD transition already in progress, ignoring request');
		return;
	}

	hudTransitionInProgress = true;
	console.log(hudId);
	if (hudId == 'about_me' || hudId == 'projects') {
		hideInteractionText();
	}
	//

	const hudElement = document.getElementById(hudId);
	if (!hudElement) {
		hudTransitionInProgress = false;
		return;
	}

	// Disable all controls
	disableControls(hudId);

	if (activeHud) {
		closeHud(true).then(() => {
			performHudOpen(hudId, hudElement);
		});
	} else {
		performHudOpen(hudId, hudElement);
	}
}

// Modified closeHud function
function closeHud(isChained = false) {
	return new Promise((resolve) => {
		if (!activeHud || activeHud === 'na') {
			hudTransitionInProgress = false;
			resolve();
			return;
		}

		if (hudTransitionInProgress && !isChained) {
			console.log(
				'HUD transition already in progress, ignoring close request'
			);
			resolve();
			return;
		}

		hudTransitionInProgress = true;
		const hudElement = document.getElementById(activeHud);

		if (!hudElement) {
			activeHud = null;
			hudTransitionInProgress = false;
			resolve();
			return;
		}

		hudElement.style.opacity = '0';
		hudElement.style.transform = 'translateY(100%)';

		setTimeout(() => {
			hudElement.style.display = 'none';
			const previousHud = activeHud;
			activeHud = null;

			// Re-enable controls
			enableControls();

			if (!isChained && !isMobile) {
				requestAnimationFrame(() => {
					controls3.lock();
				});
			}

			hudTransitionInProgress = false;
			resolve(previousHud);
		}, 300);
	});
}

// New control management functions
function disableControls(activeHud) {
	// Disable mobile controls

	// Disable keyboard controls
	console.log(activeHud);
	if (activeHud == 'about_me' || activeHud == 'projects') {
		if (isMobile) {
			const touchArea = document.getElementById('touch-area');
			const interactButton = document.getElementById('interact');
			if (touchArea) touchArea.style.pointerEvents = 'none';
			if (interactButton) interactButton.style.pointerEvents = 'none';
		}

		resetAllMovement();
		document.removeEventListener('keydown', handleKeyDown);
		document.removeEventListener('keyup', handleKeyUp);

		if (controls3.isLocked) {
			controls3.unlock();
		}
	}

	// Unlock pointer if needed
}

function enableControls() {
	// Enable mobile controls
	if (isMobile) {
		const touchArea = document.getElementById('touch-area');
		const interactButton = document.getElementById('interact');
		if (touchArea) touchArea.style.pointerEvents = 'auto';
		if (interactButton) interactButton.style.pointerEvents = 'auto';
	}

	// Enable keyboard controls
	document.addEventListener('keydown', handleKeyDown);
	document.addEventListener('keyup', handleKeyUp);
}

document.addEventListener('DOMContentLoaded', () => {
	// Initialize close buttons
	document.querySelectorAll('.close-hud').forEach((button) => {
		button.addEventListener('click', (e) => {
			e.stopPropagation();
			closeHud();
		});
	});

	// Add initial keyboard listeners
	document.addEventListener('keydown', handleKeyDown);
	document.addEventListener('keyup', handleKeyUp);
});

function performHudOpen(hudId, hudElement) {
	// Ensure controls are disabled
	disableControls(hudId);

	// Prepare element for animation
	hudElement.style.display = 'block';
	hudElement.style.opacity = '0';
	hudElement.style.transform = 'translateY(20px)';

	// Force a reflow
	void hudElement.offsetWidth;

	// Add transition properties
	hudElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

	// Animate
	requestAnimationFrame(() => {
		hudElement.style.opacity = '1';
		hudElement.style.transform = 'translateY(0)';

		// Update active HUD and clear transition flag after animation
		setTimeout(() => {
			activeHud = hudId;
			hudTransitionInProgress = false;
		}, 300);
	});
}
// FIX: Separate function to perform the actual HUD opening
// function performHudOpen(hudId, hudElement) {
// 	// Ensure controls are disabled
// 	disableControls();

// 	// Prepare element for animation
// 	hudElement.style.display = 'block';
// 	hudElement.style.opacity = '0';
// 	hudElement.style.transform = 'translateY(20px)';

// 	// Force a reflow
// 	void hudElement.offsetWidth;

// 	// Add transition properties
// 	hudElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

// 	// Animate
// 	requestAnimationFrame(() => {
// 		hudElement.style.opacity = '1';
// 		hudElement.style.transform = 'translateY(0)';

// 		// Update active HUD and clear transition flag after animation
// 		setTimeout(() => {
// 			activeHud = hudId;
// 			hudTransitionInProgress = false;
// 		}, 300);
// 	});
// }

// Optimized UI elements
// function showInteractionText(message, hudId) {
// 	if (!interactionTextElement) {
// 		interactionTextElement = document.createElement('div');
// 		interactionTextElement.id = 'interaction-text';
// 		// Use transform instead of position for better performance
// 		Object.assign(interactionTextElement.style, {
// 			position: 'absolute',
// 			bottom: '11%',
// 			left: '21%',
// 			transform: 'translate(-50%, 0)',
// 			padding: '30px',
// 			textAlign: 'center',
// 			borderRadius: '15px',
// 			background: 'transparent',
// 			color: 'rgba(255, 250, 250, 0.644)',
// 			fontSize: '28px',
// 			fontWeight: 'bold',
// 			textShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
// 			fontFamily: 'cool',
// 			pointerEvents: 'none', // Prevent interaction with the text
// 			willChange: 'opacity, transform', // Hint for browser optimization
// 			opacity: '0',
// 			transition: 'opacity 0.2s ease, transform 0.2s ease',
// 		});
// 		document.body.appendChild(interactionTextElement);
// 	}
// 	// Only update text if it changed
// 	if (interactionTextElement.innerText !== message) {
// 		interactionTextElement.innerText = message;
// 	}
// 	// Store HUD ID for later use
// 	hud = hudId;
// 	// Use GPU-accelerated animations
// 	interactionTextElement.style.display = 'block';
// 	// Use requestAnimationFrame for smoother animation
// 	requestAnimationFrame(() => {
// 		interactionTextElement.style.opacity = '1';
// 		interactionTextElement.style.transform = 'translate(-50%, 0)';
// 	});
// }

// function showInteractionText(message, hudId) {
// 	if (!interactionTextElement) {
// 		interactionTextElement = document.createElement('div');
// 		interactionTextElement.id = 'interaction-text';
// 		// Use transform instead of position for better performance
// 		Object.assign(interactionTextElement.style, {
// 			position: 'absolute',
// 			bottom: isMobile ? '20px' : '11%', // Above mobile controls
// 			left: '20%', // Stick to left side
// 			transform: 'translate(0, 0)', // Remove horizontal centering
// 			padding: isMobile ? '15px' : '30px',
// 			textAlign: 'center', // Left align text
// 			borderRadius: '15px',
// 			background: 'transparent',
// 			color: 'rgba(255, 250, 250, 0.644)',
// 			fontSize: isMobile ? '18px' : '28px',
// 			fontWeight: 'bold',
// 			textShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
// 			backdropFilter: isMobile ? 'blur(5px)' : 'blur(10px)',
// 			WebkitBackdropFilter: isMobile ? 'blur(5px)' : 'blur(10px)',
// 			fontFamily: 'cool',
// 			pointerEvents: 'none',
// 			willChange: 'opacity, transform',
// 			opacity: '0',
// 			transition: 'opacity 0.2s ease, transform 0.2s ease',
// 			maxWidth: isMobile ? '250px' : 'none', // Control text width on mobile
// 			wordWrap: 'break-word',
// 		});
// 		document.body.appendChild(interactionTextElement);
// 	}

// 	// Only update text if it changed
// 	if (interactionTextElement.innerText !== message) {
// 		interactionTextElement.innerText = message;
// 	}

// 	// Store HUD ID for later use
// 	hud = hudId;

// 	// Use GPU-accelerated animations
// 	interactionTextElement.style.display = 'block';

// 	// Use requestAnimationFrame for smoother animation
// 	requestAnimationFrame(() => {
// 		interactionTextElement.style.opacity = '1';
// 		interactionTextElement.style.transform = 'translate(0, 0)';
// 	});
// }

function showInteractionText(message, hudId) {
	if (!interactionTextElement) {
		interactionTextElement = document.createElement('div');
		interactionTextElement.id = 'interaction-text';

		// Modified styles for mobile interaction
		Object.assign(interactionTextElement.style, {
			position: isMobile ? 'sticky' : 'absolute',
			bottom: '20px',
			left: isMobile ? '0%' : '20px', // Center on mobile
			transform: isMobile ? 'translateX(0, 0)' : 'translate(-50%, 0)', // Center transform on mobile
			padding: isMobile ? '15px' : '30px',
			textAlign: 'center',
			borderRadius: '15px',
			background: isMobile ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
			color: 'rgba(255, 250, 250, 0.644)',
			fontSize: isMobile ? '18px' : '28px',
			fontWeight: 'bold',
			textShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
			backdropFilter: isMobile ? 'blur(5px)' : 'blur(10px)',
			WebkitBackdropFilter: isMobile ? 'blur(5px)' : 'blur(10px)',
			fontFamily: 'cool',
			pointerEvents: isMobile ? 'auto' : 'none',
			cursor: isMobile ? 'pointer' : 'default',
			willChange: 'opacity, transform',
			opacity: '0',
			transition: 'opacity 0.2s ease, transform 0.2s ease',
			maxWidth: isMobile ? '80%' : 'none', // Responsive width on mobile
			wordWrap: 'break-word',
			margin: '0 auto', // Center horizontally
			zIndex: '1000', // Ensure it's above other elements
		});

		// Add touch event listeners for mobile
		if (isMobile) {
			interactionTextElement.addEventListener('touchstart', (e) => {
				e.preventDefault();
				if (isProcessingInput || interactionDebounceTimer) return;

				isProcessingInput = true;
				movement.interact = true;
				clicked = true;

				// Visual feedback
				interactionTextElement.style.opacity = '0.5';

				// Set debounce timer
				interactionDebounceTimer = setTimeout(() => {
					interactionDebounceTimer = null;
				}, interactionDebounceDelay);
			});

			interactionTextElement.addEventListener('touchend', () => {
				movement.interact = false;
				clicked = false;
				interactionTextElement.style.opacity = '1';

				// Reset processing flag after a short delay
				setTimeout(() => {
					isProcessingInput = false;
				}, 100);
			});
		}

		document.body.appendChild(interactionTextElement);
	}

	// Update message text - remove "Press K" for mobile
	const displayMessage = isMobile
		? message.replace('Press K Button to interact with', 'Tap to view')
		: message;

	if (interactionTextElement.innerText !== displayMessage) {
		interactionTextElement.innerText = displayMessage;
	}

	hud = hudId;
	interactionTextElement.style.display = 'block';

	requestAnimationFrame(() => {
		interactionTextElement.style.opacity = '1';
		interactionTextElement.style.transform = 'translate(0, 0)';
	});
}

function hideInteractionText() {
	if (!interactionTextElement) return;
	interactionTextElement.style.opacity = '0';
	interactionTextElement.style.transform = 'translate(-50%, 10px)';
	// Reset HUD ID
	hud = 'na';
}

// FIX: Improved interaction handler with safeguards against stuck states
function createInteractionHandler(camera, movement, objects) {
	let activeObject = null;
	let isMovingToTarget = false;
	let moveStartPosition = new THREE.Vector3();
	let moveStartQuaternion = new THREE.Quaternion();
	let moveProgress = 0;
	let moveDuration = 1.0; // seconds
	let lastInteractState = false; // Track previous interaction state
	let interactionStartTime = 0; // FIX: Track when interaction started
	const margin = 0.5;
	const interactionCache = {
		lastPosition: new THREE.Vector3(),
		lastDetectedObject: null,
		lastCheckTime: 0,
		cacheTTL: 200,
	};

	// FIX: Add a safety timeout to prevent stuck interactions
	const maxInteractionTime = 5000; // 5 seconds max for any interaction

	function update(currentTime, deltaTime) {
		// FIX: Safety check - cancel any stuck interactions
		if (
			isMovingToTarget &&
			currentTime - interactionStartTime > maxInteractionTime
		) {
			console.log('Interaction timed out - resetting state');
			isMovingToTarget = false;
			isProcessingInput = false;
			if (interactionDebounceTimer) {
				clearTimeout(interactionDebounceTimer);
				interactionDebounceTimer = null;
			}
		}

		// Debug logging for interaction state
		if (movement.interact !== lastInteractState) {
			console.log('Interaction state changed:', movement.interact);
			console.log(
				'Detected object:',
				interactionCache.lastDetectedObject
					? interactionCache.lastDetectedObject.name
					: 'none'
			);
		}

		// Always check for interaction key state changes
		if (movement.interact !== lastInteractState) {
			lastInteractState = movement.interact;
			// If K was just pressed and we have a detected object
			if (
				movement.interact &&
				interactionCache.lastDetectedObject &&
				!isMovingToTarget &&
				!hudTransitionInProgress // FIX: Don't start new interaction during HUD transition
			) {
				console.log(
					'Starting movement to:',
					interactionCache.lastDetectedObject.name
				);
				activeObject = interactionCache.lastDetectedObject;
				isMovingToTarget = true;
				moveProgress = 0;
				interactionStartTime = currentTime; // FIX: Record start time

				// Store starting position and rotation for smooth transition
				moveStartPosition.copy(camera.position);
				moveStartQuaternion.copy(camera.quaternion);
			}
		}

		// Check for interactions more frequently on mobile
		const checkInterval = isMobile ? 50 : interactionCheckInterval;
		if (
			currentTime - lastInteractionCheck < checkInterval &&
			!isMovingToTarget
		) {
			// Skip the position check but still process ongoing transitions
		} else {
			lastInteractionCheck = currentTime;
			const cameraPosition = camera.position;
			// Always check on mobile or if we've moved significantly
			if (
				isMobile ||
				!interactionCache.lastDetectedObject ||
				interactionCache.lastPosition.distanceToSquared(
					cameraPosition
				) >= 0.01 ||
				currentTime - interactionCache.lastCheckTime >=
					interactionCache.cacheTTL
			) {
				// Update position cache
				interactionCache.lastPosition.copy(cameraPosition);
				interactionCache.lastCheckTime = currentTime;
				// Fast bounds check
				let detectedObject = null;
				let closestDistance = Infinity;
				for (const obj of objects) {
					// Calculate center point of bounds
					const centerX = (obj.bound1.x + obj.bound2.x) / 2;
					const centerZ = (obj.bound1.z + obj.bound2.z) / 2;
					// Calculate half-width and half-depth of bounds
					const halfWidth =
						Math.abs(obj.bound1.x - obj.bound2.x) / 2 + margin;
					const halfDepth =
						Math.abs(obj.bound1.z - obj.bound2.z) / 2 + margin;
					// Fast AABB check
					if (
						Math.abs(cameraPosition.x - centerX) <= halfWidth &&
						Math.abs(cameraPosition.z - centerZ) <= halfDepth
					) {
						// If multiple objects overlap, choose the closest one
						const distSquared =
							Math.pow(cameraPosition.x - centerX, 2) +
							Math.pow(cameraPosition.z - centerZ, 2);
						if (distSquared < closestDistance) {
							closestDistance = distSquared;
							detectedObject = obj;
						}
					}
				}
				// Update UI only if the detected object has changed
				if (detectedObject !== interactionCache.lastDetectedObject) {
					console.log(
						'Detected object changed:',
						detectedObject ? detectedObject.name : 'none'
					);
					interactionCache.lastDetectedObject = detectedObject;
					if (detectedObject) {
						showInteractionText(
							`Press ${
								isMobile ? 'K Button' : 'K'
							} to interact with  ${detectedObject.name}`,
							detectedObject.hud
						);
					} else {
						hideInteractionText();
					}
				}
			}
		}

		// Handle camera movement to target with smooth transition
		if (isMovingToTarget && activeObject) {
			// Update progress based on delta time
			moveProgress += deltaTime / moveDuration;
			moveProgress = Math.min(moveProgress, 1.0); // Clamp to 1.0
			// Use easing function for smoother motion
			const easedProgress = easeInOutCubic(moveProgress);
			// Interpolate position
			camera.position.lerpVectors(
				moveStartPosition,
				activeObject.targetPosition,
				easedProgress
			);
			// Calculate look direction
			const lookDirection = new THREE.Vector3()
				.subVectors(activeObject.lookAtTarget, camera.position)
				.normalize();
			// Create target quaternion
			const targetQuaternion = new THREE.Quaternion().setFromUnitVectors(
				new THREE.Vector3(0, 0, -1),
				lookDirection
			);
			// Interpolate rotation
			camera.quaternion.slerpQuaternions(
				moveStartQuaternion,
				targetQuaternion,
				easedProgress
			);
			// Check if transition is complete
			if (moveProgress >= 1.0) {
				isMovingToTarget = false;
				console.log('Reached target, opening HUD:', activeObject.hud);

				// FIX: Reset processing flag to allow new interactions
				setTimeout(() => {
					isProcessingInput = false;
				}, 100);

				// Only trigger HUD opening when we've reached the target
				if (activeObject.hud && activeObject.hud !== 'na') {
					requestAnimationFrame(() => openHud(activeObject.hud));
				}
			}
		}
	}

	// Easing function for smooth transitions
	function easeInOutCubic(t) {
		return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
	}

	return { update };
}

// Define interaction objects
const objects = [
	{
		name: '\nYour Mission',
		bound1: new THREE.Vector3(0.003873259069630748, 0, 3.97342803426673),
		bound2: new THREE.Vector3(0.051032483778663706, 0, 2.5995062480704094),
		targetPosition: new THREE.Vector3(0.689, 0, 3.045),
		lookAtTarget: new THREE.Vector3(-45.1751, 0, 2.4368),
		hud: 'about_me',
	},
	{
		name: "\nWhat's this about",
		bound1: new THREE.Vector3(-0.06606142045525135, 0, -1.0917),
		bound2: new THREE.Vector3(-0.0967, 0, -2.712),
		targetPosition: new THREE.Vector3(
			-0.15422468241873846,
			0,
			-2.5802536240156552
		),
		lookAtTarget: new THREE.Vector3(30.9751, 0, -2.1368),
		hud: 'projects',
	},
	{
		name: '\nthe outside',
		bound1: new THREE.Vector3(-0.03577475078777462, 0, -9.49814034334179),
		bound2: new THREE.Vector3(0.21209250697979098, 0, -10.543560257614152),
		targetPosition: new THREE.Vector3(13, -10, 13),
		lookAtTarget: new THREE.Vector3(-20.9751, 0, 10.1368),
		hud: 'about_this',
	},
	{
		name: '\nthe inside',
		bound1: new THREE.Vector3(11.5, -10.5, 11.5),
		bound2: new THREE.Vector3(14.5, -9.5, 14.5),
		targetPosition: new THREE.Vector3(0.285, 0, -10.99),
		lookAtTarget: new THREE.Vector3(-45.1751, 0, 20.4368),
		hud: 'na',
	},
];

// Create the interaction handler
const interactionHandler = createInteractionHandler(
	controls3.getObject(),
	movement,
	objects
);

// Movement boundaries
const bounds = {
	minX: -0.7,
	maxX: 0.7,
	minZ: -12,
	maxZ: 10,
	minY: 0,
	maxY: 0,
};

// Frame-rate independent movement with increased speed
let prevTime = performance.now();
const baseMoveSpeed = 2; // Increased speed value for all devices

// FIX: Add a frame skip detection to prevent large jumps
let lastFrameTime = 0;
const maxAllowedFrameTime = 100; // ms

// Standard animation loop without frame skipping
function animate3() {
	requestAnimationFrame(animate3);

	// Calculate delta time for frame-rate independent movement
	const currentTime = performance.now();

	// FIX: Detect large frame time gaps that might indicate tab switching or sleep
	const frameTime = currentTime - lastFrameTime;
	lastFrameTime = currentTime;

	if (frameTime > maxAllowedFrameTime) {
		console.log(
			`Large frame time detected: ${frameTime}ms - skipping update`
		);
		prevTime = currentTime; // Reset time reference

		// FIX: Reset movement when returning from tab switch or sleep
		resetAllMovement();
		return; // Skip this frame to prevent jumps
	}

	const deltaTime = Math.min((currentTime - prevTime) / 1000, 0.1); // Cap delta time to prevent jumps
	prevTime = currentTime;

	// Update mobile controls if available
	if (isMobile && window.updateMobileControls) {
		window.updateMobileControls();
	}

	// Frame-rate independent move speed
	const moveSpeed = baseMoveSpeed * deltaTime;

	// Movement logic
	direction.set(0, 0, 0);
	if (movement.forward) direction.z = moveSpeed * movement.forward;
	if (movement.backward) direction.z = -moveSpeed * movement.backward;
	if (movement.left) direction.x = -moveSpeed * movement.left;
	if (movement.right) direction.x = moveSpeed * movement.right;

	// Check if player is moving and close HUD if open
	if (
		(movement.forward ||
			movement.backward ||
			movement.left ||
			movement.right) &&
		activeHud &&
		!hudTransitionInProgress // FIX: Don't close during transition
	) {
		closeHud();
	}

	// Apply movement in camera's local space
	controls3.getObject().getWorldDirection(velocity);
	velocity.y = 0;
	velocity.normalize();
	const cameraPosition = controls3.getObject().position;
	const newPosition = cameraPosition.clone();
	newPosition.addScaledVector(velocity, direction.z);
	const leftVector = new THREE.Vector3(-velocity.z, 0, velocity.x);
	newPosition.addScaledVector(leftVector, direction.x);
	newPosition.y = cameraPosition.y;
	if (
		newPosition.x >= bounds.minX &&
		newPosition.x <= bounds.maxX &&
		newPosition.z >= bounds.minZ &&
		newPosition.z <= bounds.maxZ
	) {
		cameraPosition.copy(newPosition);
	}

	// Rotate blackhole with standard computation
	if (blackhole) {
		const quaternion = new THREE.Quaternion();
		const tiltAxis = new THREE.Vector3(0, 1, 0);
		tiltAxis.applyEuler(
			new THREE.Euler(
				blackhole.rotation.x,
				blackhole.rotation.y,
				blackhole.rotation.z
			)
		);
		quaternion.setFromAxisAngle(tiltAxis, 0.001);
		blackhole.quaternion.multiplyQuaternions(
			quaternion,
			blackhole.quaternion
		);
	}

	// Update interactions with current time and delta time
	interactionHandler.update(currentTime, deltaTime);

	// Update effects and render
	if (!isLowEndDevice && grainPass) {
		grainPass.uniforms.time.value += 0.01;
		composer.render();
	} else {
		grainPass.uniforms.time.value += 0.00009;
		composer.render();
	}
}

// Efficient resize handler with debounce
let resizeTimeout;
window.addEventListener('resize', () => {
	clearTimeout(resizeTimeout);
	resizeTimeout = setTimeout(() => {
		camera3.aspect = window.innerWidth / window.innerHeight;
		camera3.updateProjectionMatrix();
		renderer3.setSize(window.innerWidth, window.innerHeight);
		// Update composer size if using post-processing
		if (!isLowEndDevice) {
			composer.setSize(window.innerWidth, window.innerHeight);
		}
	}, 250); // Debounce resize events
});

// FIX: Add visibility change handler to reset state when tab becomes active again
document.addEventListener('visibilitychange', () => {
	if (document.visibilityState === 'visible') {
		// Reset timers and state when returning to the tab
		prevTime = performance.now();
		lastFrameTime = prevTime;

		// Reset any stuck interactions
		isProcessingInput = false;
		if (interactionDebounceTimer) {
			clearTimeout(interactionDebounceTimer);
			interactionDebounceTimer = null;
		}

		// Reset all movement to prevent stuck keys
		resetAllMovement();

		console.log('Tab visibility restored - reset state');
	}
});

// FIX: Add blur event listener to reset movement when window loses focus
window.addEventListener('blur', () => {
	resetAllMovement();
	console.log('Window lost focus - reset movement');
});

// Start animation loop
animate3();
