// Define a dictionary for translations
const translations = {
    en: {
        'promo-text': 'Welcome to our store!',
        'home-link': 'Home',
        'catalog-link': 'Catalog',
        'mechanical-link': 'Mechanical Watches',
        'quartz-link': 'Quartz Watches',
        'waterproof-link': 'Waterproof Watches',
        'wholesale-link': 'Wholesale',
    },
    pl: {
        'promo-text': 'Witamy w naszym sklepie!',
        'home-link': 'Strona główna',
        'catalog-link': 'Katalog',
        'mechanical-link': 'Zegarki mechaniczne',
        'quartz-link': 'Zegarki kwarcowe',
        'waterproof-link': 'Wodoodporne zegarki',
        'wholesale-link': 'Hurtownia',
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const languageCheckbox = document.getElementById('language-checkbox');

    languageCheckbox.addEventListener('change', () => {
        const selectedLanguage = languageCheckbox.checked ? 'en' : 'pl'; // Determine the language

        const elementsToTranslate = [
            'promo-text',
            'home-link',
            'catalog-link',
            'mechanical-link',
            'quartz-link',
            'waterproof-link',
            'wholesale-link',
            // Add more elements as needed
        ];

        elementsToTranslate.forEach(elementId => {
            const element = document.getElementById(elementId);
            // Get the translated text from the dictionary
            if (translations[selectedLanguage] && translations[selectedLanguage][elementId]) {
                element.textContent = translations[selectedLanguage][elementId];
            }
        });
    });
});
