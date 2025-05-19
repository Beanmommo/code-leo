<script setup lang="ts">
import { useProjects } from '~/composables/useProjects';

const route = useRoute();
const { getProjectBySlug } = useProjects();

// Generate breadcrumb items based on the current route
const breadcrumbs = computed(() => {
  const pathArray = route.path.split('/').filter(Boolean);
  const items = [{ name: 'Home', path: '/' }];

  let currentPath = '';

  for (let i = 0; i < pathArray.length; i++) {
    const segment = pathArray[i];
    currentPath += `/${segment}`;

    // Special handling for project detail pages
    if (i === 1 && pathArray[0] === 'projects' && segment !== 'projects') {
      // This is a project slug, get the actual project title
      const project = getProjectBySlug(segment);
      if (project) {
        items.push({
          name: project.title,
          path: currentPath
        });
        continue;
      }
    }

    // Format the segment name (capitalize and replace hyphens with spaces)
    const name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    items.push({
      name: name,
      path: currentPath
    });
  }

  return items;
});
</script>

<template>
  <nav v-if="breadcrumbs.length > 1" aria-label="Breadcrumb" class="breadcrumb">
    <div class="container">
      <ol>
        <li v-for="(crumb, index) in breadcrumbs" :key="index"
          :class="{ 'is-active': index === breadcrumbs.length - 1 }">
          <NuxtLink v-if="index < breadcrumbs.length - 1" :to="crumb.path">
            <span v-if="index === 0" class="home-icon">🏠</span>
            {{ crumb.name }}
          </NuxtLink>
          <span v-else class="current-page">{{ crumb.name }}</span>
          <span v-if="index < breadcrumbs.length - 1" class="separator">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </span>
        </li>
      </ol>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.breadcrumb {
  padding: $unit * 3 0;
  background-color: #f8f9fa;
  border-bottom: 1px solid #eaeaea;
  position: relative;
  z-index: 90; // Lower than header
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 $padding;
  }

  ol {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    display: flex;
    align-items: center;
    font-family: 'Noto Sans', sans-serif;
    font-size: 0.9rem;

    a {
      color: #555;
      text-decoration: none;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      padding: $unit $unit * 2;
      border-radius: 4px;

      .home-icon {
        margin-right: $unit * 2;
        font-size: 1rem;
      }

      &:hover {
        color: $accent;
        background-color: rgba($accent, 0.05);
      }
    }

    span {
      &.current-page {
        color: $accent;
        font-weight: 600;
        padding: $unit $unit * 2;
      }

      &.separator {
        display: flex;
        align-items: center;
        margin: 0 $unit;
        color: #ccc;

        svg {
          width: 14px;
          height: 14px;
        }
      }
    }

    &.is-active {
      color: $accent;
    }
  }
}

@media (max-width: 768px) {
  .breadcrumb {
    padding: $unit * 2 0;

    .container {
      padding: 0 $unit * 3;
    }

    li {
      font-size: 0.8rem;

      a {
        padding: $unit $unit;

        .home-icon {
          margin-right: $unit;
        }
      }

      span {
        &.current-page {
          padding: $unit;
        }

        &.separator {
          margin: 0 $unit / 2;

          svg {
            width: 12px;
            height: 12px;
          }
        }
      }
    }
  }
}

// Extra small device adjustments
@media (max-width: 500px) {
  .breadcrumb {
    padding: $unit 0;
    width: 100%; // Use 100% instead of 100vw to prevent overflow
    max-width: 100%;
    box-sizing: border-box;

    .container {
      padding: 0 $unit * 2;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
    }

    ol {
      flex-wrap: nowrap;
      overflow-x: auto;
      padding-bottom: $unit;
      -webkit-overflow-scrolling: touch;
      width: 100%;
      max-width: 100%;

      &::-webkit-scrollbar {
        display: none; // Hide scrollbar on mobile
      }
    }

    li {
      white-space: nowrap;
      font-size: 0.75rem;

      a {
        padding: $unit $unit / 2;
      }

      span {
        &.current-page {
          padding: $unit $unit / 2;
        }

        &.separator {
          margin: 0 2px;

          svg {
            width: 10px;
            height: 10px;
          }
        }
      }
    }
  }
}
</style>
