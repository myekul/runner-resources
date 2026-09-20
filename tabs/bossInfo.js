async function generateBossInfo() {
    if (!oddities) {
        const response = await fetch('oddities.json')
        oddities = await response.json()
    }
    const boss = bossArray[globalBossIndex]
    HTMLContent = ''
    if (boss) {
        HTMLContent = `
        <div class='container' style='align-items:flex-start'>
            ${parseOddities(boss)}
        </div>`
    } else {
        HTMLContent += `<div class='container'>Click a boss!</div>`
    }
    document.getElementById('content').innerHTML = HTMLContent
}
function parseOddities(boss) {
    const bossOddities = oddities[boss.id]?.oddities
    const bossTricks = oddities[boss.id]?.tricks
    const bossAdvancedTricks = oddities[boss.id]?.advancedTricks
    let HTMLContent = `<div>`
    if (bossOddities) {
        HTMLContent += `
        <div>
            <div>${fontAwesomeText('book', 'Oddities')}</div>
            ${bossInfoSection(bossOddities)}
        </div>`
    }
    if (bossTricks) {
        HTMLContent += `
        <div>
            <div>${fontAwesomeText('gamepad', 'Tricks')}</div>
            ${bossInfoSection(bossTricks)}
        </div>`
    }
    if (bossAdvancedTricks) {
        HTMLContent += `
        <div>
            <div>${fontAwesomeText('graduation-cap', 'Advanced Tricks')}</div>
            ${bossInfoSection(bossAdvancedTricks)}
        </div>`
    }
    HTMLContent += `</div>`
    return HTMLContent
    function bossInfoSection(section) {
        let HTMLContent = `<div class='background1 border' style='padding:10px'>`
        section?.forEach((part, index) => {
            HTMLContent += `
            <div class='container' style='gap:20px;margin-bottom:30px'>
                <div class='font2' style='font-size:170%'>${index + 1}.</div>
                ${phase(part.phase, part.img, part.extra)}
                <div style='width:500px'>${part.title ? myekulColor(part.title) + ': ' : ''}${part.text}${additionalText(part.additionalText)}</div>
            </div>`
        })
        HTMLContent += `</div>`
        return HTMLContent
    }
    function additionalText(value) {
        if (!value) return ''
        const helper = {
            hitbox,
            cards,
            impractical,
            dim: () => dim(value.text)
        }[value.helper]
        return helper ? helper() : ''
    }
}
function bossPhaseHeader(boss, phaseID, phaseName) {
    return `
    <div class='container ${boss.id}' style='gap:8px;padding:1px;white-space:nowrap'>
        <div class='container' style='width:36px;margin:0'>${getImage(boss, 36, phaseID)}</div>
        ${phaseName}
    </div>`
}
function phase(phaseText, phase, extra) {
    const boss = bossArray[globalBossIndex]
    const versionSet = {
        '1.0': { className: 'legacy' },
        '1.1': { className: 'onePointOne' },
        '1.2': { className: 'nmg' },
        '1.2+': { className: 'nmg' },
        '1.3': { className: 'dlcbase' },
        'Simple': { className: 'simple' },
        'Regular': { className: 'regular' },
        'Expert': { className: 'expert' },
        'Major Glitch': { className: 'nmg' }
    }
    let HTMLContent = ''
    if (boss) {
        HTMLContent += `
        <div>
            <div class='container'>
                <table class='border'>
                    <tr>
                        <td class='container ${boss.id}' style='gap:8px;padding:0 4px'>
                            ${bossPhaseHeader(boss, phase, phaseText)}
                        </td>
                    </tr>
                </table>
            </div>`
        if (extra) {
            HTMLContent += `<div class='container' style='gap:5px;padding-top:3px'>`
            extra.forEach(elem => {
                const version = versionSet[elem]
                if (version) {
                    HTMLContent += `<div class='${version.className}' style='border-radius:5px;padding:1px 3px'>${elem}</div>`
                } else if (elem == 'whetstone' || elem == 'astralcookie') {
                    HTMLContent += `<img src='https://myekul.com/shared-assets/cuphead/images/inventory/charm/${elem}.png' style='height:21px'>`
                } else if (elem.includes('super')) {
                    HTMLContent += `<img src='https://myekul.com/shared-assets/cuphead/images/inventory/super/${elem}.png' style='height:21px'>`
                } else {
                    HTMLContent += cupheadShot(elem, 21)
                }
            })
            HTMLContent += `</div>`
        }
        HTMLContent += `</div>`
    }
    return HTMLContent
}
function hitbox() {
    return dim('This is best observed with a hitbox mod.')
}
function cards() {
    return dim('You can use this opportunity to generate cards.')
}
function dim(text) {
    return `<span style='color:gray'>&nbsp;${text}</span>`
}
function nmg(text) {
    return `<span style='color:salmon'>${text}</span>`
}
function impractical() {
    return dim('This is impractical for a speedrun.')
}
function phase2KO(regular) {
    return [phase('Phase 2', 2, [regular ? 'Regular' : '', 'charge', 'superartiii', 'whetstone']),
    myekulColor('Phase 2 K.O.') + `: With Giant Ghost and Whetstone,
                it's possible to end the fight in Phase 2, skipping the lengthy Phase 3 transition.`
    ]
}