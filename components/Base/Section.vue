<template>
    <section class="page--section">
        <slot />
    </section>
</template>

<style lang="scss" scoped>
.page--section {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    border: 1px solid red;
    height: calc(100vh - 50px - $section-gap);
    width: 100%;
    box-sizing: border-box;
}
</style>