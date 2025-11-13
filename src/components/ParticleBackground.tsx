import { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, useThree, Viewport } from "@react-three/fiber";
import * as THREE from "three";
import { Plane } from "@react-three/drei";
// import { EffectComposer, Vignette } from "@react-three/postprocessing";

// --- Shader Material ---
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment shader (tanpa efek warna mouse)
const fragmentShader = `
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec3 uColor1; // Warna dasar
  uniform vec3 uColor2; // Warna fluid 1
  uniform vec3 uColor3; // Warna fluid 2
  uniform vec3 uColor4; // Warna fluid 3
  uniform float uTime;
  uniform vec2 uVelocity;
  varying vec2 vUv;

  // --- Fungsi Noise (Tidak berubah) ---
  float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  float noise(vec2 p){
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);
    float res = mix(
      mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
      mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y);
    return res; 
  }
  float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      vec2 shift = vec2(100.0);
      mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
      for (int i = 0; i < 3; ++i) { 
          v += a * noise(p);
          p = rot * p * 2.0 + shift;
          a *= 0.5;
      }
      return v;
  }

  void main() {
    float aspect = uResolution.x / uResolution.y;
    vec2 p = vUv * 2.0 - 1.0; 
    if (aspect > 1.0) { p.x *= aspect; } else { p.y /= aspect; }
    
    vec2 mouseP = (uMouse * 2.0 - 1.0); 
    if (aspect > 1.0) { mouseP.x *= aspect; } else { mouseP.y /= aspect; }
    
    vec2 vel = uVelocity;
     if (aspect > 1.0) { vel.x *= aspect; } else { vel.y /= aspect; }

    float mouseDist = distance(p, mouseP);
    float mouseEffect = pow(1.0 - clamp(mouseDist / 0.5, 0.0, 1.0), 3.0); 

    float fluidTime = uTime * 0.1;
    float localTime = uTime * 0.1 + mouseEffect * 0.1; // 'Adukan' tetap ada
    
    float noisePattern1 = fbm(p * 2.0 + localTime);
    float noisePattern2 = fbm(p * 2.0 - fluidTime + 5.0);
    float noisePattern3 = fbm(p * 2.0 + fluidTime * 0.5 + 2.0); 
    
    vec3 finalColor = uColor1;
    finalColor = mix(finalColor, uColor2, smoothstep(0.5, 0.75, noisePattern1));
    finalColor = mix(finalColor, uColor3, smoothstep(0.60, 0.9, noisePattern2));
    finalColor = mix(finalColor, uColor4, smoothstep(0.65, 0.8, noisePattern3));
    
    // Efek warna mouse sudah dihapus
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

// CustomShaderMaterial (tanpa uMouseEffectColor)
class CustomShaderMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2() },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uColor1: { value: new THREE.Color("#000000") },
        uColor2: { value: new THREE.Color("#6a0dad") },
        uColor3: { value: new THREE.Color("#FFD700") },
        uColor4: { value: new THREE.Color("#FFC0CB") },
        uVelocity: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader,
      fragmentShader,
    });
  }
}

// Warna Sparkle (Tidak berubah)
const lineLightColors = {
  c2: new THREE.Color("#FF991C"), // Pink
  c3: new THREE.Color("#FF4D00"), // Hijau Muda
  c4: new THREE.Color("#E86100"), // Biru Muda
};
const lineDarkColors = {
  c2: new THREE.Color("#FFFACD"), // Ungu
  c3: new THREE.Color("#9370DB"), // Emas
  c4: new THREE.Color("#DA70D6"), // Pink Muda
};

// --- Komponen Latar Belakang Gradien ---
interface GradientBackgroundProps {
  theme: "light" | "dark";
  mousePositionRef: React.RefObject<{ x: number; y: number }>;
  mouseVelocityRef: React.RefObject<{ x: number; y: number }>;
  prevPositionRef: React.RefObject<{ x: number; y: number }>;
  // onClick DIHAPUS
}

const GradientBackground = ({
  theme,
  mousePositionRef,
  mouseVelocityRef,
  prevPositionRef,
}: GradientBackgroundProps) => {
  const material = useMemo(() => new CustomShaderMaterial(), []);
  const { viewport } = useThree();

  // Warna (tanpa properti 'mouse')
  const lightColors = useMemo(
    () => ({
      c1: new THREE.Color("#FFFFFF"),
      c2: new THREE.Color("#FFC0CB"),
      c3: new THREE.Color("#90EE90"),
      c4: new THREE.Color("#ADD8E6"),
    }),
    []
  );

  const darkColors = useMemo(
    () => ({
      c1: new THREE.Color("#000000"),
      c2: new THREE.Color("#6a0dad"),
      c3: new THREE.Color("#FFD700"),
      c4: new THREE.Color("#FFC0CB"),
    }),
    []
  );

  useFrame(({ clock, size }, delta) => {
    material.uniforms.uTime.value = clock.getElapsedTime();
    material.uniforms.uResolution.value.set(size.width, size.height);

    if (mousePositionRef.current) {
      material.uniforms.uMouse.value.set(
        (mousePositionRef.current.x + 1) / 2,
        (mousePositionRef.current.y + 1) / 2
      );
    }
    
    let velX = mousePositionRef.current.x - prevPositionRef.current.x;
    let velY = mousePositionRef.current.y - prevPositionRef.current.y;
    mouseVelocityRef.current.x = THREE.MathUtils.lerp(
      mouseVelocityRef.current.x, velX, 0.1
    );
    mouseVelocityRef.current.y = THREE.MathUtils.lerp(
      mouseVelocityRef.current.y, velY, 0.1
    );
    prevPositionRef.current.x = mousePositionRef.current.x;
    prevPositionRef.current.y = mousePositionRef.current.y;
    material.uniforms.uVelocity.value.set(
      mouseVelocityRef.current.x,
      mouseVelocityRef.current.y
    );

    const targetColors = theme === "dark" ? darkColors : lightColors;
    const transitionSpeed = 2.5;
    const lerpFactor = Math.min(transitionSpeed * delta, 1.0);

    material.uniforms.uColor1.value.lerp(targetColors.c1, lerpFactor);
    material.uniforms.uColor2.value.lerp(targetColors.c2, lerpFactor);
    material.uniforms.uColor3.value.lerp(targetColors.c3, lerpFactor);
    material.uniforms.uColor4.value.lerp(targetColors.c4, lerpFactor);
  });

  return (
    // onClick DIHAPUS dari Plane
    <Plane args={[viewport.width * 2, viewport.height * 2, 1, 1]} renderOrder={-1} frustumCulled={false}>
      <primitive object={material} attach="material" />
    </Plane>
  );
};

// --- Komponen Sparkle (Tidak berubah) ---
// --- Komponen Sparkle (OFFSET PERSPEKTIF DIPERBAIKI) ---
interface SparkleProps {
  id: number;
  position: THREE.Vector3; // Ini adalah posisi klik di (x, y, 0)
  angle: number;
  color: THREE.Color;
  distance: number; // 💥 tambahan baru
  onComplete: (id: number) => void;
}

const Sparkle = ({ id, position, angle, color, onComplete }: SparkleProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  const targetDistance = 0.25 + Math.random() * 0.4;
  const life = useRef(0.55);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    life.current -= delta * 1.0; 
    
    if (life.current <= 0) {
      onComplete(id);
      return;
    }

    const progress = 1.0 - (life.current / 0.6);
    const easedProgress = 1.0 - Math.pow(1.0 - progress, 3);
    const currentDistance = THREE.MathUtils.lerp(0, targetDistance, easedProgress);
    const currentOpacity = 1.0 - progress;

    (meshRef.current.material as THREE.MeshBasicMaterial).opacity =
      currentOpacity;

    const x = position.x + Math.cos(angle) * currentDistance;
    const y = position.y + Math.sin(angle) * currentDistance;

    meshRef.current.position.set(x, y, 0.1); 
  });

  return (
    <mesh
      ref={meshRef}
      rotation-z={angle + Math.PI / 2}
      raycast={() => null} 
      renderOrder={0} 
      frustumCulled={false}
    >
      <planeGeometry args={[0.02, 0.25]} /> 
      <meshBasicMaterial
        color={color}
        transparent
        opacity={1}
        // 💡 SOLUSI: Hapus baris 'blending' ini
        // blending={THREE.AdditiveBlending} 
      />
    </mesh>
  );
};

// --- Helper Component untuk melacak Viewport ---
const ViewportUpdater = ({ viewportRef }: { viewportRef: React.MutableRefObject<Viewport | undefined> }) => {
  const viewport = useThree(state => state.viewport);
  // Perbarui ref dengan data viewport terbaru
  useEffect(() => {
    viewportRef.current = viewport;
  }, [viewport, viewportRef]);
  return null;
};


// --- Komponen Pembungkus Utama (DIPERBARUI) ---
interface ParticleBackgroundProps {
  theme: "light" | "dark";
}

export const ParticleBackground = ({ theme }: ParticleBackgroundProps) => {
  const mousePosition = useRef({ x: 0, y: 0 });
  const mouseVelocity = useRef({ x: 0, y: 0 });
  const prevMousePosition = useRef({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState<SparkleProps[]>([]);
  
  // Ref untuk menyimpan data viewport dari dalam canvas
  const viewportRef = useRef<Viewport>();

  // const vignetteDarkness = theme === "dark" ? -0.3 : 0.7;
  // Memoize themeColors agar tidak berubah-ubah
  const themeColors = useMemo(() => theme === "dark" ? lineDarkColors : lineLightColors, [theme]);

  // Gunakan 'useCallback' agar fungsi ini stabil
  const removeSparkle = useCallback((id: number) => {
    setSparkles((currentSparkles) =>
      currentSparkles.filter((sparkle) => sparkle.id !== id)
    );
  }, []);

  // Fungsi untuk membuat sparkle, dipanggil oleh 'click' listener
  const spawnSparkles = useCallback((e: MouseEvent) => {
    // Opsional: Cek jika target klik adalah tombol/link, jangan buat sparkle
    if (e.target instanceof Element && e.target.closest('a, button, [role="button"]')) {
      return;
    }

    // Pastikan ref sudah terisi oleh ViewportUpdater
    if (!viewportRef.current || !mousePosition.current) return;

    const { width, height } = viewportRef.current;
    
    // Konversi posisi mouse (-1 s/d 1) ke koordinat dunia 3D
    const clickPoint = new THREE.Vector3(
      mousePosition.current.x * (width / 2),
      mousePosition.current.y * (height / 2),
      0 
    );
    
    const colorKeys: (keyof typeof themeColors)[] = ["c2", "c3", "c4"];
    const newSparkles: SparkleProps[] = [];
const sparkleCount = 9; // Sama seperti contoh kamu

for (let i = 0; i < sparkleCount; i++) {
  // Sudut menyebar 360° merata
  const angle = (2 * Math.PI / sparkleCount) * i;
  
  // Jarak acak biar lebih natural
  const distance = 0.2 + Math.random() * 0.3;

  const colorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
  const color = new THREE.Color(themeColors[colorKey]);

  newSparkles.push({
    id: Math.random(),
    position: clickPoint.clone(),
    angle,
    color,
    distance,
    onComplete: removeSparkle,
  });
}


    setSparkles((currentSparkles) => [...currentSparkles, ...newSparkles]);
  }, [themeColors, removeSparkle]); // Dependensi

  // useEffect untuk listener mouse global
  useEffect(() => {
    // Lacak posisi mouse
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    
    // Tambahkan listener ke 'window'
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", spawnSparkles);
    
    // Set posisi awal (untuk kasus jika tidak ada gerakan mouse)
    prevMousePosition.current = { ...mousePosition.current };

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", spawnSparkles);
    };
  }, [spawnSparkles]); // 'spawnSparkles' adalah dependensi

  return (
    // 'div' ini adalah yang diatur oleh -z-10 di CSS Anda
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        
        {/* Komponen ini memperbarui viewportRef.current */}
        <ViewportUpdater viewportRef={viewportRef} />

        <GradientBackground
          theme={theme}
          mousePositionRef={mousePosition}
          mouseVelocityRef={mouseVelocity}
          prevPositionRef={prevMousePosition}
        />

        {sparkles.map((props) => (
          <Sparkle key={props.id} {...props} />
        ))}

        {/* <EffectComposer>
          <Vignette
            eskil={false}
            offset={0.1}
            darkness={vignetteDarkness}
          />
        </EffectComposer> */}
      </Canvas>
    </div>
  );
};