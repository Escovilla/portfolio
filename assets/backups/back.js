// // Scene setup
// const scene3 = new THREE.Scene();
// const loaderElement = document.getElementById('loader');
// const progressBar = document.getElementById('file');
// const loaded = document.getElementById('loaded');
// loaded.innerHTML = `Loading: stuff if your reading this your internet  or your device sucks`;
// let loadedModelsCount = 0; // Counter to track loaded models
// const totalModels = 0; // Total number of models to load
// // Movement variables
// const movement = { forward: 0, backward: 0, left: 0, right: 0 };
// const velocity = new THREE.Vector3();
// const direction = new THREE.Vector3();

// const camera3 = new THREE.PerspectiveCamera(
// 	75,
// 	window.innerWidth / window.innerHeight,
// 	0.1,
// 	1000
// );
// camera3.position.set(-0.2, 0, 10); // Set initial camera position inside the object

// const renderer3 = new THREE.WebGLRenderer({
// 	antialias: true,
// 	// precision: 'highp',
// 	// powerPreference: 'high-performance',
// });

// const devicePixelRatio = window.devicePixelRatio || 1;

// // Set the renderer size to match the window dimensions with increased pixel density
// renderer3.setSize(window.innerWidth, window.innerHeight);
// renderer3.setPixelRatio(devicePixelRatio);

// // Append the renderer to the element with id="story3"
// const container3 = document.getElementById('story3');

// const bod = document.getElementById('bod');
// if (container3) {
// 	container3.appendChild(renderer3.domElement);
// } else {
// 	console.error('Element with id="story3" not found.');
// }
// const loadingManager = new THREE.LoadingManager(
// 	() => {
// 		// All resources are loaded
// 		console.log('All assets loaded');
// 		loaderElement.style.display = 'none';
// 	},
// 	(itemUrl, itemsLoaded, itemsTotal) => {
// 		// Update progress as each item is loaded

// 		const progress = (itemsLoaded / itemsTotal) * 100;

// 		console.log('progress: ', Math.ceil(progress));
// 		progressBar.value = Math.ceil(progress); // Update the progress bar

// 		loaded.innerHTML = `Loading: ${itemUrl} (${itemsLoaded}/${itemsTotal})`;
// 		console.log(`Loading: ${itemUrl} (${itemsLoaded}/${itemsTotal})`);

// 		console.log('progressBar.value: ', progressBar.value);
// 	},
// 	(url) => {
// 		console.error(`There was an error loading: ${url}`);
// 	}
// );

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

// function flickerLight() {
// 	const originalIntensity = 4; // Define the base intensity
// 	const flickerDuration = 500; // Flicker duration in milliseconds

// 	// Start flickering
// 	const flickerInterval = setInterval(() => {
// 		lg3.intensity = 0.5 + Math.random() * 0.7;
// 		lg2.intensity = 0.5 + Math.random() * 0.7;
// 		lg1.intensity = 0.5 + Math.random() * 0.7;
// 		lg5.intensity = 0.5 + Math.random() * 0.7; // Flicker intensity range
// 		lg6.intensity = 0.5 + Math.random() * 0.7; // Flicker intensity range
// 	}, 50); // Adjust for faster flicker rate

// 	// Stop flickering after the defined duration
// 	setTimeout(() => {
// 		clearInterval(flickerInterval);
// 		lg3.intensity = Math.random() < 3 ? 5 : 0;
// 		lg2.intensity = 3;
// 		lg1.intensity = 3;
// 		lg5.intensity = originalIntensity; // Reset to original intensity
// 		lg6.intensity = originalIntensity; // Reset to original intensity
// 	}, flickerDuration);
// }
// setInterval(flickerLight, 5000);

// // floatingText.position.set(-1.2, -0.1, 9.5);
// // blackhole.position.set(-12, -1.5, -6); //
// // PointerLockControls for first-person navigation
// const controls3 = new THREE.PointerLockControls(camera3, document.body);
// scene3.add(controls3.getObject()); // Add the controls object to the scene

// // Lock the pointer on click or long press
// let lockTimeout;
// const directions = document.getElementById('directions');

// directions.style.display = 'none';
// setTimeout(() => {
// 	directions.style.animation = 'fadeOut 0.5s ease-in-out forwards';
// 	setTimeout(() => {}, 500);
// }, 5000);

// document.addEventListener('mousedown', () => {
// 	controls3.lock();
// 	// bod.style.overflow = 'hidden';
// });

// document.addEventListener('mouseup', () => {
// 	clearTimeout(lockTimeout); // Cancel pointer lock if mouse is released too early
// });

// document.addEventListener('keydown', (event) => {
// 	if (event.code === 'Escape') {
// 		console.log(event.code);
// 		controls3.unlock();
// 		// bod.style.overflow = 'auto !important';
// 		console.log('Pointer unlocked manually');
// 	}
// });

// document.addEventListener('keydown', (event) => {
// 	closeHud();
// 	switch (event.code) {
// 		case 'KeyW':
// 			movement.forward = 1;
// 			break;
// 		case 'KeyS':
// 			movement.backward = 1;
// 			break;
// 		case 'KeyA':
// 			movement.left = 1;
// 			break;
// 		case 'KeyD':
// 			movement.right = 1;
// 			break;
// 	}
// });
// document.addEventListener('keyup', (event) => {
// 	switch (event.code) {
// 		case 'KeyW':
// 			movement.forward = 0;
// 			break;
// 		case 'KeyS':
// 			movement.backward = 0;
// 			break;
// 		case 'KeyA':
// 			movement.left = 0;
// 			break;
// 		case 'KeyD':
// 			movement.right = 0;
// 			break;
// 	}
// });
// const geometry = new THREE.PlaneGeometry(0.5, 0.3); // Square
// const material = new THREE.MeshBasicMaterial({
// 	color: 0xff00ffff, // Blue
// 	side: THREE.DoubleSide,
// });
// const loader3 = new THREE.GLTFLoader(loadingManager);
// let helmet3, blackhole;
// loader3.load(
// 	'./assets/spaceship_corridor/scene.gltf',
// 	function (gltf) {
// 		helmet3 = gltf.scene;
// 		scene3.add(helmet3);

// 		// Position and orientation
// 		helmet3.position.set(-0.2, -1.5, -2.5); // Adjust as necessary
// 		helmet3.rotation.y = THREE.MathUtils.degToRad(90); // 90 degrees in radians

// 		const helmetClone = helmet3.clone();

// 		// Rotate the clone in the opposite direction to the original helmet
// 		helmetClone.rotation.y = -helmet3.rotation.y;
// 		helmetClone.position.x = helmet3.position.x + 0.4; // Small movement on x-axis
// 		helmetClone.position.z = helmet3.position.z + 3.2; // S

// 		scene3.add(helmetClone);

// 		console.log('Model loaded and positioned.');
// 	},
// 	undefined,
// 	function (error) {
// 		console.error('An error occurred while loading the model:', error);
// 	}
// );
// const fontLoader = new THREE.FontLoader();
// fontLoader.load('assets/Hyper Scrypt Stencil_Regular.json', function (font) {
// 	const texts = [
// 		{
// 			text: 'Nico Escovilla \nSoftware      \n Engineer        ',
// 			position: [-1.2, -0.1, 6.9],
// 			rotation: 14.135,
// 		},
// 		// { text: ' To move press ', position: [-1.2, 0.3, 9.7], rotation: 14.135 },
// 		// { text: ' W ', position: [-1.2, 0.1, 9], rotation: 0 },
// 		// { text: ' A ', position: [-1.2, -0.1, 9], rotation: 0 },
// 		// { text: ' S ', position: [-1.2, -0.3, 9], rotation: 0 },
// 		// { text: ' D ', position: [-1.2, -0.5, 9], rotation: 0 },
// 		// { text: ' A ', position: [-1.2, -.1, 9], rotation: 0 },
// 		// { text: 'Engineer', position: [-1.2, 0.1, 6.9] },
// 	];

// 	texts.forEach(({ text, position, rotation }) => {
// 		const textGeometry = new THREE.TextGeometry(text, {
// 			font: font,
// 			size: 0.1,
// 			height: 0.01,
// 			curveSegments: 12,
// 			bevelEnabled: true,
// 			bevelThickness: 0.001,
// 			bevelSize: 0.00009,
// 			bevelOffset: 0.00009,
// 			bevelSegments: 20,
// 		});

// 		const textMaterial = new THREE.MeshStandardMaterial({
// 			color: 0xffffa500,
// 			metalness: -4, // Fully metallic
// 			roughness: 0.2,
// 		});

// 		const floatingText = new THREE.Mesh(textGeometry, textMaterial);

// 		// Set position for floating text
// 		floatingText.position.set(...position);
// 		floatingText.rotation.y = rotation; // Adjust rotation as needed

// 		scene3.add(floatingText);
// 	});
// });

// loader3.load(
// 	'./assets/sci-fi_information_panel/scene.gltf',
// 	function (gltf) {
// 		helmet3 = gltf.scene;
// 		helmet3.position.set(-0.7, -1.5, 3);
// 		helmet3.rotation.y = THREE.MathUtils.degToRad(90); // 90 degrees in radians
// 		scene3.add(helmet3);

// 		const square = new THREE.Mesh(geometry, material);
// 		square.position.set(-0.55, -0.4, 3);
// 		const tilt = new THREE.Quaternion();
// 		const rotate = new THREE.Quaternion();
// 		tilt.setFromAxisAngle(
// 			new THREE.Vector3(1, 0, 0),
// 			THREE.MathUtils.degToRad(15)
// 		);
// 		rotate.setFromAxisAngle(
// 			new THREE.Vector3(0, 1, 0),
// 			THREE.MathUtils.degToRad(-90)
// 		);
// 		square.quaternion.multiplyQuaternions(rotate, tilt);
// 		scene3.add(square);
// 		console.log('Model loaded and positioned.');
// 	},
// 	undefined,
// 	function (error) {
// 		console.error('An error occurred while loading the model:', error);
// 	}
// );
// loader3.load(
// 	'./assets/full_screen/scene.gltf',
// 	function (gltf) {
// 		full_screen = gltf.scene;
// 		full_screen.position.set(1.02, -0.5, -2.5);
// 		full_screen.rotation.y = THREE.MathUtils.degToRad(-90); // 90 degrees in radians
// 		full_screen.scale.set(0.05, 0.05, 0.05);
// 		scene3.add(full_screen);
// 		console.log('Model loaded and positioned.');

// 		const geometry = new THREE.PlaneGeometry(1.6, 1.1); // Square
// 		const material = new THREE.MeshBasicMaterial({
// 			color: 0xff00ffff, // Blue
// 			side: THREE.DoubleSide,
// 		});
// 		const square = new THREE.Mesh(geometry, material);
// 		square.position.set(1.09, -0, -2.5);
// 		square.rotation.y = THREE.MathUtils.degToRad(90); // 90 degrees in radians
// 		scene3.add(square);
// 	},
// 	undefined,
// 	function (error) {
// 		console.error('An error occurred while loading the model:', error);
// 	}
// );
// loader3.load(
// 	'./assets/blackhole/scene.gltf',
// 	function (gltf) {
// 		blackhole = gltf.scene;
// 		scene3.add(blackhole);

// 		// Position and orientation
// 		blackhole.position.set(-350, -1, -6); // Adjust as necessary
// 		blackhole.rotation.y = THREE.MathUtils.degToRad(110); // 90 degrees in radians
// 		blackhole.rotation.x = THREE.MathUtils.degToRad(30); // Tilt 30 degrees along the x-axis
// 		blackhole.rotation.z = THREE.MathUtils.degToRad(15); // Tilt 1
// 		// blackhole.rotation.z = THREE.MathUtils.degToRad(40); // 90 degrees in radians

// 		blackhole.scale.set(200, 200, 200); //
// 		console.log('Model loaded and positioned.');
// 	},

// 	undefined,
// 	function (error) {
// 		console.error('An error occurred while loading the model:', error);
// 	}
// );
// let blposition = new THREE.Vector3();
// // Animation loop
// const bounds = {
// 	minX: -0.7, // Adjust these values to match your object's confines
// 	maxX: 0.7,
// 	minZ: -11,
// 	maxZ: 10,
// 	minY: 0, // Optional: Add Y-axis constraints if needed
// 	maxY: 0,
// };
// const composer = new THREE.EffectComposer(renderer3);
// const renderPass = new THREE.RenderPass(scene3, camera3);
// composer.addPass(renderPass);
// // Grain Shader (Custom ShaderPass)
// const grainShader = {
// 	uniforms: {
// 		tDiffuse: { value: null },
// 		time: { value: 0.0 },
// 		amount: { value: 0.1 }, // Adjust grain intensity (0.1 - 0.3 is subtle)
// 	},
// 	vertexShader: `
//         varying vec2 vUv;
//         void main() {
//             vUv = uv;
//             gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//         }
//     `,
// 	fragmentShader: `
//         uniform sampler2D tDiffuse;
//         uniform float time;
//         uniform float amount;
//         varying vec2 vUv;

//         float random(vec2 co) {
//             return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
//         }

//         void main() {
//             vec4 color = texture2D(tDiffuse, vUv);
//             float grain = random(vUv + time) * amount; // Generate noise
//             color.rgb += vec3(grain);
//             gl_FragColor = color;
//         }
//     `,
// };
// const grainPass = new THREE.ShaderPass(grainShader);
// composer.addPass(grainPass);
// // Add Bloom Effect for Soft Glow
// const bloomPass = new THREE.UnrealBloomPass(
// 	new THREE.Vector2(window.innerWidth, window.innerHeight),
// 	0.7, // Strength
// 	0.4, // Radius
// 	0.1 // Threshold
// );
// composer.addPass(bloomPass);
// const fxaaPass = new THREE.ShaderPass(THREE.FXAAShader);
// fxaaPass.uniforms['resolution'].value.set(
// 	1 / window.innerWidth,
// 	1 / window.innerHeight
// );
// composer.addPass(fxaaPass);
// // function handleInteractionAndMove(camera, movement) {
// // 	const margin = 0.2; // Expanding the square area
// // 	const minBounds = new THREE.Vector3(
// // 		Math.min(0.0122, 0.1003) - margin,
// // 		0,
// // 		Math.min(1.263, 0.2872) - margin
// // 	);
// // 	const maxBounds = new THREE.Vector3(
// // 		Math.max(0.0122, 0.1003) + margin,
// // 		0,
// // 		Math.max(1.263, 0.2872) + margin
// // 	);

// // 	// **Target position & look-at point**
// // 	const targetPosition = new THREE.Vector3(0.6929, 0, 0.4); // Where the camera moves
// // 	const lookAtTarget = new THREE.Vector3(0.1751, 0, 0.4368); // Where the camera looks/ Change this to where you want the camera to look
// // 	// { x: 0.4129, y: 0.0000, z: 0.4370 }
// // 	let isMovingToTarget = false;

// // 	function update() {
// // 		const cameraPosition = camera.position;

// // 		// **Check if inside interaction area**
// // 		if (
// // 			cameraPosition.x >= minBounds.x &&
// // 			cameraPosition.x <= maxBounds.x &&
// // 			cameraPosition.z >= minBounds.z &&
// // 			cameraPosition.z <= maxBounds.z
// // 		) {
// // 			showInteractionText('Press K to interact');
// // 		} else {
// // 			hideInteractionText();
// // 		}

// // 		// **Move camera when 'K' is pressed**
// // 		if (movement.interact && !isMovingToTarget) {
// // 			isMovingToTarget = true;
// // 		}

// // 		// **Smooth movement & rotation**
// // 		if (isMovingToTarget) {
// // 			cameraPosition.lerp(targetPosition, 0.05);

// // 			// **Rotate camera towards lookAtTarget smoothly**
// // 			const direction = new THREE.Vector3()
// // 				.subVectors(lookAtTarget, cameraPosition)
// // 				.normalize();
// // 			camera.quaternion.slerp(
// // 				new THREE.Quaternion().setFromUnitVectors(
// // 					new THREE.Vector3(0, 0, -1),
// // 					direction
// // 				),
// // 				0.05
// // 			);

// // 			// **Stop when close enough**
// // 			if (cameraPosition.distanceTo(targetPosition) < 0.01) {
// // 				isMovingToTarget = false;
// // 			}
// // 		}
// // 	}

// // 	return { update };
// // }

// // **Helper Functions for UI**
// let hud;
// let clicked;
// function openHud() {
// 	if (clicked == true && hud != 'na') {
// 		controls3.unlock();
// 		let hudElement = document.getElementById(hud);
// 		hudElement.style.display = 'block';
// 	}
// }
// function closeHud() {
// 	if (clicked == false && hud != 'na') {
// 		let hudElement = document.getElementById(hud);
// 		hudElement.style.display = 'none';
// 		// hudElement.style.animation = 'fadeOut .3s ease-in-out forwards';
// 	}
// }

// function createInteractionHandler(camera, movement, objects) {
// 	let activeObject = null;
// 	let isMovingToTarget = false;
// 	const margin = 0.5;

// 	function update() {
// 		const cameraPosition = camera.position;
// 		let detectedObject = null;

// 		// Check which object the camera is within bounds of
// 		for (const obj of objects) {
// 			const minBounds = new THREE.Vector3(
// 				Math.min(obj.bound1.x, obj.bound2.x) - margin,
// 				0,
// 				Math.min(obj.bound1.z, obj.bound2.z) - margin
// 			);
// 			const maxBounds = new THREE.Vector3(
// 				Math.max(obj.bound1.x, obj.bound2.x) + margin,
// 				0,
// 				Math.max(obj.bound1.z, obj.bound2.z) + margin
// 			);

// 			if (
// 				cameraPosition.x >= minBounds.x &&
// 				cameraPosition.x <= maxBounds.x &&
// 				cameraPosition.z >= minBounds.z &&
// 				cameraPosition.z <= maxBounds.z
// 			) {
// 				detectedObject = obj;

// 				break; // Stop checking once we find a match
// 			}
// 		}

// 		// Show interaction text if in bounds openHud();
// 		if (detectedObject) {
// 			showInteractionText(
// 				`Press K to interact with ${detectedObject.name}`,
// 				detectedObject.hud
// 			);
// 		} else {
// 			hideInteractionText();
// 		}

// 		// Start movement when 'K' is pressed
// 		if (movement.interact && detectedObject && !isMovingToTarget) {
// 			activeObject = detectedObject; // Lock interaction to this object
// 			isMovingToTarget = true;
// 		}

// 		// Move and look at the active object only
// 		if (isMovingToTarget && activeObject) {
// 			cameraPosition.lerp(activeObject.targetPosition, 0.05);

// 			const direction = new THREE.Vector3()
// 				.subVectors(activeObject.lookAtTarget, cameraPosition)
// 				.normalize();
// 			camera.quaternion.slerp(
// 				new THREE.Quaternion().setFromUnitVectors(
// 					new THREE.Vector3(0, 0, -1),
// 					direction
// 				),
// 				// 0.05
// 				0.1
// 			);

// 			// Stop movement when close to target
// 			if (cameraPosition.distanceTo(activeObject.targetPosition) < 0.01) {
// 				isMovingToTarget = false;
// 				console.log(hud);
// 				// hideInteractionText();
// 			}
// 		}
// 	}

// 	return { update };
// }

// // **Define Multiple Interaction Objects**

// // x: 0.003873259069630748, y: 0, z: 3.97342803426673}
// // We {x: 0.051032483778663706, y: 0, z: 2.5995062480704094}

// // 0.6664521552734355, y: 0, z: 2.9493056065263494

// // We {x: -0.09672966673415093, y: 0, z: -2.7128844560165915}

// // We {x: 0.6892604674686378, y: 0, z: 3.0454453122275624}
// const objects = [
// 	{
// 		name: '\nYour Mission',
// 		bound1: new THREE.Vector3(0.003873259069630748, 0, 3.97342803426673),
// 		bound2: new THREE.Vector3(0.051032483778663706, 0, 2.5995062480704094),

// 		targetPosition: new THREE.Vector3(0.689, 0, 3.045),
// 		lookAtTarget: new THREE.Vector3(-45.1751, 0, 2.4368),
// 		hud: 'about_me',
// 	},
// 	{
// 		name: "\nWhat's this about",
// 		bound1: new THREE.Vector3(-0.06606142045525135, 0, -1.0917),
// 		bound2: new THREE.Vector3(-0.0967, 0, -2.712),
// 		targetPosition: new THREE.Vector3(
// 			-0.15422468241873846,
// 			0,
// 			-2.5802536240156552
// 		),
// 		lookAtTarget: new THREE.Vector3(30.9751, 0, -2.1368),
// 		hud: 'projects',
// 	},
// 	//  0.03577475078777462, y: 0, z: -9.49814034334179}
// 	// -0.21209250697979098, y: 0, z: -9.543560257614152}
// 	{
// 		name: '\nthe outside',
// 		bound1: new THREE.Vector3(-0.03577475078777462, 0, -9.49814034334179),
// 		bound2: new THREE.Vector3(0.21209250697979098, 0, -10.543560257614152),
// 		targetPosition: new THREE.Vector3(13, -10, 13),
// 		lookAtTarget: new THREE.Vector3(-20.9751, 0, 10.1368),
// 		hud: 'about_this',
// 	},
// 	// e {x: -0.39069656940946623, y: 0, z: -10.990486328743165}
// 	// -0.2857296911021507, y: 0, z: -10.99011140600458
// 	{
// 		name: '\nthe outside',
// 		bound1: new THREE.Vector3(11.5, -10.5, 11.5), // Adjusted to enclose target
// 		bound2: new THREE.Vector3(14.5, -9.5, 14.5), // Adjusted to enclose target
// 		targetPosition: new THREE.Vector3(0.285, 0, -10.99),

// 		lookAtTarget: new THREE.Vector3(-45.1751, 0, 20.4368),
// 		hud: 'na',
// 	},
// ];
// // {x: -0.15422468241873846, y: 0, z: -2.2802536240156552}
// // Camera Position: { x: -0.1784, y: 0.0000, z: -2.2633 }

// function showInteractionText(message, hudId) {
// 	hud = hudId;
// 	let interactionText = document.getElementById('interaction-text');
// 	if (!interactionText) {
// 		interactionText = document.createElement('div');
// 		interactionText.id = 'interaction-text';
// 		interactionText.style.position = 'absolute';
// 		// interactionText.style.top = '50%';
// 		// interactionText.style.left = '50%';
// 		interactionText.style.top = '89%';
// 		interactionText.style.left = '21%';
// 		interactionText.style.transform = 'translate(-50%, -50%)';
// 		interactionText.style.padding = '30px';
// 		interactionText.style.textAlign = 'center';
// 		interactionText.style.borderRadius = '15px';
// 		interactionText.style.background = 'transparent';
// 		interactionText.style.color = 'rgba(255, 250, 250, 0.644)';
// 		interactionText.style.fontSize = '28px';
// 		interactionText.style.fontWeight = 'bold';
// 		interactionText.style.textShadow = '0 0 20px rgba(255, 255, 255, 0.5)';
// 		interactionText.style.backdropFilter = 'blur(5px)';
// 		interactionText.style.webkitBackdropFilter = 'blur(5px)';
// 		interactionText.style.opacity = '0';
// 		interactionText.style.animation = 'fadeIn .2s ease-in-out forwards';
// 		interactionText.style.fontFamily = 'cool';
// 		document.body.appendChild(interactionText);
// 	}
// 	interactionText.innerText = message;
// 	interactionText.style.display = 'block';
// 	interactionText.style.opacity = '0';
// 	interactionText.style.animation = 'fadeIn .2s ease-in-out forwards';
// }

// function hideInteractionText() {
// 	const interactionText = document.getElementById('interaction-text');
// 	if (interactionText) {
// 		interactionText.style.opacity = '0';
// 		interactionText.style.animation = 'fadeOut .3s ease-in-out forwards';
// 		setTimeout(() => {
// 			interactionText.style.display = 'none';
// 			setTimeout(() => {}, 500);
// 		}, 1000);
// 		//
// 	}
// }

// // **Key Listeners**
// document.addEventListener('keydown', (event) => {
// 	if (event.key.toLowerCase() === 'k') {
// 		movement.interact = true;
// 		clicked = true;
// 		openHud();
// 	}
// });
// document.addEventListener('keyup', (event) => {
// 	if (event.key.toLowerCase() === 'k') {
// 		movement.interact = false;
// 		clicked = false;
// 	}
// });
// const interactionHandler = createInteractionHandler(
// 	controls3.getObject(),
// 	movement,
// 	objects
// );

// // function animate3() {
// // 	requestAnimationFrame(animate3);

// // 	// Movement logic relative to the camera's orientation
// // 	const moveSpeed = 0.02; // Adjust speed as needed

// // 	direction.set(0, 0, 0); // Reset direction vector

// // 	if (movement.forward) direction.z = moveSpeed; // Forward
// // 	if (movement.backward) direction.z = -moveSpeed; // Backward
// // 	if (movement.left) direction.x = -moveSpeed; // Left
// // 	if (movement.right) direction.x = moveSpeed; // Right

// // 	// Apply movement in the camera's local space
// // 	controls3.getObject().getWorldDirection(velocity); // Get the direction the camera is facing
// // 	velocity.y = 0; // Ensure no vertical movement
// // 	velocity.normalize(); // Normalize to ensure consistent movement speed

// // 	const cameraPosition = controls3.getObject().position;
// // 	const newPosition = cameraPosition.clone();

// // 	// Move forward/backward along the camera's Z-axis
// // 	newPosition.addScaledVector(velocity, direction.z);

// // 	// Move left/right relative to the camera
// // 	const leftVector = new THREE.Vector3(-velocity.z, 0, velocity.x); // Perpendicular to forward
// // 	newPosition.addScaledVector(leftVector, direction.x);

// // 	// Ensure Y-axis remains constant (no vertical movement)
// // 	newPosition.y = cameraPosition.y;
// // 	// console.log(newPosition);

// // 	// Check boundaries before applying movement
// // 	if (
// // 		newPosition.x >= bounds.minX &&
// // 		newPosition.x <= bounds.maxX &&
// // 		newPosition.z >= bounds.minZ &&
// // 		newPosition.z <= bounds.maxZ
// // 	) {
// // 		cameraPosition.copy(newPosition);
// // 	}
// // 	// console.log(cameraPosition);
// // 	// const cameraPositiond = controls3.getObject().position;
// // 	// console.log(
// // 	// 	`Camera Position: { x: ${cameraPositiond.x.toFixed(
// // 	// 		4
// // 	// 	)}, y: ${cameraPositiond.y.toFixed(4)}, z: ${cameraPositiond.z.toFixed(
// // 	// 		4
// // 	// 	)} }`
// // 	// );
// // 	// Rotate the black hole if it exists
// // 	if (blackhole) {
// // 		// Compute rotation around the tilted axis
// // 		const quaternion = new THREE.Quaternion(); // Temporary quaternion for rotation
// // 		const tiltAxis = new THREE.Vector3(0, 1, 0); // Y-axis, adjusted for tilt

// // 		// Adjust the tilt axis for the current tilt of the blackhole
// // 		tiltAxis.applyEuler(
// // 			new THREE.Euler(
// // 				blackhole.rotation.x, // X tilt
// // 				blackhole.rotation.y, // Y rotation
// // 				blackhole.rotation.z // Z tilt
// // 			)
// // 		);

// // 		// Rotate around the computed tilt axis
// // 		quaternion.setFromAxisAngle(tiltAxis, 0.001); // Rotate by 0.01 radians (speed adjustable)
// // 		blackhole.quaternion.multiplyQuaternions(
// // 			quaternion,
// // 			blackhole.quaternion
// // 		);
// // 	}

// // 	interactionHandler.update();
// // 	grainPass.uniforms.time.value += 0.01; // Update grain over time
// // 	composer.render();
// // 	// renderer3.render(scene3, camera3);
// // }

// let prevTime = performance.now();
// const baseMoveSpeed = 2; // Base speed value (adjust as needed)

// function animate3() {
// 	requestAnimationFrame(animate3);

// 	// Calculate delta time for frame-rate independent movement
// 	const currentTime = performance.now();
// 	const deltaTime = (currentTime - prevTime) / 1000; // Convert to seconds
// 	prevTime = currentTime;

// 	// Frame-rate independent move speed
// 	const moveSpeed = baseMoveSpeed * deltaTime;

// 	// Movement logic relative to the camera's orientation
// 	direction.set(0, 0, 0); // Reset direction vector
// 	if (movement.forward) direction.z = moveSpeed; // Forward
// 	if (movement.backward) direction.z = -moveSpeed; // Backward
// 	if (movement.left) direction.x = -moveSpeed; // Left
// 	if (movement.right) direction.x = moveSpeed; // Right

// 	// Rest of your movement code...
// 	// Apply movement in the camera's local space
// 	controls3.getObject().getWorldDirection(velocity);
// 	velocity.y = 0;
// 	velocity.normalize();

// 	const cameraPosition = controls3.getObject().position;
// 	const newPosition = cameraPosition.clone();

// 	newPosition.addScaledVector(velocity, direction.z);
// 	const leftVector = new THREE.Vector3(-velocity.z, 0, velocity.x);
// 	newPosition.addScaledVector(leftVector, direction.x);
// 	newPosition.y = cameraPosition.y;

// 	if (
// 		newPosition.x >= bounds.minX &&
// 		newPosition.x <= bounds.maxX &&
// 		newPosition.z >= bounds.minZ &&
// 		newPosition.z <= bounds.maxZ
// 	) {
// 		cameraPosition.copy(newPosition);
// 	}

// 	// Rest of your animation code...
// 	interactionHandler.update();
// 	grainPass.uniforms.time.value += 0.01;
// 	composer.render();
// }

// window.addEventListener('resize', () => {
// 	camera3.aspect = window.innerWidth / window.innerHeight;
// 	camera3.updateProjectionMatrix();
// 	renderer3.setSize(window.innerWidth, window.innerHeight);
// });

// animate3();
// Scene setup with performance optimizations
const scene3 = new THREE.Scene();
const loaderElement = document.getElementById('loader');
const progressBar = document.getElementById('file');
const loaded = document.getElementById('loaded');
loaded.innerHTML = 'Loading: Initializing...';
let loadedModelsCount = 0;
const totalModels = 0;

// Movement variables
const movement = { forward: 0, backward: 0, left: 0, right: 0 };
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

// Camera setup
const camera3 = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	500 // Reduced far plane from 1000 to 500
);
camera3.position.set(-0.2, 0, 10);

// Renderer with performance settings
const renderer3 = new THREE.WebGLRenderer({
	antialias: false, // Disable antialiasing for performance
	precision: 'mediump', // Use medium precision for better performance
	powerPreference: 'default', // Let browser decide power profile
});

// Adjust pixel ratio for performance
const pixelRatio = Math.min(window.devicePixelRatio, 1.5); // Cap pixel ratio
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

// Optimized lighting - reduced number and range of lights
const lg1 = new THREE.PointLight(0xffffff, 5, 6);
lg1.position.set(0, -2, -11);
scene3.add(lg1);

const lg3 = new THREE.PointLight(0xffffff, 5, 7);
lg3.position.set(0, -1.7, -6);
scene3.add(lg3);

const lg5 = new THREE.PointLight(0xffffff, 5, 6);
lg5.position.set(0, -2, 10);
scene3.add(lg5);

// Reduced number of colored lights
const blueLightRight3 = new THREE.PointLight(0x0000ff, 7, 5);
blueLightRight3.position.set(0, -3, -9);
scene3.add(blueLightRight3);

const outsideLight = new THREE.PointLight(0xff0000, 7, 20);
outsideLight.position.set(-4, 1, -10);
scene3.add(outsideLight);

// Simplified light flickering with less frequent updates
function flickerLight() {
	// Use a less frequent interval
	const flickerInterval = setInterval(() => {
		lg3.intensity = 0.5 + Math.random() * 0.7;
		lg1.intensity = 0.5 + Math.random() * 0.7;
		lg5.intensity = 0.5 + Math.random() * 0.7;
	}, 100); // Less frequent updates (100ms instead of 50ms)

	setTimeout(() => {
		clearInterval(flickerInterval);
		lg3.intensity = 5;
		lg1.intensity = 3;
		lg5.intensity = 3;
	}, 500);
}

// Less frequent flickering
setInterval(flickerLight, 8000); // 8 seconds instead of 5

// Controls setup
const controls3 = new THREE.PointerLockControls(camera3, document.body);
scene3.add(controls3.getObject());

// Simplified UI handling
let lockTimeout;
const directions = document.getElementById('directions');
directions.style.display = 'none';
setTimeout(() => {
	directions.style.animation = 'fadeOut 0.5s ease-in-out forwards';
}, 5000);

// Event listeners with debouncing for performance
let keyEventThrottleTimer = null;
const keyEventThrottleDelay = 10; // ms between key event processing

document.addEventListener('mousedown', () => {
	controls3.lock();
});

document.addEventListener('keydown', (event) => {
	if (event.code === 'Escape') {
		controls3.unlock();
	} else if (keyEventThrottleTimer === null) {
		keyEventThrottleTimer = setTimeout(() => {
			keyEventThrottleTimer = null;
			closeHud();
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

// Optimized model loading with LOD (Level of Detail)
const loader3 = new THREE.GLTFLoader(loadingManager);
let helmet3, blackhole;

// Load models with reduced detail for low-end devices
const isMobile =
	/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	);
const isLowEndDevice =
	isMobile ||
	(navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);

// Function to load models with appropriate detail level
function loadModelWithLOD(path, callback) {
	loader3.load(
		path,
		function (gltf) {
			// For low-end devices, simplify the model
			if (isLowEndDevice) {
				// Simplify geometries if possible
				gltf.scene.traverse(function (child) {
					if (child.isMesh) {
						// Reduce polygon count if possible
						if (child.geometry) {
							// Optional: Apply mesh simplification here if you have a simplifier
						}

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

	const helmetClone = helmet3.clone();
	helmetClone.rotation.y = -helmet3.rotation.y;
	helmetClone.position.x = helmet3.position.x + 0.4;
	helmetClone.position.z = helmet3.position.z + 3.2;
	scene3.add(helmetClone);
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

// Optimized post-processing for low-end devices
const composer = new THREE.EffectComposer(renderer3);
const renderPass = new THREE.RenderPass(scene3, camera3);
composer.addPass(renderPass);

// Only add post-processing effects for higher-end devices
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

	const grainPass = new THREE.ShaderPass(grainShader);
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

// HUD and interaction handling
let hud;
let clicked;

function openHud() {
	if (clicked == true && hud != 'na') {
		controls3.unlock();
		let hudElement = document.getElementById(hud);
		if (hudElement) hudElement.style.display = 'block';
	}
}

function closeHud() {
	if (clicked == false && hud != 'na') {
		let hudElement = document.getElementById(hud);
		if (hudElement) hudElement.style.display = 'none';
	}
}

// Optimized interaction handler
function createInteractionHandler(camera, movement, objects) {
	let activeObject = null;
	let isMovingToTarget = false;
	const margin = 0.5;

	function update() {
		const cameraPosition = camera.position;
		let detectedObject = null;

		// Check which object the camera is within bounds of
		for (const obj of objects) {
			const minBounds = new THREE.Vector3(
				Math.min(obj.bound1.x, obj.bound2.x) - margin,
				0,
				Math.min(obj.bound1.z, obj.bound2.z) - margin
			);
			const maxBounds = new THREE.Vector3(
				Math.max(obj.bound1.x, obj.bound2.x) + margin,
				0,
				Math.max(obj.bound1.z, obj.bound2.z) + margin
			);

			if (
				cameraPosition.x >= minBounds.x &&
				cameraPosition.x <= maxBounds.x &&
				cameraPosition.z >= minBounds.z &&
				cameraPosition.z <= maxBounds.z
			) {
				detectedObject = obj;
				break;
			}
		}

		if (detectedObject) {
			showInteractionText(
				`Press K to interact with ${detectedObject.name}`,
				detectedObject.hud
			);
		} else {
			hideInteractionText();
		}

		if (movement.interact && detectedObject && !isMovingToTarget) {
			activeObject = detectedObject;
			isMovingToTarget = true;
		}

		if (isMovingToTarget && activeObject) {
			cameraPosition.lerp(activeObject.targetPosition, 0.05);
			const direction = new THREE.Vector3()
				.subVectors(activeObject.lookAtTarget, cameraPosition)
				.normalize();
			camera.quaternion.slerp(
				new THREE.Quaternion().setFromUnitVectors(
					new THREE.Vector3(0, 0, -1),
					direction
				),
				0.1
			);

			if (cameraPosition.distanceTo(activeObject.targetPosition) < 0.01) {
				isMovingToTarget = false;
			}
		}
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

// Optimized UI elements
let interactionTextElement = null;

function showInteractionText(message, hudId) {
	hud = hudId;

	if (!interactionTextElement) {
		interactionTextElement = document.createElement('div');
		interactionTextElement.id = 'interaction-text';
		interactionTextElement.style.position = 'absolute';
		interactionTextElement.style.top = '89%';
		interactionTextElement.style.left = '21%';
		interactionTextElement.style.transform = 'translate(-50%, -50%)';
		interactionTextElement.style.padding = '30px';
		interactionTextElement.style.textAlign = 'center';
		interactionTextElement.style.borderRadius = '15px';
		interactionTextElement.style.background = 'transparent';
		interactionTextElement.style.color = 'rgba(255, 250, 250, 0.644)';
		interactionTextElement.style.fontSize = '28px';
		interactionTextElement.style.fontWeight = 'bold';
		interactionTextElement.style.textShadow =
			'0 0 20px rgba(255, 255, 255, 0.5)';
		interactionTextElement.style.backdropFilter = 'blur(5px)';
		interactionTextElement.style.webkitBackdropFilter = 'blur(5px)';
		interactionTextElement.style.fontFamily = 'cool';
		document.body.appendChild(interactionTextElement);
	}

	interactionTextElement.innerText = message;
	interactionTextElement.style.display = 'block';
	interactionTextElement.style.opacity = '0';
	interactionTextElement.style.animation = 'fadeIn .2s ease-in-out forwards';
}

function hideInteractionText() {
	if (interactionTextElement) {
		interactionTextElement.style.opacity = '0';
		interactionTextElement.style.animation =
			'fadeOut .3s ease-in-out forwards';
	}
}

// Key event listeners for interaction
document.addEventListener('keydown', (event) => {
	if (event.key.toLowerCase() === 'k') {
		movement.interact = true;
		clicked = true;
		openHud();
	}
});

document.addEventListener('keyup', (event) => {
	if (event.key.toLowerCase() === 'k') {
		movement.interact = false;
		clicked = false;
	}
});

const interactionHandler = createInteractionHandler(
	controls3.getObject(),
	movement,
	objects
);

// Frame-rate independent movement
let prevTime = performance.now();
const baseMoveSpeed = 0.8; // Base speed value
const bounds = {
	minX: -0.7,
	maxX: 0.7,
	minZ: -11,
	maxZ: 10,
	minY: 0,
	maxY: 0,
};

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

	interactionHandler.update();

	// Update effects only on higher-end devices
	if (!isLowEndDevice && composer.passes.length > 1) {
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

animate3();
