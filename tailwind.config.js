const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    // Example content paths...
    "./public/**/*.html",
    "./src/**/*.{js,jsx,ts,tsx,vue}",
  ],
  theme: {
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        primary: "#1F1F83",
        "primary-light": "rgba(31,31,131, 0.25)",
        secondary: "rgb(97, 83, 206)",
        "secondary-light": "rgba(97, 83, 206, 0.9)",
        tertiary: "#FF9103",
        accent: "#3FC0F0",
        error: "#B00020",
        success: "#50C878",
        "gray-light": "#FAFAFA",
        "gray-dark": "#303030",
      },
      fontFamily: {
        sans: ["Comfortaa", "Verdana", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        "2xs": ["0.65rem", "1.2"],
        sm: ["0.875rem", "1.6"],
        base: ["1rem", "1.6"],
        xl: ["1.25rem", "1.5"],
        "3xl": ["2rem", "1.3"],
        "6xl": ["4rem", "1.2"],
      },
      backgroundImage: {
        "footer-img": "url('/img/bg-img-footer.png')",
        "gradient-1":
          "linear-gradient(to bottom right, rgb(121,106,230), rgb(126,84,166))",
        "gradient-2":
          "linear-gradient(to bottom right, rgb(121,106,230), rgb(148,30,218))",
        "gradient-3":
          "linear-gradient(to bottom right, rgb(254,166,65), rgb(255,248,58))",
      },
      boxShadow: {
        around: "0 0 4px 1px rgba(121, 106, 229, 0.5)",
        "around-max": "0 0 40px 5px rgba(121, 106, 229, 0.5)",
      },
      flex: {
        "50%": "1 1 50%",
      },
      zIndex: {
        max: "999",
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "3/4": "3 / 4",
      },
      listStyleType: {
        alpha: "lower-alpha",
      },
      keyframes: {
        "move-up": {
          "100%": { transform: "translateY(2.5rem)" },
        },
      },
      animation: {
        "move-up": "move-up 0.4s ease-out forwards",
      },
    },
  },
  plugins: [],
};
