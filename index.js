var path = require('path');

function generateI18n(langs, files) {

    console.assert(langs, "Choose languages for i18n");

    const strLang = (file, lang) => `
        var __${lang} = require('${path.resolve(file.path, lang)}');
        // TODO: naming inside keysets
        var _${lang} = Object.keys(__${lang})[0];
        core.decl(_${lang}, __${lang}[_${lang}], {lang: '${lang}'});
    `;

    return files
        .reduce((acc, file) => {
            return acc.concat(langs.map(lang => strLang(file, lang)));
        }, ['(function() {\n\tvar core = require(\'bem-i18n\');'])
        .concat('\treturn core;\n})();')
        .join('\n');
}

module.exports = {
    generateI18n
};
