<script setup>
import { computed, ref, watch } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()
const activeIndex = ref(0)

const showcase = computed(() => frontmatter.value.codeShowcase)
const tabs = computed(() => showcase.value?.tabs ?? [])
const activeTab = computed(() => tabs.value[activeIndex.value] ?? null)
const activeCodeHtml = computed(() => {
    if (activeTab.value?.highlightedCode) {
        return activeTab.value.highlightedCode
    }

    return codeToFallbackHtml(activeTab.value?.code ?? '')
})

watch(tabs, (items) => {
    if (activeIndex.value >= items.length) {
        activeIndex.value = 0
    }
})

function activateTab(index) {
    activeIndex.value = index
}

function codeToFallbackHtml(code) {
    const lines = code.replace(/\n$/, '').split('\n')
    const html = lines
        .map((line) => `<span class="line">${escapeHtml(line) || ' '}</span>`)
        .join('\n')

    return `<pre class="shiki fallback" tabindex="0"><code>${html}</code></pre>`
}

function escapeHtml(value) {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;')
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
                        <span class="window-controls" aria-hidden="true">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                        <span class="file-name">{{ activeTab.file }}</span>
                        <span class="language-badge">PHP</span>
                    </div>

                    <div class="code-block" v-html="activeCodeHtml"></div>

                    <p class="description">
                        {{ activeTab.description }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<style>
.HomeCodeShowcase {
    --showcase-border: rgba(0, 119, 182, 0.18);
    --showcase-card-bg: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(238, 248, 255, 0.96));
    --showcase-card-shadow: 0 24px 70px rgba(0, 75, 115, 0.12);
    --showcase-tabs-bg: rgba(230, 242, 251, 0.72);
    --showcase-tab-border: rgba(0, 119, 182, 0.14);
    --showcase-tab-color: #4d6478;
    --showcase-tab-hover: rgba(0, 119, 182, 0.08);
    --showcase-tab-active-bg: linear-gradient(135deg, #0077b6, #00a9d6);
    --showcase-header-bg: rgba(255, 255, 255, 0.54);
    --showcase-header-color: #5a7288;
    --showcase-code-bg: linear-gradient(90deg, rgba(0, 119, 182, 0.035), transparent 42%), #f8fcff;
    --showcase-code-color: #102131;
    --showcase-line-number: rgba(57, 82, 105, 0.45);
    --showcase-description-bg: rgba(230, 242, 251, 0.6);
    --showcase-description-color: #395269;
    position: relative;
    padding: 32px 24px 48px;
}

.dark .HomeCodeShowcase {
    --showcase-border: rgba(0, 212, 255, 0.16);
    --showcase-card-bg: linear-gradient(180deg, rgba(20, 20, 31, 0.96), rgba(11, 13, 22, 0.98));
    --showcase-card-shadow: 0 24px 80px rgba(0, 0, 0, 0.28);
    --showcase-tabs-bg: rgba(255, 255, 255, 0.025);
    --showcase-tab-border: rgba(0, 212, 255, 0.09);
    --showcase-tab-color: rgba(255, 255, 255, 0.68);
    --showcase-tab-hover: rgba(0, 212, 255, 0.08);
    --showcase-tab-active-bg: linear-gradient(135deg, var(--phenix-blue-dark), var(--phenix-blue));
    --showcase-header-bg: rgba(255, 255, 255, 0.018);
    --showcase-header-color: rgba(255, 255, 255, 0.6);
    --showcase-code-bg: linear-gradient(90deg, rgba(0, 212, 255, 0.035), transparent 42%), rgba(4, 6, 13, 0.42);
    --showcase-code-color: rgba(255, 255, 255, 0.88);
    --showcase-line-number: rgba(255, 255, 255, 0.24);
    --showcase-description-bg: rgba(255, 255, 255, 0.025);
    --showcase-description-color: rgba(255, 255, 255, 0.72);
}

.HomeCodeShowcase .container {
    margin: 0 auto;
    max-width: 1152px;
}

.HomeCodeShowcase .intro {
    max-width: 720px;
    margin-bottom: 28px;
}

.HomeCodeShowcase .eyebrow {
    margin: 0 0 10px;
    color: var(--vp-c-brand-1);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0;
    text-transform: uppercase;
}

.HomeCodeShowcase h2 {
    margin: 0;
    color: var(--vp-c-text-1);
    font-size: 36px;
    line-height: 1.16;
    font-weight: 800;
    letter-spacing: 0;
}

.HomeCodeShowcase .summary {
    margin: 14px 0 0;
    color: var(--vp-c-text-2);
    font-size: 17px;
    line-height: 1.7;
}

.HomeCodeShowcase .showcase-card {
    overflow: hidden;
    border: 1px solid var(--showcase-border);
    border-radius: 8px;
    background: var(--showcase-card-bg);
    box-shadow: var(--showcase-card-shadow);
}

.HomeCodeShowcase .tabs {
    display: flex;
    overflow-x: auto;
    border-bottom: 1px solid var(--showcase-border);
    background: var(--showcase-tabs-bg);
}

.HomeCodeShowcase .tab {
    position: relative;
    min-width: 132px;
    min-height: 44px;
    padding: 0 18px;
    border: 0;
    border-right: 1px solid var(--showcase-tab-border);
    background: transparent;
    color: var(--showcase-tab-color);
    font: inherit;
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
    cursor: pointer;
    transition:
        background-color 0.2s ease,
        color 0.2s ease;
}

.HomeCodeShowcase .tab:hover,
.HomeCodeShowcase .tab:focus-visible {
    color: var(--vp-c-text-1);
    background: var(--showcase-tab-hover);
    outline: none;
}

.dark .HomeCodeShowcase .tab:hover,
.dark .HomeCodeShowcase .tab:focus-visible {
    color: rgba(255, 255, 255, 0.95);
}

.HomeCodeShowcase .tab.active {
    color: #ffffff;
    background: var(--showcase-tab-active-bg);
}

.HomeCodeShowcase .tab.active::after {
    content: '';
    position: absolute;
    right: 16px;
    bottom: 0;
    left: 16px;
    height: 2px;
    border-radius: 999px 999px 0 0;
    background: rgba(255, 255, 255, 0.72);
}

.HomeCodeShowcase .code-panel {
    min-height: 548px;
}

.HomeCodeShowcase .code-header {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 42px;
    padding: 0 22px;
    border-bottom: 1px solid var(--showcase-border);
    background: var(--showcase-header-bg);
    color: var(--showcase-header-color);
    font-size: 13px;
    font-family: var(--vp-font-family-mono);
}

.HomeCodeShowcase .window-controls {
    display: flex;
    gap: 6px;
    flex: 0 0 auto;
}

.HomeCodeShowcase .window-controls span {
    width: 9px;
    height: 9px;
    border-radius: 50%;
}

.HomeCodeShowcase .window-controls span:nth-child(1) {
    background: #ff5f57;
}

.HomeCodeShowcase .window-controls span:nth-child(2) {
    background: #ffbd2e;
}

.HomeCodeShowcase .window-controls span:nth-child(3) {
    background: var(--vp-c-brand-1);
}

.HomeCodeShowcase .file-name {
    flex: 1 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.HomeCodeShowcase .language-badge {
    flex: 0 0 auto;
    padding: 3px 8px;
    border: 1px solid var(--showcase-border);
    border-radius: 999px;
    color: var(--vp-c-brand-1);
    background: rgba(0, 212, 255, 0.08);
    font-size: 11px;
    font-weight: 700;
}

.HomeCodeShowcase .code-block {
    background: var(--showcase-code-bg);
    color: var(--showcase-code-color);
}

.HomeCodeShowcase .code-block .shiki {
    min-height: 420px;
    margin: 0;
    padding: 28px 0;
    overflow-x: auto;
    background: transparent !important;
    color: var(--showcase-code-color);
    font-size: 14px;
    line-height: 1.55;
    font-family: var(--vp-font-family-mono);
    tab-size: 4;
}

.HomeCodeShowcase .code-block code {
    display: flex;
    flex-direction: column;
    gap: 0;
    min-width: max-content;
    counter-reset: code-line;
    white-space: normal;
}

.HomeCodeShowcase .code-block .line {
    display: block;
    position: relative;
    min-width: max-content;
    min-height: 1.55em;
    padding-right: 28px;
    padding-left: 84px;
    white-space: pre;
}

.HomeCodeShowcase .code-block .line::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 62px;
    padding-right: 18px;
    color: var(--showcase-line-number);
    content: counter(code-line);
    counter-increment: code-line;
    text-align: right;
    user-select: none;
}

.HomeCodeShowcase .code-block .line:empty::after {
    content: ' ';
}

.HomeCodeShowcase .description {
    margin: 0;
    min-height: 84px;
    padding: 22px 28px;
    border-top: 1px solid var(--showcase-border);
    color: var(--showcase-description-color);
    background: var(--showcase-description-bg);
    font-size: 15px;
    line-height: 1.7;
}

@media (max-width: 768px) {
    .HomeCodeShowcase {
        padding: 12px 18px 36px;
    }

    .HomeCodeShowcase h2 {
        font-size: 28px;
    }

    .HomeCodeShowcase .summary {
        font-size: 16px;
    }

    .HomeCodeShowcase .tab {
        min-width: 116px;
        padding: 0 14px;
        font-size: 13px;
    }

    .HomeCodeShowcase .code-panel {
        min-height: 500px;
    }

    .HomeCodeShowcase .code-block .shiki {
        min-height: 360px;
        font-size: 13px;
    }

    .HomeCodeShowcase .code-block .line {
        padding-left: 68px;
    }

    .HomeCodeShowcase .code-block .line::before {
        width: 50px;
        padding-right: 14px;
    }

    .HomeCodeShowcase .description {
        padding: 18px;
        font-size: 14px;
    }
}
</style>
