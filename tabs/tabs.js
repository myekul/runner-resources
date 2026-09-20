async function generateHome() {
    await setHTML('html/home.html', 'content')
    document.querySelectorAll('#content a').forEach(elem => {
        elem.classList.add('grow')
        elem.classList.add('container')
        elem.style.gap = '10px'
    })
    setResources()
    document.getElementById('runRecap').style.gap = '0px'
    document.getElementById('resourcesTitle1').innerHTML = fontAwesomeText('graduation-cap', 'Getting Started')
    document.getElementById('resourcesTitle2').innerHTML = fontAwesomeText('plus', 'More Resources')
}
async function generateDebug() {
    await setHTML('html/debug.html', 'content')
    const response = await fetch('https://api.github.com/repos/DemoJameson/Cuphead.DebugMod/releases/latest')
    debugInfo = await response.json()
    document.querySelectorAll('#content [data-asset-index]').forEach(button => {
        const asset = debugInfo.assets[Number(button.dataset.assetIndex)]
        if (asset) button.href = asset.browser_download_url
    })
    document.getElementById('debugInfo').innerHTML += 'Cuphead Debug Mod ' + debugInfo.name +'<br> Last updated '+debugInfo.updated_at.split('T')[0]
}
function generateBallpit() {
    document.getElementById('content').innerHTML = `<div id='ballpit'></div>`
    let HTMLContent = ''
    bossArray.forEach(boss => {
        HTMLContent += `<div class='ball'>${getImage(boss)}</div>`
    })
    setBallpit(HTMLContent)
}