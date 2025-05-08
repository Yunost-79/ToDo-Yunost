import { TodoTemplate } from './scripts/TodoTemplate.js';

const app = document.querySelector('#app');

document.addEventListener('DOMContentLoaded', () => {
    if (!app) return;
    try {
        new TodoTemplate(app);
    } catch (error) {
        console.error('Failed to initialize TodoTemplate:', error);
    }
});
