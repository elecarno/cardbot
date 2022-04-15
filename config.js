const Discord = require("discord.js")
const client = new Discord.Client()
// add link - https://discord.com/oauth2/authorize?client_id=963064464553435186&scope=bot&permissions=8

const prefix = "c "
client.userData = require("./data/user-data.json")
client.cardData = require("./data/cards.json")
client.packData = require("./data/packs.json")
client.shopData = require("./data/shop.json")

const UBS = 1;

const fs = require("fs")
const { Z_PARTIAL_FLUSH } = require("zlib")
client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"))
for(const file of commandFiles){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

exports.client = client
exports.prefix = prefix