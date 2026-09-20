function generateTutorials() {
    let HTMLContent = `
    <div class='container'>
    ${getThumbnail("https://youtu.be/AV1DOVWb8YI")}
    ${getThumbnail("https://youtu.be/Lz1ii0NG-oA")}
    ${getThumbnail("https://youtu.be/eEak5IQVeXk")}
    ${getThumbnail("https://youtu.be/Xnva6NH-kVo")}
    ${getThumbnail("https://youtu.be/4HCoSVVpWHA")}
    ${getThumbnail("https://youtu.be/BXLVjLPVUKE")}
    ${getThumbnail("https://youtu.be/ZEaJRqJTdXw")}
    </div>`
    document.getElementById('content').innerHTML = HTMLContent
}