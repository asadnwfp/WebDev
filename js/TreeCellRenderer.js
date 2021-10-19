class TreeCellRenderer {
    constructor() {}
        // Creating Tree Collapse and Uncollapse Arrows.
    init(params) {
        this.consoleMessage('TreeCellRenderer : Init')
            // create the cell
        this.value = params.data.treeOpenState;
        this.id = params.node.id;
        this.eGui = document.createElement('div');

        this.hasTree = params.data.hasTree;
        if (this.hasTree) {
            this.eGui.innerHTML = this.treeImage();
        }

        // GetRefrence To the Element
        this.eButton = this.eGui.querySelector('.tree-arrow');


        ///////////#############################
        /////////// EButton Commit Old
        ///////////#############################
        this.eventListener = () => {
            console.log("EventListener : Button")


        }
        if (this.eButton != null) {
            this.eButton.addEventListener('click', this.treeStateChage);
        }
        ///////////#############################
        /////////// New Code
        ///////////#############################


        // // set the Value into Cell

        // if (this.eButton != null) {
        //     // this.eButton.addEventListener('click', this.treeStateChage());
        //     this.eButton.addEventListener('click', this.treeState);

        // }
        // this.treeState = () => {
        //     this.consoleMessage('TreeCellRenderer: ButtonClicked EvenListner');
        //     alert(`${this.value} medals won!`);
        // }

        ///////////#############################

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

    treeStateChage(e) {
        console.log('TreeCellRenderer: ButtonClicked EvenListner')
        let id = e.currentTarget.id;
        let rowNode = gridOptions.api.getRowNode(id)
        let data = rowNode.data;
        let typeIndent = data.typeIndent;
        let processArray = true;
        data.treeOpenState = data.treeOpenState ? false : true;
        let colId = '2'

        // rowNode.setDataValue(colId, data.treeOpenState)
        rowNode.setData(data);

        gridOptions.api.forEachNode(node => {
            let data = node.data;
            data.treeOpenState = data.treeOpenState ? false : true;
            if (node.id <= id) {
                return;
            }
            if (typeIndent == data.typeIndent) {
                processArray = false;
            }
            if (processArray)
                switch (typeIndent) {
                    case 'alpha':
                        if (data.typeIndent == 'roman' ||
                            data.typeIndent == 'cardinal') {
                            node.setDataValue(colId, data.treeOpenState)
                            node.setData(data);
                        }
                        break;
                    case 'roman':
                        if (data.typeIndent == 'cardinal') {
                            node.setDataValue(colId, data.treeOpenState)
                            node.setData(data);
                        }
                        break;



                }
        })


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
        this.id = params.node.id;
        this.eGui.innerHTML = this.treeImage();
        this.eButton = this.treeStateChage();
        // return true to tell the grid we refreshed successfully
        this.consoleMessage(`TreeCellRenderer : refresh() : treeState ${this.value}`, true)
        return true;
    }
    treeImage() {
        let imageSelector = document.createElement('img');
        imageSelector.className = "tree-arrow";
        imageSelector.id = this.id;
        imageSelector.src = this.value ?
            "../assets/images/tree-open.svg" :
            "../assets/images/tree-close.svg";
        imageSelector.width = '30';
        imageSelector.height = '30';
        this.tree = imageSelector.outerHTML;
        // this.treeClosed =
        //     '<img  class="tree-arrow" src="../assets/images/tree-close.svg" border="0" width="30" height="30" class="tree-arrow">';
        // this.treeOpen =
        //     '<img  class="tree-arrow" src="../assets/images/tree-open.svg" border="0" width="30" height="30" >';
        if (this.hasTree) {
            return this.tree;
            // if (this.value) {
            //     // this.eGui.innerHTML = '<span class="tree" style="cursor: default;">' + treeOpen + ' </span>'
            //     return this.treeOpen
            // } else {
            //     return this.treeClosed
            // }
        }
    }

    // gets called when the cell is removed from the grid
    destroy() {
        this.consoleMessage('TreeCellRenderer : destroy()', true)
            // do cleanup, remove event listener from button
        if (this.eButton) {
            // check that the button element exists as destroy() can be called before getGui()
            this.eButton.removeEventListener('click', this.treeStateChage);

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