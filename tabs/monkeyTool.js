const cardMap = {
    1: 'mdhrCrest',
    2: 'mdhrOther',
    3: 'cuphead1',
    4: 'mugman',
    5: 'diceLeft',
    6: 'diceRight',
}
const patterns = {
    16: [[1, 2, 4, 6], [6, 1, 3, 3], [5, 4, 2, 5]],
    17: [[1, 6, 3, 3], [4, 2, 1, 5], [5, 4, 6, 2]],
    25: [[4, 1, 5, 3], [1, 2, 5, 6], [3, 6, 2, 4]],
    210: [[3, 1, 4, 2], [4, 3, 5, 6], [6, 1, 2, 5]],
    39: [[4, 5, 1, 5], [6, 2, 3, 4], [1, 6, 3, 2]],
    312: [[3, 4, 1, 4], [5, 2, 5, 6], [3, 6, 2, 1]],
    49: [[2, 6, 3, 1], [3, 4, 5, 6], [1, 5, 4, 2]],
    512: [[6, 4, 3, 3], [1, 2, 4, 5], [5, 2, 6, 1]],
    69: [[2, 6, 2, 3], [3, 1, 4, 6], [1, 4, 5, 5]],
    611: [[5, 2, 2, 4], [6, 1, 5, 3], [4, 3, 1, 6]],
    79: [[5, 3, 4, 5], [2, 6, 1, 3], [1, 6, 2, 4]],
    811: [[6, 3, 5, 4], [5, 2, 6, 1], [3, 4, 1, 2]]
}
function createTable(code) {
    let HTMLContent = ''
    const pattern = patterns[code]
    if (pattern) {
        HTMLContent += `<table>`
        pattern.forEach(row => {
            HTMLContent += `<tr>`
            row.forEach(cell => {
                HTMLContent += `<td class='${cardMap[cell]}'></td>`
            })
        })
        HTMLContent += `</table>`
    } else {
        HTMLContent += `
        <table>
        <tr><td></td><td></td><td></td><td></td></tr>
        <tr><td></td><td></td><td></td><td></td></tr>
        <tr><td></td><td></td><td></td><td></td></tr>
        </table>`
    }
    document.getElementById('tableDiv').innerHTML = HTMLContent
}
async function generateMonkeyTool() {
    await setHTML('html/monkey.html', 'content')
    const buttons = document.querySelectorAll('#buttons button')
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            buttons.forEach(b => b.classList.remove('monkeyColor'))
            this.classList.add('monkeyColor')
            playSound('move')
        })
    })
    createTable()
}