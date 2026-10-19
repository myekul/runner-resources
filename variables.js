const DIFFICULTIES = ['Simple', 'Regular', 'Expert']

// let globalBossIndex = -1
let globalBossIndex = 0
let hp
let globalShot
let oddities
let debugInfo
bosses.sort((a, b) => a.order - b.order)
const bossArray = bosses.slice(6, 25).concat(bosses.slice(0, 6))