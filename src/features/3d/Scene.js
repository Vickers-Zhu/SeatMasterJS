import React, { useState, useCallback, useRef } from "react";
import {View, Text} from "react-native";
// import { useGLTF, useEnvironment, Text } from "@react-three/drei";
import { useGLTF } from "@react-three/drei/native";
import { useLoader } from '@react-three/fiber/native'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { Asset } from "expo-asset";
import usePromise from "react-promise-suspense";

import kitchen_transformed from "../../../assets/models/kitchen-transformed.glb";
import reactModel from "../../../assets/models/react.gltf";
import ZombieCar from "../../../assets/models/ZombieCar.gltf";

export default function Scene(props) {
  const group = useRef()
  // ---------------------

  // const gltf = useGLTF(reactModel);
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/'); // Use CDN path or local public path

  const { scene } = useLoader(GLTFLoader, reactModel, (loader) => {
    loader.setDRACOLoader(dracoLoader);
  });
  console.log("After GLTF!!", scene);
  return (
    < primitive object={scene} />
  )
  // ---------------------

  try {

  } catch (e) {
    console.error("Loading GLTF failed: ", e);
  }  
  // const env = useEnvironment({ preset: "city" })
  // const [hovered, hover] = useState(null)
  // const debouncedHover = useCallback(debounce(hover, 30), [])
  // const over = (name) => (e) => (e.stopPropagation(), debouncedHover(name))
  // return (
  //   <>
  //     <group {...props}>
  //       <mesh geometry={nodes.vase1.geometry} material={materials.gray} material-envMap={env} />
  //       <mesh geometry={nodes.bottle.geometry} material={materials.gray} material-envMap={env} />
  //       <mesh geometry={nodes.walls_1.geometry} material={materials.floor} />
  //       <mesh geometry={nodes.walls_2.geometry} material={materials.walls} />
  //       <mesh geometry={nodes.plant_1.geometry} material={materials.potted_plant_01_leaves} />
  //       <mesh geometry={nodes.plant_2.geometry} material={materials.potted_plant_01_pot} />
  //       <mesh geometry={nodes.cuttingboard.geometry} material={materials.walls} />
  //       <mesh geometry={nodes.bowl.geometry} material={materials.walls} />
  //       <Select enabled={hovered === "BRÖNDEN"} onPointerOver={over("BRÖNDEN")} onPointerOut={() => debouncedHover(null)}>
  //         <mesh geometry={nodes.carpet.geometry} material={materials.carpet} />
  //       </Select>
  //       <Select enabled={hovered === "VOXLÖV"} onPointerOver={over("VOXLÖV")} onPointerOut={() => debouncedHover(null)}>
  //         <mesh geometry={nodes.table.geometry} material={materials.walls} material-envMap={env} material-envMapIntensity={0.5} />
  //       </Select>
  //       <Select enabled={hovered === "FANBYN"} onPointerOver={over("FANBYN")} onPointerOut={() => debouncedHover(null)}>
  //         <mesh geometry={nodes.chairs_1.geometry} material={materials.walls} />
  //         <mesh geometry={nodes.chairs_2.geometry} material={materials.plastic} material-color="#1a1a1a" material-envMap={env} />
  //       </Select>
  //       <Select enabled={hovered === "LIVSVERK"} onPointerOver={over("LIVSVERK")} onPointerOut={() => debouncedHover(null)}>
  //         <mesh geometry={nodes.vase.geometry} material={materials.gray} material-envMap={env} />
  //       </Select>
  //       <Select enabled={hovered === "SKAFTET"} onPointerOver={over("SKAFTET")} onPointerOut={() => debouncedHover(null)}>
  //         <mesh geometry={nodes.lamp_socket.geometry} material={materials.gray} material-envMap={env} />
  //         <mesh geometry={nodes.lamp.geometry} material={materials.gray} />
  //         <mesh geometry={nodes.lamp_cord.geometry} material={materials.gray} material-envMap={env} />
  //       </Select>
  //       <mesh geometry={nodes.kitchen.geometry} material={materials.walls} />
  //       <mesh geometry={nodes.sink.geometry} material={materials.chrome} material-envMap={env} />
  //     </group>
  //   </>
  // )
}
