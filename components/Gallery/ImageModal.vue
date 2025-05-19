<script setup lang="ts">
// Props for the component
const props = defineProps<{
  isOpen: boolean;
  images: string[];
  activeIndex: number;
  title: string;
}>();

// Emits for the component
const emit = defineEmits(['close', 'prev', 'next', 'imageLoaded']);

// Local state
const isImageLoading = ref(false);

// Methods
const closeGallery = () => {
  emit('close');
};

const prevImage = () => {
  emit('prev');
};

const nextImage = () => {
  emit('next');
};

const onImageLoad = () => {
  emit('imageLoaded');
};

// Handle keyboard navigation
const handleKeyDown = (event: KeyboardEvent) => {
  if (!props.isOpen) return;
  
  switch (event.key) {
    case 'ArrowRight':
      nextImage();
      break;
    case 'ArrowLeft':
      prevImage();
      break;
    case 'Escape':
      closeGallery();
      break;
  }
};

// Add and remove event listeners
onMounted(() => {
  document.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown);
});

// Watch for changes in isOpen to control body scrolling
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    // Prevent body scrolling when gallery is open
    document.body.style.overflow = 'hidden';
  } else {
    // Restore body scrolling when gallery closes
    document.body.style.overflow = '';
  }
}, { immediate: true });
</script>

<template>
  <Teleport to="body">
    <transition name="fade">
      <div class="gallery-modal" v-if="isOpen && images.length > 0" @click.self="closeGallery">
        <div class="gallery-content">
          <button class="close-button" @click="closeGallery" aria-label="Close gallery">×</button>
          <button class="nav-button prev" @click.stop="prevImage" aria-label="Previous image">❮</button>
          <div class="gallery-image">
            <div v-if="isImageLoading" class="loading-spinner">
              <div class="spinner"></div>
            </div>
            <transition name="zoom">
              <img :src="images[activeIndex]"
                :alt="`${title} Screenshot ${activeIndex + 1}`" 
                @load="onImageLoad"
                :key="activeIndex" 
                class="fullscreen-image" />
            </transition>
          </div>
          <button class="nav-button next" @click.stop="nextImage" aria-label="Next image">❯</button>
          <div class="gallery-counter">{{ activeIndex + 1 }} / {{ images.length }}</div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.gallery-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999; // Higher z-index to ensure it's above everything
  overflow: hidden;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  backdrop-filter: blur(5px);

  .gallery-content {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .gallery-image {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 0;

    .fullscreen-image {
      width: 100vw;
      height: 100vh;
      object-fit: contain;
      transition: all 0.3s ease;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    .loading-spinner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10000;
      
      .spinner {
        width: 50px;
        height: 50px;
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: var(--accent-color, #4a6cf7);
        animation: spin 1s ease-in-out infinite;
      }
    }
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  // Transitions
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .zoom-enter-active,
  .zoom-leave-active {
    transition: all 0.3s ease;
  }

  .zoom-enter-from {
    opacity: 0;
    transform: scale(0.9);
  }

  .zoom-leave-to {
    opacity: 0;
    transform: scale(1.1);
  }

  .close-button {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.5);
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    z-index: 10001;
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.1);
    }
  }

  .nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.4);
    color: white;
    border: none;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    font-size: 1.8rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    z-index: 10001;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);

    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-50%) scale(1.1);
    }

    &.prev {
      left: 20px;
    }

    &.next {
      right: 20px;
    }
  }

  .gallery-counter {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    font-size: 1.1rem;
    background: rgba(0, 0, 0, 0.6);
    padding: 8px 20px;
    border-radius: 30px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    font-family: 'Noto Sans', sans-serif;
    font-weight: 500;
    z-index: 10001;
  }
}

// Mobile styles
@media (max-width: 768px) {
  .gallery-modal {
    backdrop-filter: blur(3px);
    
    .close-button {
      top: 15px;
      right: 15px;
      width: 40px;
      height: 40px;
      font-size: 1.5rem;
    }
    
    .nav-button {
      width: 45px;
      height: 45px;
      font-size: 1.5rem;

      &.prev {
        left: 10px;
      }

      &.next {
        right: 10px;
      }
    }
    
    .gallery-counter {
      bottom: 15px;
      font-size: 0.9rem;
      padding: 6px 15px;
    }
    
    .gallery-image {
      .loading-spinner .spinner {
        width: 40px;
        height: 40px;
        border-width: 3px;
      }
    }
  }
}
</style>
