module.exports = {
  purge: {
    content: ['./pages/**/*.tsx', './components/**/*.tsx'],
    options: {
      keyframes: true,
    },
  },
  corePlugins: {
    float: false,
    clear: false,
    skew: false,
  },
  darkMode: 'media',
  variants: {
    transitionProperty: ['responsive', 'motion-safe', 'motion-reduce'],
    animation: ['responsive', 'motion-safe', 'motion-reduce'],
    borderWidth: ['responsive', 'hover', 'focus'],
    extend: {
      padding: ['hover'],
      backgroundImage: ['hover'],
      fontSize: ['group-hover'],
      backgroundColor: ['disabled', 'active'],
      cursor: ['disabled'],
    },
  },
  plugins: [],
};
