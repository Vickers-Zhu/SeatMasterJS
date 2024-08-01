import React, {Suspense, useRef, useState, useEffect, lazy} from "react";
import { Text, View } from "react-native";
import { Canvas, useFrame, useThree, Camera } from "@react-three/fiber/native";
import { Sky, Bvh, useGLTF } from "@react-three/drei/native";
import { Vector3, PerspectiveCamera } from 'three';
import {Asset} from "expo-asset";
import usePromise from "react-promise-suspense";
import useControls from "r3f-native-orbitcontrols"
import { Selection } from "@react-three/postprocessing";


import { Effects } from "./Effects";
import Scene from "./Scene";


const Chairs = () => {

  const [OrbitControls, events] = useControls()

  return (
    <View {...events} style={{ flex: 1 }}>
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={1.5 * Math.PI} />
        <Sky /> 
        <pointLight position={[10, 10, 10]} />
        <Suspense>
          <Scene  />
          {/* <Bvh firstHitOnly>
            <Selection>
              <Effects />
              <Scene />
            </Selection>
          </Bvh> */}
        </Suspense>
      </Canvas>
    </View>
  );
}

export default Chairs;

  // {/* // <Canvas>
  // //   <Sky />
  // //   <Suspense fallback={null}>
  // //     <Model />
  // //   </Suspense>
  // // </Canvas> */}