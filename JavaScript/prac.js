// クエリセレクタ()
const $ = (selector, scope = document) => {
    const el = scope.querySelector(selector);
    if(!el) console.log(`selector "${selector}" not found.`);
    return el;
}

const $$ = (selector, scope = document) => {
    Array.from(scope.querySelectorAll(selector));
}

const on = (el, event, handler, options = false)=> {
    if(el) el.addEventListener(event, handler, options)
}