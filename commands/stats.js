const config = require("../config")
const fs = require("fs")

module.exports = {
    name: "stats",
    description: "user stats",
    execute(message, args, Discord){
        mID = message.author.id
        if(message.mentions.users.first() !== undefined)
            mID = message.mentions.users.first().id

        let _name =  config.client.userData[mID].name
        let _coins =  config.client.userData[mID].coins
        let _kd =  config.client.userData[mID].kd
        let _cards = config.client.userData[mID].cards
        let _packs = config.client.userData[mID].packs

        let winrate
        if(_kd[1] === 0)
            winrate = 0
        else
            winrate = (_kd[0]/_kd[1])*100

        if(args[0] === undefined){
            statsEmbed = new Discord.MessageEmbed()
            .setColor("#f5ad31")
            .setTitle(_name + "'s stats")
            .addFields(
                {name: "info", value: "coins: " + _coins + "\nwinrate: " + winrate + "% ( w: " + _kd[0] + " | l: " +  _kd[1] + " )"},
                {name: "cards", value: "amount: " + _cards.length + "\npacks: " + _packs.length}
            )
            message.channel.send(statsEmbed)
        }
        else if (args[0] === "packs" || args[0] === "p"){
            let packList = ""
            let index = 1
            for(var i in config.client.packData){
                for(var j = 0; j < _packs.length; j++){
                    if (i === _packs[j]){
                        packList +="\n" + index + ". " + config.client.packData[i].name + ", id: `" + i + "`"
                        index++
                    }
                }
            }

            message.channel.send("your unopened packs: " + packList)
        }
        else if (args[0] === "cards" || args[0] === "c"){
            let cardList = ""
            let cardArray = []
            for(var i = 0; i < _cards.length; i++){
                if(!cardArray.includes(_cards[i]))
                    cardArray.push(_cards[i])
            }
            for(var i = 0; i < cardArray.length; i++){
                _name = ""
                _amount = 0
                if(config.client.cardData[cardArray[i]].ctg === "ch")
                    _name = "***" + config.client.cardData[cardArray[i]].name + "***"
                else if(cardArray[i].includes("w") || cardArray[i].includes("i"))
                   _name = "**" + config.client.cardData[cardArray[i]].name + "**"
                else
                    _name = config.client.cardData[cardArray[i]].name
                 
                for(var j = 0; j < _cards.length; j++){
                    if(_cards[j] === cardArray[i])
                        _amount += 1
                }

                cardList += "\n(" + _amount + ") "+ _name + ", id: `" + cardArray[i] + "`"
            }
            message.channel.send("different cards you own:" + cardList)
        }
    }
}