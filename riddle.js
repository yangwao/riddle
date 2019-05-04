// import { ethers } from 'ethers'
// const ethers = require('ethers');

const axios = require("axios");
const Telegraf = require('telegraf')
const session = require('telegraf/session')
const Markup = require('telegraf/markup')
const Extra = require('telegraf/extra')

const commandParts = require('telegraf-command-parts')
const BOT_TOKEN = '774864548:AAE4huJgVOhUC48tiv7CoVJbdM3ac05F9-'
const bot = new Telegraf(BOT_TOKEN)

// https://sokol.poa.network
let urlSokol = 'https://sokol.poa.network'

const Web3 = require('web3');
const options = {
  defaultBlock: 'latest',
  defaultGas: 1,
  defaultGasPrice: 0,
  transactionBlockTimeout: 50,
  transactionConfirmationBlocks: 24,
  transactionPollingTimeout: 480
}
const web3 = new Web3(urlSokol, null, options);
web3.eth.getBalance("0x3fb85580bbc6B4C48653749cE79B9a343e879692").then(console.log);

let runningPoll

bot.use(Telegraf.log())
bot.use(commandParts())
bot.use(session())

bot.start((ctx) => {
  console.log(`${Date.now()} started: ${ctx.from.id}`)
  return ctx.reply(`Hello, I'm the Riddle bot! Looking for challenge?`, Markup
    .keyboard([
      ['/gamepot', '/targets'],
    ])
    .oneTime()
    .resize()
    .extra()
  )
})

bot.catch((err) => {
  console.error('Error', err.stack)
})

const fetchInternet = async url => {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const home = {
  lat: 48.144665,
  lon: 17.115562
}

bot.on('poll', (ctx) => { 
  console.log('Poll update', ctx.poll)
})

bot.command('poll', async(ctx) => {
  let poll = await ctx.telegram.sendPoll(ctx.chat.id, 'does it make sense', ['yes', 'no'])
  runningPollId = poll.message_id
})

bot.command('endpoll', async (ctx) => {
  // console.log(`gonna stop poll ${runningPoll.id}`)
  return ctx.telegram.stopPoll(ctx.chat.id, runningPollId)
})

bot.command('gamepot', async(ctx) => {
  if (ctx.chat.type === 'private' && ctx.from && ctx.from.username) {
    const balance = await web3.eth.getBalance("0x3fb85580bbc6B4C48653749cE79B9a343e879692")
    return ctx.reply(`My balance is ${balance}`)
  }
})

bot.command('targets', async(ctx) => {
  if (ctx.chat.type === 'private' && ctx.from && ctx.from.username) {
    return ctx.replyWithLocation(home.lat, home.lon)
  }
})

bot.on('location', (ctx) => {
  if (ctx.chat.type === 'private' && ctx.from && ctx.from.username) {
    if (ctx.message.location.latitude > (home.lat - 1) &&
        ctx.message.location.latitude < (home.lat + 1) &&
        ctx.message.location.longitude > (home.lon - 1) &&
        ctx.message.location.longitude < (home.lat + 1)) {
      // return ctx.reply(`You are near target, send photo to get POA`)
      return ctx.replyWithPhoto('AgADBAADrrAxG8uhMVLRdiOYFp1yFSFcwxoABGkq7_bVy60GHLgGAAEC')
    }
    return ctx.reply(`Nowhere far`)
  }
})

bot.launch()