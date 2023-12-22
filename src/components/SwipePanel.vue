<template>
  <div
    id="swipe-panel"
    ref="panel"
    class="absolute bottom-0 left-0 w-full h-full bg-white z-10 overflow-hidden shadow-around rounded-t-xl md:rounded-3xl px-2 md:px-4"
    :class="[isMobile ? 'swipe-panel-mobile' : 'swipe-panel-desktop', 'z-10']"
  >
    <div ref="panelHeader" class="py-4 bg-white w-full">
      <div class="flex items-center justify-between">
        <span v-if="blink" class="absolute flex h-3 w-3 top-2 left-2">
          <span
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-50"
          ></span>
          <span
            class="relative inline-flex rounded-full h-3 w-3 bg-tertiary"
          ></span>
        </span>
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
        :class="{ 'overflow-y-scroll': currentLevel === 'max' }"
      >
        <div class="relative px-2 h-full">
          <slot name="body" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ChevronDownIcon,
  ChevronUpIcon,
  XIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/vue/outline";
import resizeMixin from "@/mixins/resizeMixin";
import { createObserver } from "@/utils";
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
    swipeTo: {
      type: Object,
      default: null,
    },
  },
  emits: ["close", "change-level", "resize"],
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
      observer: null,
      blink: false,
      initialHeight: null,
      isInitiallyPortrait: false,
      blockSwipe: false,
    };
  },
  computed: {
    hasActionsSlot() {
      return !!this.$slots.actions;
    },
  },
  watch: {
    swipeTo: {
      handler(swipe) {
        if (
          swipe &&
          swipe.level &&
          (!swipe.from ||
            !swipe.from.length ||
            swipe.from.includes(this.currentLevel))
        )
          try {
            this.swipeToLevel(swipe.level);
          } catch (error) {
            throw new Error(`swipe panel on tool request | ${error.message}`);
          }
        else this.emitOffsetValue();
      },
      deep: true,
    },
    currentLevel(lvl) {
      if (lvl !== "min") this.blink = false;
    },
  },
  mounted() {
    if ("virtualKeyboard" in navigator) {
      navigator.virtualKeyboard.overlaysContent = true;
    }
    this.isInitiallyPortrait = window.innerHeight > window.innerWidth;
    this.initialHeight = window.innerHeight;
    this.setSwipePanel();

    this.$nextTick(() => {
      //Start Swipe
      this.$refs.panel.addEventListener(
        this.events[this.deviceType].down,
        this.handleDownEvent
      );
      //Mousemove / touchmove
      this.$refs.panel.addEventListener(
        this.events[this.deviceType].move,
        this.handleMoveEvent
      );
      //Stop Drawing
      this.$refs.panel.addEventListener(
        this.events[this.deviceType].up,
        this.handleSwipe
      );

      this.$refs.panel.addEventListener("mouseleave", this.handleSwipe);

      window.addEventListener("resize", this.setSwipePanel);
      this.observer = createObserver(
        this.$refs.panelContent,
        this.handleContentChange
      );
    });
  },
  beforeUnmount() {
    this.$refs.panel.removeEventListener(
      this.events[this.deviceType].down,
      this.handleDownEvent
    );
    this.$refs.panel.removeEventListener(
      this.events[this.deviceType].move,
      this.handleMoveEvent
    );
    this.$refs.panel.removeEventListener(
      this.events[this.deviceType].up,
      this.handleSwipe
    );
    this.$refs.panel.removeEventListener("mouseleave", this.handleSwipe);
    window.removeEventListener("resize", this.setSwipePanel);
    this.observer.disconnect();
  },
  methods: {
    setSwipePanel() {
      this.panelHeight = this.$refs.panel.offsetHeight;
      this.panelHeaderHeight = this.$refs.panelHeader.offsetHeight;
      const isPortrait = window.innerHeight > window.innerWidth;
      this.createLevels();
      this.isTouchDevice();

      this.$nextTick(() => {
        console.log(window.visualViewport.height, this.initialHeight);
        console.log(this.isInitiallyPortrait, isPortrait);
        if (
          window.visualViewport.height < this.initialHeight &&
          this.isInitiallyPortrait === isPortrait
        ) {
          this.blockSwipe = true;
        } else {
          this.blockSwipe = false;
        }
        try {
          if (this.blockSwipe) {
            this.swipeToLevel("max");
          } else {
            this.isMobile ? this.swipeToLevel("mid") : this.swipeToLevel("max");
          }
          this.isInitiallyPortrait = isPortrait;
        } catch (error) {
          throw new Error(`swipe panel on mounted | ${error.message}`);
        }
      });
    },
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
      this.levels = [];
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
      try {
        let value = this.translationY;
        if (this.translationY < 0) value = 0;
        if (this.translationY > this.levels[this.levels.length - 1].value)
          value = this.levels[this.levels.length - 1].value;
        if (!this.$refs.panel) throw new Error("this.$refs.panel is null");
        this.$refs.panel.style.webkitTransform = `translateY(${value}px)`;
        this.$refs.panel.style.MozTransform = `translateY(${value}px)`;
        this.$refs.panel.style.msTransform = `translateY(${value}px)`;
        this.$refs.panel.style.transform = `translateY(${value}px)`;
      } catch (error) {
        throw new Error(`transforming this.$refs.panel | ${error.message}`, {
          cause: error,
        });
      }
    },
    handleSwipe(e) {
      if (this.blockSwipe) return;
      let diffY = this.mouseY - this.initialY;
      if (!diffY) return;
      const testValue = diffY + this.absoluteTranslationY;
      const lvl = this.findLevel(testValue, this.direction);
      if (!lvl) return;
      this.isSwiped = false;
      try {
        if (!this.$refs.panelContent)
          throw new Error("this.$refs.panelContent is null");
        if (this.direction === "down" && this.$refs.panelContent.scrollTop > 0)
          return;
        this.currentLevel = lvl.name;
        this.translationY = lvl.value;
        this.transform();
        this.absoluteTranslationY = this.translationY;
        this.emitOffsetValue();
      } catch (error) {
        throw new Error(
          `event type: ${e.type} | handle swipe ${this.direction} to ${lvl.name} | ${error.message}`
        );
      }
    },
    handleDownEvent(e) {
      if (this.blockSwipe) return;
      this.isSwiped = true;
      //Get X and Y Position
      this.getXY(e);
      this.initialX = this.mouseX;
      this.initialY = this.mouseY;
    },
    handleMoveEvent(e) {
      if (this.blockSwipe) return;
      if (!this.isTouchDevice()) {
        e.preventDefault();
      }
      if (this.isSwiped) {
        this.getXY(e);
        let diffX = this.mouseX - this.initialX;
        let diffY = this.mouseY - this.initialY;
        try {
          if (Math.abs(diffY) > Math.abs(diffX)) {
            this.direction = diffY > 0 ? "down" : "up";
            if (!this.$refs.panelContent)
              throw new Error("this.$refs.panelContent is null");
            if (
              this.direction === "down" &&
              this.$refs.panelContent.scrollTop > 0
            )
              return;

            this.$refs.panel.classList.remove("transition");
            this.translationY = diffY + this.absoluteTranslationY;
            this.transform();
          }
        } catch (error) {
          throw new Error(
            `event type: ${e.type} |
              handle move event:
              mouseX: ${this.mouseX},
              mouseY: ${this.mouseY},
              initialX: ${this.initialX},
              initialY: ${this.initialY} |
              ${error.message}`
          );
        }
      }
    },
    minimize() {
      try {
        this.swipeToLevel("min");
      } catch (error) {
        throw new Error(`swipe panel on min click | ${error.message}`);
      }
    },
    maximize() {
      try {
        this.isMobile ? this.swipeToLevel("mid") : this.swipeToLevel("max");
      } catch (error) {
        throw new Error(`swipe panel on max click | ${error.message}`);
      }
    },
    swipeToLevel(level) {
      try {
        const lvl = this.levels.find((item) => item.name === level);
        if (!lvl) return;
        this.currentLevel = lvl.name;
        this.translationY = lvl.value;
        this.transform();
        this.absoluteTranslationY = this.translationY;
        this.emitOffsetValue();
      } catch (error) {
        throw new Error(`swipe to level ${level} | ${error.message}`);
      }
    },
    emitOffsetValue() {
      const value =
        window.innerHeight -
        this.levels.find((item) => item.name === this.currentLevel).value;
      this.$emit("change-level", value);
    },
    close() {
      this.$emit("close");
    },
    handleContentChange() {
      if (this.currentLevel === "min") this.blink = true;
    },
  },
};
</script>
