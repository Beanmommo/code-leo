<script setup lang="ts">
const props = defineProps({
    src: {
        type: String,
        required: true,
    },
    alt: {
        type: String,
        required: true,
    },
    width: {
        type: String,
        default: '100%',
    },
});

const imgsrc = computed(() => {
    return `../../public/${props.src}`;
});
</script>

<template>
    <img :src="imgsrc" :alt="alt" :width="width" />
</template>