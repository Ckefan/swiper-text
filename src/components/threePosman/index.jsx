/** @format */

import React, { useEffect, useState } from 'react'
import * as THREE from 'three'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const ThreePosman = ({ index }) => {
  const [lock, setlock] = useState(false)
  let container,
    clock,
    gui,
    mixer,
    actions,
    activeAction,
    previousAction,
    orbitControls
  let camera, scene, renderer, model, face

  const api = { state: 'Walking' }

  useEffect(() => {
    if (index === 3 && !lock) {
      setlock(true)
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

    // 声明时钟
    clock = new THREE.Clock()

    // 设置灯光
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444)
    hemiLight.position.set(0, 20, 0)
    scene.add(hemiLight)

    const dirLight = new THREE.DirectionalLight(0xffffff)
    dirLight.position.set(0, 20, 10)
    scene.add(dirLight)

    // 导入模型
    const loader = new GLTFLoader().setPath('')
    loader.load(
      'RobotExpressive.glb',
      function (gltf) {
        console.log(gltf)
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

    // 轨道控制
    orbitControls = new OrbitControls(camera, renderer.domElement)
    orbitControls.target = new THREE.Vector3(0, 0, 0) //控制焦点
    orbitControls.autoRotate = false //将自动旋转关闭

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

    // 声明特定对象的动画播放器
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

    // 设置状态
    const statesFolder = gui.addFolder('States')
    const clipCtrl = statesFolder.add(api, 'state').options(states)
    clipCtrl.onChange(function () {
      fadeToAction(api.state, 0.5)
    })

    statesFolder.open()

    // 设置动作
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

    // 设置表情
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

  // 执行动画
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
    const dt = clock.getDelta() //获取两帧的时间间隔
    if (mixer) mixer.update(dt)

    orbitControls.update(dt)
    requestAnimationFrame(animate)

    renderer.render(scene, camera)
  }

  return <div className='threePosman'></div>
}

export default ThreePosman
