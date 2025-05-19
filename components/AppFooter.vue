<script setup lang="ts">
import { useContact } from '~/composables/useContact';

const currentYear = new Date().getFullYear();
const { contactLinks } = useContact();

// Get social links for the footer
const socialLinks = computed(() => {
    return contactLinks.value.filter(link =>
        link.id === 'linkedin' ||
        link.id === 'github' ||
        link.id === 'twitter'
    ).slice(0, 3); // Limit to 3 social links
});

// Get icon URL for a link
const getIconUrl = (linkId: string) => {
    switch (linkId) {
        case 'linkedin':
            return '/icons/linkedin.svg';
        case 'github':
            return '/icons/github.svg';
        case 'twitter':
            return '/icons/twitter.svg';
        case 'instagram':
            return '/icons/instagram.svg';
        case 'email':
            return '/icons/gmail.svg';
        default:
            return '/icons/link.svg';
    }
};
</script>

<template>
    <footer id="contact" class="app-footer">
        <div class="footer-content">
            <div class="footer-left">
                <div class="footer-logo">
                    <img src="/public/logo.png" alt="logo" width="40px" />
                    <span class="logo-text">Portfolio</span>
                </div>
                <p class="footer-tagline">Building beautiful, responsive web experiences with modern technologies.</p>
                <div class="social-links">
                    <a v-for="link in socialLinks" :key="link.id" :href="link.url" target="_blank" class="social-link">
                        <img :src="getIconUrl(link.id)" :alt="link.name" class="icon" />
                    </a>
                </div>
            </div>

            <div class="footer-links">
                <div class="footer-section">
                    <h3>Navigation</h3>
                    <ul>
                        <li>
                            <NuxtLink to="/">Home</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/projects">Projects</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/connect">Connect</NuxtLink>
                        </li>
                        <li><a href="#tech-stack">Tech Stack</a></li>
                        <li><a href="#background">Background</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h3>Contact</h3>
                    <ul>
                        <li v-for="link in contactLinks.slice(0, 2)" :key="link.id">
                            <a v-if="link.type === 'email'" :href="`mailto:${link.value}`">
                                {{ link.name }}
                            </a>
                            <a v-else-if="link.type === 'link'" :href="link.url" target="_blank">
                                {{ link.name }}
                            </a>
                            <span v-else>{{ link.name }}: {{ link.value }}</span>
                        </li>
                        <li>
                            <NuxtLink to="/connect" class="view-all-link">View All Contact Options →</NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <p>&copy; {{ currentYear }} Leonardo Prasetyo. All rights reserved.</p>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
.app-footer {
    background-color: #2a2a2a;
    color: #fff;
    padding: $padding * 3 $padding;
    width: 100%;
    box-sizing: border-box;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, $accent, darken($accent, 15%), lighten($accent, 15%));
    }

    .footer-content {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        max-width: 1200px;
        margin: 0 auto;
        gap: $margin * 2;

        .footer-left {
            flex: 1;
            min-width: 250px;
            max-width: 350px;

            .footer-logo {
                display: flex;
                align-items: center;
                gap: $unit * 2;
                margin-bottom: $unit * 4;

                .logo-text {
                    font-family: 'Noto Sans', sans-serif;
                    font-weight: 700;
                    font-size: 1.25rem;
                }
            }

            .footer-tagline {
                color: #bbb;
                font-size: 0.95rem;
                line-height: 1.6;
                margin-bottom: $unit * 6;
            }

            .social-links {
                display: flex;
                gap: $unit * 3;

                .social-link {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    background-color: rgba(255, 255, 255, 0.1);
                    border-radius: 50%;
                    transition: all 0.3s ease;

                    &:hover {
                        background-color: $accent;
                        transform: translateY(-3px);
                    }

                    .icon {
                        width: 20px;
                        height: 20px;
                        /* Make SVG icons white */
                    }
                }
            }
        }

        .footer-links {
            display: flex;
            flex-wrap: wrap;
            gap: $margin * 2;

            .footer-section {
                min-width: 180px;

                h3 {
                    font-family: 'Noto Sans', sans-serif;
                    font-size: 1.1rem;
                    font-weight: 600;
                    margin-bottom: $unit * 5;
                    color: $accent;
                    position: relative;

                    &::after {
                        content: '';
                        position: absolute;
                        bottom: -8px;
                        left: 0;
                        width: 30px;
                        height: 2px;
                        background-color: $accent;
                    }
                }

                ul {
                    display: flex;
                    flex-direction: column;
                    gap: $unit * 3;

                    li {

                        a,
                        span {
                            color: #ccc;
                            text-decoration: none;
                            font-family: 'Noto Sans', sans-serif;
                            font-size: 0.95rem;
                            transition: all 0.3s ease;
                            display: inline-block;

                            &:hover {
                                color: white;
                                transform: translateX(3px);
                            }
                        }

                        .view-all-link {
                            color: $accent;
                            font-weight: 600;
                            margin-top: $unit * 2;

                            &:hover {
                                color: lighten($accent, 10%);
                            }
                        }
                    }
                }
            }
        }
    }

    .footer-bottom {
        margin-top: $margin * 2;
        padding-top: $margin;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        text-align: center;
        font-size: 0.9rem;
        color: #999;

        .footer-credits {
            margin-top: $unit * 2;
            font-size: 0.85rem;
            color: #777;
        }
    }
}

@media (max-width: 992px) {
    .app-footer {
        .footer-content {
            .footer-left {
                max-width: 100%;
                margin-bottom: $margin;
            }
        }
    }
}

@media (max-width: 768px) {
    .app-footer {
        padding: $padding * 2 $padding;

        .footer-content {
            flex-direction: column;
            gap: $margin;

            .footer-left {
                text-align: center;

                .footer-logo {
                    justify-content: center;
                }

                .social-links {
                    justify-content: center;
                }
            }

            .footer-links {
                justify-content: space-around;
                width: 100%;

                .footer-section {
                    h3 {
                        &::after {
                            left: 50%;
                            transform: translateX(-50%);
                        }
                    }

                    ul {
                        text-align: center;
                    }
                }
            }
        }
    }
}

@media (max-width: 500px) {
    .app-footer {
        .footer-content {
            .footer-links {
                flex-direction: column;
                align-items: center;
                gap: $margin;

                .footer-section {
                    width: 100%;
                    max-width: 250px;
                }
            }
        }

        .footer-bottom {
            font-size: 0.8rem;

            .footer-credits {
                font-size: 0.75rem;
            }
        }
    }
}
</style>