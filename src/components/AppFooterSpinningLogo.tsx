import React, { useRef, useEffect, useState, useCallback } from "react"
import * as THREE from "three"

export const AppFooterSpinningLogo = ({
    width = 500,
    height = 500,
    scale = 1,
    speed = 1,
    initialThickness = 80,
    autoRotate = true
}) => {
    const canvasRef = useRef(null)
    const sceneRef = useRef(null)
    const rendererRef = useRef(null)
    const cameraRef = useRef(null)
    const meshGroupRef = useRef(null)
    const animationIdRef = useRef(null)

    const [thickness, setThickness] = useState(initialThickness)
    const [isPaused, setIsPaused] = useState(!autoRotate)

    // Responsive canvas size: on mobile (<= 767px) force 150x150
    const [canvasSize, setCanvasSize] = useState(() => ({ w: width, h: height }))
    useEffect(() => {
        if (typeof window === "undefined") return
        const mq = window.matchMedia("(max-width: 767px)")
        const apply = () => {
            if (mq.matches) {
                setCanvasSize({ w: 150, h: 150 })
            } else {
                setCanvasSize({ w: width, h: height })
            }
        }
        apply()

        // Prefer modern API
        if (typeof mq.addEventListener === "function") {
            mq.addEventListener("change", apply)
            return () => mq.removeEventListener("change", apply)
        }
        if ("onchange" in mq) {
            mq.onchange = apply
            return () => {
                mq.onchange = null
            }
        }
        const legacy = mq as any
        if (typeof legacy.addListener === "function") {
            legacy.addListener(apply)
            return () => legacy.removeListener(apply)
        }
        return
    }, [width, height])

    const convertCoords = useCallback((x, y) => {
        return [(x - 22.5) * 0.08, (15 - y) * 0.08]
    }, [])

    const createSVGShapes = useCallback(() => {
        const shapes = []

        const shape1 = new THREE.Shape()
        let [x, y] = convertCoords(29.993, 15)
        shape1.moveTo(x, y)
        ;[x, y] = convertCoords(29.993, 0)
        shape1.lineTo(x, y)
        ;[x, y] = convertCoords(44.9895, 0)
        shape1.lineTo(x, y)
        ;[x, y] = convertCoords(29.993, 15)
        shape1.lineTo(x, y)
        shapes.push(shape1)

        const shape2 = new THREE.Shape()
        ;[x, y] = convertCoords(14.9965, 15.0001)
        shape2.moveTo(x, y)
        ;[x, y] = convertCoords(14.9965, 29.9999)
        shape2.lineTo(x, y)
        ;[x, y] = convertCoords(29.993, 15)
        shape2.lineTo(x, y)
        ;[x, y] = convertCoords(29.9929, 30)
        shape2.lineTo(x, y)
        ;[x, y] = convertCoords(14.9965, 29.9999)
        shape2.lineTo(x, y)
        ;[x, y] = convertCoords(0, 30)
        shape2.lineTo(x, y)
        ;[x, y] = convertCoords(14.9965, 15.0001)
        shape2.lineTo(x, y)
        ;[x, y] = convertCoords(0, 0.00012313)
        shape2.lineTo(x, y)
        ;[x, y] = convertCoords(29.993, 0)
        shape2.lineTo(x, y)
        ;[x, y] = convertCoords(14.9965, 15.0001)
        shape2.lineTo(x, y)
        shapes.push(shape2)

        const shape3 = new THREE.Shape()
        ;[x, y] = convertCoords(44.9895, 30)
        shape3.moveTo(x, y)
        ;[x, y] = convertCoords(29.9929, 30)
        shape3.lineTo(x, y)
        ;[x, y] = convertCoords(29.993, 15)
        shape3.lineTo(x, y)
        ;[x, y] = convertCoords(44.9895, 30)
        shape3.lineTo(x, y)
        shapes.push(shape3)

        return shapes
    }, [convertCoords])

    const createExtrudedMeshes = useCallback(
        (thicknessValue) => {
            if (!meshGroupRef.current || !sceneRef.current) return

            while (meshGroupRef.current.children.length > 0) {
                const child = meshGroupRef.current.children[0]
                if (child instanceof THREE.Mesh) {
                    if (child.geometry) child.geometry.dispose()
                    if (child.material) {
                        const material = child.material
                        if (Array.isArray(material)) {
                            material.forEach((mat) => mat.dispose())
                        } else {
                            material.dispose()
                        }
                    }
                }
                meshGroupRef.current.remove(child)
            }

            const extrudeSettings = {
                depth: thicknessValue * 0.01,
                bevelEnabled: true,
                bevelSegments: 2,
                steps: 2,
                bevelSize: 0.008,
                bevelThickness: 0.008
            }

            const shapes = createSVGShapes()
            const colors = [0x5dca47, 0x4ab83a, 0x6dd454]

            shapes.forEach((shape, index) => {
                const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)

                const materials = [
                    new THREE.MeshLambertMaterial({ color: colors[index % colors.length] }),
                    new THREE.MeshLambertMaterial({ color: colors[index % colors.length] })
                ]

                const mesh = new THREE.Mesh(geometry, materials) as THREE.Mesh<
                    THREE.ExtrudeGeometry,
                    THREE.MeshLambertMaterial[]
                >
                mesh.castShadow = true
                mesh.receiveShadow = true

                mesh.rotation.x = Math.sin(index) * 0.02
                mesh.rotation.z = Math.cos(index) * 0.02

                meshGroupRef.current.add(mesh)
            })
        },
        [createSVGShapes]
    )

    const animate = useCallback(() => {
        if (!meshGroupRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) {
            return
        }

        if (!isPaused) {
            meshGroupRef.current.rotation.y -= 0.01 * speed
        }

        meshGroupRef.current.rotation.x = 0
        meshGroupRef.current.rotation.z = 0

        const time = Date.now() * 0.001
        meshGroupRef.current.position.y = Math.sin(time * 0.5) * 0.1

        meshGroupRef.current.position.x = 0
        meshGroupRef.current.position.z = 0

        rendererRef.current.render(sceneRef.current, cameraRef.current)
        animationIdRef.current = requestAnimationFrame(animate)
    }, [isPaused, speed])

    useEffect(() => {
        if (!canvasRef.current) return

        try {
            const scene = new THREE.Scene()
            const camera = new THREE.PerspectiveCamera(75, canvasSize.w / canvasSize.h, 0.1, 1000)
            const renderer = new THREE.WebGLRenderer({
                canvas: canvasRef.current,
                antialias: true,
                alpha: true
            })

            renderer.setSize(canvasSize.w, canvasSize.h)
            renderer.setClearColor(0x000000, 0)
            renderer.shadowMap.enabled = true
            renderer.shadowMap.type = THREE.PCFSoftShadowMap

            const ambientLight = new THREE.AmbientLight(0x404040, 0.8)
            scene.add(ambientLight)

            const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2)
            directionalLight.position.set(10, 10, 5)
            directionalLight.castShadow = true
            directionalLight.shadow.mapSize.width = 2048
            directionalLight.shadow.mapSize.height = 2048
            scene.add(directionalLight)

            const pointLight = new THREE.PointLight(0x5dca47, 0.8, 100)
            pointLight.position.set(-5, 5, 10)
            scene.add(pointLight)

            const meshGroup = new THREE.Group()
            scene.add(meshGroup)

            camera.position.set(0, 0, 6)

            sceneRef.current = scene
            rendererRef.current = renderer
            cameraRef.current = camera
            meshGroupRef.current = meshGroup

            createExtrudedMeshes(thickness)
            meshGroup.scale.set(scale, scale, scale)

            animate()

            return () => {
                if (animationIdRef.current) {
                    cancelAnimationFrame(animationIdRef.current)
                }

                scene.traverse((object) => {
                    if (object instanceof THREE.Mesh) {
                        if (object.geometry) object.geometry.dispose()
                        if (object.material) {
                            const material = object.material
                            if (Array.isArray(material)) {
                                material.forEach((mat) => mat.dispose())
                            } else {
                                material.dispose()
                            }
                        }
                    }
                })
                renderer.dispose()
            }
        } catch (error) {
            console.error("Error initializing Three.js:", error)
        }
    }, [canvasSize.w, canvasSize.h, animate, createExtrudedMeshes, thickness, scale])

    // Keep renderer/camera in sync on size change without full reinit
    useEffect(() => {
        if (!rendererRef.current || !cameraRef.current) return
        rendererRef.current.setSize(canvasSize.w, canvasSize.h)
        cameraRef.current.aspect = canvasSize.w / canvasSize.h
        cameraRef.current.updateProjectionMatrix()
    }, [canvasSize.w, canvasSize.h])

    useEffect(() => {
        if (meshGroupRef.current) {
            meshGroupRef.current.scale.set(scale, scale, scale)
        }
    }, [scale])

    useEffect(() => {
        if (meshGroupRef.current && sceneRef.current) {
            createExtrudedMeshes(thickness)
            meshGroupRef.current.scale.set(scale, scale, scale)
        }
    }, [thickness, createExtrudedMeshes, scale])

    useEffect(() => {
        if (animationIdRef.current) {
            cancelAnimationFrame(animationIdRef.current)
        }
        animate()
    }, [animate])

    return (
        <div className="block">
            <canvas
                ref={canvasRef}
                width={canvasSize.w}
                height={canvasSize.h}
                style={{ width: `${canvasSize.w}px`, height: `${canvasSize.h}px` }}
            />
        </div>
    )
}
