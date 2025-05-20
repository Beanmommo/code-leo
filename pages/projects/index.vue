<script setup lang="ts">
import { useProjects } from '~/composables/useProjects';

const { projects, getFeaturedProject } = useProjects();
const featuredProject = getFeaturedProject();

// For animation
const isVisible = ref(false);
onMounted(() => {
    setTimeout(() => {
        isVisible.value = true;
    }, 300);
});
</script>

<template>
    <div class="projects-page" :class="{ 'visible': isVisible }">
        <!-- Page Header -->
        <div class="page-header">
            <div class="container">
                <h1 class="page-title">My Projects</h1>
                <p class="page-subtitle">A collection of my work and personal projects</p>
            </div>
        </div>

        <!-- Featured Project Section -->
        <section class="featured-project-section">
            <div class="container">
                <h2 class="section-title">Featured Project</h2>

                <div class="featured-project" v-if="featuredProject">
                    <div class="featured-project-image">
                        <img :src="featuredProject.image" :alt="featuredProject.title" />
                    </div>
                    <div class="featured-project-content">
                        <h3 class="featured-project-title">{{ featuredProject.title }}</h3>
                        <p class="featured-project-description">{{ featuredProject.description }}</p>
                        <div class="featured-project-tags">
                            <span v-for="(tag, index) in featuredProject.tags" :key="index" class="tag">{{ tag }}</span>
                        </div>
                        <div class="featured-project-links">
                            <NuxtLink :to="`/projects/${featuredProject.slug}`" class="btn btn-primary">View Details
                            </NuxtLink>
                            <div class="featured-links-list">
                                <a v-for="(link, index) in featuredProject.links.slice(0, 2)" :key="index"
                                    :href="link.url" class="featured-link-item" target="_blank">
                                    <span v-if="link.icon" class="link-icon" :class="link.icon">
                                        <!-- Icon placeholders -->
                                        <span v-if="link.icon === 'github'">🔗</span>
                                        <span v-else-if="link.icon === 'globe'">🌐</span>
                                        <span v-else-if="link.icon === 'external-link'">↗️</span>
                                        <span v-else-if="link.icon === 'calendar'">📅</span>
                                        <span v-else-if="link.icon === 'book'">📚</span>
                                        <span v-else-if="link.icon === 'cloud'">☁️</span>
                                        <span v-else-if="link.icon === 'code'">💻</span>
                                        <span v-else>🔗</span>
                                    </span>
                                    {{ link.name }}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- All Projects Section -->
        <section class="all-projects-section">
            <div class="container">
                <h2 class="section-title">All Projects</h2>

                <div class="projects-grid">
                    <div v-for="project in projects" :key="project.id" class="project-card">
                        <div class="project-image">
                            <img :src="project.image" :alt="project.title" />
                        </div>
                        <div class="project-content">
                            <h3 class="project-title">{{ project.title }}</h3>
                            <p class="project-description">{{ project.description }}</p>
                            <div class="project-tags">
                                <span v-for="(tag, index) in project.tags" :key="index" class="tag">{{ tag }}</span>
                            </div>
                            <div class="project-links">
                                <NuxtLink :to="`/projects/${project.slug}`" class="project-link">View Details</NuxtLink>
                                <div class="project-links-list">
                                    <a v-for="(link, index) in project.links.slice(0, 1)" :key="index" :href="link.url"
                                        class="project-link-small" target="_blank">
                                        {{ link.name }}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
@use 'sass:color';

.projects-page {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s ease-out;

    &.visible {
        opacity: 1;
        transform: translateY(0);
    }
}

.page-header {
    background-color: #f8f9fa;
    padding: $padding * 4 0;
    text-align: center;

    .page-title {
        font-family: 'Noto Sans', sans-serif;
        font-size: 3rem;
        font-weight: 700;
        color: #333;
        margin-bottom: $unit * 3;
    }

    .page-subtitle {
        font-family: 'Noto Sans', sans-serif;
        font-size: 1.2rem;
        color: #666;
        max-width: 600px;
        margin: 0 auto;
    }
}

.section-title {
    font-family: 'Noto Sans', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: #333;
    margin-bottom: $margin;
    text-align: center;
}

.featured-project-section {
    padding: $padding * 4 0;
    background-color: white;
}

.featured-project {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $margin * 2;
    align-items: center;
    background-color: #f8f9fa;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);

    &-image {
        height: 100%;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &-content {
        padding: $padding * 2;
        display: flex;
        flex-direction: column;
        gap: $unit * 4;
    }

    &-title {
        font-family: 'Noto Sans', sans-serif;
        font-size: 2rem;
        font-weight: 700;
        color: #333;
    }

    &-description {
        font-family: 'Noto Sans', sans-serif;
        font-size: 1.1rem;
        color: #666;
        line-height: 1.6;
    }

    &-tags {
        display: flex;
        flex-wrap: wrap;
        gap: $unit * 2;

        .tag {
            background-color: rgba($accent, 0.1);
            color: $accent;
            padding: $unit $unit * 2;
            border-radius: 4px;
            font-size: 0.9rem;
            font-weight: 500;
        }
    }

    &-links {
        display: flex;
        flex-direction: column;
        gap: $unit * 3;
        margin-top: $unit * 4;

        .featured-links-list {
            display: flex;
            flex-direction: column;
            gap: $unit * 2;
            margin-top: $unit * 2;

            .featured-link-item {
                display: flex;
                align-items: center;
                gap: $unit * 2;
                padding: $unit * 2 $unit * 3;
                background-color: #f0f0f0;
                border-radius: 6px;
                border-left: 3px solid $accent;
                transition: all 0.3s ease;
                text-decoration: none;
                color: #444;
                font-family: 'Noto Sans', sans-serif;
                font-weight: 500;

                &:hover {
                    background-color: rgba($accent, 0.1);
                    transform: translateX(3px);
                }

                .link-icon {
                    font-size: 1.2rem;
                }
            }
        }
    }
}

.all-projects-section {
    padding: $padding * 4 0;
    background-color: #f8f9fa;
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: $margin;
    margin-top: $margin * 2;
}

.project-card {
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }

    .project-image {
        height: 200px;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;

            &:hover {
                transform: scale(1.05);
            }
        }
    }

    .project-content {
        padding: $padding;
    }

    .project-title {
        font-family: 'Noto Sans', sans-serif;
        font-size: 1.5rem;
        font-weight: 600;
        color: #333;
        margin-bottom: $unit * 3;
    }

    .project-description {
        font-family: 'Noto Sans', sans-serif;
        font-size: 1rem;
        color: #666;
        line-height: 1.6;
        margin-bottom: $unit * 4;
    }

    .project-tags {
        display: flex;
        flex-wrap: wrap;
        gap: $unit * 2;
        margin-bottom: $unit * 4;

        .tag {
            background-color: rgba($accent, 0.1);
            color: $accent;
            padding: $unit $unit * 2;
            border-radius: 4px;
            font-size: 0.8rem;
            font-weight: 500;
        }
    }

    .project-links {
        display: flex;
        flex-direction: column;
        gap: $unit * 3;

        .project-link {
            padding: $unit * 2 $unit * 4;
            border-radius: 4px;
            font-family: 'Noto Sans', sans-serif;
            font-weight: 600;
            font-size: 0.9rem;
            text-decoration: none;
            transition: all 0.3s ease;
            background-color: $accent;
            color: white;
            text-align: center;

            &:hover {
                background-color: color.scale($accent, $lightness: -10%);
            }
        }

        .project-links-list {
            margin-top: $unit * 2;

            .project-link-small {
                display: inline-block;
                padding: $unit * 1.5 $unit * 3;
                border-radius: 4px;
                font-family: 'Noto Sans', sans-serif;
                font-weight: 500;
                font-size: 0.85rem;
                text-decoration: none;
                transition: all 0.3s ease;
                background-color: #f0f0f0;
                color: #444;
                border-left: 2px solid $accent;

                &:hover {
                    background-color: rgba($accent, 0.1);
                    transform: translateX(2px);
                }
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
            background-color: color.scale($accent, $lightness: -10%);
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
    }

    &-secondary {
        background-color: #333;
        color: white;

        &:hover {
            background-color: #000;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
    }

    &-outline {
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
    .featured-project {
        grid-template-columns: 1fr;

        &-image {
            height: 250px;
        }
    }

    .projects-grid {
        grid-template-columns: 1fr;
    }

    .featured-project-links,
    .project-links {
        flex-wrap: wrap;
    }
}

// Extra small device adjustments
@media (max-width: 500px) {
    .projects-page {
        width: 100%; // Use 100% instead of 100vw
        max-width: 100%;
        overflow-x: hidden; // Prevent horizontal scrolling
        box-sizing: border-box;
    }

    .page-header {
        padding: $padding * 2 0;

        .page-title {
            font-size: 2rem;
        }

        .page-subtitle {
            font-size: 1rem;
        }
    }

    .section-title {
        font-size: 1.5rem;
    }

    .featured-project-section,
    .all-projects-section {
        padding: $padding * 2 0;
    }

    .featured-project {
        &-image {
            height: 200px;
        }

        &-content {
            padding: $padding;
        }

        &-title {
            font-size: 1.5rem;
        }

        &-description {
            font-size: 0.95rem;
        }

        &-links {
            gap: $unit * 2;

            .btn {
                padding: $unit * 2 $unit * 3;
                font-size: 0.9rem;
                width: 100%;
                text-align: center;
            }

            .featured-links-list {
                gap: $unit;

                .featured-link-item {
                    padding: $unit * 1.5 $unit * 2;
                    font-size: 0.9rem;

                    .link-icon {
                        font-size: 1rem;
                    }
                }
            }
        }
    }

    .project-card {
        .project-image {
            height: 180px;
        }

        .project-title {
            font-size: 1.3rem;
        }

        .project-description {
            font-size: 0.95rem;
        }
    }
}
</style>
