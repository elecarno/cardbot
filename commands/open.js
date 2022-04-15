const config = require("../config")
const fs = require("fs")

module.exports = {
    name: "open",
    description: "open a pack",
    execute(message, args, Discord){
        function random(min, max){return Math.floor(Math.random() * (max - min)) + min}

        if(args[0] === undefined || args[0]-1 > config.client.userData[message.author.id].packs.length){
            message.channel.send("invalid pack")
            return
        }

        let _name = ""
        let cardsAcquired = ""
        for(var j = 0; j < config.client.userData[message.author.id].packs.length; j++){
            if (j === args[0]-1){
                pack = config.client.userData[message.author.id].packs[args[0]-1]
                _name = config.client.packData[pack].name
                for(var k = 0; k < config.client.packData[pack].amount; k++){
                    randIndex = random(0, config.client.packData[pack].cards.length)
                    cardId = config.client.packData[pack].cards[randIndex]
                    card = config.client.cardData[cardId]
                    cardsAcquired += " `" + card.name + "`"
                    config.client.userData[message.author.id].cards.push(cardId)
                }
            }
        }
        config.client.userData[message.author.id].packs.splice(args[0]-1, 1)
        message.channel.send("Opened **" + _name + "**, acquired: " + cardsAcquired)
        fs.writeFile("./data/user-data.json", JSON.stringify(config.client.  userData, null, 4), err => {if (err) throw err})
    }
}