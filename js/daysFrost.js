class DaysFrostRenderer {
    /**
     * Demonstrating Component Cell Renderer
     */
    constructor() {
        this.eGui = document.createElement('span');
    }

    init(params) {
        this.rendererImage = params.rendererImage;
        this.value = params.value;
        this.updateImages();
    }

    updateImages() {
        const daysFrost = isNaN(this.value) ? 0 : this.value;
        const imageElement = document.createElement('span');
        imageElement.innerHTML = daysFrost + 1;
        this.eGui.appendChild(imageElement);
    }

    getGui() {
        return this.eGui;
    }

    refresh(params) {
        this.value = params.value;
        this.eGui.innerHTML = '';
        this.updateImages();
        return true;
    }
}