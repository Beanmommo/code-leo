<script setup lang="ts">
import { useProjects } from '~/composables/useProjects';

const route = useRoute();
const router = useRouter();
const { getProjectBySlug, projects } = useProjects();

// Get the project slug from the route
const slug = route.params.slug as string;
const project = getProjectBySlug(slug);

// If project not found, redirect to projects page
if (!project) {
    router.push('/projects');
}

// For animation
const isVisible = ref(false);
onMounted(() => {
    setTimeout(() => {
        isVisible.value = true;
    }, 300);
});

// For image gallery
const activeImageIndex = ref(0);
const showGalleryModal = ref(false);

const openGallery = (index: number) => {
    activeImageIndex.value = index;
    showGalleryModal.value = true;
};

const closeGallery = () => {
    showGalleryModal.value = false;
};

const nextImage = () => {
    if (!project?.screenshots) return;
    activeImageIndex.value = (activeImageIndex.value + 1) % project.screenshots.length;
};

const prevImage = () => {
    if (!project?.screenshots) return;
    activeImageIndex.value = (activeImageIndex.value - 1 + project.screenshots.length) % project.screenshots.length;
};

// Get related projects (excluding current one)
const relatedProjects = computed(() => {
    if (!project) return [];
    return projects.value
        .filter(p => p.id !== project.id)
        .slice(0, 2);
});
</script>

<template>
    <div v-if="project" class="project-detail-page" :class="{ 'visible': isVisible }">
        <!-- Project Hero Section -->
        <section class="project-hero">
            <div class="container">
                <div class="project-hero-content">
                    <h1 class="project-title">{{ project.title }}</h1>
                    <div class="project-tags">
                        <span v-for="(tag, index) in project.tags" :key="index" class="tag">{{ tag }}</span>
                    </div>
                    <p class="project-description">{{ project.description }}</p>
                    <div class="project-meta">
                        <div class="meta-item" v-if="project.date">
                            <span class="meta-label">Date:</span>
                            <span class="meta-value">{{ project.date }}</span>
                        </div>
                        <div class="meta-item" v-if="project.duration">
                            <span class="meta-label">Duration:</span>
                            <span class="meta-value">{{ project.duration }}</span>
                        </div>
                    </div>
                    <div class="project-links">
                        <a :href="project.github" class="btn btn-primary" target="_blank">
                            <span>GitHub Repository</span>
                        </a>
                        <a :href="project.link" class="btn btn-secondary" target="_blank">
                            <span>Live Demo</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Project Aim Section -->
        <section class="project-section">
            <div class="container">
                <h2 class="section-title">Project Aim</h2>
                <div class="project-aim">
                    <p class="project-aim-description">{{ project.projectAim }}</p>
                </div>
            </div>
        </section>

        <!-- Project Screenshots Section -->
        <section class="project-section" v-if="project.screenshots && project.screenshots.length > 0">
            <div class="container">
                <h2 class="section-title">Screenshots</h2>
                <div class="screenshots-grid">
                    <div v-for="(screenshot, index) in project.screenshots" :key="index" class="screenshot-item"
                        @click="openGallery(index)">
                        <img :src="screenshot" :alt="`${project.title} Screenshot ${index + 1}`" />
                    </div>
                </div>
            </div>
        </section>

        <!-- Technical Contributions Section -->
        <section class="project-section"
            v-if="project.technicalContributions && project.technicalContributions.length > 0">
            <div class="container">
                <h2 class="section-title">Technical Contributions</h2>
                <div class="technical-contributions">
                    <ul class="contributions-list">
                        <li v-for="(contribution, index) in project.technicalContributions" :key="index">
                            {{ contribution }}
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- Technologies Used Section -->
        <section class="project-section" v-if="project.technologies && project.technologies.length > 0">
            <div class="container">
                <h2 class="section-title">Technologies Used</h2>
                <div class="technologies-grid">
                    <div v-for="(tech, index) in project.technologies" :key="index" class="technology-card">
                        <div class="technology-icon" v-if="tech.icon">
                            <img :src="tech.icon" :alt="tech.name" />
                        </div>
                        <div class="technology-content">
                            <h3 class="technology-name">{{ tech.name }}</h3>
                            <p class="technology-description">{{ tech.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Related Projects Section -->
        <section class="project-section" v-if="relatedProjects.length > 0">
            <div class="container">
                <h2 class="section-title">Related Projects</h2>
                <div class="related-projects-grid">
                    <div v-for="relatedProject in relatedProjects" :key="relatedProject.id" class="project-card">
                        <div class="project-image">
                            <img :src="relatedProject.image" :alt="relatedProject.title" />
                        </div>
                        <div class="project-content">
                            <h3 class="project-title">{{ relatedProject.title }}</h3>
                            <p class="project-description">{{ relatedProject.description }}</p>
                            <div class="project-links">
                                <NuxtLink :to="`/projects/${relatedProject.slug}`" class="btn btn-primary">View Details
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Back to Projects Button -->
        <div class="back-to-projects">
            <div class="container">
                <NuxtLink to="/projects" class="btn btn-outline">
                    <span>← Back to All Projects</span>
                </NuxtLink>
            </div>
        </div>

        <!-- Image Gallery Modal -->
        <div class="gallery-modal" v-if="showGalleryModal && project.screenshots">
            <div class="gallery-content">
                <button class="close-button" @click="closeGallery">×</button>
                <button class="nav-button prev" @click="prevImage">❮</button>
                <div class="gallery-image">
                    <img :src="project.screenshots[activeImageIndex]" :alt="`${project.title} Screenshot`" />
                </div>
                <button class="nav-button next" @click="nextImage">❯</button>
                <div class="gallery-counter">{{ activeImageIndex + 1 }} / {{ project.screenshots.length }}</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.project-detail-page {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s ease-out;

    &.visible {
        opacity: 1;
        transform: translateY(0);
    }
}

.project-hero {
    background-size: cover;
    background-position: center;
    padding: $padding * 8 0;
    margin-bottom: $margin * 2;

    &-content {
        max-width: 800px;
        display: flex;
        flex-direction: column;
        gap: $unit * 4;
    }

    .project-title {
        font-family: 'Noto Sans', sans-serif;
        font-size: 3rem;
        font-weight: 700;
    }

    .project-tags {
        display: flex;
        flex-wrap: wrap;
        gap: $unit * 2;

        .tag {
            background-color: rgba($accent, 0.2);
            color: white;
            padding: $unit $unit * 3;
            border-radius: 4px;
            font-size: 0.9rem;
            font-weight: 500;
            backdrop-filter: blur(5px);
        }
    }

    .project-description {
        font-size: 1.2rem;
        line-height: 1.6;
        max-width: 700px;
    }

    .project-meta {
        display: flex;
        gap: $margin;

        .meta-item {
            display: flex;
            flex-direction: column;
            gap: $unit;

            .meta-label {
                font-size: 0.9rem;
                opacity: 0.8;
            }

            .meta-value {
                font-size: 1.1rem;
                font-weight: 600;
            }
        }
    }

    .project-links {
        display: flex;
        gap: $unit * 4;
        margin-top: $unit * 4;
    }
}

.project-section {
    padding: $padding * 4 0;

    &:nth-child(odd) {
        background-color: #f8f9fa;
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

.project-aim {
    max-width: 800px;
    margin: 0 auto;

    .project-aim-description {
        font-size: 1.1rem;
        line-height: 1.8;
        color: #444;
        font-style: italic;
        padding: $unit * 4;
        background-color: rgba($accent, 0.05);
        border-left: 4px solid $accent;
        border-radius: 0 8px 8px 0;
    }
}

.screenshots-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: $margin;

    .screenshot-item {
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}

.technical-contributions {
    max-width: 800px;
    margin: 0 auto;
    background-color: white;
    padding: $padding * 2;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

    .contributions-list {
        list-style-type: none;
        padding-left: 0;

        li {
            font-size: 1.05rem;
            color: #555;
            margin-bottom: $unit * 4;
            padding-left: $unit * 6;
            line-height: 1.6;
            position: relative;

            &:before {
                content: "✓";
                position: absolute;
                left: 0;
                color: $accent;
                font-weight: bold;
                font-size: 1.2rem;
                background-color: rgba($accent, 0.1);
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
}

.technologies-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: $margin;

    .technology-card {
        background-color: white;
        border-radius: 8px;
        padding: $padding;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        display: flex;
        align-items: center;
        gap: $unit * 4;
        transition: all 0.3s ease;

        &:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .technology-icon {
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
                max-width: 100%;
                max-height: 100%;
            }
        }

        .technology-content {
            flex: 1;

            .technology-name {
                font-family: 'Noto Sans', sans-serif;
                font-size: 1.2rem;
                font-weight: 600;
                color: #333;
                margin-bottom: $unit * 2;
            }

            .technology-description {
                font-size: 0.95rem;
                color: #666;
                line-height: 1.5;
            }
        }
    }
}

.related-projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: $margin;

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
            }
        }

        .project-content {
            padding: $padding;

            .project-title {
                font-family: 'Noto Sans', sans-serif;
                font-size: 1.5rem;
                font-weight: 600;
                color: #333;
                margin-bottom: $unit * 3;
            }

            .project-description {
                font-size: 1rem;
                color: #666;
                line-height: 1.6;
                margin-bottom: $unit * 4;
            }
        }
    }
}

.back-to-projects {
    padding: $padding * 2 0 $padding * 4;
    text-align: center;
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

// Gallery Modal
.gallery-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;

    .gallery-content {
        position: relative;
        width: 80%;
        max-width: 1200px;
        height: 80%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .gallery-image {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }
    }

    .close-button {
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
    }

    .nav-button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;

        &:hover {
            background: rgba(0, 0, 0, 0.8);
        }

        &.prev {
            left: -70px;
        }

        &.next {
            right: -70px;
        }
    }

    .gallery-counter {
        position: absolute;
        bottom: -40px;
        left: 50%;
        transform: translateX(-50%);
        color: white;
        font-size: 1rem;
    }
}

// Responsive adjustments
@media (max-width: 768px) {
    .project-hero {
        padding: $padding * 4 0;

        .project-title {
            font-size: 2.2rem;
        }

        .project-links {
            flex-wrap: wrap;
        }
    }

    .project-aim {
        .project-aim-description {
            padding: $unit * 3;
            font-size: 1rem;
        }
    }

    .technical-contributions {
        padding: $padding;

        .contributions-list {
            li {
                padding-left: $unit * 5;
                font-size: 1rem;

                &:before {
                    width: 24px;
                    height: 24px;
                    font-size: 1rem;
                }
            }
        }
    }

    .gallery-modal {
        .nav-button {
            width: 40px;
            height: 40px;

            &.prev {
                left: 10px;
            }

            &.next {
                right: 10px;
            }
        }
    }
}
</style>
