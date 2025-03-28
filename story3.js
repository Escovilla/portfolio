// Scene setup
const scene3 = new THREE.Scene();
const loaderElement = document.getElementById('loader');
const progressBar = document.getElementById('file');
const loaded = document.getElementById('loaded');
loaded.innerHTML = 'Loading: Initializing...';
let loadedModelsCount = 0;
const totalModels = 0;

// Device capability detection
const isMobile =
	/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	);
const isLowEndDevice =
	isMobile ||
	(navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);

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

// Camera setup
const camera3 = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	500 // Reduced far plane for better performance
);
camera3.position.set(-0.2, 0, 10);

// Renderer with performance settings
const renderer3 = new THREE.WebGLRenderer({
	antialias: !isLowEndDevice, // Only use antialiasing on better devices
	precision: isLowEndDevice ? 'mediump' : 'highp',
	powerPreference: 'default',
});

// Adjust pixel ratio for performance
const pixelRatio = Math.min(window.devicePixelRatio, isLowEndDevice ? 1 : 2);
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

// Loading manager with performance monitoring
const loadingManager = new THREE.LoadingManager(
	() => {
		console.log('All assets loaded');
		loaderElement.style.display = 'none';
	},
	(itemUrl, itemsLoaded, itemsTotal) => {
		const progress = (itemsLoaded / itemsTotal) * 100;
		progressBar.value = Math.ceil(progress);
		loaded.innerHTML = `Loading: ${itemsLoaded}/${itemsTotal}`;
	},
	(url) => {
		console.error(`Error loading: ${url}`);
	}
);

// Optimized lighting setup - fewer lights for better performance

const lg1 = new THREE.PointLight(0xffffff, 5, 6); //last light
lg1.position.set(0, -2, -11);
scene3.add(lg1);

const lg2 = new THREE.PointLight(0xffffff, 5, 5); //second last light
lg2.position.set(0, -2, -9);
scene3.add(lg2);

const lg3 = new THREE.PointLight(0xffffff, 5, 7);
lg3.position.set(0, -1.7, -6);
scene3.add(lg3);

const lg4 = new THREE.PointLight(0xffffff, 5, 6);
lg4.position.set(0, -2, 0);
scene3.add(lg4);

const lg5 = new THREE.PointLight(0xffffff, 5, 6);
lg5.position.set(0, -2, 10);
scene3.add(lg5);

const lg6 = new THREE.PointLight(0xffffff, 5, 5);
lg6.position.set(0, -2, 7);
scene3.add(lg6);

const blueLightRight3 = new THREE.PointLight(0x0000ff, 7, 5);
blueLightRight3.position.set(0, -3, -9);
scene3.add(blueLightRight3);

const blueLightRight4 = new THREE.PointLight(0x0000ff, 6, 1);
blueLightRight4.position.set(0, -3, -2.5);
scene3.add(blueLightRight4);

const outsideLight = new THREE.PointLight(0xff0000, 7, 20);
outsideLight.position.set(-4, 1, -10);
scene3.add(outsideLight);

const outsideLight3 = new THREE.PointLight(0xff0000, 7, 20);
outsideLight3.position.set(-4, 0.1, -4);
scene3.add(outsideLight3);

// Optimized light flickering
let flickerTimer = null;
function flickerLight() {
	if (flickerTimer) return; // Prevent multiple concurrent flickers

	const originalIntensity = 4;
	const flickerDuration = 500;

	// Use a less frequent interval for flickering
	flickerTimer = setInterval(
		() => {
			const randomIntensity = 0.5 + Math.random() * 0.7;
			lg3.intensity = randomIntensity;
			lg1.intensity = randomIntensity;
			lg5.intensity = randomIntensity;
		},
		isLowEndDevice ? 150 : 100
	);

	setTimeout(() => {
		clearInterval(flickerTimer);
		flickerTimer = null;
		lg3.intensity = Math.random() < 0.3 ? 5 : 0;
		lg1.intensity = 3;
		lg5.intensity = originalIntensity;
	}, flickerDuration);
}

// Less frequent flickering for better performance
setInterval(flickerLight, isLowEndDevice ? 10000 : 5000);

// Controls setup
const controls3 = new THREE.PointerLockControls(camera3, document.body);
scene3.add(controls3.getObject());

// Simplified UI handling
const directions = document.getElementById('directions');
directions.style.display = 'none';
setTimeout(() => {
	directions.style.animation = 'fadeOut 0.5s ease-in-out forwards';
}, 5000);

// Event listeners with throttling for better performance
let keyEventThrottleTimer = null;
const keyEventThrottleDelay = isLowEndDevice ? 20 : 10;

// Initialize variables needed by interaction system
let hud = 'na';
let clicked = false;
let activeHud = null;
let interactionTextElement = null;
let lastInteractionCheck = 0;
let hudTransitionInProgress = false;
const interactionCheckInterval = isLowEndDevice ? 200 : 100;

document.addEventListener('mousedown', () => {
	controls3.lock();
});

// Event listeners with immediate response for interaction key
document.addEventListener('keydown', (event) => {
	if (event.code === 'Escape') {
		controls3.unlock();
		return;
	}

	// Handle K key immediately without throttling for better responsiveness
	if (event.code === 'KeyK') {
		movement.interact = true;
		clicked = true;
		return; // Skip throttling for K key
	}

	// Throttle other keys for performance
	if (keyEventThrottleTimer === null) {
		keyEventThrottleTimer = setTimeout(() => {
			keyEventThrottleTimer = null;

			// Close HUD when movement keys are pressed
			if (
				['KeyW', 'KeyS', 'KeyA', 'KeyD'].includes(event.code) &&
				activeHud
			) {
				closeHud();
			}

			switch (event.code) {
				case 'KeyW':
					movement.forward = 1;
					break;
				case 'KeyS':
					movement.backward = 1;
					break;
				case 'KeyA':
					movement.left = 1;
					break;
				case 'KeyD':
					movement.right = 1;
					break;
			}
		}, keyEventThrottleDelay);
	}
});

document.addEventListener('keyup', (event) => {
	// Handle K key immediately without throttling
	if (event.code === 'KeyK') {
		movement.interact = false;
		clicked = false;
		return; // Skip throttling for K key
	}

	if (keyEventThrottleTimer === null) {
		keyEventThrottleTimer = setTimeout(() => {
			keyEventThrottleTimer = null;

			switch (event.code) {
				case 'KeyW':
					movement.forward = 0;
					break;
				case 'KeyS':
					movement.backward = 0;
					break;
				case 'KeyA':
					movement.left = 0;
					break;
				case 'KeyD':
					movement.right = 0;
					break;
			}
		}, keyEventThrottleDelay);
	}
});

// Optimized model loading
const loader3 = new THREE.GLTFLoader(loadingManager);
let helmet3, blackhole;

// Function to load models with appropriate detail level
function loadModelWithLOD(path, callback) {
	loader3.load(
		path,
		function (gltf) {
			// For low-end devices, simplify the model
			if (isLowEndDevice) {
				gltf.scene.traverse(function (child) {
					if (child.isMesh) {
						// Use simpler materials
						if (child.material) {
							child.material.flatShading = true;
							child.material.needsUpdate = true;
						}
					}
				});
			}
			callback(gltf);
		},
		undefined,
		function (error) {
			console.error('An error occurred while loading the model:', error);
		}
	);
}

// Load corridor model
loadModelWithLOD('./assets/spaceship_corridor/scene.gltf', function (gltf) {
	helmet3 = gltf.scene;
	scene3.add(helmet3);
	helmet3.position.set(-0.2, -1.5, -2.5);
	helmet3.rotation.y = THREE.MathUtils.degToRad(90);

	// Only create clone if not on a low-end device
	if (!isLowEndDevice) {
		const helmetClone = helmet3.clone();
		helmetClone.rotation.y = -helmet3.rotation.y;
		helmetClone.position.x = helmet3.position.x + 0.4;
		helmetClone.position.z = helmet3.position.z + 3.2;
		scene3.add(helmetClone);
	}
});

// Optimized text loading
const fontLoader = new THREE.FontLoader();
fontLoader.load('assets/Hyper Scrypt Stencil_Regular.json', function (font) {
	// Create text with reduced geometry detail
	const textGeometry = new THREE.TextGeometry(
		'Nico Escovilla \nSoftware      \n Engineer        ',
		{
			font: font,
			size: 0.1,
			height: 0.01,
			curveSegments: isLowEndDevice ? 4 : 12, // Reduce segments for low-end devices
			bevelEnabled: true,
			bevelThickness: 0.001,
			bevelSize: 0.00009,
			bevelOffset: 0.00009,
			bevelSegments: isLowEndDevice ? 3 : 20, // Reduce bevel segments
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

// Only load blackhole for higher-end devices, or load a simplified version
if (!isLowEndDevice) {
	loadModelWithLOD('./assets/blackhole/scene.gltf', function (gltf) {
		blackhole = gltf.scene;
		scene3.add(blackhole);
		blackhole.position.set(-350, -1, -6);
		blackhole.rotation.y = THREE.MathUtils.degToRad(110);
		blackhole.rotation.x = THREE.MathUtils.degToRad(30);
		blackhole.rotation.z = THREE.MathUtils.degToRad(15);
		blackhole.scale.set(200, 200, 200);
	});
} else {
	// For low-end devices, create a simple placeholder or skip entirely
	const blackholeGeometry = new THREE.SphereGeometry(5, 16, 16);
	const blackholeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
	blackhole = new THREE.Mesh(blackholeGeometry, blackholeMaterial);
	blackhole.position.set(-350, -1, -6);
	scene3.add(blackhole);
}

// Optimized post-processing for different device capabilities
const composer = new THREE.EffectComposer(renderer3);
const renderPass = new THREE.RenderPass(scene3, camera3);
composer.addPass(renderPass);

// Only add post-processing effects for higher-end devices
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

	// Add Bloom Effect with reduced quality
	const bloomPass = new THREE.UnrealBloomPass(
		new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2), // Half resolution
		0.5, // Reduced strength
		0.4,
		0.1
	);
	composer.addPass(bloomPass);

	// Add FXAA with reduced quality
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

// Improved HUD opening with smooth transitions
function openHud(hudId) {
	if (!hudId || hudId === 'na' || hudTransitionInProgress) return;

	// Don't reopen the same HUD
	if (activeHud === hudId) return;

	hudTransitionInProgress = true;

	// Close any open HUD first
	if (activeHud) {
		closeHud(true).then(() => {
			// After closing, open the new HUD
			openHudElement(hudId);
		});
	} else {
		// No active HUD, open directly
		openHudElement(hudId);
	}
}

// Helper function to open HUD element
function openHudElement(hudId) {
	const hudElement = document.getElementById(hudId);
	if (!hudElement) {
		hudTransitionInProgress = false;
		return;
	}

	// Pause rendering during HUD transition to prevent stuttering
	controls3.unlock();

	// Prepare element for animation
	hudElement.style.display = 'block';
	hudElement.style.opacity = '0';
	hudElement.style.transform = 'translateY(20px)';

	// Force a reflow to ensure the transition works
	void hudElement.offsetWidth;

	// Add transition properties
	hudElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

	// Use requestAnimationFrame for smoother transitions
	requestAnimationFrame(() => {
		hudElement.style.opacity = '1';
		hudElement.style.transform = 'translateY(0)';

		// Update active HUD and clear transition flag after animation completes
		setTimeout(() => {
			activeHud = hudId;
			hudTransitionInProgress = false;
		}, 300);
	});
}

// Improved HUD closing with promise for chaining
function closeHud(isChained = false) {
	return new Promise((resolve) => {
		if (!activeHud || activeHud === 'na') {
			resolve();
			return;
		}

		const hudElement = document.getElementById(activeHud);
		if (!hudElement) {
			activeHud = null;
			resolve();
			return;
		}

		// Add transition properties if not already set
		if (!hudElement.style.transition) {
			hudElement.style.transition =
				'opacity 0.3s ease, transform 0.3s ease';
		}

		// Use GPU-accelerated transitions
		hudElement.style.opacity = '0';
		hudElement.style.transform = 'translateY(20px)';

		// Only hide after transition completes
		setTimeout(() => {
			hudElement.style.display = 'none';
			const previousHud = activeHud;
			activeHud = null;

			// If not chained, lock controls again
			if (!isChained) {
				requestAnimationFrame(() => {
					controls3.lock();
				});
			}

			resolve(previousHud);
		}, 300);
	});
}

// Optimized UI elements
function showInteractionText(message, hudId) {
	if (!interactionTextElement) {
		interactionTextElement = document.createElement('div');
		interactionTextElement.id = 'interaction-text';

		// Use transform instead of position for better performance
		Object.assign(interactionTextElement.style, {
			position: 'absolute',
			bottom: '11%',
			left: '21%',
			transform: 'translate(-50%, 0)',
			padding: '30px',
			textAlign: 'center',
			borderRadius: '15px',
			background: 'transparent',
			color: 'rgba(255, 250, 250, 0.644)',
			fontSize: '28px',
			fontWeight: 'bold',
			textShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
			fontFamily: 'cool',
			pointerEvents: 'none', // Prevent interaction with the text
			willChange: 'opacity, transform', // Hint for browser optimization
			opacity: '0',
			transition: 'opacity 0.2s ease, transform 0.2s ease',
		});

		document.body.appendChild(interactionTextElement);
	}

	// Only update text if it changed
	if (interactionTextElement.innerText !== message) {
		interactionTextElement.innerText = message;
	}

	// Store HUD ID for later use
	hud = hudId;

	// Use GPU-accelerated animations
	interactionTextElement.style.display = 'block';

	// Use requestAnimationFrame for smoother animation
	requestAnimationFrame(() => {
		interactionTextElement.style.opacity = '1';
		interactionTextElement.style.transform = 'translate(-50%, 0)';
	});
}

function hideInteractionText() {
	if (!interactionTextElement) return;

	interactionTextElement.style.opacity = '0';
	interactionTextElement.style.transform = 'translate(-50%, 10px)';

	// Reset HUD ID
	hud = 'na';
}

// Optimize the interaction handler for faster response
function createInteractionHandler(camera, movement, objects) {
	let activeObject = null;
	let isMovingToTarget = false;
	let moveStartPosition = new THREE.Vector3();
	let moveStartQuaternion = new THREE.Quaternion();
	let moveProgress = 0;
	let moveDuration = 1.0; // seconds
	let lastInteractState = false; // Track previous interaction state

	const margin = 0.5;
	const interactionCache = {
		lastPosition: new THREE.Vector3(),
		lastDetectedObject: null,
		lastCheckTime: 0,
		cacheTTL: isLowEndDevice ? 300 : 200,
	};

	function update(currentTime, deltaTime) {
		// Always check for interaction key state changes
		if (movement.interact !== lastInteractState) {
			lastInteractState = movement.interact;

			// If K was just pressed and we have a detected object
			if (
				movement.interact &&
				interactionCache.lastDetectedObject &&
				!isMovingToTarget
			) {
				activeObject = interactionCache.lastDetectedObject;
				isMovingToTarget = true;
				moveProgress = 0;

				// Store starting position and rotation for smooth transition
				moveStartPosition.copy(camera.position);
				moveStartQuaternion.copy(camera.quaternion);
			}
		}

		// Only check for new interactions periodically to save performance
		if (
			currentTime - lastInteractionCheck < interactionCheckInterval &&
			!isMovingToTarget
		) {
			// Skip the position check but still process ongoing transitions
		} else {
			lastInteractionCheck = currentTime;
			const cameraPosition = camera.position;

			// Skip detection if camera hasn't moved significantly and we're not in transition
			if (
				!isMovingToTarget &&
				interactionCache.lastPosition.distanceToSquared(
					cameraPosition
				) < 0.01 &&
				interactionCache.lastDetectedObject &&
				currentTime - interactionCache.lastCheckTime <
					interactionCache.cacheTTL
			) {
				// Skip position check
			} else {
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
					interactionCache.lastDetectedObject = detectedObject;

					if (detectedObject) {
						showInteractionText(
							`Press K to interact with ${detectedObject.name}`,
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
		name: '\nthe outside',
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
	minZ: -11,
	maxZ: 10,
	minY: 0,
	maxY: 0,
};

// Frame-rate independent movement
let prevTime = performance.now();
const baseMoveSpeed = 2; // Base speed value

// Optimized animation loop
let frameSkip = 0;
const frameSkipThreshold = isLowEndDevice ? 2 : 0; // Skip frames on low-end devices

function animate3() {
	requestAnimationFrame(animate3);

	// Skip frames for lower-end devices
	if (frameSkip < frameSkipThreshold) {
		frameSkip++;
		return;
	}
	frameSkip = 0;

	// Calculate delta time for frame-rate independent movement
	const currentTime = performance.now();
	const deltaTime = Math.min((currentTime - prevTime) / 1000, 0.1); // Cap delta time to prevent jumps
	prevTime = currentTime;

	// Frame-rate independent move speed
	const moveSpeed = baseMoveSpeed * deltaTime;

	// Movement logic
	direction.set(0, 0, 0);
	if (movement.forward) direction.z = moveSpeed;
	if (movement.backward) direction.z = -moveSpeed;
	if (movement.left) direction.x = -moveSpeed;
	if (movement.right) direction.x = moveSpeed;

	// Check if player is moving and close HUD if open
	if (
		(movement.forward ||
			movement.backward ||
			movement.left ||
			movement.right) &&
		activeHud
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

	// Rotate blackhole with reduced computation
	if (blackhole && !isLowEndDevice) {
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

	// Update effects only on higher-end devices
	if (!isLowEndDevice && grainPass) {
		grainPass.uniforms.time.value += 0.01;
		composer.render();
	} else {
		// Simple render for low-end devices
		renderer3.render(scene3, camera3);
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

// Start animation loop
animate3();
