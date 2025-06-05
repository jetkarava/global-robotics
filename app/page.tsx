import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "GlobalRobotics.com - Pioneering Planetary Research Through Robotics",
  description: "Leading the future of space exploration through innovative robotic satellite technology",
}

export default function Home() {
  return (
    <iframe
      src="/index.html"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: "100%",
        height: "100%",
        border: "none",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        zIndex: 999999,
      }}
    />
  )
}
