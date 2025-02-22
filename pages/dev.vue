<script></script>
<template>
    <div class="wrapper">
        <div class="box1">One</div>
        <div class="box2">Two</div>
        <div class="box3">Three</div>
    </div>

</template>

<style lang="scss" scoped>
.wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, 200px);
}
</style>
