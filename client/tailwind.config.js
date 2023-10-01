const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.js',
        './src/pages/**/*.js',
        './src/styles/**/*.css',
    ],
    darkMode: 'media',
    theme: {
        extend: {
            fontSize: {
                md: '1.1rem',
                xxs: '.6rem',
            },
            backgroundImage: {
                'purple-pattern':
                    'linear-gradient(270deg, #6b3ed9 70%, #7443f7 30%)',
                'red-pattern':
                    'linear-gradient(140deg, #fe5556 70%, #ee3838 30%)',
                'pink-pattern':
                    'linear-gradient(140deg, #b4006d 50%, #da0783 50%)',
                'blue-pattern':
                    'linear-gradient(90deg, #66d2ff 20%, #37b2d1 20%, #37b2d1 80%, #66d2ff 80%)',
                'blue-pattern-flat':
                    'linear-gradient(140deg, #66d2ff 70%, #37b2d1 30%)',
                'yellow-pattern':
                    'linear-gradient(140deg, #fddc08 70%, #f7d40a 30%)',
                'green-pattern':
                    'linear-gradient(140deg, #08fd81 70%, #20cd75 30%)',
                'gray-pattern':
                    'linear-gradient(140deg, #303030 70%, #222222 30%)',
                'white-pattern':
                    'linear-gradient(140deg, #ffffff 70%, #f9f9f9 30%)',
                'white-flat-pattern':
                    'linear-gradient(145deg, #ffffff 95%, #f9f9f9 5%)',
            },
            fontFamily: {
                sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'quizzerie-blue': '#41b7c3',
                'quizzerie-blue-dark': '#00A4BA',
                'quizzerie-red': '#F1684D',
                'quizzerie-yellow': '#FAB848',
                'quizzerie-green': '#93CC86',
                'quizzerie-gray': '#6C6665',
            },
        },
    },
    variants: {
        extend: {
            opacity: ['disabled'],
        },
    },
    plugins: [require('@tailwindcss/forms')],
}
