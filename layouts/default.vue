<script setup lang="ts">
const route = useRoute();

// Only show breadcrumbs on pages other than home
const showBreadcrumbs = computed(() => route.path !== '/');
</script>

<template>
    <section class="layout">
        <AppHeader />
        <BaseBreadcrumb v-if="showBreadcrumbs" />
        <div class="container">
            <div class="section--container">
                <slot />
            </div>
        </div>
        <AppFooter />
    </section>
</template>

<style lang="scss" scoped>
.layout {
    display: grid;
    row-gap: $section-gap;
}

.section--container {
    display: grid;
    row-gap: $section-gap;
}
</style>