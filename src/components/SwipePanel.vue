<template>
  <teleport to="#main">
    <div
      ref="panel"
      class="fixed w-full h-full bg-white z-10 overflow-hidden shadow-around rounded-t-xl md:rounded-3xl px-2 md:px-4"
      :class="[isMobile ? 'swipe-panel-mobile' : 'swipe-panel-desktop']"
    >
      <div ref="panelHeader" class="py-4 bg-white w-full">
        <div class="flex items-center justify-between">
          <div class="pl-2 text-primary font-semibold md:text-lg truncate">
            <slot name="header" />
          </div>
          <div class="ml-4 flex">
            <a
              v-if="help"
              :href="`/pomoc/${help}`"
              target="_blank"
              class="w-8 h-8 md:rounded-lg md:h-7 md:w-7 md:border-transparent md:hover:border-primary transition-colors flex items-center justify-center ml-2"
              @click="closePopup"
            >
              <question-mark-circle-icon class="h-6 w-6 text-primary" />
            </a>
            <button
              v-if="currentLevel === 'min'"
              class="w-8 h-8 md:rounded-lg md:h-7 md:w-7 md:border-transparent md:hover:border-primary transition-colors flex items-center justify-center ml-2"
              @click="maximize"
            >
              <chevron-up-icon class="h-6 w-6 text-primary" />
            </button>
            <button
              v-else
              class="w-8 h-8 md:rounded-lg md:h-7 md:w-7 md:border-transparent md:hover:border-primary transition-colors flex items-center justify-center ml-2"
              @click="minimize"
            >
              <chevron-down-icon class="h-6 w-6 text-primary" />
            </button>
            <button
              class="w-8 h-8 md:rounded-lg md:h-7 md:w-7 md:border-transparent md:hover:border-primary transition-colors flex items-center justify-center ml-2"
              @click="close"
            >
              <x-icon class="h-6 w-6 text-primary" />
            </button>
          </div>
        </div>
        <div v-if="hasActionsSlot" class="flex items-center flex-wrap mt-4">
          <slot name="actions"></slot>
        </div>
      </div>
      <hr />
      <div
        class="py-4"
        :style="{ height: `calc(100% - ${panelHeaderHeight}px)` }"
      >
        <div
          ref="panelContent"
          class="h-full"
          :class="{ 'overflow-y-auto': currentLevel === 'max' }"
        >
          <div class="relative py-4 px-2">
            <slot name="body" />
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import {
  ChevronDownIcon,
  ChevronUpIcon,
  XIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/vue/outline";
import resizeMixin from "@/mixins/resizeMixin";
export default {
  name: "SwipePanel",
  components: {
    ChevronDownIcon,
    ChevronUpIcon,
    XIcon,
    QuestionMarkCircleIcon,
  },
  mixins: [resizeMixin],
  props: {
    help: {
      type: String,
      default: "",
    },
    panelLevel: {
      type: String,
      default: "",
    },
  },
  emits: ["close", "change-level"],
  data() {
    return {
      mouseX: 0,
      initialX: 0,
      mouseY: 0,
      initialY: 0,
      panelHeight: 0,
      panelHeaderHeight: 0,
      translationY: 0,
      absoluteTranslationY: 0,
      isSwiped: false,
      events: {
        mouse: {
          down: "mousedown",
          move: "mousemove",
          up: "mouseup",
        },
        touch: {
          down: "touchstart",
          move: "touchmove",
          up: "touchend",
        },
      },
      deviceType: "",
      direction: "",
      levels: [],
      currentLevel: "max",
      threshold: 50,
    };
  },
  computed: {
    hasActionsSlot() {
      return !!this.$slots.actions;
    },
  },
  watch: {
    currentLevel(level) {
      const value =
        window.innerHeight -
        this.levels.find((item) => item.name === level).value;
      this.$emit("change-level", value);
    },
    panelLevel(level) {
      if (level) this.swipeToLevel(level);
    },
  },
  mounted() {
    this.panelHeight = this.$refs.panel.offsetHeight;
    this.panelHeaderHeight = this.$refs.panelHeader.offsetHeight;
    this.createLevels();
    this.isTouchDevice();

    console.log(this.levels);

    const lvl = this.isMobile
      ? this.levels.find((item) => item.name === "mid")
      : this.levels.find((item) => item.name === "max");
    this.currentLevel = lvl.name;
    this.translationY = lvl.value;
    this.transform();
    this.absoluteTranslationY = this.translationY;

    //Start Swipe
    this.$refs.panel.addEventListener(
      this.events[this.deviceType].down,
      (event) => {
        this.isSwiped = true;
        //Get X and Y Position
        this.getXY(event);
        this.initialX = this.mouseX;
        this.initialY = this.mouseY;
      }
    );
    //Mousemove / touchmove
    this.$refs.panel.addEventListener(
      this.events[this.deviceType].move,
      (event) => {
        if (!this.isTouchDevice()) {
          event.preventDefault();
        }
        if (this.isSwiped) {
          this.getXY(event);
          let diffX = this.mouseX - this.initialX;
          let diffY = this.mouseY - this.initialY;
          if (Math.abs(diffY) > Math.abs(diffX)) {
            this.direction = diffY > 0 ? "down" : "up";
            if (
              this.direction === "down" &&
              this.$refs.panelContent.scrollTop > 0
            )
              return;

            this.$refs.panel.classList.remove("transition");
            this.translationY = diffY + this.absoluteTranslationY;
            this.transform();
          }
        }
      }
    );
    //Stop Drawing
    this.$refs.panel.addEventListener(
      this.events[this.deviceType].up,
      this.handleSwipe
    );

    this.$refs.panel.addEventListener("mouseleave", this.handleSwipe);
  },
  methods: {
    isTouchDevice() {
      try {
        //We try to create TouchEvent (it would fail for desktops and throw error)
        document.createEvent("TouchEvent");
        this.deviceType = "touch";
        return true;
      } catch (e) {
        this.deviceType = "mouse";
        return false;
      }
    },
    getXY(e) {
      this.mouseX = !this.isTouchDevice() ? e.pageX : e.touches[0].pageX;
      this.mouseY = !this.isTouchDevice() ? e.pageY : e.touches[0].pageY;
    },
    createLevels() {
      this.levels.push({ name: "max", value: 0 });
      if (this.isMobile) {
        this.levels.push({
          name: "mid",
          value: this.isMobile
            ? (window.innerHeight - 72) / 2
            : window.innerHeight / 2,
        });
      }
      this.levels.push({
        name: "min",
        value: this.isMobile
          ? window.innerHeight - 72 - this.panelHeaderHeight
          : window.innerHeight -
            this.panelHeaderHeight -
            this.$refs.panel.getBoundingClientRect().y,
      });
    },
    findLevel(testValue, direction) {
      if (!direction) return null;

      const index = this.levels.findIndex(
        (item) => item.name === this.currentLevel
      );

      if (direction === "down") {
        for (let i = this.levels.length - 1; i >= index + 1; i--) {
          if (testValue >= this.levels[i].value - this.threshold) {
            return this.levels[i];
          }
        }

        if (testValue > this.levels[index].value + this.threshold) {
          return this.levels[index + 1];
        } else {
          return this.levels[index];
        }
      }

      if (direction === "up") {
        for (let i = 0; i < index; i++) {
          if (testValue <= this.levels[i].value + this.threshold) {
            return this.levels[i];
          }
        }

        if (testValue < this.levels[index].value - this.threshold) {
          return this.levels[index - 1];
        } else {
          return this.levels[index];
        }
      }
    },
    transform() {
      let value = this.translationY;
      if (this.translationY < 0) value = 0;
      if (this.translationY > this.levels[this.levels.length - 1].value)
        value = this.levels[this.levels.length - 1].value;
      this.$refs.panel.style.webkitTransform = `translateY(${value}px)`;
      this.$refs.panel.style.MozTransform = `translateY(${value}px)`;
      this.$refs.panel.style.msTransform = `translateY(${value}px)`;
      this.$refs.panel.style.transform = `translateY(${value}px)`;
    },
    handleSwipe() {
      this.isSwiped = false;
      if (this.direction === "down" && this.$refs.panelContent.scrollTop > 0)
        return;
      let diffY = this.mouseY - this.initialY;
      const testValue = diffY + this.absoluteTranslationY;
      const lvl = this.findLevel(testValue, this.direction);
      if (!lvl) return;
      this.currentLevel = lvl.name;
      this.translationY = lvl.value;
      this.transform();
      this.absoluteTranslationY = this.translationY;
    },
    minimize() {
      this.swipeToLevel("min");
    },
    maximize() {
      this.isMobile ? this.swipeToLevel("mid") : this.swipeToLevel("max");
    },
    swipeToLevel(level) {
      const lvl = this.levels.find((item) => item.name === level);
      if (!lvl) return;
      this.currentLevel = lvl.name;
      this.translationY = lvl.value;
      this.transform();
      this.absoluteTranslationY = this.translationY;
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>
