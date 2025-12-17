// plugins/ui-plugin.js
import plugin from 'tailwindcss/plugin';

export default plugin(function ({ addComponents, addVariant, theme }) {
  // Variant: hover OR focus-visible together → `hocus:...`
  addVariant('hocus', ['&:hover', '&:focus-visible']);

  // Reusable button primitives
  addComponents({
    '.btn': {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme('spacing.2'),
      fontWeight: theme('fontWeight.semibold'),
      paddingInline: theme('spacing.4'),
      paddingBlock: theme('spacing.2'),
      borderRadius: theme('borderRadius.md'),
      backgroundColor: theme('colors.black'),
      color: theme('colors.white'),
      transitionProperty: theme('transitionProperty.colors'),
      transitionDuration: theme('transitionDuration.150'),
      userSelect: 'none',
      whiteSpace: 'nowrap',
      '&:disabled': { opacity: '.5', cursor: 'not-allowed' },
      '&:is(:hover,:focus-visible)': { backgroundColor: theme('colors.zinc.800') },
    },

    /* Variants (optional, use any naming you like) */
    '.btn--primary': {
      backgroundColor: theme('colors.zinc.900'),
      '&:is(:hover,:focus-visible)': { backgroundColor: theme('colors.zinc.800') },
    },
    '.btn--outline': {
      backgroundColor: 'transparent',
      color: theme('colors.zinc.900'),
      borderWidth: '1px',
      borderColor: theme('colors.zinc.300'),
      '&:is(:hover,:focus-visible)': {
        backgroundColor: theme('colors.zinc.50'),
      },
    },
    '.btn--ghost': {
      backgroundColor: 'transparent',
      color: theme('colors.zinc.900'),
      '&:is(:hover,:focus-visible)': { backgroundColor: theme('colors.zinc.50') },
    },

    /* Sizes (optional) */
    '.btn-sm': {
      paddingInline: theme('spacing.3'),
      paddingBlock: theme('spacing.1.5'),
      fontSize: theme('fontSize.sm')[0],
    },
    '.btn-lg': {
      paddingInline: theme('spacing.5'),
      paddingBlock: theme('spacing.2.5'),
      fontSize: theme('fontSize.base')[0],
    },
  });
});
