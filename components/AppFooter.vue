<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
    <footer id="contact" class="app-footer">
        <div class="footer-content">
            <div class="footer-logo">
                <img src="/public/logo.png" alt="logo" width="40px" />
                <span class="logo-text">Portfolio</span>
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
                        <li><a href="#tech-stack">Tech Stack</a></li>
                        <li><a href="#background">Background</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h3>Contact</h3>
                    <ul>
                        <li><a href="mailto:your.email@example.com">Email</a></li>
                        <li><a href="https://github.com/yourusername" target="_blank">GitHub</a></li>
                        <li><a href="https://linkedin.com/in/yourusername" target="_blank">LinkedIn</a></li>
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
    background-color: #363636;
    color: #fff;
    padding: $padding * 2 $padding;
    width: 100%;
    box-sizing: border-box;

    .footer-content {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        max-width: 1200px;
        margin: 0 auto;
        gap: $margin;

        .footer-logo {
            display: flex;
            align-items: center;
            gap: $unit * 2;
            margin-bottom: $margin;

            .logo-text {
                font-family: 'Noto Sans', sans-serif;
                font-weight: 700;
                font-size: 1.25rem;
            }
        }

        .footer-links {
            display: flex;
            flex-wrap: wrap;
            gap: $margin * 2;

            .footer-section {
                min-width: 150px;

                h3 {
                    font-family: 'Noto Sans', sans-serif;
                    font-size: 1.1rem;
                    font-weight: 600;
                    margin-bottom: $unit * 4;
                    color: $accent;
                }

                ul {
                    display: flex;
                    flex-direction: column;
                    gap: $unit * 3;

                    li a {
                        color: #ccc;
                        text-decoration: none;
                        font-family: 'Noto Sans', sans-serif;
                        transition: color 0.3s ease;

                        &:hover {
                            color: white;
                        }
                    }
                }
            }
        }
    }

    .footer-bottom {
        margin-top: $margin;
        padding-top: $margin;
        border-top: 1px solid #333;
        text-align: center;
        font-size: 0.9rem;
        color: #999;
    }
}

@media (max-width: 768px) {
    .app-footer {
        .footer-content {
            flex-direction: column;

            .footer-logo {
                justify-content: center;
            }

            .footer-links {
                justify-content: center;
            }
        }
    }
}
</style>