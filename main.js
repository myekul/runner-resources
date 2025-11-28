// setTitle('RUNNER RESOURCES')
setFooter('2025')
initializeHash('home')
setAudio('cuphead')
document.addEventListener('DOMContentLoaded', () => {
    // Tutorials
    setTabs(['home', null, 'bossInfo', 'hp', 'shotInfo', null, 'ballpit'])
        .then(() => {
            showTab(globalTab)
        })
})
function action() {
    document.getElementById('content').innerHTML = ''
    if (['home'].includes(globalTab)) {
        hide('pageTitle')
    } else {
        show('pageTitle')
        setPageTitle(fontAwesomeSet[globalTab][1], fontAwesomeSet[globalTab][0])
        if (globalTab == 'shotInfo') {
            const pageTitle = document.getElementById('pageTitle')
            let HTMLContent = ''
            HTMLContent += `
                <div class='container' style='position:absolute;top:22px;right:100px;gap:8px'>
                <div>verified by</div>
                <img src='https://www.speedrun.com/static/user/98r5vwqx/image?v=7a51b38' style='height:32px;border-radius:50%'>
                <div style='color:#B8B8B8'>SBDWolf</div>
                </div>`
            pageTitle.innerHTML += HTMLContent
        }
    }
    if (['bossInfo', 'hp'].includes(globalTab)) {
        show('bossSelect')
        show('boardTitleDiv')
    } else {
        document.getElementById('bossSelect').innerHTML = ''
        hide('bossSelect')
        hide('boardTitleDiv')
    }
    const tabActions = {
        home: generateHome,
        bossInfo: generateBossInfo,
        hp: generateHP,
        shotInfo: generateShotInfo,
        tutorials: generateTutorials,
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