class TotalValueRenderer {
    // gets called once before the renderer is used
    constructor() {
        this.eGui = document.createElement('span');
    }
    init(params) {
        // create the cell
        this.treeOpen = params.treeOpen;
        this.treeClose = params.treeClose;
        // get references to the elements we want
        this.eButton = this.updateImage(params.data.treeOpenState);

        this.eventListener = () => {
            // alert(`medals won!`)
            if (params.data.treeOpenState) {
                params.data.treeOpenState = false;
                this.updateImage(false)
            } else {
                params.data.treeOpenState = true;
                this.updateImage(true)
            }

            let x = this.eGui;
            let y = 123;


        };
        this.eButton.addEventListener('click', this.eventListener);
    }

    getGui() {
        return this.eGui;
    }

    updateImage(state) {
        const imageElement = document.createElement('img');
        imageElement.src = state ?
            '../assets/images/' + this.treeClose :
            '../assets/images/' + this.treeOpen;
        imageElement.className = "tree-arrow";
        imageElement.width = '30';
        imageElement.height = '30';
        this.eGui.appendChild(imageElement);
        return this.eGui;
    }

    // gets called whenever the cell refreshes
    // refresh(params) {
    //     console.log("totalRefresh");
    //     // return true to tell the grid we refreshed successfully
    //     this.eGui.innerHTML = '';
    //     this.updateImages();
    //     return true;
    // }

    // gets called when the cell is removed from the grid
    // destroy() {
    //     // do cleanup, remove event listener from button
    //     if (this.eButton) {
    //         // check that the button element exists as destroy() can be called before getGui()
    //         this.eButton.removeEventListener('click', this.eventListener);
    //     }
    // }

}