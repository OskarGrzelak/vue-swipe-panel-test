<script setup>
import { ref } from "vue";
import SwipePanel from "./components/SwipePanel.vue";

const showPopup = ref(true);
const handleCloseButtonClicked = () => {
  showPopup.value = false;
};
</script>

<template>
  <main id="main" class="relative overflow-hidden">
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
