/** @format */
const Discord = require("discord.js");
const { Intents } = require('discord.js');
// const myIntents = new Discord.Intents(32767);
// const { GiveawaysManager } = require('discord-giveaways');
const fs = require("fs");
const events = require('events');
const { readdirSync } = require("fs");
const chalk = require('chalk');
const db = require("quick.db")
const { join } = require('path');
const Enmap = require("enmap");
class Client extends Discord.Client {
  constructor() {
    super({
      allowedMentions: {  parse: ['users', 'roles'], repliedUser: false },
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_PRESENCES,
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_BANS",
        "GUILD_EMOJIS_AND_STICKERS",
        "GUILD_INTEGRATIONS",
        "GUILD_WEBHOOKS",
        "GUILD_INVITES",
        "GUILD_VOICE_STATES",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGE_TYPING",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_TYPING"
      ],
      partials: ["CHANNEL"]
    });
    this.quickdb = db
    this.interactions = new Discord.Collection();
    this.commands = new Discord.Collection();
    this.aliases = new Discord.Collection();
    this.snipes = new Discord.Collection();
    this.esnipes = new Discord.Collection();
    this.channelcreate = new Map()
    this.channeldelete = new Map()
    this.tts = new Map()
    this.settings = new Enmap({name: "settings"});
    this.emoji = require("../assets/json/emojis.json");
    this.config = require("../assets/json/config.json");
    this.err = require('../util/errors');
    this.done = require('../util/done')
    this.epremium = require('../../src/util/err-premium')
    this.prefix = this.config.PREFIX
    this.func = require('../util/util')
    this.checkperm = async function(channel) {
      let check = channel.permissionsFor(this.user);
      return check.has(['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS', 'ADD_REACTIONS']);
    };
    this.checkChannelPermission = function(channel, perm) {
      let check = channel.permissionsFor(this.user);
      return check.has([perm])
    }

  }
  start(token) {
    events.EventEmitter.defaultMaxListeners = 100;
    this.login(token);
  }
}

module.exports = Client;