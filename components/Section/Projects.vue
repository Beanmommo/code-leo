<script setup lang="ts">
// Import the projects data from the composable
import { useProjects } from '~/composables/useProjects';
const { projects } = useProjects();

// For animation
const isVisible = ref(false);
onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            isVisible.value = true;
        }
    }, { threshold: 0.1 });

    const section = document.getElementById('projects');
    if (section) {
        observer.observe(section);
    }
});
</script>

<template>
    <BaseSection id="projects" bgColor="#ffffff">
        <div class="projects-section" :class="{ 'visible': isVisible }">
            <div class="section-header">
                <h2 class="section-title">My Projects</h2>
                <p class="section-subtitle">Here are some of my recent work</p>
                <div class="view-all-projects">
                    <NuxtLink to="/projects" class="view-all-link">View All Projects →</NuxtLink>
                </div>
            </div>

            <div class="projects-grid">
                <div v-for="project in projects" :key="project.id" class="project-card">
                    <div class="project-content">
                        <NuxtLink :to="`/projects/${project.slug}`" class="project-image">
                            <img :src="project.image" :alt="project.title" width="250px" />
                        </NuxtLink>

                        <h3 class="project-title">{{ project.title }}</h3>
                        <p class="project-description">{{ project.description }}</p>
                        <div class="project-tags">
                            <span v-for="(tag, index) in project.tags" :key="index" class="tag">{{ tag }}</span>
                        </div>
                        <div class="project-links">
                            <NuxtLink :to="`/projects/${project.slug}`" class="project-link">View Details</NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </BaseSection>
</template>

<style lang="scss" scoped>
@use 'sass:color';

.projects-section {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s ease-out;

    &.visible {
        opacity: 1;
        transform: translateY(0);
    }
}

.section-header {
    text-align: center;
    margin-bottom: $margin * 2;

    .section-title {
        font-family: 'Noto Sans', sans-serif;
        font-size: 2.5rem;
        font-weight: 700;
        color: #333;
        margin-bottom: $unit * 3;
    }

    .section-subtitle {
        font-family: 'Noto Sans', sans-serif;
        font-size: 1.2rem;
        color: #666;
        max-width: 600px;
        margin: 0 auto;
        margin-bottom: $unit * 4;
    }

    .view-all-projects {
        margin-top: $unit * 5;

        .view-all-link {
            display: inline-block;
            font-family: 'Noto Sans', sans-serif;
            font-size: 1.1rem;
            font-weight: 600;
            color: $accent;
            text-decoration: none;
            padding: $unit * 2 $unit * 4;
            border: 2px solid $accent;
            border-radius: 4px;
            transition: all 0.3s ease;

            &:hover {
                background-color: $accent;
                color: white;
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
        }
    }
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: $margin;
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

            &:hover {
                background-color: color.scale($color: $accent, $lightness: -10%)
            }

            &.github {
                background-color: #333;

                &:hover {
                    background-color: #000;
                }
            }
        }
    }
}

// Responsive adjustments
@media (max-width: 768px) {
    .projects-grid {
        grid-template-columns: 1fr;
    }
}
</style>