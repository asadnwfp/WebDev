class TreeCellRenderer {
    constructor() {
            // this.consoleMessage('TreeCellRenderer : const')
        }
        // Creating Tree Collapse and Uncollapse Arrows.
    init(params) {
        this.consoleMessage('TreeCellRenderer : Init')
            // create the cell
        this.value = params.data.treeOpenState;
        this.eGui = document.createElement('div');
        this.hasTree = params.data.hasTree;
        if (this.hasTree) {
            this.eGui.innerHTML = this.treeImage();
        }

        // // GetRefrence To the Element
        // this.eButton = this.eGui.querySelector('.tree-arrow');
        // // set the Value into Cell
        // this.eButton = this.stateChangeTreeEventGui();
        // // this.eButton.innerHTML = this.cellValue;

        // this.eventListenerClick = () => {
        //     this.consoleMessage("EventListener : Button", true)
        //         // if (params.data.treeOpenState) {
        //         //     params.data.treeOpenState = false;
        //         //     params.valueFormatted = this.treeClosed;
        //         // } else {
        //         //     params.data.treeOpenState = true;
        //         //     params.valueFormatted = this.treeOpen;
        //         // }

        //     this.stateChangeTreeEventGui(params)
        // }
        // if (this.eButton != null) {
        //     this.eButton.addEventListener('click', this.eventListenerClick);


        //     // this.eButton.addEventListener('onmouseover', event => {
        //     //     this.stateChangeTreeEventGui(params);
        //     //     this.consoleMessage('mouseIn')
        //     // }, false)

        //     // this.eButton.addEventListener('onmouseout', event => {
        //     //     params.data.treeOpenState = false
        //     //     this.stateChangeTreeEventGui(params);
        //     //     this.consoleMessage('mouseOut')
        //     // }, false)
        // }

    }

    stateChangeTreeEventGui() {
        // if (params.data.hasTree) {
        //     if (params.data.treeOpenState) {
        //         // this.eGui.innerHTML = '<span class="tree" style="cursor: default;">' + treeOpen + ' </span>'
        //         this.eGui.innerHTML = this.treeOpen
        //             // params.data.treeOpenState = false;

        //     } else {
        //         this.eGui.innerHTML = this.treeClosed
        //             // params.data.treeOpenState = true;
        //     }
        // }
        return this.eGui.querySelector('.tree-arrow');

    }

    getGui() {
        this.consoleMessage('TreeCellRenderer : getGui()')
        return this.eGui;
    }

    // gets called whenever the cell refreshes
    refresh(params) {
        // set value into cell again
        this.value = params.value;
        this.hasTree = params.data.hasTree;
        this.eGui.innerHTML = this.treeImage();
        this.eButton = this.stateChangeTreeEventGui();
        // return true to tell the grid we refreshed successfully
        this.consoleMessage(`TreeCellRenderer : refresh() : treeState ${this.value}`, true)
        return true;
    }
    treeImage() {
        this.treeClosed =
            '<img  class="tree-arrow" src="../assets/images/tree-close.svg" border="0" width="30" height="30" class="tree-arrow">';
        this.treeOpen =
            '<img  class="tree-arrow" src="../assets/images/tree-open.svg" border="0" width="30" height="30" >';
        if (this.hasTree) {
            if (this.value) {
                // this.eGui.innerHTML = '<span class="tree" style="cursor: default;">' + treeOpen + ' </span>'
                return this.treeOpen
            } else {
                return this.treeClosed
            }
        }
    }

    // gets called when the cell is removed from the grid
    destroy() {
        this.consoleMessage('TreeCellRenderer : destroy()', true)
            // do cleanup, remove event listener from button
        if (this.eButton) {
            // check that the button element exists as destroy() can be called before getGui()
            // this.eButton.removeEventListener('click', this.eventListener);

        }
    }

    getValueToDisplay(params) {
        return params.valueFormatted ? params.valueFormatted : params.value;
    }

    consoleMessage(message, debug = false) {
        if (debug) {
            console.log(message);
        }
    }

}