import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

const DisplayUploadsComponent = () => {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await fetch('http://localhost:3000/uploads');
        const result = await response.json();
        console.log(result)
        setUploads(result.uploads);
      } catch (error) {
        console.error('Error fetching uploads:', error);
      }
    };

    fetchUploads();
  }, []);

  const renderModels = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0xffffff, 0);
    document.body.appendChild( renderer.domElement );
 
    uploads.forEach((upload) => {
        // console.log(upload)
        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
        loader.setDRACOLoader( dracoLoader );
        loader.load(upload.filename, function (gltf)  {
            scene.add(gltf.scene);
        },undefined, function (error) {
            console.error('Error loading model:', error);
        });
    });

    var hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
    hemiLight.position.set( 0, 300, 0 );
    scene.add( hemiLight );

    var dirLight = new THREE.DirectionalLight( 0xffffff );
    dirLight.position.set( 75, 300, -75 );
    scene.add( dirLight );

    camera.position.z = 4;

    const animate = function () {
      requestAnimationFrame(animate);

      renderer.render(scene, camera);
    };

    animate();
  };

  return (
    <div>
      <h2>Uploaded GLTF Files</h2>
      <button onClick={renderModels}>Render GLTF Models</button>
    </div>
  );
};

export default DisplayUploadsComponent;
