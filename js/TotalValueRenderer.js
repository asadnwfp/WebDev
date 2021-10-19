class TotalValueRenderer {
    // gets called once before the renderer is used
    constructor() {
        this.eGui = document.createElement('span');
    }
    init(params) {
        // create the cell
        this.treeOpen = params.treeOpen;
        this.treeClose = params.treeClose;
        this.value = params.value;
        this.treeState = params.data.treeOpenState;
        // this.onClick() = params.onClick
        // get references to the elements we want
        this.updateImage();
        this.eButton = this.eGui;

        this.eventListener = () => {
            // alert(`medals won!`)
            if (this.state) {
                this.state = false;
                this.updateImage()
            } else {
                this.state = true;
                this.updateImage()
            }
            this.consoleMessage("Clickd.", true);

        };
        // this.eButton.addEventListener('click', this.eventListener);
        this.eButton.addEventListener('click', this.onClickEventListner());
    }

    getGui() {
        let x = this.eGui;
        return this.eGui;
    }

    updateImage() {
        const imageElement = document.createElement('img');
        imageElement.src = this.state ?
            '../assets/images/' + this.treeClose :
            '../assets/images/' + this.treeOpen;

        imageElement.className = "tree-arrow";
        imageElement.width = '30';
        imageElement.height = '30';
        this.eGui.innerHTML = '';
        this.eGui.appendChild(imageElement);
    }

    // gets called whenever the cell refreshes
    refresh(params) {
        console.log("totalRefresh");
        this.value += params.value;
        // return true to tell the grid we refreshed successfully
        this.state = params.data.treeOpenState;
        this.eGui.innerHTML = '';
        this.updateImages();
        return true;
    }

    // gets called when the cell is removed from the grid
    destroy() {
        // do cleanup, remove event listener from button
        if (this.eButton) {
            // check that the button element exists as destroy() can be called before getGui()
            this.eButton.removeEventListener('click', this.onClickEventListner);
        }
    }

    onClickEventListner() {
        // alert(`medals won!`)
        if (this.state) {
            this.state = false;
            this.updateImage()
        } else {
            this.state = true;
            this.updateImage()
        }
        this.consoleMessage("Clickd.", true);
    }

    onClick(e) {
        // if (this.params.onClick instanceof Function) {
        //     // put anything into params u want pass into parents component
        //     const params = {
        //         event: $event,
        //         rowData: this.params.node.data
        //             // ...something
        //     }
        //     this.params.onClick(params);

        //     this.consoleMessage("X is inside Onclick", true);
        // }
        let field = gridOptions.columnDefs.field;

        this.consoleMessage("X is outside Onclick", true);

    }

    consoleMessage(message, debug = false) {
        if (debug) {
            console.log(message);
        }
    }

}