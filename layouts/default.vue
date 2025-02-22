<template>
    <section class="layout">
        <AppHeader />
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