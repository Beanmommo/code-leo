<script setup lang="ts">
// Define active section for highlighting in the navigation
const activeSection = ref('home');
const route = useRoute();
const isMobileMenuOpen = ref(false);

// Set active section based on current route
onMounted(() => {
    if (route.path.includes('/projects')) {
        activeSection.value = 'projects-page';
    } else if (route.path === '/') {
        activeSection.value = 'home';
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        const header = document.querySelector('.app-header');
        if (isMobileMenuOpen.value && header && !header.contains(target)) {
            isMobileMenuOpen.value = false;
        }
    });
});

// Watch for route changes to update active section
watch(() => route.path, (newPath) => {
    if (newPath.includes('/projects')) {
        activeSection.value = 'projects-page';
    } else if (newPath === '/') {
        activeSection.value = 'home';
    }

    // Close mobile menu on route change
    isMobileMenuOpen.value = false;
});

// Function to handle smooth scrolling to sections on the home page
const scrollToSection = (sectionId: string) => {
    activeSection.value = sectionId;

    // If we're on the home page, scroll to the section
    if (route.path === '/') {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        // If we're on another page, navigate to home and then scroll
        navigateTo('/');
        // We'll need to scroll after navigation, but that's handled by the router
    }

    // Close mobile menu after navigation
    isMobileMenuOpen.value = false;
};

// Toggle mobile menu
const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>

<template>
    <div class="header-wrapper">
        <header class="app-header">
            <div class="app-header-logo">
                <NuxtLink to="/" style="text-decoration: none; display: flex; align-items: center; gap: 8px;">
                    <img src="/public/logo.png" alt="logo" width="50px" />
                    <span class="logo-text">Portfolio</span>
                </NuxtLink>
            </div>

            <!-- Mobile menu button -->
            <button class="mobile-menu-button" @click="toggleMobileMenu" aria-label="Toggle menu">
                <span class="hamburger-icon" :class="{ 'open': isMobileMenuOpen }">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
            </button>

            <!-- Desktop navigation -->
            <nav class="app-header-nav desktop-nav">
                <ul class="nav-links">
                    <li>
                        <NuxtLink to="/" @click.prevent="scrollToSection('home')"
                            :class="{ active: activeSection === 'home' }">
                            Home
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/projects" :class="{ active: activeSection === 'projects-page' }">
                            Projects
                        </NuxtLink>
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

            <div class="app-header-contact desktop-contact">
                <a href="#contact" @click.prevent="scrollToSection('contact')" class="contact-button">
                    Let's Connect
                </a>
            </div>
        </header>

        <!-- Mobile navigation menu (now inside the header wrapper) -->
        <div class="mobile-menu" :class="{ 'open': isMobileMenuOpen }">
            <nav class="mobile-nav">
                <ul class="mobile-nav-links">
                    <li>
                        <NuxtLink to="/" @click.prevent="scrollToSection('home')"
                            :class="{ active: activeSection === 'home' }">
                            Home
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/projects" :class="{ active: activeSection === 'projects-page' }">
                            Projects
                        </NuxtLink>
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
                    <li>
                        <a href="#contact" @click.prevent="scrollToSection('contact')"
                            :class="{ active: activeSection === 'contact' }">
                            Contact Me
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use 'sass:color';

// Header wrapper to contain both header and mobile menu
.header-wrapper {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 100;
}

.app-header {
    padding: 0 $padding;
    background-color: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(5px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
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
        color: black;

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
                background-color: color.scale($color: $accent, $lightness: -10%);
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
        }
    }
}

// Mobile menu button
.mobile-menu-button {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: $unit * 2;
    z-index: 110;
    position: sticky;

    .hamburger-icon {
        width: 24px;
        height: 18px;
        position: relative;
        transform: rotate(0deg);
        transition: 0.5s ease-in-out;

        span {
            display: block;
            position: absolute;
            height: 3px;
            width: 100%;
            background: #333;
            border-radius: 3px;
            opacity: 1;
            left: 0;
            transform: rotate(0deg);
            transition: 0.25s ease-in-out;

            &:nth-child(1) {
                top: 0px;
            }

            &:nth-child(2) {
                top: 8px;
            }

            &:nth-child(3) {
                top: 16px;
            }
        }

        &.open {
            span {
                &:nth-child(1) {
                    top: 8px;
                    transform: rotate(135deg);
                }

                &:nth-child(2) {
                    opacity: 0;
                    left: -60px;
                }

                &:nth-child(3) {
                    top: 8px;
                    transform: rotate(-135deg);
                }
            }
        }
    }
}

// Mobile menu
.mobile-menu {
    display: none;
    position: relative;
    width: 100%;
    background-color: white;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
    z-index: 99;

    &.open {
        max-height: 580px; // Adjust based on your menu height
        overflow-y: auto;
    }

    .mobile-nav {
        padding: $padding;

        .mobile-nav-links {
            display: flex;
            flex-direction: column;
            gap: $unit * 4;

            li {
                a {
                    font-family: 'Noto Sans', sans-serif;
                    color: #333;
                    text-decoration: none;
                    font-size: 1.1rem;
                    font-weight: 500;
                    display: block;
                    padding: $unit * 2 0;
                    transition: all 0.3s ease;

                    &:hover,
                    &.active {
                        color: $accent;
                    }
                }
            }
        }
    }
}

// Responsive adjustments
@media (max-width: 768px) {
    .header-wrapper {
        background-color: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(5px);
    }

    .app-header {
        height: 70px;
        padding: 0 $unit * 3;
        box-shadow: none; // Remove shadow from header as it's now on the wrapper

        &-logo {
            .logo-text {
                font-size: 1.1rem;
            }
        }
    }

    .mobile-menu-button {
        display: block;
    }

    .mobile-menu {
        display: block;
    }

    .desktop-nav,
    .desktop-contact {
        display: none;
    }
}

@media (min-width: 769px) {
    .mobile-menu {
        display: none;
    }
}

// Extra small device adjustments
@media (max-width: 500px) {
    .header-wrapper {
        width: 100%; // Use 100% instead of 100vw to prevent overflow
        max-width: 100%;
    }

    .app-header {
        padding: 0 $unit * 2;
        width: 100%;
        box-sizing: border-box;

        &-logo {
            img {
                width: 40px; // Slightly smaller logo
            }

            .logo-text {
                font-size: 1rem;
            }
        }
    }

    .mobile-menu {
        width: 100%; // Use 100% instead of 100vw to prevent overflow
        max-width: 100%;
        box-sizing: border-box;

        .mobile-nav {
            padding: $unit * 2;
        }
    }
}
</style>