function playSFX(bossId, sound) {
    new Audio(`soundboard/sfx/${bossId}_${sound}.wav`).play()
}

function generateSFX() {
    let HTMLContent = ''
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
    sfx.forEach((boss, index) => {
        const bossId = bosses[6 + index].id
        HTMLContent += `<div class='container' style='gap:10px'>`
        boss.forEach((sound, soundIndex) => {
            const size = sfxSizes[index]?.[soundIndex] ?? 120
            HTMLContent += `
            <button>
                <img src='soundboard/images/${bossId}_${sound}.png' class='grow' style='height:${size}px' onclick="playSFX('${bossId}', '${sound}')">
            </button>`
        })
        HTMLContent += `</div>`
    })
    document.getElementById('content').innerHTML = HTMLContent
}