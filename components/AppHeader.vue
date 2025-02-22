<template>
    <div class="app-header">
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
    </div>
</template>

<style lang="scss" scoped>
.app {
    &-header {
        position: sticky;
        top: 0;
        width: 100%;
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
                gap: 0.5rem;
                text-align: right;

            }

        }
    }


}
</style>