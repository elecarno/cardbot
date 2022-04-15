const config = require("../config")
const fs = require("fs")

module.exports = {
    name: "enter",
    description: "creates a users bot profile",
    execute(user){
        config.client.userData[user.id] = {
            name: user.username,
            coins: 300,
            kd: [0, 0],
            cards: [],
            packs: ["b1", "b1", "b2", "b3", "b3"],
            deck: [],
        }
        fs.writeFile("./data/user-data.json", JSON.stringify(config.client.userData, null, 4), err => {if (err) throw err})
    }
}