function generateShotInfo() {
    let HTMLContent = ''
    const row1 = cupheadShots.slice(0, 4)
    const row2 = cupheadShots.slice(4, 9)
    // HTMLContent += shotRow(row1)
    // HTMLContent += shotRow(row2)
    // function shotRow(shots) {
    //     let HTMLContent = ''
    //     HTMLContent += `<div class='container' style='gap:10px'>`;
    //     shots.forEach(shot => {
    //         HTMLContent += `<div class='grow ${shot == globalShot ? 'grayedOut' : ''}' onclick="selectShot('${shot}')">${cupheadShot(shot, 42)}</div>`
    //     })
    //     HTMLContent += `</div>`
    //     return HTMLContent
    // }
    // HTMLContent += `<div class='button banner' style='margin:0 auto;margin-bottom:20px;width:50px' onclick="selectShot()">All</div>`
    if (globalShot) {
        HTMLContent += `<div class='container'><div class='border'>${shotDetails(globalShot)}</div></div>`
    } else {
        HTMLContent += `<div class='container'><div class='border'>`;
        [...row1, ...row2].forEach((shot, index) => {
            HTMLContent += shotDetails(shot, index)
        })
        HTMLContent += `</div></div>
        <div class='container dim' style='font-size:80%;margin-top:20px;width:650px'>
        *Crackshot EX:
        <br>-The 5th and 6th turret shots are fired simulataneously as 2 overlapping bullets.
        <br>-Parrying the turret will launch it to a target for 14 damage.
        <br>-If an enemy collides with the turret, it will deal 12 damage.
        <br>-Letting the turret fire 4 times and then parrying it will result in a grand total of 28 damage.
        </div>`
    }
    function shotDetails(shot, index) {
        let HTMLContent = ''
        HTMLContent += `
        <div class='container ${getRowColor(index + 1)}' style='padding:10px;width:900px;margin:0 auto'>
            <div style='width:80px'>
                <div style='font-size:110%;margin-right:10px'>${shot.dps}</div>
                <div class='dim' style='font-size:80%'>DPS</div>
            </div>
            <div style='width:330px'>
                <div class='container' style='justify-content:left;gap:10px'>
                    <div style='margin-top:5px'>${cupheadShot(shot.name.toLowerCase(), 48)}</div>
                    <div>
                        <div class='font2' style='font-size:150%;margin-top:3px'>${shot.name}</div>
                        <div class='font2 dim' style='font-size:100%;margin-top:3px'>${shot.subtitle}</div>
                    </div>
                </div>
                <div class='dim' style='font-size:90%;margin-top:10px'>${shot.description}</div>
            </div>
            <div class='container' style='width:200px;margin:0'>
                <div style='width:200px'>
                    <img src='images/shot/${shot.name.toLowerCase()}.png' style='height:35px'>
                    <div>${shot.damage}
                        <span class='dim' style='font-size:80%'> per bullet</span>
                        ${shot.num ? ' x ' + shot.num : ''}
                        <br><span class='dim' style='font-size:80%'>every</span> ${shot.rate} <span class='dim' style='font-size:80%'>frames</span>
                    </div>
                </div>
                ${shot.name == 'CHARGE' ? `
                <div><img src='images/shot/charge2.png' style='height:52px'></img>
                46 <span class='dim' style='font-size:80%'> per bullet</span>
                </div>` : ''}
            </div>
            <div style='width:100px'>
                <div class='container' style='margin-bottom:10px'>
                <img src='images/shot/ex/${shot.name.toLowerCase()}.png' style='height:${['CHARGE', 'CONVERGE'].includes(shot.name) ? 80 : 44}px'></img>
                </div>
                <div class='container'>
                    <div style='font-size:80%'>${shot.exnum ? shot.ex : ''}
                        ${shot.exnum ? ' x ' + shot.exnum : ''}
                        ${shot.exnum ? `<span class="dim"> ${shot.exticks ? 'ticks' : 'bullets'}</span>` : ''}
                        <br>
                    </div>
                </div>
            </div>
            <div style='width:50px;margin-left:25px'>
                <div style='font-size:110%'>${shot.extotal ? shot.extotal : shot.ex}</div>
                <div class='dim' style='font-size:80%'>EX</div>
            </div>
        </div>`
        return HTMLContent
    }
    document.getElementById('content').innerHTML = HTMLContent
}
// function selectShot(shot) {
//     globalShot = shot
//     playSound('move')
//     action()
// }