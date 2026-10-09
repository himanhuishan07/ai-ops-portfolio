import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef } from 'react';

export const useCameraSlerp = (targetPosition: THREE.Vector3, targetQuaternion: THREE.Quaternion, damping: number = 0.1) => {
  useFrame((state) => {
    // Linear interpolation for position
    state.camera.position.lerp(targetPosition, damping);
    // Spherical linear interpolation for rotation
    state.camera.quaternion.slerp(targetQuaternion, damping);
    state.camera.updateProjectionMatrix();
  });
};