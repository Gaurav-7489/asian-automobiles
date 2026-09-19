"use client";
import {useEffect,useRef} from "react";

export function CarScene(){
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  let cleanup=()=>{};
  import("three").then(THREE=>{
   if(!ref.current)return;
   const mount=ref.current;
   const scene=new THREE.Scene();
   scene.background=null;
   const camera=new THREE.PerspectiveCamera(38,mount.clientWidth/Math.max(1,mount.clientHeight),.1,100);
   camera.position.set(0,1.15,5.8);
   const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
   renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
   renderer.setSize(mount.clientWidth,mount.clientHeight);
   renderer.outputColorSpace=THREE.SRGBColorSpace;
   mount.appendChild(renderer.domElement);
   const group=new THREE.Group();
   scene.add(group);
   const body=new THREE.Mesh(new THREE.BoxGeometry(3.7,.65,1.55),new THREE.MeshStandardMaterial({color:0x151b24,metalness:.85,roughness:.2}));
   body.position.y=.72;group.add(body);
   const cabin=new THREE.Mesh(new THREE.BoxGeometry(2.05,.65,1.38),new THREE.MeshStandardMaterial({color:0x08101a,metalness:.7,roughness:.12,transparent:true,opacity:.92}));
   cabin.position.set(-.15,1.23,0);cabin.rotation.z=-.04;group.add(cabin);
   const hood=new THREE.Mesh(new THREE.BoxGeometry(1.25,.18,1.48),new THREE.MeshStandardMaterial({color:0x202b39,metalness:.9,roughness:.18}));
   hood.position.set(1.22,1.02,0);group.add(hood);
   const bumper=new THREE.Mesh(new THREE.BoxGeometry(3.9,.22,1.62),new THREE.MeshStandardMaterial({color:0x0b1018,metalness:.8,roughness:.25}));
   bumper.position.y=.43;group.add(bumper);
   const wheelGeo=new THREE.CylinderGeometry(.5,.5,.28,48);
   const wheelMat=new THREE.MeshStandardMaterial({color:0x050609,metalness:.6,roughness:.28});
   [-1.3,1.25].forEach(x=>[-.82,.82].forEach(z=>{const w=new THREE.Mesh(wheelGeo,wheelMat);w.rotation.x=Math.PI/2;w.position.set(x,.48,z);group.add(w)}));
   const rimGeo=new THREE.CylinderGeometry(.27,.27,.3,32);
   const rimMat=new THREE.MeshStandardMaterial({color:0x9ba8b7,metalness:1,roughness:.2});
   [-1.3,1.25].forEach(x=>[-.82,.82].forEach(z=>{const w=new THREE.Mesh(rimGeo,rimMat);w.rotation.x=Math.PI/2;w.position.set(x,.48,z);group.add(w)}));
   const head=new THREE.Mesh(new THREE.BoxGeometry(.08,.18,.45),new THREE.MeshBasicMaterial({color:0x7eeaff}));
   head.position.set(1.95,.82,.48);group.add(head);const head2=head.clone();head2.position.z=-.48;group.add(head2);
   const light=new THREE.HemisphereLight(0xaed8ff,0x06101c,2.2);scene.add(light);
   const key=new THREE.DirectionalLight(0xffffff,3);key.position.set(4,5,5);scene.add(key);
   const blue=new THREE.PointLight(0x1769ff,8,8);blue.position.set(0,1,3);scene.add(blue);
   let mx=0,my=0,raf=0;
   const onMove=(e:PointerEvent)=>{const r=mount.getBoundingClientRect();mx=(e.clientX-r.left)/r.width-.5;my=(e.clientY-r.top)/r.height-.5};
   const animate=()=>{group.rotation.y+=(mx*.8-group.rotation.y)*.045;group.rotation.x+=(-my*.18-group.rotation.x)*.045;group.position.y=Math.sin(performance.now()*.0012)*.035;renderer.render(scene,camera);raf=requestAnimationFrame(animate)};
   const resize=()=>{camera.aspect=mount.clientWidth/Math.max(1,mount.clientHeight);camera.updateProjectionMatrix();renderer.setSize(mount.clientWidth,mount.clientHeight)};
   mount.addEventListener("pointermove",onMove);window.addEventListener("resize",resize);animate();
   cleanup=()=>{cancelAnimationFrame(raf);mount.removeEventListener("pointermove",onMove);window.removeEventListener("resize",resize);renderer.dispose();mount.innerHTML=""};
  }).catch(()=>{});
  return()=>cleanup();
 },[]);
 return <div ref={ref} className="car-scene" aria-label="Interactive 3D automotive model"/>;
}