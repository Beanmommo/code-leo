<script setup lang="ts">
import { useContact } from '~/composables/useContact';

const { contactLinks } = useContact();

// For animation
const isVisible = ref(false);

// Group links by type for better organization
const groupedLinks = computed(() => {
  const groups = {
    contact: [] as typeof contactLinks.value,
    social: [] as typeof contactLinks.value,
    other: [] as typeof contactLinks.value
  };

  contactLinks.value.forEach(link => {
    if (link.type === 'email' || link.type === 'location') {
      groups.contact.push(link);
    } else if (link.id === 'linkedin' || link.id === 'twitter' || link.id === 'instagram') {
      groups.social.push(link);
    } else {
      groups.other.push(link);
    }
  });

  return groups;
});

// Use the icon from the link object directly
// The icons are now stored in the contactLinks data

// Intersection observer for animations
onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        observer.disconnect();
      }
    },
    {
      threshold: 0.1
    }
  );

  const section = document.querySelector('.connect-page');
  if (section) {
    observer.observe(section);
  }
});
</script>

<template>
  <div class="connect-page" :class="{ 'is-visible': isVisible }">
    <div class="container">
      <div class="section-header">
        <h1 class="section-title">Let's Connect</h1>
        <p class="section-subtitle">Feel free to reach out through any of these channels</p>
      </div>

      <div class="connect-content">
        <!-- Contact Information -->
        <div class="connect-section">
          <h2 class="connect-section-title">Contact Information</h2>
          <div class="connect-links">
            <div v-for="link in groupedLinks.contact" :key="link.id" class="connect-link-card">
              <div class="link-icon">
                <img :src="link.icon || '/icons/link.svg'" :alt="link.name" />
              </div>
              <div class="link-content">
                <h3 class="link-title">{{ link.name }}</h3>
                <p class="link-value">{{ link.value }}</p>
              </div>
              <div class="link-action">
                <a v-if="link.type === 'email'" :href="`mailto:${link.value}`" class="action-button">
                  Send Email
                </a>
                <a v-else-if="link.type === 'location'" :href="`https://maps.google.com/?q=${link.value}`"
                  target="_blank" class="action-button">
                  View Map
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Social Media -->
        <div class="connect-section">
          <h2 class="connect-section-title">Social Media</h2>
          <div class="connect-links">
            <div v-for="link in groupedLinks.social" :key="link.id" class="connect-link-card">
              <div class="link-icon">
                <img :src="link.icon || '/icons/link.svg'" :alt="link.name" />
              </div>
              <div class="link-content">
                <h3 class="link-title">{{ link.name }}</h3>
                <p class="link-value">{{ link.url }}</p>
              </div>
              <div class="link-action">
                <a :href="link.url" target="_blank" class="action-button">
                  Visit Profile
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Other Links -->
        <div class="connect-section">
          <h2 class="connect-section-title">Developer Profiles</h2>
          <div class="connect-links">
            <div v-for="link in groupedLinks.other" :key="link.id" class="connect-link-card">
              <div class="link-icon">
                <img :src="link.icon || '/icons/link.svg'" :alt="link.name" />
              </div>
              <div class="link-content">
                <h3 class="link-title">{{ link.name }}</h3>
                <p class="link-value">{{ link.url }}</p>
              </div>
              <div class="link-action">
                <a :href="link.url" target="_blank" class="action-button">
                  View Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.connect-page {
  padding: $section-padding;
  background-color: #f8f9fa;
  min-height: 100vh;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 $padding;
  }
}

.section-header {
  text-align: center;
  margin-bottom: $margin * 2;

  .section-title {
    font-family: 'Noto Sans', sans-serif;
    font-size: 3rem;
    font-weight: 700;
    color: #333;
    margin-bottom: $unit * 3;
    position: relative;
    display: inline-block;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background-color: $accent;
      border-radius: 2px;
    }
  }

  .section-subtitle {
    font-family: 'Noto Sans', sans-serif;
    font-size: 1.2rem;
    color: #666;
    max-width: 600px;
    margin: 0 auto;
  }
}

.connect-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: $margin * 2;
}

.connect-section {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  padding: $padding;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  }

  .connect-section-title {
    font-family: 'Noto Sans', sans-serif;
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
    margin-bottom: $unit * 6;
    padding-bottom: $unit * 3;
    border-bottom: 1px solid #eee;
  }
}

.connect-links {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: $margin;
}

.connect-link-card {
  display: flex;
  align-items: center;
  padding: $padding;
  background-color: #f9f9f9;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba($accent, 0.05);
    transform: translateX(5px);
  }

  .link-icon {
    margin-right: $unit * 4;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba($accent, 0.1);
    border-radius: 50%;

    img {
      width: 24px;
      height: 24px;
    }
  }

  .link-content {
    flex: 1;

    .link-title {
      font-family: 'Noto Sans', sans-serif;
      font-size: 1.2rem;
      font-weight: 600;
      color: #333;
      margin-bottom: $unit;
    }

    .link-value {
      font-family: 'Noto Sans', sans-serif;
      font-size: 0.9rem;
      color: #666;
      word-break: break-all;
    }
  }

  .link-action {
    margin-left: $unit * 4;

    .action-button {
      display: inline-block;
      padding: $unit * 2 $unit * 3;
      background-color: $accent;
      color: white;
      font-family: 'Noto Sans', sans-serif;
      font-size: 0.9rem;
      font-weight: 600;
      text-decoration: none;
      border-radius: 4px;
      transition: all 0.3s ease;
      white-space: nowrap;

      &:hover {
        background-color: darken($accent, 10%);
        transform: translateY(-2px);
      }
    }
  }
}

// Responsive adjustments
@media (max-width: 768px) {
  .connect-page {
    padding: $section-padding-mobile;
  }

  .section-header {
    .section-title {
      font-size: 2.5rem;
    }

    .section-subtitle {
      font-size: 1.1rem;
    }
  }

  .connect-links {
    grid-template-columns: 1fr;
  }

  .connect-link-card {
    flex-direction: column;
    text-align: center;

    .link-icon {
      margin-right: 0;
      margin-bottom: $unit * 3;

      img {
        width: 22px;
        height: 22px;
      }
    }

    .link-content {
      margin-bottom: $unit * 3;
    }

    .link-action {
      margin-left: 0;
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

  .connect-section {
    padding: $padding-small;

    .connect-section-title {
      font-size: 1.3rem;
    }
  }

  .connect-link-card {
    padding: $padding-small;

    .link-icon {
      width: 40px;
      height: 40px;
      font-size: 1.5rem;
    }

    .link-content {
      .link-title {
        font-size: 1.1rem;
      }

      .link-value {
        font-size: 0.85rem;
      }
    }

    .link-action {
      .action-button {
        padding: $unit * 1.5 $unit * 2.5;
        font-size: 0.85rem;
      }
    }
  }
}
</style>
