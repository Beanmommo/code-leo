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
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
}

.section--container {
    display: grid;
    row-gap: $section-gap;
    width: 100%;
}

@media (max-width: 500px) {
    .layout {
        padding: 0;
    }

    .container {
        padding-left: $unit * 2;
        padding-right: $unit * 2;
    }
}
</style>