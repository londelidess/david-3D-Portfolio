import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
  {
    title: "DALL-E-icon-generator",
    url: "https://icons.makotodoi.com",
    image: "projects/dalle-e.gif",
    description: " Users can buy credits and buy icons generated by AI",
  },
  {
    title: "PLAYBOX",
    url: "https://omocha-no-chachacha.onrender.com",
    image: "projects/playbox.png",
    description: "Toy E-commerce Website which user can browse, create, edit, and review products, add them to their cart, checkout, and view transaction history.",
  },
  {
    title: "Bumblr",
    url: "https://group-social-network-service.onrender.com",
    image: "projects/bumblr.png",
    description: """Social Network Service which user can see, create, edit and like posts and follow other User as like "Tumblr"""",
  },
  {
    title: "Disturbo",
    url: "https://disturbo-9ef64.firebaseapp.com/?_gl=1*4gf19d*_ga*MTkxMDc0MzkxMy4xNjkzOTM2Nzg3*_ga_CW55HF8NVT*MTY5NzA2MzI4NC4xOC4xLjE2OTcwNjQ1MTQuMzEuMC4w",
    image: "projects/disturbo.png",
    description: """Real-Time Chat Application which user can see, create, and delete as like "Discord"""",
  },
  {
    title: "STAY",
    url: "https://md-api-solo-backend-project.onrender.com",
    image: "projects/stay.png",
    description: """Vacation Booking Platform which user can see, create, edit spots and reviews as like "AirBnB"""",
  },
];

const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.001}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[2.2, 2]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[2, 1.2, 1]}
        url={project.image}
        toneMapped={false}
        position-y={0.3}
      />
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.2}
        position={[-1, -0.4, 0]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={2}
        anchorX="left"
        anchorY="top"
        fontSize={0.1}
        position={[-1, -0.6, 0]}
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 1}>
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 2.5, 0, -3]}
          animate={{
            x: 0 + (index - currentProject) * 2.5,
            y: currentProject === index ? 0 : -0.1,
            z: currentProject === index ? -2 : -3,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};
