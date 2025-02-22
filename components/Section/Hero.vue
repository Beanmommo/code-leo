<template>
    <BaseSection>
        <div class="hero">
            <img class="hero--image" src="../../public/hero.jpg" alt="Hero" width="600px" />
            <div>
                <BaseHeading>Leonardo Prasetyo</BaseHeading>
                <BaseSubHeading>Software Engineer</BaseSubHeading>
            </div>
        </div>
    </BaseSection>
</template>

<style lang="scss" scoped>
.hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: space-around;
    align-items: center;
    justify-items: center;

    .hero--image {
        border-radius: 50%;
    }
}
</style>