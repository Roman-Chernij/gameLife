window.addEventListener( "DOMContentLoaded", function() {
    new Life({
        id: '#root',
        grid: 50,
        timeout: 1000,
        start: true
    });
});



class Life {
    constructor(settings) {

        const { id, grid, timeout, start } = settings;



        this._alive = start;
        this._timeout = timeout;
        this._grid = grid;
        this._container = document.querySelector(id);

        this._hideGrid = {};

        this.grid()

    }

    grid() {

        let holder = document.createElement('div');
            // gridNumber = this._grid * this._grid;

            holder.setAttribute('class', 'holder');

        const sizeElem = sizeElemFunc(this._container, this._grid);

        function sizeElemFunc (cont, grid) {
            let sizeContainer = parseInt(cont.clientWidth);
            return sizeContainer / grid;
        }

            for (let r = 0; r <=  this._grid; r++) {
                let row = document.createElement('div');
                row.setAttribute('class', 'holder__row');
                for(let c = 0; c <=  this._grid; c++) {
                    let elem = document.createElement('div');

                    elem.setAttribute('class', 'holder__item');

                    this._hideGrid[`${r} ${c}`] = {row: r, col: c}

                    elem.setAttribute('data-coordinates', `${r} ${c}`);

                    elem.style.cssText += `width: ${sizeElem}px; height: ${sizeElem}px;`

                    row.appendChild(elem)
                }

                holder.appendChild(row)
            }

            this._container.appendChild(holder);
            this.randomAlive();
            this.neighbors (this._hideGrid)
    }


    randomAlive () {

        for (let i = 0 ; i <= this._grid; i++) {

            for (let q = 0 ; q <= this._grid; q++) {
                this._hideGrid[`${i} ${q}`].alive =  Math.random() < .5;
            }
        }

        this.render (this._hideGrid)
    }

    lifeReview () {



    }

    neighbors (obj) {


        for (let key in obj) {

            let { row, col } = obj[key]



            if(!obj[key].neighbors) {
                let $row00 = (row - 1) < 0 ? this._grid: row - 1,
                    $row01 = (row - 1) < 0 ? this._grid: row - 1,
                    $row02 = (row - 1) < 0 ? this._grid: row - 1,
                    $col00 = (col - 1) < 0 ? this._grid: col - 1,
                    $col01 = col - 1,
                    $col02 = (col + 2) > this._grid ? 0: col + 2;

                obj[key].neighbors = [
                    [`${$row00} ${$col00}`, `${$row01} ${col}`, `${$row02} ${$col02}`],
                    [`${row} ${$col00}`, `${row} ${col}`, `${row} ${$col02}`]
                ]
            }


        }
    }

    render (arr) {

        for (let key in arr) {


            if (arr[key].alive && arr[key].alive === true) {
                let elem = this._container.querySelector(`div[data-coordinates="${key}"]`);

                 elem.classList.add('active');
            }
        }
        console.log(arr);
    }
}
