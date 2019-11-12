import React, { useEffect, useRef, Suspense, useState } from "react";
import { extend, useFrame, useThree } from "react-three-fiber";
import { connect } from "react-redux";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import * as THREE from "three";
import { WaterPass } from "../../resources/postprocessing/WaterPass";
extend({ EffectComposer, RenderPass, UnrealBloomPass, OutlinePass, WaterPass });

function Fx({ showInfo, name }) {
  const { gl, scene, camera, size } = useThree();
  const [planetIsDead] = useState(true);
  const outlineP = useRef();
  const composer = useRef();
  const res = new THREE.Vector2(1024, 1024);

  useEffect(() => void composer.current.setSize(size.width, size.height), [
    size
  ]);

  useFrame(() => composer.current.render(), 1);
  useEffect(() => {}, [showInfo]);
  return (
    <Suspense fallback={null}>
      <effectComposer ref={composer} args={[gl]}>
        <renderPass attachArray="passes" args={[scene, camera]} />
        {planetIsDead && <waterPass attachArray="passes" factor={1.4} />}
        {name === "QUERY" && (
          <outlinePass
            ref={outlineP}
            attachArray="passes"
            args={[
              res,
              scene,
              camera,
              showInfo.active ? [showInfo.object] : []
            ]}
            pulsePeriod={4}
            renderToScreen
          />
        )}
      </effectComposer>
    </Suspense>
  );
}
const mapStateToProps = ({ state: { showInfo, name } }) => {
  return {
    showInfo,
    name
  };
};

export default connect(mapStateToProps)(Fx);
