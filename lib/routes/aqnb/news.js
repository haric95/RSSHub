const got = require('@/utils/got');
const { parse } = require('@/utils/node-html-parser/dist');
const { parseDate } = require('@/utils/parse-date');

const getSrcFromRawAttrs = (attrs) => {
    const regex = /(?<=src=").+?(?=")/;
    return attrs.match(regex)[0];
};

module.exports = async (ctx) => {
    const doc = await got('https://aqnb.com');

    const root = parse(doc.body);

    const articles = root.getElementsByTagName('article');

    ctx.state.data = {
        title: 'AQNB',
        link: 'https://aqnb.com',
        item: articles.map((article) => {
            const titleElement = article.getElementsByTagName('h2')[0];
            const imgSrc = getSrcFromRawAttrs(article.getElementsByTagName('img')[0].rawAttrs);
            const link = article.getElementsByTagName('a')[0].href;
            const dateString = article.querySelector('.list-date').innerText.split(',').pop().trim();
            const pubDate = parseDate(dateString);
            return {
                title: titleElement ? titleElement.innerText : "Can't find title :(",
                description: `<img src="${imgSrc}" />`,
                link,
                pubDate,
            };
        }),
    };
};
