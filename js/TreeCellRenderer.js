class TreeCellRenderer {
    constructor() {
            // this.consoleMessage('TreeCellRenderer : const')
        }
        // Creating Tree Collapse and Uncollapse Arrows.
    init(params) {
        this.consoleMessage('TreeCellRenderer : Init')
            // create the cell
        this.eGui = document.createElement('div');
        this.treeClosed =
            '<img border="0" width="30" height="30" class="tree-arrow" src="../assets/images/tree-closed.svg">';
        this.treeOpen =
            '<img border="0" width="30" height="30"   class="tree-arrow" src="../assets/images/tree-open.svg">';
        if (params.data.hasTree) {
            if (params.data.treeOpenState) {
                // this.eGui.innerHTML = '<span class="tree" style="cursor: default;">' + treeOpen + ' </span>'
                this.eGui.innerHTML = this.treeOpen
            } else {
                this.eGui.innerHTML = this.treeClosed
            }
        }

        // GetRefrence To the Element
        this.eButton = this.eGui.querySelector('.tree-arrow');
        // set the Value into Cell
        this.eButton = this.stateChangeTreeEventGui(params);
        // this.eButton.innerHTML = this.cellValue;

        this.eventListenerClick = () => {
            this.consoleMessage("EventListener : Button",true)
                // if (params.data.treeOpenState) {
                //     params.data.treeOpenState = false;
                //     params.valueFormatted = this.treeClosed;
                // } else {
                //     params.data.treeOpenState = true;
                //     params.valueFormatted = this.treeOpen;
                // }

            this.stateChangeTreeEventGui(params)
        }
        if (this.eButton != null) {
            this.eButton.addEventListener('click', this.eventListenerClick);


            // this.eButton.addEventListener('onmouseover', event => {
            //     this.stateChangeTreeEventGui(params);
            //     this.consoleMessage('mouseIn')
            // }, false)

            // this.eButton.addEventListener('onmouseout', event => {
            //     params.data.treeOpenState = false
            //     this.stateChangeTreeEventGui(params);
            //     this.consoleMessage('mouseOut')
            // }, false)
        }

    }

    stateChangeTreeEventGui(params) {
        if (params.data.hasTree) {
            if (params.data.treeOpenState) {
                // this.eGui.innerHTML = '<span class="tree" style="cursor: default;">' + treeOpen + ' </span>'
                this.eGui.innerHTML = this.treeOpen
                params.data.treeOpenState = false;

            } else {
                this.eGui.innerHTML = this.treeClosed
                params.data.treeOpenState = true;
            }
        }
        return this.eGui.querySelector('.tree-arrow');

    }

    getGui() {
        this.consoleMessage('TreeCellRenderer : getGui()')
        return this.eGui;
    }

    // gets called whenever the cell refreshes
    refresh(params) {
        this.consoleMessage('TreeCellRenderer : refresh()', true)
            // set value into cell again
        this.eButton = this.stateChangeTreeEventGui(params);
        // return true to tell the grid we refreshed successfully
        return false;
    }

    // gets called when the cell is removed from the grid
    destroy() {
        this.consoleMessage('TreeCellRenderer : destroy()', true)
            // do cleanup, remove event listener from button
        if (this.eButton) {
            // check that the button element exists as destroy() can be called before getGui()
            this.eButton.removeEventListener('click', this.eventListener);

        }
    }

    getValueToDisplay(params) {
        return params.valueFormatted ? params.valueFormatted : params.value;
    }

    consoleMessage(message,debug=false){
        if(debug){
            console.log(message);
        }
    }

}