/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  purge: ['./**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Space Grotesk', 'Helvetica', 'Arial', 'sans-serif'],
      },
      backgroundColor: {
        'backgroundColor': '#FCF7E6',
        'emailBtn': '#ED5E21',
      },
      spacing: {
        '120': '120px',
        '148': '148px',
        '300': '300px',
        '402': '402px',
        '518': '518px',
        '635': '635px',

        '(-48)': '-48px',
      },
      screens: {
        'xsm': '340px',
      },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('postcss-purgecss')({
      content: ['./**/*.html', './src/**/*.js'],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    }),
    require('cssnano')({
      preset: 'default',
    }),
  ],
}

