import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";
import React from "react";
import { connect } from "react-redux";
import { addTree } from "../../actions";

const Dirt = props => {
  const gltf = useLoader(GLTFLoader, "/models/planet/newplanet.gltf");

  return (
    <mesh
      receiveShadow
      onPointerDown={e => {
        e.stopPropagation();
        addTree(e.point);
        console.log("click");
      }}
      scale={[29.3, 29.3, 29.3]}
      position={[0, 0, 0]}
    >
      <bufferGeometry attach="geometry" {...gltf.__$[1].geometry} />
      <meshStandardMaterial attach="material" color="sienna" roughness={1} />
    </mesh>
  );
};
const mapStateToProps = ({ data }) => {
  return {
    data
  };
};
export default connect(
  mapStateToProps,
  { addTree }
)(Dirt);
