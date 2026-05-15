const rumorArrayExample = [0, 3, 2, 0, 0, 2, 0, 0]
let rumorArray = []
let beePlatforms = []
rumorToolReset()
function generateRumorTool() {
    let HTMLContent = ''
    let lastMissingPlatform = -1
    beePlatforms.forEach((chunk, chunkIndex) => {
        HTMLContent = generateChunk(chunk, chunkIndex) + HTMLContent
        function generateChunk(chunk, chunkIndex) {
            let HTMLContent = ''
            chunk.forEach((missingPlatform, index) => {
                HTMLContent += `<div class='container' style='position:relative;gap:80px;padding-bottom:15px;width:500px'>`
                if (chunkIndex == 0 && index == chunk.length - 1) {
                    HTMLContent += `
                    <img src='images/rumorTool/rumor.png' style='position:absolute;right:-16px;top:-260px;height:250px;opacity:0.2;z-index:-1'>
                    <img src='images/rumorTool/middle.png' style='position:absolute;right:197px;top:-315px;height:335px;opacity:0.2;z-index:-1'>
                    <img src='images/rumorTool/bulletRight.png' style='position:absolute;right:140px;top:-200px;height:40px;opacity:0.5;z-index:-1'>`
                }
                if (index == 0) {
                    HTMLContent += `
                    <div class='bracket' style='right:-70px'><div class='side'></div></div>
                    <div style='position:absolute;right:-160px;color:gray'>Chunk ${chunkIndex + 1}</div>`
                    if (chunkIndex > 1) HTMLContent += `<div class='button rumorhoneybottoms' style='position:absolute;right:-120px;top:80px;height:30px;width:30px;border-radius:50%;font-size:120%' onclick="rumorToolRemove(${chunkIndex})">${fontAwesome('trash')}</div>`
                    if (chunkIndex > 1) HTMLContent += `<div class='button rumorhoneybottoms' style='position:absolute;right:-120px;top:150px;height:30px;width:30px;border-radius:50%;font-size:110%' onclick="rumorToolDuplicate(${chunkIndex})">${fontAwesome('clone')}</div>`
                }
                HTMLContent += `<div style='position:absolute;right:-50px;color:gray'>${missingPlatform}</div>`
                const numPlatforms = index % 2 == 0 ? 4 : 3
                let exception2
                for (let i = 0; i < numPlatforms; i++) {
                    let exception
                    if (i == 0 && missingPlatform == 0 && lastMissingPlatform == 0) {
                        exception = true
                    }
                    if (i == 3 && missingPlatform == 3 && lastMissingPlatform == 2) {
                        exception = true
                        exception2 = true
                    }
                    HTMLContent += `<div class='grow' style='${missingPlatform == i && !exception ? 'opacity:0.1' : ''}${exception ? 'filter:brightness(2)' : ''}' onclick="changeArray(${chunkIndex},${index},${i})"><img src='images/rumorTool/platform.png' style='width:80px'></div>`
                }
                HTMLContent += `</div>`
                lastMissingPlatform = exception2 ? 3 : missingPlatform
            })
            return HTMLContent
        }
    })
    HTMLContent = `
    <div>
        <div class='container'>
            <div class='button infoButton rumorhoneybottoms' style='margin-bottom:10px' onclick="openInfo()">INFO</div>
        </div>
        <div class='container' style='gap:10px;padding-bottom:30px'>
            <div class='button rumorhoneybottoms' style='width:230px;gap:8px' onclick="rumorToolGenerate()">${fontAwesome('download')}Generate BeePlatforms.txt</div>
            <div class='button rumorhoneybottoms' style='width:80px;gap:8px' onclick="rumorToolReset(true)">${fontAwesome('refresh')}Reset</div>
        </div>
        <div class='container'>
            <div class='button rumorhoneybottoms' style='width:40px;height:40px;font-size:150%;border-radius:50%' onclick="rumorToolAdd()">${fontAwesome('plus')}</div>
        </div>
    </div>`+ HTMLContent
    for (let j = 0; j < 16; j++) {
        HTMLContent += `<div class='container' style='position:relative;gap:80px;padding-bottom:15px;width:500px'>`
        if (j == 0) {
            HTMLContent += `
            <img src='images/rumorTool/police.png' style='filter:brightness(0.5);position:absolute;left:-50px;height:100px;top:50px'>
            <img src='images/rumorTool/intro.png' style='filter:brightness(0.5);position:absolute;right:90px;height:225px;top:260px'>
            <img src='images/rumorTool/mugman.png' style='filter:brightness(0.5);position:absolute;left:50px;height:64px;top:425px'>`
        }
        const numPlatforms = j % 2 == 0 ? 4 : 3
        for (let i = 0; i < numPlatforms; i++) {
            HTMLContent += `<div style='filter:brightness(0.25);z-index:-1'><img src='images/rumorTool/platform.png' style='width:80px'></div>`
        }
        HTMLContent += `</div>`
    }
    document.getElementById('content').innerHTML = HTMLContent
}
function changeArray(chunk, index, value) {
    beePlatforms[chunk][index] = value
    playSound('move')
    action()
}
function rumorToolAdd() {
    beePlatforms.push([0, 0, 0, 0])
    playSound('category_select')
    action()
}
function rumorToolDuplicate(index){
    beePlatforms.splice(index, 0, [...beePlatforms[index]]);
    playSound('cardflip')
    action()
}
function rumorToolRemove(index) {
    beePlatforms.splice(index, 1);
    playSound('carddown')
    action()
}
function rumorToolReset(actionCheck) {
    rumorArray = [...rumorArrayExample]
    beePlatforms = []
    const chunkSize = 4
    for (let i = 0; i < rumorArray.length; i += chunkSize) {
        beePlatforms.push(rumorArray.slice(i, i + chunkSize));
    }
    beePlatforms.forEach(chunk => chunk.reverse())
    if (actionCheck) {
        playSound('carddown')
        action()
    }
}
function rumorToolGenerate() {
    beePlatforms.forEach(chunk => chunk.reverse())
    const content = beePlatforms.flat(Infinity).join('\n');
    beePlatforms.forEach(chunk => chunk.reverse())

    const blob = new Blob([content], { type: 'text/plain' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'BeePlatforms.txt';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    playSound('ready')
}