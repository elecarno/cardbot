const Discord = require("discord.js")
const config = require("./config")
const token = require("./token")
const fs = require("fs")

config.client.once("ready", () => {
    console.log("cardbot is online")
})

config.client.on("message", message => { 
    if (!message.content.startsWith(config.prefix) || message.author.bot ) return
    const args = message.content.slice(config.prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if(config.client.userData[message.author.id] === undefined)
        config.client.commands.get("enter").execute(message.author)

    
    if(command === "st" || command == "stats")
        config.client.commands.get("stats").execute(message, args, Discord)
    else if(command === "open")
        config.client.commands.get("open").execute(message, args, Discord)
    else if(command === "data")
        config.client.commands.get("data").execute(message, args, Discord)
    else if(command === "shop")
        config.client.commands.get("shop").execute(message, args, Discord)
    
})
config.client.login(token.token)
