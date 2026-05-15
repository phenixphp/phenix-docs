<script setup>
import { computed, ref, watch } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()
const activeIndex = ref(0)

const showcase = computed(() => frontmatter.value.codeShowcase)
const tabs = computed(() => showcase.value?.tabs ?? [])
const activeTab = computed(() => tabs.value[activeIndex.value] ?? null)
const codeLines = computed(() => {
    const code = activeTab.value?.code ?? ''

    return code.replace(/\n$/, '').split('\n')
})

watch(tabs, (items) => {
    if (activeIndex.value >= items.length) {
        activeIndex.value = 0
    }
})

function activateTab(index) {
    activeIndex.value = index
}
</script>

<template>
    <section v-if="showcase && tabs.length" class="HomeCodeShowcase" aria-labelledby="home-code-showcase-title">
        <div class="container">
            <div class="intro">
                <p class="eyebrow">
                    PhenixPHP style
                </p>
                <h2 id="home-code-showcase-title">
                    {{ showcase.title }}
                </h2>
                <p class="summary">
                    {{ showcase.intro }}
                </p>
            </div>

            <div class="showcase-card">
                <div class="tabs" role="tablist" aria-label="PhenixPHP code examples">
                    <button
                        v-for="(tab, index) in tabs"
                        :id="`home-code-tab-${index}`"
                        :key="tab.label"
                        class="tab"
                        :class="{ active: index === activeIndex }"
                        type="button"
                        role="tab"
                        :aria-selected="index === activeIndex"
                        :aria-controls="`home-code-panel-${index}`"
                        @click="activateTab(index)"
                    >
                        {{ tab.label }}
                    </button>
                </div>

                <div
                    v-if="activeTab"
                    :id="`home-code-panel-${activeIndex}`"
                    class="code-panel"
                    role="tabpanel"
                    :aria-labelledby="`home-code-tab-${activeIndex}`"
                >
                    <div class="code-header">
                        <span class="status-dot"></span>
                        <span class="file-name">{{ activeTab.file }}</span>
                    </div>

                    <pre class="code-block" tabindex="0"><code><span
                        v-for="(line, index) in codeLines"
                        :key="`${activeTab.label}-${index}`"
                        class="code-line"
                    ><span class="line-number">{{ index + 1 }}</span><span class="line-code">{{ line || ' ' }}</span></span></code></pre>

                    <p class="description">
                        {{ activeTab.description }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.HomeCodeShowcase {
    position: relative;
    padding: 32px 24px 48px;
}

.container {
    margin: 0 auto;
    max-width: 1152px;
}

.intro {
    max-width: 720px;
    margin-bottom: 28px;
}

.eyebrow {
    margin: 0 0 10px;
    color: var(--vp-c-brand-1);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0;
    text-transform: uppercase;
}

h2 {
    margin: 0;
    color: var(--vp-c-text-1);
    font-size: 36px;
    line-height: 1.16;
    font-weight: 800;
    letter-spacing: 0;
}

.summary {
    margin: 14px 0 0;
    color: var(--vp-c-text-2);
    font-size: 17px;
    line-height: 1.7;
}

.showcase-card {
    overflow: hidden;
    border: 1px solid rgba(0, 212, 255, 0.16);
    border-radius: 8px;
    background:
        linear-gradient(180deg, rgba(20, 20, 31, 0.96), rgba(11, 13, 22, 0.98)),
        var(--phenix-bg-card);
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.28);
}

.tabs {
    display: flex;
    overflow-x: auto;
    border-bottom: 1px solid rgba(0, 212, 255, 0.12);
    background: rgba(255, 255, 255, 0.025);
}

.tab {
    min-width: 132px;
    min-height: 44px;
    padding: 0 18px;
    border: 0;
    border-right: 1px solid rgba(0, 212, 255, 0.09);
    background: transparent;
    color: rgba(255, 255, 255, 0.68);
    font: inherit;
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
    cursor: pointer;
    transition:
        background-color 0.2s ease,
        color 0.2s ease;
}

.tab:hover,
.tab:focus-visible {
    color: rgba(255, 255, 255, 0.95);
    background: rgba(0, 212, 255, 0.08);
    outline: none;
}

.tab.active {
    color: #ffffff;
    background: linear-gradient(135deg, var(--phenix-blue-dark), var(--phenix-blue));
}

.code-panel {
    min-height: 548px;
}

.code-header {
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 42px;
    padding: 0 22px;
    border-bottom: 1px solid rgba(0, 212, 255, 0.1);
    color: rgba(255, 255, 255, 0.6);
    font-size: 13px;
    font-family: var(--vp-font-family-mono);
}

.status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--vp-c-brand-1);
    box-shadow: 0 0 18px rgba(0, 212, 255, 0.7);
}

.file-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.code-block {
    min-height: 420px;
    margin: 0;
    padding: 28px 0;
    overflow-x: auto;
    background:
        linear-gradient(90deg, rgba(0, 212, 255, 0.035), transparent 42%),
        rgba(4, 6, 13, 0.42);
    color: rgba(255, 255, 255, 0.88);
    font-size: 14px;
    line-height: 1.72;
    font-family: var(--vp-font-family-mono);
    tab-size: 4;
}

.code-line {
    display: grid;
    grid-template-columns: 62px minmax(760px, max-content);
    min-width: max-content;
}

.line-number,
.line-code {
    display: block;
}

.line-number {
    min-width: 62px;
    padding: 0 18px 0 22px;
    color: rgba(255, 255, 255, 0.24);
    text-align: right;
    user-select: none;
}

.line-code {
    padding-right: 28px;
    white-space: pre;
}

.description {
    margin: 0;
    min-height: 84px;
    padding: 22px 28px;
    border-top: 1px solid rgba(0, 212, 255, 0.1);
    color: rgba(255, 255, 255, 0.72);
    background: rgba(255, 255, 255, 0.025);
    font-size: 15px;
    line-height: 1.7;
}

@media (max-width: 768px) {
    .HomeCodeShowcase {
        padding: 12px 18px 36px;
    }

    h2 {
        font-size: 28px;
    }

    .summary {
        font-size: 16px;
    }

    .tab {
        min-width: 116px;
        padding: 0 14px;
        font-size: 13px;
    }

    .code-panel {
        min-height: 500px;
    }

    .code-block {
        min-height: 360px;
        font-size: 13px;
    }

    .line-number {
        min-width: 50px;
        padding-left: 14px;
        padding-right: 14px;
    }

    .description {
        padding: 18px;
        font-size: 14px;
    }
}
</style>
