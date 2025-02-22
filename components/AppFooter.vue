<template>
    <section class="app-header">
        <div class="app-item-left">
            Work
        </div>
        <div class="app-item-center">
            <img src="/public/logo.png" alt="logo" width="50px" />
        </div>
        <div class="app-item-right">
            <div>
                About
            </div>
            <div>
                Contact
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.app {
    &-header {
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        border: 1px solid red;
        box-sizing: border-box;
        bottom: 0;
        width: 100%;
        height: 50px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        column-gap: $margin;
        align-items: center;
        justify-content: space-around;

        .app-item {
            font-size: 24px;
            font-weight: bold;

            &-left {
                text-align: left;
            }

            &-center {
                text-align: center;
            }

            &-right {
                display: flex;
                justify-content: flex-end;
                gap: $margin;
            }

        }
    }


}
</style>