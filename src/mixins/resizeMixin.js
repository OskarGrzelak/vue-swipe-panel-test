const resizeMixin = {
  data() {
    return {
      bp: "",
    };
  },
  computed: {
    isMobile() {
      return this.bp === "sm" || this.bp === "md";
    },
  },
  mounted() {
    this.setCurrBreakPoint();
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  unmounted() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      this.setCurrBreakPoint();
    },
    setCurrBreakPoint() {
      const windowWidth = window.innerWidth;
      switch (true) {
        case windowWidth < 640:
          this.bp = "sm";
          break;
        case windowWidth < 768:
          this.bp = "md";
          break;
        case windowWidth < 1024:
          this.bp = "lg";
          break;
        case windowWidth < 1280:
          this.bp = "xl";
          break;
        default:
          this.bp = "2xl";
      }
    },
  },
};

export default resizeMixin;
