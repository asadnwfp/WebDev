class TestRenderer {
    constructor() {
            this.eGui = document.createElement('span');
        }
        // Creating Tree Collapse and Uncollapse Arrows.
    init(params) {
        this.value = params.value;
        this.updateValue();
    }

    updateValue() {
        const imageElement = document.createElement('span');
        imageElement.innerHTML = this.value + 1;
        this.eGui.appendChild(imageElement);
    }

    getGui() {
        this.consoleMessage('TreeCellRenderer : getGui()')
        return this.eGui;
    }
    refresh(params) {
        this.consoleMessage('TreeCellRenderer : refresh()', true)
            // set value into cell again
        this.value = params.value;
        this.eGui.innerHTML = '';
        // this.updateValue();
        this.eGui.innerHTML = this.value;
        return true;
    }


    consoleMessage(message, debug = false) {
        if (debug) {
            console.log(message);
        }
    }

}