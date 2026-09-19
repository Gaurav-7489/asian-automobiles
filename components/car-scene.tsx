"use client";

import {useEffect,useRef} from "react";
import * as THREE from "three";

export function CarScene(){
 const ref=useRef<HTMLDivElement>(null);

 useEffect(()=>{
  const mount=ref.current;
  if(!mount)return;

  const width=()=>Math.max(1,mount.clientWidth);
  const height=()=>Math.max(1,mount.clientHeight);

  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(38,width()/height(),.1,100);
  camera.position.set(0,1.15,5.8);

  const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:"high-performance"});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.setSize(width(),height());
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.domElement.setAttribute("aria-hidden","true");
  mount.appendChild(renderer.domElement);

  const group=new THREE.Group();
  scene.add(group);

  const body=new THREE.Mesh(
   new THREE.BoxGeometry(3.7,.65,1.55),
   new THREE.MeshStandardMaterial({color:0x151b24,metalness:.85,roughness:.2})
  );
  body.position.y=.72;
  group.add(body);

  const cabin=new THREE.Mesh(
   new THREE.BoxGeometry(2.05,.65,1.38),
   new THREE.MeshStandardMaterial({color:0x08101a,metalness:.7,roughness:.12,transparent:true,opacity:.92})
  );
  cabin.position.set(-.15,1.23,0);
  cabin.rotation.z=-.04;
  group.add(cabin);

  const hood=new THREE.Mesh(
   new THREE.BoxGeometry(1.25,.18,1.48),
   new THREE.MeshStandardMaterial({color:0x202b39,metalness:.9,roughness:.18})
  );
  hood.position.set(1.22,1.02,0);
  group.add(hood);

  const bumper=new THREE.Mesh(
   new THREE.BoxGeometry(3.9,.22,1.62),
   new THREE.MeshStandardMaterial({color:0x0b1018,metalness:.8,roughness:.25})
  );
  bumper.position.y=.43;
  group.add(bumper);

  const wheelGeo=new THREE.CylinderGeometry(.5,.5,.28,48);
  const wheelMat=new THREE.MeshStandardMaterial({color:0x050609,metalness:.6,roughness:.28});
  const rimGeo=new THREE.CylinderGeometry(.27,.27,.3,32);
  const rimMat=new THREE.MeshStandardMaterial({color:0x9ba8b7,metalness:1,roughness:.2});

  for(const x of [-1.3,1.25]){
   for(const z of [-.82,.82]){
    const wheel=new THREE.Mesh(wheelGeo,wheelMat);
    wheel.rotation.x=Math.PI/2;
    wheel.position.set(x,.48,z);
    group.add(wheel);

    const rim=new THREE.Mesh(rimGeo,rimMat);
    rim.rotation.x=Math.PI/2;
    rim.position.set(x,.48,z);
    group.add(rim);
   }
  }

  const head=new THREE.Mesh(
   new THREE.BoxGeometry(.08,.18,.45),
   new THREE.MeshBasicMaterial({color:0x7eeaff})
  );
  head.position.set(1.95,.82,.48);
  group.add(head);
  const head2=head.clone();
  head2.position.z=-.48;
  group.add(head2);

  const light=new THREE.HemisphereLight(0xaed8ff,0x06101c,2.2);
  scene.add(light);
  const key=new THREE.DirectionalLight(0xffffff,3);
  key.position.set(4,5,5);
  scene.add(key);
  const blue=new THREE.PointLight(0x1769ff,8,8);
  blue.position.set(0,1,3);
  scene.add(blue);

  let mx=0;
  let my=0;
  let raf=0;

  const onMove=(event:PointerEvent)=>{
   const rect=mount.getBoundingClientRect();
   if(rect.width===0||rect.height===0)return;
   mx=(event.clientX-rect.left)/rect.width-.5;
   my=(event.clientY-rect.top)/rect.height-.5;
  };

  const animate=()=>{
   group.rotation.y+=(mx*.8-group.rotation.y)*.045;
   group.rotation.x+=(-my*.18-group.rotation.x)*.045;
   group.position.y=Math.sin(performance.now()*.0012)*.035;
   renderer.render(scene,camera);
   raf=requestAnimationFrame(animate);
  };

  const resize=()=>{
   camera.aspect=width()/height();
   camera.updateProjectionMatrix();
   renderer.setSize(width(),height());
  };

  mount.addEventListener("pointermove",onMove);
  window.addEventListener("resize",resize);
  animate();

  return()=>{
   cancelAnimationFrame(raf);
   mount.removeEventListener("pointermove",onMove);
   window.removeEventListener("resize",resize);
   renderer.dispose();
   scene.traverse(object=>{
    const mesh=object as THREE.Mesh;
    if(mesh.geometry)mesh.geometry.dispose();
    const material=mesh.material;
    if(Array.isArray(material))material.forEach(item=>item.dispose());
    else if(material)material.dispose();
   });
   mount.replaceChildren();
  };
 },[]);

 return <div ref={ref} className="car-scene" aria-label="Interactive 3D automotive model"/>;
}
