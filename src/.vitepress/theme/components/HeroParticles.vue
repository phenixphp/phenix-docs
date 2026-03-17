<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref(null)
let animationId = null
let particles = []
let resizeObserver = null
let resizeHandler = null
let themeObserver = null

const fallbackTheme = {
    palette: [
        { r: 0, g: 120, b: 179 },
        { r: 0, g: 154, b: 218 },
        { r: 56, g: 110, b: 194 },
        { r: 74, g: 89, b: 201 }
    ],
    ember: { r: 12, g: 99, b: 168 },
    emberGlow: { r: 0, g: 169, b: 214 }
}

let particleTheme = { ...fallbackTheme }

function parseCssColor(value, fallback) {
    const normalizedValue = value.trim()

    if (!normalizedValue) {
        return fallback
    }

    const hexMatch = normalizedValue.match(/^#([\da-f]{3}|[\da-f]{6})$/i)
    if (hexMatch) {
        const hex = hexMatch[1]
        const segments = hex.length === 3
            ? hex.split('').map(char => `${char}${char}`)
            : hex.match(/.{2}/g)

        return {
            r: Number.parseInt(segments[0], 16),
            g: Number.parseInt(segments[1], 16),
            b: Number.parseInt(segments[2], 16)
        }
    }

    const rgbMatch = normalizedValue.match(/^rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i)
    if (rgbMatch) {
        return {
            r: Number.parseInt(rgbMatch[1], 10),
            g: Number.parseInt(rgbMatch[2], 10),
            b: Number.parseInt(rgbMatch[3], 10)
        }
    }

    return fallback
}

function readParticleTheme() {
    const rootStyles = getComputedStyle(document.documentElement)

    return {
        palette: [
            parseCssColor(rootStyles.getPropertyValue('--phenix-particle-1'), fallbackTheme.palette[0]),
            parseCssColor(rootStyles.getPropertyValue('--phenix-particle-2'), fallbackTheme.palette[1]),
            parseCssColor(rootStyles.getPropertyValue('--phenix-particle-3'), fallbackTheme.palette[2]),
            parseCssColor(rootStyles.getPropertyValue('--phenix-particle-accent'), fallbackTheme.palette[3])
        ],
        ember: parseCssColor(rootStyles.getPropertyValue('--phenix-ember'), fallbackTheme.ember),
        emberGlow: parseCssColor(rootStyles.getPropertyValue('--phenix-ember-glow'), fallbackTheme.emberGlow)
    }
}

function pickParticleColor() {
    const colorVariation = Math.random()

    if (colorVariation < 0.4) {
        return particleTheme.palette[0]
    }

    if (colorVariation < 0.7) {
        return particleTheme.palette[1]
    }

    if (colorVariation < 0.9) {
        return particleTheme.palette[2]
    }

    return particleTheme.palette[3]
}

function refreshThemeColors() {
    particleTheme = readParticleTheme()
    particles.forEach(particle => {
        if (typeof particle.applyTheme === 'function') {
            particle.applyTheme()
        }
    })
}

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
        this.applyTheme()
    }

    applyTheme() {
        this.color = pickParticleColor()
    }

    update() {
        this.y -= this.speedY
        this.x += this.speedX + Math.sin(this.life * 0.05) * 0.5
        this.life++

        const lifeRatio = this.life / this.maxLife
        this.opacity = (1 - lifeRatio) * 0.6
        this.size = (1 - lifeRatio * 0.5) * (Math.random() * 3 + 2)

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

class Ember {
    constructor(canvas) {
        this.canvas = canvas
        this.reset()
    }

    applyTheme() {
        // Embers read theme colors at draw time, but keeping this method
        // allows a shared refresh flow when the site theme changes.
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

        if (Math.random() < 0.15) {
            this.opacity = Math.random() * 0.5 + 0.3
        }

        if (this.y < -10 || this.life > this.maxLife) {
            this.reset()
        }
    }

    draw(ctx) {
        const { ember, emberGlow } = particleTheme

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${ember.r}, ${ember.g}, ${ember.b}, ${this.opacity})`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${emberGlow.r}, ${emberGlow.g}, ${emberGlow.b}, ${this.opacity * 0.3})`
        ctx.fill()
    }
}

function initParticles(canvas) {
    particles = []
    const particleCount = Math.min(60, Math.floor(canvas.width / 20))
    const emberCount = Math.min(30, Math.floor(canvas.width / 30))

    for (let i = 0; i < particleCount; i++) {
        const particle = new Particle(canvas)
        particle.y = Math.random() * canvas.height
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
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    initParticles(canvas)
}

onMounted(() => {
    const canvas = canvasRef.value
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    refreshThemeColors()
    handleResize(canvas)
    animate(canvas, ctx)

    resizeObserver = new ResizeObserver(() => handleResize(canvas))
    resizeObserver.observe(document.documentElement)

    themeObserver = new MutationObserver(mutations => {
        const hasThemeChange = mutations.some(mutation => mutation.attributeName === 'class')
        if (hasThemeChange) {
            refreshThemeColors()
        }
    })
    themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
    })

    resizeHandler = () => handleResize(canvas)
    window.addEventListener('resize', resizeHandler)
})

onUnmounted(() => {
    if (animationId) {
        cancelAnimationFrame(animationId)
    }

    if (resizeObserver) {
        resizeObserver.disconnect()
    }

    if (themeObserver) {
        themeObserver.disconnect()
    }

    if (resizeHandler) {
        window.removeEventListener('resize', resizeHandler)
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
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    opacity: var(--phenix-particles-opacity, 1);
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
