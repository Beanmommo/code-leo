<script setup lang="ts">
// / <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import type { TimelineItem } from '~/composables/useProjects';

const props = defineProps<{
  timeline: TimelineItem[];
}>();

// Active timeline item index
const activeIndex = ref(0);
const isAutoPlaying = ref(false);
const autoPlayInterval = ref<NodeJS.Timeout | null>(null);
const timelineRef = ref<HTMLElement | null>(null);

// Start autoplay
const startAutoPlay = () => {
  if (autoPlayInterval.value) clearInterval(autoPlayInterval.value);

  autoPlayInterval.value = setInterval(() => {
    if (isAutoPlaying.value) {
      activeIndex.value = (activeIndex.value + 1) % props.timeline.length;
      scrollToActive();
    }
  }, 5000); // Change every 5 seconds
};

// Stop autoplay
const stopAutoPlay = () => {
  isAutoPlaying.value = false;
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value);
    autoPlayInterval.value = null;
  }
};

// Resume autoplay
const resumeAutoPlay = () => {
  isAutoPlaying.value = true;
  startAutoPlay();
};

// Set active timeline item
const setActive = (index: number) => {
  activeIndex.value = index;
  stopAutoPlay();
  setTimeout(resumeAutoPlay, 10000); // Resume autoplay after 10 seconds of inactivity
};

// Scroll timeline to active item
const scrollToActive = () => {
  if (!timelineRef.value) return;

  const activeElement = timelineRef.value.querySelector(`.timeline-dot:nth-child(${activeIndex.value + 1})`);
  if (activeElement) {
    const containerWidth = timelineRef.value.offsetWidth;
    const scrollPosition = (activeElement as HTMLElement).offsetLeft - containerWidth / 2 + 15;

    timelineRef.value.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }
};

// Start autoplay on mount
onMounted(() => {
  startAutoPlay();

  // Add event listeners for visibility changes
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoPlay();
    } else {
      resumeAutoPlay();
    }
  });
});

// Clean up on unmount
onBeforeUnmount(() => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value);
  }
  document.removeEventListener('visibilitychange', () => { });
});

// Watch for active index changes to scroll
watch(() => activeIndex.value, () => {
  scrollToActive();
});
</script>

<template>
  <div class="project-timeline">

    <!-- Timeline Navigation with Connected Dots -->
    <div class="timeline-navigation" ref="timelineRef">
      <div class="timeline-line"></div>

      <div v-for="(item, index) in timeline" :key="index" class="timeline-dot"
        :class="{ active: index === activeIndex }" @click="setActive(index)">
        <div class="dot"></div>
        <div class="dot-label">{{ item.month }} {{ item.year }}</div>
      </div>
    </div>

    <!-- Timeline Content Display -->
    <div class="timeline-content-wrapper">
      <div v-for="(item, index) in timeline" :key="index" class="timeline-content" v-show="index === activeIndex">
        <div class="timeline-header">
          <div class="timeline-date">
            <span class="month">{{ item.month }}</span>
            <span class="year">{{ item.year }}</span>
          </div>
        </div>

        <div class="timeline-body">
          <div class="timeline-image" v-if="item.image">
            <img :src="item.image" :alt="`Timeline - ${item.month} ${item.year}`" />
          </div>
          <p class="timeline-description">{{ item.description }}</p>
        </div>
      </div>
    </div>

    <!-- Timeline Controls -->
    <div class="timeline-controls">
      <button class="control-button" @click="activeIndex = (activeIndex - 1 + timeline.length) % timeline.length"
        aria-label="Previous timeline item">
        ←
      </button>

      <button class="control-button" @click="isAutoPlaying ? stopAutoPlay() : resumeAutoPlay()"
        :class="{ 'paused': !isAutoPlaying }" aria-label="Pause/Play timeline">
        {{ isAutoPlaying ? '❚❚' : '▶' }}
      </button>

      <button class="control-button" @click="activeIndex = (activeIndex + 1) % timeline.length"
        aria-label="Next timeline item">
        →
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.project-timeline {
  margin: $margin * 2 auto;
  max-width: 800px;

  .timeline-title {
    font-family: 'Noto Sans', sans-serif;
    font-size: 1.5rem;
    font-weight: 600;
    color: #444;
    margin-bottom: $margin;
    text-align: center;
  }

  // Timeline Navigation with Connected Dots
  .timeline-navigation {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: $unit * 6 $unit * 2;
    margin: $margin 0;
    overflow-x: auto;
    scrollbar-width: thin;

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba($accent, 0.3);
      border-radius: 4px;
    }

    .timeline-line {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 2px;
      background-color: #ddd;
      transform: translateY(-50%);
      z-index: 1;
    }

    .timeline-dot {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: $unit * 2;
      cursor: pointer;
      min-width: 100px;

      .dot {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: white;
        border: 2px solid #ddd;
        transition: all 0.3s ease;
        z-index: 3;
      }

      .connector {
        position: relative;
        width: 100%; // Full width of the dot
        top: 13%; // Center it vertically

        // Extend to the next dot
        height: 3px;
        background-color: #ddd;
        transform: translateY(-50%);
        // z-index: 2;
      }

      .dot-label {
        font-size: 0.8rem;
        color: #666;
        white-space: nowrap;
        transition: all 0.3s ease;
        margin-top: $unit * 3;
      }

      &.active {
        .dot {
          background-color: $accent;
          border-color: $accent;
          transform: scale(1.2);
          box-shadow: 0 0 0 4px rgba($accent, 0.2);
        }

        .connector {
          background-color: $accent;
        }

        .dot-label {
          color: $accent;
          font-weight: 600;
        }
      }

      &:hover {
        .dot {
          border-color: $accent;
          transform: scale(1.1);
        }

        .dot-label {
          color: $accent;
        }
      }

      // When the previous dot is active, color this dot's connector
      &.active+.timeline-dot .connector {
        background-color: $accent;
      }
    }
  }

  // Timeline Content
  .timeline-content-wrapper {
    margin: $margin * 2 0;
    min-height: 250px;

    .timeline-content {
      display: flex;
      flex-direction: column;
      gap: $unit * 4;
      animation: fadeIn 0.5s ease-in-out;

      .timeline-header {
        margin-bottom: $unit * 2;

        .timeline-date {
          align-items: center;
          display: inline-flex;
          gap: $unit * 2;
          align-items: flex-start;
          padding: $unit * 2 $unit * 4;
          border-radius: 30px;
          background-color: rgba($accent, 0.05);

          .month {
            font-size: 1.8rem;
            font-weight: 700;
            color: $accent;
            line-height: 1.2;
          }

          .year {
            font-size: 1.2rem;
            color: #666;
          }
        }
      }

      .timeline-body {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        row-gap: $unit * 2;
        column-gap: $unit * 4;
        align-items: center;

        .timeline-image {
          width: 100%;
          max-width: 500px;
          height: 250px;
          border-radius: 8px;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;

            &:hover {
              transform: scale(1.05);
            }
          }
        }

        .timeline-description {
          text-align: center;
          font-size: 1.1rem;
          line-height: 1.6;
          color: #444;
          max-width: 600px;
        }
      }
    }
  }

  // Timeline Controls
  .timeline-controls {
    display: flex;
    justify-content: center;
    gap: $unit * 4;
    margin-top: $margin;

    .control-button {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: white;
      border: 1px solid #ddd;
      color: #666;
      font-size: 1.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background-color: rgba($accent, 0.1);
        color: $accent;
        border-color: $accent;
      }

      &.paused {
        background-color: $accent;
        color: white;
        border-color: $accent;
      }
    }
  }
}

@keyframes fadeIn {
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
  .project-timeline {
    .timeline-navigation {
      padding: $unit * 4 $unit;

      .timeline-dot {
        min-width: 80px;

        .dot {
          width: 16px;
          height: 16px;
        }

        .connector {
          width: 100%;
        }

        .dot-label {
          font-size: 0.7rem;
        }
      }
    }

    .timeline-content-wrapper {
      min-height: 200px;

      .timeline-content {
        .timeline-header {
          .timeline-date {
            .month {
              font-size: 1.5rem;
            }

            .year {
              font-size: 1rem;
            }
          }
        }

        .timeline-body {
          .timeline-image {
            height: 180px;
          }

          .timeline-description {
            font-size: 1rem;
          }
        }
      }
    }
  }
}
</style>
