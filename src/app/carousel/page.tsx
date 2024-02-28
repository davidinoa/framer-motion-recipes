"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import Image from "next/image";
import image1 from "public/images/1.jpeg";
import image2 from "public/images/2.jpeg";
import image3 from "public/images/3.jpeg";
import image4 from "public/images/4.jpeg";
import image5 from "public/images/5.jpeg";
import image6 from "public/images/6.jpeg";
import { useState } from "react";
import useKeypress from "react-use-keypress";

const images = [image1, image2, image3, image4, image5, image6] as const;

const gap = 4;
const margin = 12;
const fullAspectRatio = 3 / 2;
const collapsedAspectRatio = 1 / 3;

export default function Page() {
  const [index, setIndex] = useState(0);

  useKeypress("ArrowLeft", () => setIndex((i) => Math.max(0, i - 1)));
  useKeypress("ArrowRight", () =>
    setIndex((i) => Math.min(images.length - 1, i + 1)),
  );

  return (
    <MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
      <div className="h-screen bg-black">
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-center">
          <div className="relative overflow-hidden">
            <motion.div
              animate={{ x: `-${index * 100}%` }}
              className="flex aspect-[3/2]"
            >
              {images.map((image, i) => (
                <Image
                  src={image}
                  key={image.src}
                  priority={i === 0}
                  alt="A picture taken in the city"
                  className="object-cover"
                />
              ))}
            </motion.div>
            <AnimatePresence initial={false}>
              {index > 0 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0, pointerEvents: "none" }}
                  whileHover={{ opacity: 1 }}
                  className="absolute left-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white"
                  onClick={() => setIndex(index - 1)}
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </motion.button>
              )}
            </AnimatePresence>
            <AnimatePresence initial={false}>
              {index + 1 < images.length && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0, pointerEvents: "none" }}
                  whileHover={{ opacity: 1 }}
                  className="absolute right-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white"
                  onClick={() => setIndex(index + 1)}
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-6 flex h-14 justify-center overflow-hidden">
          <motion.div
            className="flex"
            initial={false}
            style={{ aspectRatio: fullAspectRatio, gap: `${gap}%` }}
            animate={{
              x: `-${index * 100 * (collapsedAspectRatio / fullAspectRatio) + margin + index * gap}%`,
            }}
          >
            {images.map((image, i) => (
              <motion.button
                key={image.src}
                onClick={() => setIndex(i)}
                initial={false}
                whileHover={{ opacity: 1 }}
                animate={index === i ? "active" : "inactive"}
                variants={{
                  active: {
                    marginInline: `${margin}%`,
                    aspectRatio: fullAspectRatio,
                    opacity: 1,
                  },
                  inactive: {
                    marginInline: 0,
                    aspectRatio: collapsedAspectRatio,
                    opacity: 0.5,
                  },
                }}
              >
                <Image
                  src={image}
                  key={image.src}
                  priority={i === 0}
                  alt="A picture taken in the city"
                  className="h-full object-cover"
                />
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </MotionConfig>
  );
}
