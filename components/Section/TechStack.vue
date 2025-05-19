<script setup lang="ts">
// Tech stack data organized by categories
const techCategories = ref([
    {
        id: 'frontend',
        title: 'Frontend',
        skills: [
            { name: 'Vue.js', level: 95, icon: '/icons/vue.svg' },
            { name: 'Nuxt.js', level: 90, icon: '/icons/nuxt.svg' },
            { name: 'TypeScript', level: 80, icon: '/icons/typescript.svg' },
            { name: 'HTML/CSS', level: 95, icon: '/icons/html5.svg' },
        ],
        additionalSkills: ['React.js', 'Next.js', 'Tailwind CSS', 'SASS/SCSS', 'JavaScript ES6+', 'Responsive Design', 'Tailwind', 'SCSS/SASS']
    },
    {
        id: 'backend',
        title: 'Backend',
        skills: [
            { name: 'Node.js', level: 75, icon: '/icons/nodejs.svg' },
            { name: 'Firebase', level: 70, icon: '/icons/firebase.svg' },
        ],
        additionalSkills: ['C#', '.NET Core 8/9', 'SQL']
    },
    {
        id: 'tools',
        title: 'Tools & Others',
        skills: [
            { name: 'Git', level: 85, icon: '/icons/git.svg' },
            { name: 'Canva', level: 65, icon: '/icons/canva.svg' },
        ],
        additionalSkills: ['Augment Code', 'GitHub', 'VS Code', 'Cloudflare', 'Vercel', 'Nuxt Hub', 'zsh, bash, powershell', 'Pinia', 'nvm', 'Lodash', 'Wix Studio', 'Zipbooks']
    }
]);

// For animation
const isVisible = ref(false);
onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            isVisible.value = true;
        }
    }, { threshold: 0.1 });

    const section = document.getElementById('tech-stack');
    if (section) {
        observer.observe(section);
    }
});
</script>

<template>
    <BaseSection id="tech-stack" bgColor="#f5f7fa">
        <div class="tech-stack-section" :class="{ 'visible': isVisible }">
            <div class="section-header">
                <h2 class="section-title">Tech Stack</h2>
                <p class="section-subtitle">Technologies and tools I work with</p>
            </div>

            <div class="tech-categories">
                <div v-for="category in techCategories" :key="category.id" class="tech-category">
                    <h3 class="category-title">{{ category.title }}</h3>

                    <div class="skills-container">
                        <div v-for="(skill, index) in category.skills" :key="index" class="skill-card">
                            <div class="skill-icon">
                                <img :src="skill.icon" :alt="skill.name" />
                            </div>
                            <div class="skill-info">
                                <h4 class="skill-name">{{ skill.name }}</h4>
                                <div class="skill-bar-container">
                                    <div class="skill-bar" :style="{ width: `${skill.level}%` }"></div>
                                </div>
                                <span class="skill-level">{{ skill.level }}%</span>
                            </div>
                        </div>
                    </div>

                    <!-- Additional Skills Section -->
                    <div class="additional-skills-section"
                        v-if="category.additionalSkills && category.additionalSkills.length > 0">
                        <h4 class="additional-skills-title">Additional {{ category.title }} Skills</h4>
                        <div class="additional-skills-container">
                            <span v-for="(skill, index) in category.additionalSkills" :key="index"
                                class="additional-skill" :style="{ animationDelay: `${index * 0.1}s` }">
                                {{ skill }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </BaseSection>
</template>

<style lang="scss" scoped>
.tech-stack-section {
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
    }
}

.tech-categories {
    display: flex;
    flex-direction: column;
    gap: $margin * 2;
}

.tech-category {
    .category-title {
        font-family: 'Noto Sans', sans-serif;
        font-size: 1.8rem;
        font-weight: 600;
        color: #444;
        margin-bottom: $margin;
        padding-bottom: $unit * 3;
        border-bottom: 2px solid rgba($accent, 0.2);
    }

    .skills-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: $margin;
    }
}

.skill-card {
    background-color: white;
    border-radius: 8px;
    padding: $padding;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    gap: $unit * 4;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    }

    .skill-icon {
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

    .skill-info {
        flex: 1;

        .skill-name {
            font-family: 'Noto Sans', sans-serif;
            font-size: 1.1rem;
            font-weight: 600;
            color: #333;
            margin-bottom: $unit * 2;
        }

        .skill-bar-container {
            height: 8px;
            background-color: #eee;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: $unit * 2;

            .skill-bar {
                height: 100%;
                background: linear-gradient(90deg, $accent, darken($accent, 15%));
                border-radius: 4px;
                transition: width 1.5s ease-out;
            }
        }

        .skill-level {
            font-family: 'Noto Sans', sans-serif;
            font-size: 0.9rem;
            color: #666;
            font-weight: 500;
        }
    }
}

.additional-skills-section {
    margin-top: $margin;
    padding-top: $unit * 4;
    border-top: 1px dashed rgba($accent, 0.3);

    .additional-skills-title {
        font-family: 'Noto Sans', sans-serif;
        font-size: 1.2rem;
        font-weight: 600;
        color: #555;
        margin-bottom: $unit * 3;
        opacity: 0.9;
    }

    .additional-skills-container {
        display: flex;
        flex-wrap: wrap;
        gap: $unit * 2;

        .additional-skill {
            background-color: rgba($accent, 0.1);
            color: darken($accent, 10%);
            padding: $unit $unit * 3;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 500;
            transition: all 0.2s ease;
            animation: fadeInUp 0.5s ease forwards;
            opacity: 0;
            transform: translateY(10px);

            &:hover {
                background-color: rgba($accent, 0.2);
                transform: translateY(-2px);
            }
        }
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

// Responsive adjustments
@media (max-width: 768px) {
    .tech-category {
        .skills-container {
            grid-template-columns: 1fr;
        }
    }

    .additional-skills-section {
        .additional-skills-title {
            font-size: 1.1rem;
        }

        .additional-skills-container {
            gap: $unit;

            .additional-skill {
                font-size: 0.85rem;
                padding: $unit * 0.8 $unit * 2;
            }
        }
    }
}

// Extra small device adjustments
@media (max-width: 500px) {
    .section-header {
        .section-title {
            font-size: 2rem;
        }

        .section-subtitle {
            font-size: 1rem;
        }
    }

    .tech-category {
        .category-title {
            font-size: 1.5rem;
        }
    }

    .additional-skills-section {
        .additional-skills-title {
            font-size: 1rem;
        }

        .additional-skills-container {
            gap: $unit * 0.8;

            .additional-skill {
                font-size: 0.8rem;
                padding: $unit * 0.6 $unit * 1.5;
                border-radius: 16px;
            }
        }
    }
}
</style>
