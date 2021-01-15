module.exports = {
  Yes: [
    {
      type: 'input',
      name: 'mailerSmtp',
      message: 'Type host wich will be used to send mails',
      default: 'smtp.sendgrid.net',
    },
    {
      type: 'input',
      name: 'mailerPort',
      message: 'Type your port for smtp-server',
      default: 25,
    },
    {
      type: 'input',
      name: 'mailerUsername',
      message: 'Type your username for mailer',
      default: 'apikey',
    },
    {
      type: 'input',
      name: 'mailerPassword',
      message: 'Type your password for mailer',
      default: '',
    },
    {
      type: 'input',
      name: 'mailerFromEmail',
      message: 'Type email which will be used to send mails',
      default: '',
    },
  ],
  No: [],
};
