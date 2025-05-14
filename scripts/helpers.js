export class Helpers {
    constructor() {
        this.status = {
            all: 'all',
            active: 'active',
            completed: 'completed',
        };
    }

    renderMap(array, callback) {
        return array.map(callback).join('');
    }
}
