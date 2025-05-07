const app = document.querySelector('#app');

const element = new CreateElement();
const renderedElement = element.render(
    'div',
    'test-class pepe-elem',
    '<img src="https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg.webp"/>',
    ['id:1234321', 'value:value']
);

console.log('renderedElement', renderedElement);
app.appendChild(renderedElement);
