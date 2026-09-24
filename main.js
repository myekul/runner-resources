setFooter('2025')
initializeHash('home')
setAudio('cuphead')
document.addEventListener('DOMContentLoaded', () => {
    // Tutorials
    setTabs(['home', null, 'bossInfo', 'hp', 'shotInfo', null, 'sfx', 'ballpit'])
        .then(() => {
            bossSelect('therootpack', true)
            showTab(globalTab)
        })
})
async function action() {
    document.getElementById('content').innerHTML = ''
    if (['home'].includes(globalTab)) {
        hide('pageTitle')
    } else {
        show('pageTitle')
        setPageTitle(fontAwesomeSet[globalTab][1], fontAwesomeSet[globalTab][0])
        if (globalTab == 'shotInfo') {
            tabCredit('SBDWolf', 'verified by', '98r5vwqx/image?v=7a51b38', 'color:#B8B8B8')
        }
    }
    if (['bossInfo', 'hp'].includes(globalTab)) {
        if (document.getElementById('bossSelect').children.length == 0) await generateBossSelect()
        show('bossSelect')
        show('boardTitleDiv')
    } else {
        document.getElementById('bossSelect').innerHTML = ''
        hide('bossSelect')
        hide('boardTitleDiv')
    }
    if (globalTab == 'hp') {
        document.querySelectorAll('.bossSelectNumber').forEach(elem => {
            hide(elem)
        })
    } else {
        document.querySelectorAll('.bossSelectNumber').forEach(elem => {
            show(elem)
        })
    }
    if (globalTab != 'debug') document.getElementById('debugButton').classList.remove('activeBanner')
    const tabActions = {
        home: generateHome,
        debug: generateDebug,
        bossInfo: generateBossInfo,
        hp: generateHP,
        shotInfo: generateShotInfo,
        tutorials: generateTutorials,
        sfx: generateSFX,
        monkeyTool: generateMonkeyTool,
        graveyardTool: generateGraveyardTool,
        rumorTool: generateRumorTool,
        ballpit: generateBallpit,
    }
    tabActions[globalTab]?.()
}
function getImage(boss, size = 100, phase) {
    return `<img src='https://myekul.com/shared-assets/cuphead/images/${phase ? 'phase/' : ''}${boss.id}${phase ? phase : ''}.png' style='height:${size}px'>`
}
function updateBoardTitle() {
    const boss = bossArray[globalBossIndex]
    let HTMLContent = ''
    if (boss) {
        HTMLContent += boardTitleCell(boss.id, `<div class='container' style='gap:8px'>${getImage(boss, 36)}${boss.name}</div>`)
    }
    document.getElementById('boardTitle').innerHTML = boardTitleWrapper(HTMLContent)
    if (globalBossIndex != -1) {
        show('closeBoardTitle')
    } else {
        hide('closeBoardTitle')
    }
}
function openInfo() {
    fetch(`html/${globalTab}Info.html`)
        .then(r => r.text())
        .then(t => openModal(t, 'INFO'))
}
async function generateBossSelect() {
    if (!oddities) {
        const response = await fetch('oddities.json')
        oddities = await response.json()
    }
    let HTMLContent = `
    <div id='bossTabs' class='container' style='gap:10px;margin-top:8px;margin-bottom:25px'>
        <table class='shadow background1'>
            <tr class='background2'>`
    let isle = 1
    let bossArray2 = []
    bossArray.forEach((boss, index) => {
        if (boss.isle !== isle) {
            HTMLContent += `</tr><tr>`
            bossArray2.forEach((boss2) => {
                HTMLContent += `<td id='${boss2.boss.id}Button' class='grow ${boss2.boss.id}' style='width:36px' onclick="globalBossIndex=${boss2.index};bossSelect('${boss2.boss.id}')">${getImage(boss2.boss, 36)}</td>`
            })
            bossArray2 = []
            HTMLContent += `
                </tr>
            </table>
            <table class='shadow background1'>
                <tr class='background2'>`
            isle = boss.isle
        }
        bossArray2.push({ boss: boss, index: index })
        const bossInfo = oddities[boss.id]
        const infoCount = Object.values(bossInfo || {}).reduce((count, section) => count + (Array.isArray(section) ? section.length : 0), 0)
        HTMLContent += `<td class='bossSelectNumber' style='font-size:80%;color:gray;position:relative;text-align:center'>${infoCount}</td>`
    })
    HTMLContent += `</tr><tr>`
    bossArray2.forEach((boss2) => {
        HTMLContent += `<td id='${boss2.boss.id}Button' class='grow ${boss2.boss.id}' style='width:36px' onclick="globalBossIndex=${boss2.index};bossSelect('${boss2.boss.id}')">${getImage(boss2.boss, 36)}</td>`
    })
    HTMLContent += `</tr></table>`
    document.getElementById('bossSelect').innerHTML = HTMLContent
}
function bossSelect(id, startup) {
    const className = 'selected'
    document.querySelectorAll('#bossTabs td').forEach(button => {
        button.classList.remove(className)
    })
    updateBoardTitle()
    action()
    if (id) {
        const button = document.getElementById(id + 'Button')
        button?.classList.add(className)
        if (!startup) playSound('category_select')
    }
}