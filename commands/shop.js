const config = require("../config")
const fs = require("fs")
const { fileURLToPath } = require("url")

module.exports = {
    name: "shop",
    description: "shop",
    execute(message, args, Discord){
        if(args[0] === undefined){
            _packs = config.client.shopData["packs"]
            _listings = config.client.shopData["listings"]

            packList = ""
            listingList = ""

            for(var i = 0; i < _packs.length; i++){
                packList += _packs[i][0] + ", " + _packs[i][1] + " coins"
            }
            for(var i = 0; i < _listings.length; i++){
                index = i+1
                listingList += "\n" + index + " - " + config.client.cardData[_listings[i][0]].name
                 + ", listed by " + config.client.userData[_listings[i][1]].name + " for "
                 + _listings[i][2] + " coins"
            }

            shopEmbed = new Discord.MessageEmbed()
            .setTitle("TCG Shop")
            .setColor("#408f3f")
            .addFields(
                {name: "packs", value: packList},
                {name: "card listings", value: listingList}
            )
            message.channel.send(shopEmbed)
        }
        else if(args[0] === "list" || args[0] === "l"){
            if(args[1] === undefined || args[2] === undefined) return
            config.client.shopData["listings"].push([args[1], message.author.id, parseInt(args[2])])
        }
        else if(args[0] === "buy" && args[1] !== undefined){
            listingIndex = parseInt(args[1])-1
            if(config.client.userData[message.author.id].coins >= _listings[listingIndex][2]){
                // handle buyer data
                config.client.userData[message.author.id].coins -= _listings[listingIndex][2]
                config.client.userData[message.author.id].cards.push(_listings[listingIndex][0])
                // handle seller data
                config.client.userData[_listings[listingIndex][1]].coins += _listings[listingIndex][2]
                // handle card market data
                card = _listings[listingIndex][0]
                config.client.cardData[card].market[0] += 1
                config.client.cardData[card].market[1] = Math.round((config.client.cardData[card].market[1] + _listings[listingIndex][2])/2)
                config.client.cardData[card].market[2] = _listings[listingIndex][2]
                if(_listings[listingIndex[2]] > config.client.cardData[card].market[3])
                    config.client.cardData[card].market[3] = _listings[listingIndex][2]
                if(_listings[listingIndex[2]] < config.client.cardData[card].market[4])
                    config.client.cardData[card].market[4] = _listings[listingIndex][2]
                // remove listing
                config.client.shopData["listings"].splice(listingIndex, 1)
            }
        }

        fs.writeFile("./data/user-data.json", JSON.stringify(config.client.  userData, null, 4), err => {if (err) throw err})
    }
}