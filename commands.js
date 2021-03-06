// @format
'use strict';

const {Chess} = require('chess.js');

const commandPrefix = '!';
//this dictionary holds current games
//key: user id, value: game
let games = {};
//this dictionary links commands to their functions
//key: command string, value: command function
let commands = {};

//this function is run on every message the bot sees
module.exports = msg => {
  let command = msg.content.substring(commandPrefix.length);
  if (
    command in commands &&
    msg.content.substring(0, commandPrefix.length) == commandPrefix
  ) {
    commands[command](msg);
  } else if (msg.content[0] === '>') {
    makeMove(msg);
  }
};

function makeMove(msg) {
  const game = games[msg.author.id];
  const notation = msg.content.substring(1);
  if (game.move(notation, {sloppy: true})) {
    ++game['move_amount'];
    const moves = game.moves();
    const move = moves[Math.floor(Math.random() * moves.length)];
    game.move(move);
    msg.channel.send(`${game['move_amount']}. ${move}`);
  } else {
    msg.channel.send('not a move!');
  }
  msg.channel.send('```' + game.ascii() + '```');
}

commands['ping'] = msg => {
  msg.reply('pong');
};

commands['play'] = msg => {
  const game = new Chess();
  game['move_amount'] = 0;
  games[msg.author.id] = game;
  msg.reply('Game started.');
};
