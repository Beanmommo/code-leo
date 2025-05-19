<script setup lang="ts">
// Experience data
const experiences = ref([
    {
        id: 1,
        role: 'Freelance Software Developer',
        company: 'Self Employed',
        period: 'May 2024 - Present',
        description: 'Develop custom web applications with Vue.js, Nuxt.js, and Firebase for various clients.',
        responsibilities: [
            'Developed and released frontend features using Vue.js and Nuxt.js, including drag-and-drop form builder and dynamic component rendering.',
            'Integrated SharePoint REST API and Firebase for cloud data manipulation; implemented middleware for auth/session handling and reusable CRUD utilities.',
            'Ensured robust development practices through type-safe interfaces, error handling (try-catch), and thorough troubleshooting and defect analysis.',
            'Maintained clean Git workflows with task-based branches, well-documented pull requests, and clear commit messages to avoid merge conflicts.',
            'Presented features in client demos, communicated implementation details effectively, and led data structure analysis and migration efforts.'
        ]
    },
    {
        id: 2,
        role: 'Software Developer Intern',
        company: 'Nexa Lab',
        period: 'Feb 2024 - Apr 2024',
        description: 'Developed UI features with React.js and Next.js, documented API integrations, designed wireframes in Figma, and represented UI/UX in agile meetings.',
        responsibilities: [
            'Developed a contact us form using React.js and Next.js, capturing visitor contact and message allowing communication between stakeholders.',
            'Documented third-party API integration guide, boosting development efficiency by 100%',
            'Built wireframe using Figma translating product owner requirements into a storyboard.',
            'Participated on weekly scrum meeting and effectively represent UI/UX design views and interests.'
        ]
    },
]);

// Education data
const education = ref([
    {
        id: 1,
        degree: 'ACS IT Professional Year',
        institution: 'Performance Education',
        period: 'Oct 2024 - Present',
        description: 'Will graduate October 2025'
    },
    {
        id: 2,
        degree: 'Bachelor of Engineering (Honours) in Software Engineering',
        institution: 'Monash University',
        period: '2019',
        description: 'Graduated December 2023'
    },
    {
        id: 3,
        degree: 'High School',
        institution: 'Sekolah Terpadu PAHOA',
        period: '2018',
        description: 'High School in Indonesia'
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

    const section = document.getElementById('background');
    if (section) {
        observer.observe(section);
    }
});
</script>

<template>
    <BaseSection id="background" bgColor="#ffffff">
        <div class="background-section" :class="{ 'visible': isVisible }">
            <div class="section-header">
                <h2 class="section-title">Background</h2>
                <p class="section-subtitle">My professional journey and education</p>
            </div>

            <!-- Work Experience -->
            <div class="experience-container">
                <h3 class="subsection-title">Relevant Work Experience</h3>

                <div class="timeline">
                    <div v-for="exp in experiences" :key="exp.id" class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-content">
                            <div class="timeline-header">
                                <h4 class="timeline-title">{{ exp.role }}</h4>
                                <span class="timeline-period">{{ exp.period }}</span>
                            </div>
                            <h5 class="timeline-company">{{ exp.company }}</h5>
                            <p class="timeline-description">{{ exp.description }}</p>
                            <ul class="timeline-responsibilities">
                                <li v-for="(item, index) in exp.responsibilities" :key="index">
                                    {{ item }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Education -->
            <div class="education-container">
                <h3 class="subsection-title">Education</h3>

                <div class="education-grid">
                    <div v-for="edu in education" :key="edu.id" class="education-card">
                        <div class="education-period">{{ edu.period }}</div>
                        <h4 class="education-degree">{{ edu.degree }}</h4>
                        <h5 class="education-institution">{{ edu.institution }}</h5>
                        <p class="education-description">{{ edu.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </BaseSection>
</template>

<style lang="scss" scoped>
.background-section {
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

.subsection-title {
    font-family: 'Noto Sans', sans-serif;
    font-size: 1.8rem;
    font-weight: 600;
    color: #444;
    margin-bottom: $margin;
    padding-bottom: $unit * 3;
    border-bottom: 2px solid rgba($accent, 0.2);
}

.experience-container {
    margin-bottom: $margin * 3;
}

.timeline {
    position: relative;
    padding-left: 50px;

    &::before {
        content: '';
        position: absolute;
        left: 15px;
        top: 0;
        height: 100%;
        width: 2px;
        background-color: rgba($accent, 0.3);
    }

    .timeline-item {
        position: relative;
        margin-bottom: $margin * 1.5;

        &:last-child {
            margin-bottom: 0;
        }

        .timeline-dot {
            position: absolute;
            left: -50px;
            top: 5px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: $accent;
            border: 5px solid white;
            box-shadow: 0 0 0 2px rgba($accent, 0.3);
        }

        .timeline-content {
            background-color: white;
            border-radius: 8px;
            padding: $padding;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

            .timeline-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: $unit * 2;

                .timeline-title {
                    font-family: 'Noto Sans', sans-serif;
                    font-size: 1.4rem;
                    font-weight: 600;
                    color: #333;
                }

                .timeline-period {
                    font-family: 'Noto Sans', sans-serif;
                    font-size: 0.9rem;
                    color: #666;
                    background-color: rgba($accent, 0.1);
                    padding: $unit $unit * 2;
                    border-radius: 4px;
                }
            }

            .timeline-company {
                font-family: 'Noto Sans', sans-serif;
                font-size: 1.1rem;
                font-weight: 500;
                color: $accent;
                margin-bottom: $unit * 3;
            }

            .timeline-description {
                font-family: 'Noto Sans', sans-serif;
                font-size: 1rem;
                color: #666;
                line-height: 1.6;
                margin-bottom: $unit * 4;
            }

            .timeline-responsibilities {
                list-style-type: disc;
                padding-left: 20px;

                li {
                    font-family: 'Noto Sans', sans-serif;
                    font-size: 0.95rem;
                    color: #555;
                    margin-bottom: $unit * 2;
                    line-height: 1.5;
                }
            }
        }
    }
}

.education-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: $margin;
}

.education-card {
    background-color: white;
    border-radius: 8px;
    padding: $padding;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    }

    .education-period {
        font-family: 'Noto Sans', sans-serif;
        font-size: 0.9rem;
        color: #666;
        background-color: rgba($accent, 0.1);
        padding: $unit $unit * 2;
        border-radius: 4px;
        display: inline-block;
        margin-bottom: $unit * 3;
    }

    .education-degree {
        font-family: 'Noto Sans', sans-serif;
        font-size: 1.3rem;
        font-weight: 600;
        color: #333;
        margin-bottom: $unit * 2;
    }

    .education-institution {
        font-family: 'Noto Sans', sans-serif;
        font-size: 1.1rem;
        font-weight: 500;
        color: $accent;
        margin-bottom: $unit * 3;
    }

    .education-description {
        font-family: 'Noto Sans', sans-serif;
        font-size: 1rem;
        color: #666;
        line-height: 1.6;
    }
}

// Responsive adjustments
@media (max-width: 768px) {
    .timeline {
        padding-left: 30px;

        &::before {
            left: 10px;
        }

        .timeline-item {
            .timeline-dot {
                left: -30px;
                width: 20px;
                height: 20px;
            }

            .timeline-content {
                .timeline-header {
                    flex-direction: column;
                    align-items: flex-start;

                    .timeline-period {
                        margin-top: $unit * 2;
                    }
                }
            }
        }
    }

    .education-grid {
        grid-template-columns: 1fr;
    }
}
</style>