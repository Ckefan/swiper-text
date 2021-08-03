/** @format */

import React, { useEffect } from 'react'
import * as THREE from 'three'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
const ThreePosman = ({ index }) => {
  let container, clock, gui, mixer, actions, activeAction, previousAction
  let camera, scene, renderer, model, face

  const api = { state: 'Walking' }

  useEffect(() => {
    if (index === 3) {
      init()
      animate()
    }
  }, [index])

  function init() {
    container = document.querySelector('.threePosman')

    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.25,
      100
    )
    //设置相机的原点和看的位置
    camera.position.set(-5, 3, 10)
    camera.lookAt(new THREE.Vector3(0, 2, 0))

    scene = new THREE.Scene()
    scene.background = new THREE.Color(0xe0e0e0)
    scene.fog = new THREE.Fog(0xe0e0e0, 20, 100)

    clock = new THREE.Clock()

    // 设置灯光
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444)
    hemiLight.position.set(0, 20, 0)
    scene.add(hemiLight)

    const dirLight = new THREE.DirectionalLight(0xffffff)
    dirLight.position.set(0, 20, 10)
    scene.add(dirLight)

    // ground

    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2000, 2000),
      new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
    )
    mesh.rotation.x = -Math.PI / 2
    scene.add(mesh)

    const grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000)
    grid.material.opacity = 0.2
    grid.material.transparent = true
    scene.add(grid)

    // model
    const loader = new GLTFLoader().setPath('')
    loader.load(
      'RobotExpressive.glb',
      function (gltf) {
        model = gltf.scene
        scene.add(model)

        createGUI(model, gltf.animations)
      },
      undefined,
      function (e) {
        console.error(e)
      }
    )

    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.outputEncoding = THREE.sRGBEncoding
    container.appendChild(renderer.domElement)

    window.addEventListener('resize', onWindowResize)
  }

  function createGUI(model, animations) {
    const states = [
      'Idle',
      'Walking',
      'Running',
      'Dance',
      'Death',
      'Sitting',
      'Standing',
    ]
    const emotes = ['Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp']

    gui = new GUI()

    mixer = new THREE.AnimationMixer(model)

    actions = {}

    for (let i = 0; i < animations.length; i++) {
      const clip = animations[i]
      const action = mixer.clipAction(clip)
      actions[clip.name] = action

      if (emotes.indexOf(clip.name) >= 0 || states.indexOf(clip.name) >= 4) {
        action.clampWhenFinished = true
        action.loop = THREE.LoopOnce
      }
    }

    // states

    const statesFolder = gui.addFolder('States')

    const clipCtrl = statesFolder.add(api, 'state').options(states)

    clipCtrl.onChange(function () {
      fadeToAction(api.state, 0.5)
    })

    statesFolder.open()

    // emotes

    const emoteFolder = gui.addFolder('Emotes')

    function createEmoteCallback(name) {
      api[name] = function () {
        fadeToAction(name, 0.2)

        mixer.addEventListener('finished', restoreState)
      }

      emoteFolder.add(api, name)
    }

    function restoreState() {
      mixer.removeEventListener('finished', restoreState)

      fadeToAction(api.state, 0.2)
    }

    for (let i = 0; i < emotes.length; i++) {
      createEmoteCallback(emotes[i])
    }

    emoteFolder.open()

    // expressions

    face = model.getObjectByName('Head_4')

    const expressions = Object.keys(face.morphTargetDictionary)
    const expressionFolder = gui.addFolder('Expressions')

    for (let i = 0; i < expressions.length; i++) {
      expressionFolder
        .add(face.morphTargetInfluences, i, 0, 1, 0.01)
        .name(expressions[i])
    }

    activeAction = actions['Walking']
    activeAction.play()

    expressionFolder.open()
  }

  function fadeToAction(name, duration) {
    previousAction = activeAction
    activeAction = actions[name]

    if (previousAction !== activeAction) {
      previousAction.fadeOut(duration)
    }

    activeAction
      .reset()
      .setEffectiveTimeScale(1)
      .setEffectiveWeight(1)
      .fadeIn(duration)
      .play()
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  function animate() {
    const dt = clock.getDelta()

    if (mixer) mixer.update(dt)

    requestAnimationFrame(animate)

    renderer.render(scene, camera)
  }

  return <div className='threePosman'></div>
}

export default ThreePosman
