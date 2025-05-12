import { TodoTemplate } from './scripts/TodoTemplate.js';

const app = document.querySelector('#app');

document.addEventListener('DOMContentLoaded', () => {
    if (!app) return;
    new TodoTemplate(app);
});
