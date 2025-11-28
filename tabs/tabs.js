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
function generateTutorials() {
    let HTMLContent = ''
    HTMLContent += `<div class='container'>Coming soon!</div>`
    document.getElementById('content').innerHTML = HTMLContent
}
function generateBallpit() {
    document.getElementById('content').innerHTML = `<div id='ballpit'></div>`
    let HTMLContent = ''
    bossArray.forEach(boss => {
        HTMLContent += `<div class='ball'>${getImage(boss)}</div>`
    })
    setBallpit(HTMLContent)
}