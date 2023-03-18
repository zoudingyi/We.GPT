import { Contact, Message, ScanStatus, WechatyBuilder, log } from 'wechaty';
import qrTerm from 'qrcode-terminal';

const name = 'chat-bot';
const bot = WechatyBuilder.build({
  name,
  /**
   * How to set Wechaty Puppet Provider:
   *
   *  1. Specify a `puppet` option when instantiating Wechaty. (like `{ puppet: 'wechaty-puppet-whatsapp' }`, see below)
   *
   * You can use the following providers locally:
   *  - wechaty-puppet-wechat (web protocol, no token required)
   *  - wechaty-puppet-whatsapp (web protocol, no token required)
   *  - wechaty-puppet-padlocal (pad protocol, token required)
   *  - etc. see: <https://wechaty.js.org/docs/puppet-providers/>
   */
  puppet: 'wechaty-puppet-wechat',
  puppetOptions: {
    uos: true // open uos
  }
});

bot.on('scan', (qrcode: string, status: ScanStatus) => {
  if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
    const qrcodeImageUrl = `https://wechaty.js.org/qrcode/${encodeURIComponent(
      qrcode
    )}`;
    log.info(
      'StarterBot',
      'onScan: %s(%s) - %s',
      ScanStatus[status],
      status,
      qrcodeImageUrl
    );

    qrTerm.generate(qrcode, { small: true }); // show qrcode on console
  } else {
    log.info('StarterBot', 'onScan: %s(%s)', ScanStatus[status], status);
  }
});
bot.on('login', (user: Contact) => {
  log.info('StarterBot', '%s login', user);
});
bot.on('logout', (user: Contact) => {
  log.info('StarterBot', '%s logout', user);
});
bot.on('message', async (msg: Message) => {
  log.info('StarterBot', msg.toString());

  if (msg.text() === 'ding') {
    await msg.say('dong');
  }
});

bot
  .start()
  .then(() => log.info('StarterBot', name + ' Started.'))
  .catch(e => log.error('StarterBot', e));
