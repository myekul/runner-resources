function generateHP() {
    if (document.getElementById('bossSelect').children.length == 0) generateBossSelect()
    const boss = bossArray[globalBossIndex]
    let HTMLContent = ''
    if (boss) HTMLContent += parseHP(boss)
    document.getElementById('content').innerHTML = HTMLContent
}
function parseHP(boss) {
    let HTMLContent = ''
    const bossHP = hp[boss.id]
    if (bossHP) {
        HTMLContent += `<div class='container' style='margin:15px 0'>`;
        difficulties.forEach((difficulty, index) => {
            if (!(index == 0 && !bossHP[0].hp[0])) {
                HTMLContent += `<button class='button ${index == globalDifficulty ? 'selected' : difficulty.toLowerCase()}' style='width:80px' onclick="globalDifficulty=${index};playSound('move');action()">${difficulty}</button>`
            } else if (globalDifficulty == 0) {
                globalDifficulty = 1
            }
        })
        HTMLContent += `</div>`
        bossHP.totalHP = 0
        bossHP.forEach(phase => {
            phase.phaseHP = 0
            if (phase.hp[globalDifficulty]?.hp) {
                phase.hp.forEach(subPhase => {
                    bossHP.totalHP += subPhase.hp[globalDifficulty]
                    phase.phaseHP += subPhase.hp[globalDifficulty]
                })
            } else {
                bossHP.totalHP += phase.hp[globalDifficulty]
                phase.phaseHP = phase.hp[globalDifficulty]
            }
        })
        HTMLContent += `<table id='bossCard' class='background1' style='border:3px solid var(--banner);border-radius:5px;margin:0 auto'>`
        const difficulty = difficulties[globalDifficulty]
        HTMLContent += `<tr><td colspan=2 class='${difficulty.toLowerCase()}' style='text-align:center;padding:5px'>${difficulty.toUpperCase()}</td></tr>`
        bossHP.forEach((phase, index) => {
            if (phase.phaseHP) {
                HTMLContent += `
            <tr>
                <td colspan=2 style='width:150px'>
                ${bossPhaseHeader(boss, phase.id, phase.name)}
                </td>
            </tr>`
                HTMLContent += `<tr class='background2' style='font-size:80%'>`
                let sum = 0
                bossHP.forEach((phase, index2) => {
                    if (index <= index2) sum += phase.phaseHP
                })
                HTMLContent += `<td>${sum} / <span style='font-size:70%'>${bossHP.totalHP}</span></td>`
                HTMLContent += `<td style='text-align:right;font-size:110%'>${phase.phaseHP} HP</td>`
                HTMLContent += `</tr>`
                HTMLContent += `<tr><td colspan=2>
            <div class='container'>`
                for (let i = bossHP.length - 1; i >= 0; i--) {
                    const phase2 = bossHP[i]
                    if (phase2.phaseHP) {
                        let color = 'salmon'
                        if (index == i) color = 'lightpink'
                        if (i < index) color = 'var(--background1)'
                        HTMLContent += `<div style='height:16px;width:${phase2.phaseHP / bossHP.totalHP * 100}%;border-right:2px solid var(--background1);background-color:${color}'></div>`
                    }
                }
                HTMLContent += `</div>
            </td></tr>`
                if (phase.hp[globalDifficulty]?.hp) {
                    phase.hp.forEach((subPhase, subindex) => {
                        HTMLContent += `
                            <tr class='${getRowColor(subindex)}'>
                                <td style='font-size:80%'>${subPhase.name}</td>
                                <td>${subPhase.hp[globalDifficulty] || '-'}</td>
                            </tr>`
                    })
                }
            }
        })
        HTMLContent += `</table>`
        HTMLContent += `</div>`
    }
    return HTMLContent
}