import * as THREE from "three";
import { CustomShaderMaterial, TYPES } from "three-custom-shader-material";
import { loadShadersCSM } from "gl-noise";
import { initScene } from "./setup.js";
import lights from "./lights.js";
import Stats from "stats.js";

const v = {
  defines: "./static/shaders/particle_defines.glsl",
  header: "./static/shaders/particle_header.glsl",
  main: "./static/shaders/particle_main.glsl",
};

const f = {
  defines: "./static/shaders/frag/defines.glsl",
  header: "./static/shaders/frag/header.glsl",
  main: "./static/shaders/frag/main.glsl",
};

export async function main(canvas) {
  const { defines: vdefines, header: vheader, main: vmain } = await loadShadersCSM(v);
  const { defines: fdefines, header: fheader, main: fmain } = await loadShadersCSM(f);

  const { scene, renderer, camera, controls } = initScene(canvas);
  camera.position.set(10, 10, 10);

  lights(scene);

  const loader = new THREE.TextureLoader();
  const disk = loader.load("./static/textures/circle-sprite.png");

  const geometry = new THREE.IcosahedronGeometry(4, 32);
  console.log(geometry.attributes.position.count);
  const material = new CustomShaderMaterial({
    baseMaterial: TYPES.POINTS,
    vShader: {
      defines: vdefines,
      header: vheader,
      main: vmain,
    },
    fShader: {
      defines: fdefines,
      header: fheader,
      main: fmain,
    },
    uniforms: {
      uShift: {
        value: 0,
      },
      uShape: {
        value: disk,
      },
      uScale: {
        value: window.innerHeight / 2,
      },
      uTime: {
        value: 0,
      },
      uTargetPos: {
        value: new THREE.Vector3(0),
      },
    },
    passthrough: {
      size: 0.1,
    },
  });

  const points = new THREE.Points(geometry, material);

  scene.add(points);

  const targetPos = new THREE.Vector3();

  renderer.domElement.addEventListener("pointermove", (event) => {
    var vec = new THREE.Vector3(); // create once and reuse
    var pos = new THREE.Vector3(); // create once and reuse
    vec.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
    vec.unproject(camera);
    vec.sub(camera.position).normalize();
    var distance = -camera.position.z / vec.z;
    pos.copy(camera.position).add(vec.multiplyScalar(distance));
    targetPos.x = pos.x;
    targetPos.y = pos.y;
    targetPos.z = pos.z;
  });

  var stats = new Stats();
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.dom);

  function render(time) {
    stats.begin();
    if (material && material.uniforms) {
      material.uniforms.uTime.value = time * 0.001;
      material.uniforms.uTargetPos.value = targetPos;
    }

    controls.update();

    renderer.render(scene, camera);
    stats.end();
  }

  function cleanup() {
    stats.dom.remove();
  }

  return { render, cleanup };
}
