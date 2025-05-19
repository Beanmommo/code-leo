<script setup lang="ts">
// Define active section for highlighting in the navigation
const activeSection = ref('home');

// Function to handle smooth scrolling to sections
const scrollToSection = (sectionId: string) => {
    activeSection.value = sectionId;
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};
</script>

<template>
    <header class="app-header">
        <div class="app-header-logo">
            <img src="/public/logo.png" alt="logo" width="50px" />
            <span class="logo-text">Portfolio</span>
        </div>
        <nav class="app-header-nav">
            <ul class="nav-links">
                <li>
                    <a href="#home" @click.prevent="scrollToSection('home')"
                        :class="{ active: activeSection === 'home' }">
                        Home
                    </a>
                </li>
                <li>
                    <a href="#projects" @click.prevent="scrollToSection('projects')"
                        :class="{ active: activeSection === 'projects' }">
                        Projects
                    </a>
                </li>
                <li>
                    <a href="#tech-stack" @click.prevent="scrollToSection('tech-stack')"
                        :class="{ active: activeSection === 'tech-stack' }">
                        Tech Stack
                    </a>
                </li>
                <li>
                    <a href="#background" @click.prevent="scrollToSection('background')"
                        :class="{ active: activeSection === 'background' }">
                        Background
                    </a>
                </li>
            </ul>
        </nav>
        <div class="app-header-contact">
            <a href="#contact" @click.prevent="scrollToSection('contact')" class="contact-button">
                Contact Me
            </a>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.app-header {
    padding: 0 $padding;
    background-color: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(5px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    position: sticky;
    top: 0;
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 100;

    &-logo {
        display: flex;
        align-items: center;
        gap: $unit * 2;

        .logo-text {
            font-family: 'Noto Sans', sans-serif;
            font-weight: 700;
            font-size: 1.25rem;
        }
    }

    &-nav {
        .nav-links {
            display: flex;
            gap: $unit * 6;

            li {
                a {
                    font-family: 'Noto Sans', sans-serif;
                    color: #333;
                    text-decoration: none;
                    font-size: 1rem;
                    font-weight: 500;
                    padding: $unit $unit * 2;
                    border-radius: 4px;
                    transition: all 0.3s ease;

                    &:hover {
                        color: $accent;
                    }

                    &.active {
                        color: $accent;
                        font-weight: 600;
                    }
                }
            }
        }
    }

    &-contact {
        .contact-button {
            background-color: $accent;
            color: white;
            padding: $unit * 2 $unit * 4;
            border-radius: 4px;
            font-family: 'Noto Sans', sans-serif;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s ease;

            &:hover {
                background-color: scale-color($color: $accent, $lightness: -10%);
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
        }
    }
}

// Responsive adjustments
@media (max-width: 768px) {
    .app-header {
        flex-direction: column;
        height: auto;
        padding: $unit * 3;

        &-logo,
        &-nav,
        &-contact {
            margin: $unit * 2 0;
        }

        &-nav .nav-links {
            flex-wrap: wrap;
            justify-content: center;
        }
    }
}
</style>