<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import HeroParticles from './components/HeroParticles.vue'
import PhoenixLogo from './components/PhoenixLogo.vue'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
</script>

<template>
    <Layout>
        <template #home-hero-before>
            <HeroParticles />
        </template>

        <template #home-hero-image>
            <PhoenixLogo />
        </template>
    </Layout>
</template>

<style scoped>
/* Layout specific styles */
</style>
