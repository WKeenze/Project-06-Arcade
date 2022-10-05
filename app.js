const table = document.getElementsByTagName('table')[0]

function makeRow (){
    const row = document.createElement('tr');
    for (let i = 0; i < 7; i++){
        const td = document.createElement('td');
        row.appendChild(td)
    }
        table.appendChild(row)
    
    }

    makeRow()
    makeRow()
    makeRow()
    makeRow()
    makeRow()
    makeRow()

// let column = makeRow()

// function gameboard(){
   
//     for(let i = 0; i <= 6; i++){
//         return column
//     }
    
// }

table.addEventListener('click', colorize)

function colorize(event){
    const target = event.target
    if(target.className.length){
        target.className = ''
    } else {
        target.className = 'color1'
    }
}
