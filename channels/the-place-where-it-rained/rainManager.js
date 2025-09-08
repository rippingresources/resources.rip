let hasClickedEver = false
let playing = false


$(document).ready(function(){
    $("html").click(function(){
        if (!hasClickedEver) {
            hasClickedEver = true
            playing = !playing
            darkenMainColor()
            rain()

        }
    });
});

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};

async function darkenMainColor() {
    let base = ""
    for (let i = 0; i < 30; i+= 0.1) {
        document.querySelector(':root').style.setProperty('--main-color', `hsl(from #3135FC h s calc(l - ${i}))`);
        await sleep(50);
    }
}

async function removeMeWhenIGetToTheBottom(rain) {
    var removed = false;
    //var top = -44
    //var left = -22
    let maxHeight = window.innerHeight;
    await sleep(1000);
    rain.style.top = `${50+window.innerHeight}px`
    rain.style.left = `${50+window.innerHeight/2}px`
    rain.style.transition = `top ${window.innerHeight/500}s linear, left ${window.innerHeight/500}s linear`;

    while (!removed) {
        let yPos = Number(window.getComputedStyle(rain).top.replace("px", ""))
        if ( maxHeight <= yPos || maxHeight != window.innerHeight) {
            rain.remove();
            removed = true;
        }
        await sleep(1000);
    }

}

// Do not let me code at 1 in the morning
// This will cause a stupid amount of DOM updates. TODO: reuse old rain elements
async function rain() {
    const rainContainer = $("#rain")[0];
    let doRain = true;

    while (doRain) {
        if (rainContainer.children.length <= 200) {
            const numb = Math.floor(Math.random()*9);
            const offset = Math.floor(Math.random()*200)-100;
            const img = document.createElement('img');
            img.setAttribute('src', `./spr_lw_rain_style_b/${numb}.png`);
            img.style.transform = `translateX(${offset}vw)`;
            rainContainer.append(img);
            removeMeWhenIGetToTheBottom(img);
        }

        await sleep(Math.random()*41);
    }
}
