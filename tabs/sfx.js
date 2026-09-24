function playSFX(bossId, sound) {
    new Audio(`soundboard/sfx/${bossId}_${sound}.wav`).play()
}

function generateSFX() {
    let HTMLContent = ''
    const sfx = [
        ['potato', 'onion', 'carrot'],
        ['punches', 'spit', 'morph', 'firefly'],
        ['sneeze', 'pear', 'punch', 'deceased', 'crush', 'tombstone'],
        ['ha', 'taurus', 'gemini', 'sagittarius', 'transform', 'miniblimp', 'trollnado'],
        ['intro', 'podhands', 'seeds', 'transform', 'boomerang']
    ]
    const sfxSizes = [
        [120, 110, 150],
        [150, 150, 150, 120],
        [110, 80, 120, 110, 150, 150],
        [130, 120, 130, 120, 120, 50, 80],
        [120, 120, 120, 120, 80]
    ]
    sfx.forEach((boss, index) => {
        const bossId = bosses[6 + index].id
        HTMLContent += `<div class='container' style='gap:10px'>`
        boss.forEach((sound, soundIndex) => {
            const size = sfxSizes[index]?.[soundIndex] ?? 120
            HTMLContent += `<img src='soundboard/images/${bossId}_${sound}.png' class='grow' style='height:${size}px' onclick="playSFX('${bossId}', '${sound}')">`
        })
        HTMLContent += `</div>`
    })
    document.getElementById('content').innerHTML = HTMLContent
}