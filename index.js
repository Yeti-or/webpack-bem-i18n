var path = require('path');

function generateI18n(langs, requiredName, files) {

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
        }, [`(function() {\n\tvar core = require('${requiredName}');`])
        .concat('\treturn core;\n})();')
        .join('\n');
}

module.exports = {
    generate : function(langs, requiredName) {
        requiredName || (requiredName = 'bem-i18n');
        return generateI18n.bind(null, langs, requiredName);
    }
};
