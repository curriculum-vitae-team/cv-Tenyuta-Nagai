const typescriptTransform = require('i18next-scanner-typescript');

module.exports = {
  input: ['src/**/*.{ts,tsx}'],
  output: './',
  options: {
    sort: true,
    func: {
      list: ['i18next.t', 'i18n.t', 't', '__'],
      extensions: ['.ts', '.tsx'],
    },
    lngs: ['en', 'ru'],
    defaultLng: 'en',
    defaultValue: '__STRING_NOT_TRANSLATED__',
    resource: {
      loadPath: 'public/locales/{{lng}}.json',
      savePath: 'public/locales/{{lng}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    debag: true,
    nsSeparator: false,
    keySeparator: '.',
  },
  transform: typescriptTransform({ extensions: ['*.ts', '.tsx'] }),
};
