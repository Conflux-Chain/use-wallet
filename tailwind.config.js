module.exports = {
    darkMode: 'class',
    content: ['./index.html', './docs/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            width: {
                22: '5.5rem',
                18: '4.5rem'
            },
            colors: {
                bg: 'var(--color-bg)',
                primary: 'var(--color-primary)',
                primarytrans: 'var(--color-primary-trans)',
                text1: 'var(--color-text-primary)',
                text2: 'var(--color-text-secondary)',
                metamask: 'var(--color-metamask)',
                metamasktrans: 'var(--color-metamask-trans)',
            },
            transitionProperty: {
                'allcolors': 'color, border-color, background-color',
            }
        },
    },
    plugins: [],
};
