<script setup>
import { ref, computed } from "vue";
import SwipePanel from "./components/SwipePanel.vue";

const showPopup = ref(true);
const handleCloseButtonClicked = () => {
  showPopup.value = false;
};

const toolbarHeight = computed(() => {
  return `calc(100% - 72px)`;
});
</script>

<template>
  <main id="main" class="absolute inset-0 overflow-hidden z-20">
    <div
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
    </div>
    <div class="absolute bottom-0 left-0 w-full h-[72px] z-50 bg-red-300"></div>
    <SwipePanel v-if="showPopup" @close="handleCloseButtonClicked">
      <template #header> Test </template>
      <template #body>
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
