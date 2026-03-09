<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref(null)
let animationId = null
let particles = []

class Particle {
    constructor(canvas) {
        this.canvas = canvas
        this.reset()
    }

    reset() {
        this.x = Math.random() * this.canvas.width
        this.y = this.canvas.height + Math.random() * 100
        this.size = Math.random() * 4 + 1
        this.speedY = Math.random() * 2 + 1
        this.speedX = (Math.random() - 0.5) * 1
        this.opacity = Math.random() * 0.6 + 0.2
        this.life = 0
        this.maxLife = Math.random() * 100 + 100

        const colorVariation = Math.random()
        if (colorVariation < 0.4) {
            this.color = { r: 0, g: 212, b: 255 } // Cyan-blue
        } else if (colorVariation < 0.7) {
            this.color = { r: 0, g: 255, b: 255 } // Pure cyan
        } else if (colorVariation < 0.9) {
            this.color = { r: 100, g: 180, b: 255 } // Light blue
        } else {
            this.color = { r: 123, g: 44, b: 191 } // Purple accent
        }
    }

    update() {
        this.y -= this.speedY
        this.x += this.speedX + Math.sin(this.life * 0.05) * 0.5
        this.life++

        // Fade out as particle rises
        const lifeRatio = this.life / this.maxLife
        this.opacity = (1 - lifeRatio) * 0.6
        this.size = (1 - lifeRatio * 0.5) * (Math.random() * 3 + 2)

        // Flicker effect
        if (Math.random() < 0.1) {
            this.opacity *= Math.random() * 0.5 + 0.5
        }

        if (this.y < -10 || this.life > this.maxLife) {
            this.reset()
        }
    }

    draw(ctx) {
        const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size * 2
        )

        const { r, g, b } = this.color
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${this.opacity})`)
        gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${this.opacity * 0.6})`)
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
    }
}

// Ember particles (small bright sparks)
class Ember {
    constructor(canvas) {
        this.canvas = canvas
        this.reset()
    }

    reset() {
        this.x = Math.random() * this.canvas.width
        this.y = this.canvas.height + 50
        this.size = Math.random() * 2 + 0.5
        this.speedY = Math.random() * 3 + 2
        this.speedX = (Math.random() - 0.5) * 2
        this.opacity = Math.random() * 0.8 + 0.2
        this.life = 0
        this.maxLife = Math.random() * 80 + 40
    }

    update() {
        this.y -= this.speedY
        this.x += this.speedX + Math.sin(this.life * 0.1) * 0.8
        this.life++

        const lifeRatio = this.life / this.maxLife
        this.opacity = (1 - lifeRatio) * 0.8

        // Twinkle effect
        if (Math.random() < 0.15) {
            this.opacity = Math.random() * 0.5 + 0.3
        }

        if (this.y < -10 || this.life > this.maxLife) {
            this.reset()
        }
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
        ctx.fill()

        // Glow effect
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 255, 255, ${this.opacity * 0.3})`
        ctx.fill()
    }
}

function initParticles(canvas) {
    particles = []
    const particleCount = Math.min(60, Math.floor(canvas.width / 20))
    const emberCount = Math.min(30, Math.floor(canvas.width / 30))

    for (let i = 0; i < particleCount; i++) {
        const particle = new Particle(canvas)
        particle.y = Math.random() * canvas.height // Spread initially
        particles.push(particle)
    }

    for (let i = 0; i < emberCount; i++) {
        const ember = new Ember(canvas)
        ember.y = Math.random() * canvas.height
        particles.push(ember)
    }
}

function animate(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach(particle => {
        particle.update()
        particle.draw(ctx)
    })

    animationId = requestAnimationFrame(() => animate(canvas, ctx))
}

function handleResize(canvas) {
    const container = canvas.parentElement
    canvas.width = container.offsetWidth
    canvas.height = container.offsetHeight
    initParticles(canvas)
}

onMounted(() => {
    const canvas = canvasRef.value
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    handleResize(canvas)
    animate(canvas, ctx)

    const resizeObserver = new ResizeObserver(() => handleResize(canvas))
    resizeObserver.observe(canvas.parentElement)

    window.addEventListener('resize', () => handleResize(canvas))
})

onUnmounted(() => {
    if (animationId) {
        cancelAnimationFrame(animationId)
    }
})
</script>

<template>
    <div class="particles-wrapper">
        <canvas ref="canvasRef" class="particles-canvas"></canvas>
    </div>
</template>

<style scoped>
.particles-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
}

.particles-canvas {
    width: 100%;
    height: 100%;
    display: block;
}
</style>
