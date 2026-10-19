const sfx = [
    ['potato', 'onion', 'carrot'],
    ['punches', 'spit', 'morph', 'firefly', 'coin'],
    ['sneeze', 'pear', 'punch', 'deceased', 'crush', 'tombstone'],
    ['ha', 'taurus', 'gemini', 'sagittarius', 'transform', 'moon', 'miniblimp', 'trollnado', 'ufo'],
    ['intro', 'podhands', 'seeds', 'transform', 'boomerang'],
    // Isle 2
    ['waffle', 'cupcake', 'candycorn', 'gumball', 'jawbreaker_die', 'angry', 'jellybean', 'candycorn_mini'],
    ['intro', 'spit', 'gun', 'whistle', 'feathers', 'shoot', 'cry', 'garbage', 'smallbird', 'egg']
]
const sfxSizes = [
    [100, 100, 130],
    [120, 120, 110, 80, 30],
    [90, 60, 100, 90, 120, 120],
    [130, 120, 130, 120, 120, 140, 50, 80, 40],
    [120, 120, 120, 120, 80],
    // Isle 2
    [80, 80, 100, 120, 50, 140, 60, 50],
    [90, 100, 80, 120, 120, 70, 90, 90, 50, 50]
]
function playSFX(bossID, sound) {
    new Audio(`soundboard/sfx/${bossID}_${sound}.wav`).play()
}
function generateSFX() {
    let HTMLContent = ''
    if (globalBossIndex == -1) {
        bossArray.forEach((boss, index) => {
            if (sfx[index]) HTMLContent += bossSFX(boss, index)
        })
    } else {
        HTMLContent += bossSFX(bossArray[globalBossIndex], globalBossIndex)
    }
    document.getElementById('content').innerHTML = HTMLContent
}
function bossSFX(boss, index) {
    const bossID = boss.id
    let HTMLContent = `<div class='container' style='gap:10px;margin:0 auto'>`
    sfx[index]?.forEach((sound, soundIndex) => {
        const size = sfxSizes[index]?.[soundIndex] ?? 120
        HTMLContent += `
            <button>
                <img src='soundboard/images/${bossID}_${sound}.png' class='grow' style='height:${size}px' onclick="playSFX('${bossID}', '${sound}')">
            </button>`
    })
    HTMLContent += `</div>`
    return HTMLContent
}