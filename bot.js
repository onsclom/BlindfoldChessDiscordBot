// @format
'use strict';

const Discord = require('discord.js');
const handleCommand = require('./commands.js');
require('dotenv').config();

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  handleCommand(msg);
});

client.login(process.env.api_token);

/*
 *
const chess = new Chess()
 
while (!chess.game_over()) {
    const moves = chess.moves()
    const move = moves[Math.floor(Math.random() * moves.length)]
    chess.move(move)
}
console.log(chess.pgn())
*/
