class TreeCellRenderer {
    constructor() {

        }
        // Creating Tree Collapse and Uncollapse Arrows.
    init(params) {
        // create the cell
        this.eGui = document.createElement('div');
        var treeClosed =
            '<img border="0" width="30" height="30" class="tree-arrow" src="../assets/images/tree-closed.svg">';
        var treeOpen =
            '<img border="0" width="30" height="30"   class="tree-arrow" src="../assets/images/tree-open.svg">';
        if (params.data.hasTree) {
            if (params.data.treeOpenState) {
                // this.eGui.innerHTML = '<span class="tree" style="cursor: default;">' + treeOpen + ' </span>'
                this.eGui.innerHTML = treeOpen
            } else {
                this.eGui.innerHTML = treeClosed
            }
        }

        // GetRefrence To the Element
        this.eButton = this.eGui.querySelector('.tree-arrow');

        // set the Value into Cell
        this.cellValue = this.getValueToDisplay(this.eGui.innerHTML);
        // this.eButton.innerHTML = this.cellValue;

        this.eventListener = () => {
            console.log("EventListener : Button")
            if (params.data.treeOpenState) {
                params.data.treeOpenState = false;
                params.valueFormatted = treeClosed;
            } else {
                params.data.treeOpenState = true;
                params.valueFormatted = treeOpen;
            }
            params.refreshCell(params)

        }
        if (this.eButton != null) {
            this.eButton.addEventListener('click', this.eventListener);
        }

    }

    getGui() {
        return this.eGui;
    }

    // gets called whenever the cell refreshes
    refresh(params) {
        // set value into cell again
        this.eButton = this.getValueToDisplay(params);


        // return true to tell the grid we refreshed successfully
        return true;
    }

    // gets called when the cell is removed from the grid
    destroy() {
        // do cleanup, remove event listener from button
        if (this.eButton) {
            // check that the button element exists as destroy() can be called before getGui()
            this.eButton.removeEventListener('click', this.eventListener);
        }
    }

    getValueToDisplay(params) {
        return params.valueFormatted ? params.valueFormatted : params.value;
    }

}