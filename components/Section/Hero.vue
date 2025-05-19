<script setup lang="ts">
import heroContent from '@/public/hero-content.json';
// Animation properties for text reveal
const isVisible = ref(false);
const HERO_CONTENT = heroContent

// Trigger animation after component is mounted
onMounted(() => {
    setTimeout(() => {
        isVisible.value = true;
    }, 300);
});
</script>

<template>
    <BaseSection id="home" :fullHeight="true" bgColor="#f8f9fa">
        <div class="hero" :class="{ 'visible': isVisible }">
            <div class="hero-content">
                <h1 class="hero-title">
                    <span class="greeting">Hello, I'm</span>
                    <span class="name">{{ HERO_CONTENT.name }}</span>
                </h1>
                <h2 class="hero-subtitle">{{ HERO_CONTENT.title }}</h2>
                <p class="hero-description">
                    {{ HERO_CONTENT.description }}
                </p>
                <div class="hero-cta">
                    <a href="#projects" class="btn btn-primary">View My Work</a>
                    <a href="#contact" class="btn btn-secondary">Contact Me</a>
                </div>
            </div>
            <div class="hero-image">
                <img src="/public/hero.jpg" alt="Profile" />
            </div>
        </div>
    </BaseSection>
</template>

<style lang="scss" scoped>
.hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $margin * 2;
    align-items: center;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s ease-out;

    &.visible {
        opacity: 1;
        transform: translateY(0);
    }

    &-content {
        display: flex;
        flex-direction: column;
        gap: $unit * 5;
    }

    &-title {
        display: flex;
        flex-direction: column;
        font-family: 'Noto Sans', sans-serif;

        .greeting {
            font-size: 1.5rem;
            font-weight: 500;
            color: #555;
        }

        .name {
            font-size: 3.5rem;
            font-weight: 800;
            color: #333;
            margin-top: $unit * 2;
            background: linear-gradient(90deg, $accent, darken($accent, 20%));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    }

    &-subtitle {
        font-family: 'Noto Sans', sans-serif;
        font-size: 1.75rem;
        font-weight: 600;
        color: #444;
    }

    &-description {
        font-family: 'Noto Sans', sans-serif;
        font-size: 1.1rem;
        line-height: 1.6;
        color: #666;
        max-width: 500px;
    }

    &-cta {
        display: flex;
        gap: $unit * 4;
        margin-top: $unit * 5;
    }

    &-image {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            max-width: 100%;
            height: auto;
            border-radius: 50%;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            border: 5px solid white;
            transition: all 0.3s ease;

            &:hover {
                transform: scale(1.03);
                box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
            }
        }
    }
}

.btn {
    display: inline-block;
    padding: $unit * 3 $unit * 6;
    border-radius: 4px;
    font-family: 'Noto Sans', sans-serif;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;

    &-primary {
        background-color: $accent;
        color: white;

        &:hover {
            background-color: darken($accent, 10%);
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
    }

    &-secondary {
        background-color: transparent;
        color: $accent;
        border: 2px solid $accent;

        &:hover {
            background-color: rgba($accent, 0.1);
            transform: translateY(-2px);
        }
    }
}

// Responsive adjustments
@media (max-width: 768px) {
    .hero {
        grid-template-columns: 1fr;
        text-align: center;

        &-content {
            order: 2;
            align-items: center;
        }

        &-image {
            order: 1;
            margin-bottom: $margin;

            img {
                max-width: 250px;
            }
        }

        &-description {
            max-width: 100%;
        }
    }
}
</style>