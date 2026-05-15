<script setup>
import DefaultTheme from 'vitepress/theme'
import HomeCodeShowcase from './components/HomeCodeShowcase.vue'
import PhoenixLogo from './components/PhoenixLogo.vue'

const { Layout } = DefaultTheme
</script>

<template>
    <Layout>
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
