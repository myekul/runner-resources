function generateHP() {
    let HTMLContent = ''
    if (globalBossIndex == -1) {
        bossArray.forEach(boss => {
            HTMLContent += parseHP(boss)
        })
    } else {
        HTMLContent += parseHP(bossArray[globalBossIndex])
    }
    document.getElementById('content').innerHTML = HTMLContent
}
function parseHP(boss) {
    let HTMLContent = ''
    const bossHP = hp[boss.id]
    if (bossHP) {
        HTMLContent += `<div class='container' style='align-items:flex-start;gap:50px;margin-top:30px'>`
        DIFFICULTIES.forEach((difficulty, index) => {
            if (bossHP[0].hp[index]) {
                bossHP.totalHP = 0
                bossHP.forEach(phase => {
                    phase.phaseHP = 0
                    if (Array.isArray(phase.hp[0]?.hp)) {
                        phase.hp.forEach(subPhase => {
                            bossHP.totalHP += subPhase.hp[index]
                            phase.phaseHP += subPhase.hp[index]
                        })
                    } else {
                        bossHP.totalHP += phase.hp[index]
                        phase.phaseHP = phase.hp[index]
                    }
                })
                HTMLContent += `
                <div>
                    <div class='container dim'>${bossHP.totalHP}</div>
                    <table id='bossCard' class='background1' style='border:3px solid var(--banner);border-radius:5px;margin-top:10px'>
                        <tr>
                            <td colspan=2 class='${difficulty.toLowerCase()}' style='text-align:center;padding:5px'>${difficulty.toUpperCase()}</td>
                        </tr>`
                bossHP.forEach((phase, phaseIndex) => {
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
                            if (phaseIndex <= index2) sum += phase.phaseHP
                        })
                        HTMLContent += `
                            <td>${sum} / <span style='font-size:70%'>${bossHP.totalHP}</span></td>
                            <td style='text-align:right;font-size:110%'>${phase.phaseHP} HP</td>
                        </tr>
                        <tr>
                            <td colspan=2>
                                <div class='container'>`
                        for (let i = bossHP.length - 1; i >= 0; i--) {
                            const phase2 = bossHP[i]
                            if (phase2.phaseHP) {
                                let color = 'salmon'
                                if (phaseIndex == i) color = 'lightpink'
                                if (i < phaseIndex) color = 'var(--background1)'
                                HTMLContent += `<div style='height:16px;width:${phase2.phaseHP / bossHP.totalHP * 100}%;border-right:2px solid var(--background1);background-color:${color}'></div>`
                            }
                        }
                        HTMLContent += `
                                </div>
                            </td>
                        </tr>`
                        if (Array.isArray(phase.hp[0]?.hp)) {
                            phase.hp.forEach((subPhase, subindex) => {
                                HTMLContent += `
                                <tr class='${getRowColor(subindex)}' style='font-size:80%'>
                                    <td>${subPhase.name}</td>
                                    <td style='text-align:right;font-size:110%'>${subPhase.hp[index]} HP</td>
                                </tr>`
                            })
                        }
                    }
                })
                HTMLContent += `
                    </table>
                </div>`
            }
        })
        HTMLContent += `</div>`
    }
    return HTMLContent
}