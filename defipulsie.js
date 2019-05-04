// import { ethers } from 'ethers'
// const ethers = require('ethers');

const axios = require("axios");
const Telegraf = require('telegraf')
const session = require('telegraf/session')
const Markup = require('telegraf/markup')
const Extra = require('telegraf/extra')

const commandParts = require('telegraf-command-parts')
const BOT_TOKEN = '864365730:AAGKo7LulhDsaNN42JX0Q1cP9qsN9uSoWgk'
const bot = new Telegraf(BOT_TOKEN)

bot.use(Telegraf.log())
bot.use(commandParts())
bot.use(session())

let marketData
let Cat = ['All', 'Assets', 'DEX', 'Derivatives', 'Lending', 'Payments']

bot.catch((err) => {
  console.error('Error', err.stack)
})

const defipulse = {
  getProjects: 'https://public.defipulse.com/api/GetProjects',
  MarketData: 'https://public.defipulse.com/api/MarketData'
}

const fetchInternet = async url => {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const wrapCatCommand = async Cat => {
  try {
      // marketData = await fetchInternet(defipulse.MarketData)
      // console.log(Cat)
      return `
  Leading dominance in ${Cat} market has *${marketData[Cat].dominance_name}*

  *Dominance %*          ${marketData[Cat].dominance_pct}
  *Dominance Value*   ${marketData[Cat].dominance_value}
  *Total Market*            ${marketData[Cat].total}`
    } catch (error) {
      console.log(error)
    }
}

bot.start(async(ctx) => {
  marketData = await fetchInternet(defipulse.MarketData)
  // Cat = Object.keys(marketData)
  console.log(`${Date.now()} started: ${ctx.from.id}`)
  return ctx.reply(`Hello, I'm the DeFi Pulsie bot, unofficial https://defipulse.com/ bot for now.
what do you want to know?`, Markup
      .keyboard([
        ['/market'],
      ])
      .oneTime()
      .resize()
      .extra()
  )
})

bot.command('market', async(ctx) => {
  // marketData = await fetchInternet(defipulse.MarketData)
  // Cat = Object.keys(marketData)
  return ctx.reply(`We have more categories in market data, please tap on button with wanted category`, 
      Markup.keyboard([
        ['/' + Cat[0], '/' + Cat[1], '/' + Cat[2]],
        ['/' + Cat[3], '/' + Cat[4], '/' + Cat[5]]
      ])
      .oneTime()
      .resize()
      .extra()
  )
})

bot.command(Cat[0], async (ctx) => {
  processedCat = await wrapCatCommand(Cat[0])
  return ctx.reply(processedCat, Markup.keyboard([
      ['/' + Cat[0], '/' + Cat[1], '/' + Cat[2]],
      ['/' + Cat[3], '/' + Cat[4], '/' + Cat[5]]
    ])
      .oneTime()
      .resize()
      .extra({parse_mode: 'Markdown'})
  )
})

bot.command(Cat[1], async (ctx) => {
  processedCat = await wrapCatCommand(Cat[1])
  return ctx.reply(processedCat, Markup.keyboard([
      ['/' + Cat[0], '/' + Cat[1], '/' + Cat[2]],
      ['/' + Cat[3], '/' + Cat[4], '/' + Cat[5]]
    ])
      .oneTime()
      .resize()
      .extra({parse_mode: 'Markdown'})
  )
})

bot.command(Cat[2], async (ctx) => {
  processedCat = await wrapCatCommand(Cat[2])
  return ctx.reply(processedCat, Markup.keyboard([
    ['/' + Cat[0], '/' + Cat[1], '/' + Cat[2]],
    ['/' + Cat[3], '/' + Cat[4], '/' + Cat[5]]
  ])
    .oneTime()
    .resize()
    .extra({parse_mode: 'Markdown'})
  )
})

bot.command(Cat[3], async (ctx) => {
  processedCat = await wrapCatCommand(Cat[3])
  return ctx.reply(processedCat, Markup.keyboard([
      ['/' + Cat[0], '/' + Cat[1], '/' + Cat[2]],
      ['/' + Cat[3], '/' + Cat[4], '/' + Cat[5]]
    ])
      .oneTime()
      .resize()
      .extra({parse_mode: 'Markdown'})
  )
})

bot.command(Cat[4], async (ctx) => {
  processedCat = await wrapCatCommand(Cat[4])
  return ctx.reply(processedCat, Markup.keyboard([
      ['/' + Cat[0], '/' + Cat[1], '/' + Cat[2]],
      ['/' + Cat[3], '/' + Cat[4], '/' + Cat[5]]
    ])
      .oneTime()
      .resize()
      .extra({parse_mode: 'Markdown'})
  )
})

bot.command(Cat[5], async (ctx) => {
  processedCat = await wrapCatCommand(Cat[5])
  return ctx.reply(processedCat, Markup.keyboard([
      ['/' + Cat[0], '/' + Cat[1], '/' + Cat[2]],
      ['/' + Cat[3], '/' + Cat[4], '/' + Cat[5]]
    ])
      .oneTime()
      .resize()
      .extra({parse_mode: 'Markdown'})
  )
})

bot.launch()