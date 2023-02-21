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
    lngs: ['ru'],
    defaultLng: 'en',
    defaultValue: 'not found',
    resource: {
      loadPath: 'src/localization/{{lng}}/{{lng}}.json',
      savePath: 'src/localization/{{lng}}/{{lng}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    nsSeparator: false,
    keySeparator: '.',
  },
  transform: typescriptTransform({ extensions: ['*.ts', '.tsx'] }),
};
