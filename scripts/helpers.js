class CreateElement {
    constructor() {
        this.element = null;
    }

    createElemTag(elemTag) {
        if (!elemTag) return;
        return (this.element = document.createElement(elemTag));
    }

    createElemClass(elemClass) {
        if (!elemClass || !this.element) return;
        const parser = new Parsers();
        const parsedElemClass = parser.classParser(elemClass);
        console.log(parsedElemClass);
        return (this.element.className = parsedElemClass);
    }

    createElemContent(elemContent) {
        if (!elemContent || !this.element) return;
        return (this.element.innerHTML = elemContent);
    }

    createElemAttribute(elemAttribute) {
        if (!elemAttribute || !this.element) return;
        const parser = new Parsers();
        const parsedElemAttribute = parser.attributeParser(elemAttribute);
        parsedElemAttribute.forEach((elem) => {
            return this.element.setAttribute(elem.key, elem.value);
        });
    }

    render(elemTag, elemClass, elemContent, elemAttribute) {
        this.createElemTag(elemTag);
        this.createElemClass(elemClass);
        this.createElemContent(elemContent);
        this.createElemAttribute(elemAttribute);
        return this.element;
    }
}

class Parsers {
    classParser(string) {
        return string.split(' ').join(' ');
    }

    attributeParser(array) {
        return array.map((item) => {
            const elem = item.split(':');
            return { key: elem[0], value: elem[1] };
        });
    }
}
