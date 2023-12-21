<script setup>
import { ref, computed, onMounted } from "vue";
import SwipePanel from "./components/SwipePanel.vue";

const showPopup = ref(true);
const handleCloseButtonClicked = () => {
  showPopup.value = false;
};

const toolbarHeight = computed(() => {
  return `calc(100% - 72px)`;
});

const initialHeight = ref(null);
const isSmaller = ref(null);
const handleResize = (payload) => {
  initialHeight.value = payload.initialHeight;
  isSmaller.value = payload.isSmaller;
};

const height = ref(null);
const width = ref(null);
const isResized = ref(null);
const newWidth = ref(null);
const newHeight = ref(null);
onMounted(() => {
  height.value = window.visualViewport.height;
  width.value = window.innerWidth;

  window.addEventListener("resize", (e) => {
    if (newHeight.value) height.value = newHeight.value;
    if (newWidth.value) width.value = newWidth.value;
    console.log(e);
    if (
      width.value !== window.innerWidth ||
      height.value !== window.visualViewport.height
    ) {
      isResized.value = true;
    } else {
      isResized.value = false;
    }
    newWidth.value = window.innerWidth;
    newHeight.value = window.visualViewport.height;
  });
});
</script>

<template>
  <main id="main" class="absolute inset-0 overflow-hidden z-20">
    <!-- <div
      class="absolute top-0 right-0 h-full w-[100px] bg-green-300 overflow-auto"
      :style="{ height: toolbarHeight }"
    >
      <div class="min-w-[100px] flex flex-col">
        <div
          class="w-[100px] h-[100px] bg-orange-300 flex items-center justify-center flex-shrink-0 border-b"
        >
          1
        </div>
        <div
          class="w-[100px] h-[100px] bg-orange-300 flex items-center justify-center flex-shrink-0 border-b"
        >
          2
        </div>
        <div
          class="w-[100px] h-[100px] bg-orange-300 flex items-center justify-center flex-shrink-0 border-b"
        >
          3
        </div>
        <div
          class="w-[100px] h-[100px] bg-orange-300 flex items-center justify-center flex-shrink-0 border-b"
        >
          4
        </div>
        <div
          class="w-[100px] h-[100px] bg-orange-300 flex items-center justify-center flex-shrink-0 border-b"
        >
          5
        </div>
        <div
          class="w-[100px] h-[100px] bg-orange-300 flex items-center justify-center flex-shrink-0 border-b"
        >
          6
        </div>
        <div
          class="w-[100px] h-[100px] bg-orange-300 flex items-center justify-center flex-shrink-0 border-b"
        >
          7
        </div>
        <div
          class="w-[100px] h-[100px] bg-orange-300 flex items-center justify-center flex-shrink-0 border-b"
        >
          8
        </div>
        <div
          class="w-[100px] h-[100px] bg-orange-300 flex items-center justify-center flex-shrink-0 border-b"
        >
          9
        </div>
        <div
          class="w-[100px] h-[100px] bg-orange-300 flex items-center justify-center flex-shrink-0 border-b"
        >
          10
        </div>
        <div
          class="w-[100px] h-[100px] bg-orange-300 flex items-center justify-center flex-shrink-0 border-b"
        >
          11
        </div>
        <div
          class="w-[100px] h-[100px] bg-orange-300 flex items-center justify-center flex-shrink-0 border-b"
        >
          12
        </div>
        <div
          class="w-[100px] h-[100px] bg-orange-300 flex items-center justify-center flex-shrink-0 border-b"
        >
          13
        </div>
      </div>
    </div> -->
    <div class="absolute bottom-0 left-0 w-full h-[72px] z-50 bg-red-300"></div>
    <SwipePanel
      v-if="showPopup"
      @close="handleCloseButtonClicked"
      @resize="handleResize"
    >
      <template #header> Test </template>
      <template #body>
        <p>initial height: {{ initialHeight }}</p>
        <p>window height: {{ height }}</p>
        <p>new window height: {{ newHeight }}</p>
        <p>window width: {{ width }}</p>
        <p>new window width: {{ newWidth }}</p>
        <p>is smaller: {{ isSmaller }}</p>
        <p>is resized: {{ isResized }}</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lorem
          elit, vehicula vitae justo vel, cursus elementum ex. Fusce iaculis vel
          est sit amet molestie. Nulla egestas eros ac sapien luctus blandit.
          Sed imperdiet lorem lectus, sed facilisis ex varius sit amet.
          Suspendisse sed metus et justo gravida aliquam. Vivamus ultrices
          ligula nisi, vel dictum quam semper at. Etiam lorem lectus, aliquet eu
          mi porttitor, vulputate ornare augue. Aenean porta, purus vitae
          sagittis vestibulum, nunc erat pellentesque nisl, ut varius nisl ipsum
          vel odio. In at elementum enim. Integer ultricies rhoncus quam quis
          pretium. Curabitur nulla sem, imperdiet a tincidunt et, dapibus sit
          amet dui.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lorem
          elit, vehicula vitae justo vel, cursus elementum ex. Fusce iaculis vel
          est sit amet molestie. Nulla egestas eros ac sapien luctus blandit.
          Sed imperdiet lorem lectus, sed facilisis ex varius sit amet.
          Suspendisse sed metus et justo gravida aliquam. Vivamus ultrices
          ligula nisi, vel dictum quam semper at. Etiam lorem lectus, aliquet eu
          mi porttitor, vulputate ornare augue. Aenean porta, purus vitae
          sagittis vestibulum, nunc erat pellentesque nisl, ut varius nisl ipsum
          vel odio. In at elementum enim. Integer ultricies rhoncus quam quis
          pretium. Curabitur nulla sem, imperdiet a tincidunt et, dapibus sit
          amet dui.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lorem
          elit, vehicula vitae justo vel, cursus elementum ex. Fusce iaculis vel
          est sit amet molestie. Nulla egestas eros ac sapien luctus blandit.
          Sed imperdiet lorem lectus, sed facilisis ex varius sit amet.
          Suspendisse sed metus et justo gravida aliquam. Vivamus ultrices
          ligula nisi, vel dictum quam semper at. Etiam lorem lectus, aliquet eu
          mi porttitor, vulputate ornare augue. Aenean porta, purus vitae
          sagittis vestibulum, nunc erat pellentesque nisl, ut varius nisl ipsum
          vel odio. In at elementum enim. Integer ultricies rhoncus quam quis
          pretium. Curabitur nulla sem, imperdiet a tincidunt et, dapibus sit
          amet dui.
        </p>
        <input type="text" name="text" id="text" />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lorem
          elit, vehicula vitae justo vel, cursus elementum ex. Fusce iaculis vel
          est sit amet molestie. Nulla egestas eros ac sapien luctus blandit.
          Sed imperdiet lorem lectus, sed facilisis ex varius sit amet.
          Suspendisse sed metus et justo gravida aliquam. Vivamus ultrices
          ligula nisi, vel dictum quam semper at. Etiam lorem lectus, aliquet eu
          mi porttitor, vulputate ornare augue. Aenean porta, purus vitae
          sagittis vestibulum, nunc erat pellentesque nisl, ut varius nisl ipsum
          vel odio. In at elementum enim. Integer ultricies rhoncus quam quis
          pretium. Curabitur nulla sem, imperdiet a tincidunt et, dapibus sit
          amet dui.
        </p>
      </template>
    </SwipePanel>
  </main>
</template>

<style scoped></style>
