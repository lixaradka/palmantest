(function () {
    document.addEventListener('DOMContentLoaded', function () {
        const searchInput = document.getElementById('search-input');
        const cards = document.querySelectorAll('.card');
        const filters = document.querySelectorAll('.ui-checkbox');

        const urlParams = new URLSearchParams(window.location.search);
        const filterParam = urlParams.get('filter'); // Получаем фильтр из URL

        function filterCards() {
            const query = searchInput.value.toLowerCase();
            const activeFilters = Array.from(filters)
                .filter(filter => filter.checked)
                .map(filter => filter.nextElementSibling.textContent.toLowerCase());

            // Сохраняем текущие состояния фильтров в localStorage
            const filterStates = {};
            filters.forEach(filter => {
                filterStates[filter.id] = filter.checked;
            });
            localStorage.setItem('filterStates', JSON.stringify(filterStates));

            cards.forEach(card => {
                const title = card.querySelector('.card-title').textContent.toLowerCase();
                const description = card.querySelector('.card-description').textContent.toLowerCase();
                const categories = card.getAttribute('data-category').toLowerCase().split(' ');

                const matchesSearch = title.includes(query) || description.includes(query);
                const matchesFilter = activeFilters.every(filter => categories.includes(filter));

                card.style.display = matchesSearch && matchesFilter ? 'block' : 'none';
            });
        }

        // Восстанавливаем состояния из localStorage
        const savedFilterStates = JSON.parse(localStorage.getItem('filterStates')) || {};

        // Применяем состояния фильтров
        filters.forEach(filter => {
            if (savedFilterStates[filter.id] !== undefined) {
                filter.checked = savedFilterStates[filter.id];
            }
        });

        // Применяем filterParam только если localStorage пуст
        if (Object.keys(savedFilterStates).length === 0 && filterParam) {
            filters.forEach(filter => {
                filter.checked = filter.id === `${filterParam}-checkbox`;
            });
        } 

        // Применяем фильтры после настройки
        filterCards();

        searchInput.addEventListener('input', filterCards);
        filters.forEach(filter => filter.addEventListener('change', filterCards));

        cards.forEach(card => {
            card.addEventListener('click', function() {
                const cardId = card.getAttribute('data-id'); // Получаем data-id
                if (cardId) { // Проверяем, есть ли значение
                    window.location.href = `product.html?id=${encodeURIComponent(cardId)}`;
                } else {
                    console.error('Card ID not found!');
                }
            });
        });
        

        // Отладка
        console.log('URL filterParam:', filterParam);
        console.log('Saved filter states:', savedFilterStates);
    });
})();
