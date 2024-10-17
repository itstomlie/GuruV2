import React from "react";
import SamuraiModel from "@/components/character/samurai";
import useControls from "r3f-native-orbitcontrols";
import { Canvas, useLoader } from "@react-three/fiber/native";
import { PresentationControls } from "@react-three/drei";
import { Texture, TextureLoader } from "three";
import { ContactShadows, Environment, Preload } from "@react-three/drei/native";
import { Suspense } from "react";
import { View } from "react-native";

const Background = () => {
  const texture = useLoader(
    TextureLoader,
    require("../../assets/images/dojo-bg.jpg")
  );

  return (
    <mesh scale={[100, 50, 0]} position={[-3, 10, -40]} rotation={[0, 0.1, 0]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture as Texture} />
    </mesh>
  );
};

const CharacterCanvas = () => {
  const [OrbitControls, events] = useControls();

  return (
    <View style={{ flex: 0.4, backgroundColor: "#f2f2f2" }} {...events}>
      <Canvas
        frameloop="demand"
        shadows
        camera={{
          position: [10, 0, 120],
          fov: 15,
        }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={null}>
          <spotLight
            position={[0, 10, 10]}
            angle={0.3}
            penumbra={0.7}
            intensity={500}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-radius={4}
          />
          <pointLight
            intensity={2}
            position={[1, 1, 0]}
            decay={2}
            distance={50}
          />
          <directionalLight
            position={[1, 0, 0]}
            intensity={3}
            args={["white", 5]}
          />
          <directionalLight
            position={[-1, 0, 0]}
            intensity={1}
            args={["white", 5]}
          />
          <directionalLight
            position={[0, 1, 0]}
            intensity={1}
            args={["white", 5]}
          />
          <directionalLight
            position={[0, -1, 0]}
            intensity={1}
            args={["white", 5]}
          />
          <directionalLight
            position={[0, 0, 1]}
            intensity={1}
            args={["white", 5]}
          />
          <directionalLight
            position={[0, 0, -1]}
            intensity={1}
            args={["white", 5]}
          />
          <Background />

          <OrbitControls
            enablePan={true}
            enableZoom={true}
            maxZoom={100}
            minZoom={10}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <SamuraiModel />

          <Preload all />
        </Suspense>
      </Canvas>
    </View>
  );
};

export default CharacterCanvas;
