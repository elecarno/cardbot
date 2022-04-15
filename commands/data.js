const config = require("../config")
const fs = require("fs")

module.exports = {
    name: "data",
    description: "card or pack data",
    execute(message, args, Discord){
        if (args[0] === undefined) return

        dataEmbed = new Discord.MessageEmbed()
        if(config.client.cardData[args[0]] !== undefined){
            _card = config.client.cardData[args[0]]
            _id = args[0]
            _colour = ""
            _category = ""
            _type = ""

            if(_id.includes("i")){
                _colour = "#d43024"
                _type = "𝕴𝖓𝖖𝖚𝖎𝖘𝖎𝖙𝖔𝖗"
            }
            else if(_id.includes("w")){
                _colour = "#313bcc"
                _type = "𝐖𝐚𝐫𝐝𝐞𝐧"
            }
            else if(_id.includes("a")){
                _colour = "#4a703e"
                _type = "Armour"
            }
            else if(_id.includes("t")){
                _colour = "#614c35"
                _type = "Troop"
            }
            else if(_id.includes("s")){
                _colour = "#ffd51c"
                _type = "Spell"
            }
            else if(_id.includes("c")){
                _colour = "#ffd51c"
                _type = "Command"
            }

            switch(_card.ctg){
                case "ch":
                    _category = "𝕮𝖍𝖆𝖒𝖕𝖎𝖔𝖓"
                    break
                case "av":
                    _category = "Avion"
                    break
                case "mt":
                    _category = "Martial"
                    break
                case "ma":
                    _category = "Mage"
                    break
            }

            dataEmbed
            .setTitle(_category + " " + _type +": " + _card.name)
            .setColor(_colour)
            .setImage(_card.thumb)
            .addField("market data", "amount sold: " + _card.market[0] + "\naverage price: " + _card.market[1]
             + "\nlast sold for: " + _card.market[2] + "\nhighest sold for: " + _card.market[3]
             + "\nlowest sold for: " + _card.market[4])

            if(_card.hp !== undefined)
                dataEmbed.setDescription("hp: " + _card.hp + "\natk: " + _card.atk)
            if(_card.cp !== undefined)
                dataEmbed.setDescription("cp: " + _card.cp + "\nhp: " + _card.hp + "\natk: " + _card.atk)

            message.channel.send(dataEmbed)
        }
        if(config.client.packData[args[0]] !== undefined){
            _pack = config.client.packData[args[0]]
            cardList = ""
            
            for(var i = 0; i < _pack.cards.length; i++){
                cardList += "\n" + config.client.cardData[_pack.cards[i]].name + " (" + pack.cards[i] + ")"
            }

            dataEmbed
            .setTitle(_pack.name)
            .setColor(_pack.colour)
            .setDescription("give amount: " + _pack.amount)
            .addField("contains: ", cardList)
            message.channel.send(dataEmbed)
        }
    }
}