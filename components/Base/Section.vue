<script setup lang="ts">
defineProps({
    id: {
        type: String,
        required: true
    },
    fullHeight: {
        type: Boolean,
        default: false
    },
    bgColor: {
        type: String,
        default: 'transparent'
    }
});
</script>

<template>
    <section :id="id" class="page-section" :class="{ 'full-height': fullHeight }" :style="{ backgroundColor: bgColor }">
        <div class="container section-container">
            <slot />
        </div>
    </section>
</template>

<style lang="scss" scoped>
.page-section {
    padding: $padding * 2 $padding;
    width: 100%;
    box-sizing: border-box;

    &.full-height {
        min-height: calc(100vh - 70px);
        display: flex;
        align-items: center;
    }
}

.section-container {
    padding: $padding;
}
</style>