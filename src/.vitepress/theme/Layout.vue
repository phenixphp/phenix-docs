<script setup>
import DefaultTheme from 'vitepress/theme'
import HeroParticles from './components/HeroParticles.vue'
import HomeCodeShowcase from './components/HomeCodeShowcase.vue'
import PhoenixLogo from './components/PhoenixLogo.vue'

const { Layout } = DefaultTheme
</script>

<template>
    <Layout>
        <template #home-hero-before>
            <HeroParticles />
        </template>

        <template #home-hero-image>
            <PhoenixLogo />
        </template>

        <template #home-features-before>
            <HomeCodeShowcase />
        </template>
    </Layout>
</template>

<style scoped>
/* Layout specific styles */
</style>
