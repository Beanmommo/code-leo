<template>
    <div class="container">
        <img src="/public/images/frying-pan.gif" <p class="text" />
        <p>Leonardo is cooking something good</p>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: linear-gradient(45deg, #ff9a9e,
            #fad0c4,
            #ffd1ff,
            #d4c4fc);
    background-size: 400% 400%;
    animation: gradient 5s ease infinite;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

.text {
    margin-top: 20px;
    font-size: 24px;
    font-family: "Arial", sans-serif;
    color: #fff;
    font-weight: bold;
}
</style>
