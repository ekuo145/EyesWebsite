// Scroll handlers
document.addEventListener('scroll', onScroll);
document.addEventListener('mousemove', onMouseMove);
window.addEventListener('resize', onScroll);

let percentComplete = 0;
const size = 10000;

document.addEventListener('DOMContentLoaded', function() {
    // Set the content div to the right height
    const content = document.getElementById('content');
    content.style.height = size + 'px';
    onScroll();
});

// This function also gets called on window resize.
function onScroll() {

    // viewport width and height
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Current scroll position
    const scroll = window.scrollY;

    // Maximum scroll position
    const maxScroll = document.body.scrollHeight - window.innerHeight;

    // Percentage of scroll (rounded to 1 decimal place)
    percentComplete = Math.min(Math.round(scroll/maxScroll * 1000) / 10, 100);
    
    // Text box for percent complete
    const titleText = document.getElementById('title');
    titleText.addEventListener('click', function() {
        if (percentComplete > 10) {
            window.scrollTo(0, 0);
        }
    });

    // Positon and scale animations.
    const animationElements = [
        'titleContainer',
        'informationContainer',
        'informationContainer2',
        'informationContainer4',
        'informationContainer3',
        'scrollArrowContainer',
        'informationContainer5',
        'informationContainer6',
        'informationContainer7',
        'informationContainer8',
        'informationContainer9',
        'informationContainer10',
        'informationContainer11',
        'informationContainer12',
        'informationContainer13',
        'informationContainer14',
        'scrollTooltip'
    ];

    for (let id of animationElements) {
        const element = document.getElementById(id);
        // Name shortening
        let dat = animationData[id];
        if (id == "titleContainer") {
            if (window.innerHeight/window.innerWidth >= 1) {
                dat.scale = [3, 3, 1, 1];
            }
            else {
                dat.scale = [2, 2, 0.5, 0.5];
            }
        }
        let timingIndex = 0;
        let timing = 0;
        if (percentComplete == 100) {
            timing = 1;
            timingIndex = dat.timings.length - 2;
        }
        else {
            // Goes through the animation timings and finds the current timing.
            while (percentComplete > dat.timings[timingIndex + 1]) timingIndex++;
            timing = (percentComplete - dat.timings[timingIndex]) / (dat.timings[timingIndex + 1] - dat.timings[timingIndex]);
        }
        // Applies translation and scale effects.
        element.style.transform = `
        translate(
            ${smoothLerp(dat.relativeTranslate[timingIndex][0], dat.relativeTranslate[timingIndex + 1][0], timing)}%,
            ${smoothLerp(dat.relativeTranslate[timingIndex][1], dat.relativeTranslate[timingIndex + 1][1], timing)}%
        )
        translate(
            ${smoothLerp(dat.translate[timingIndex][0], dat.translate[timingIndex + 1][0], timing) * viewportWidth/2}px,
            ${smoothLerp(dat.translate[timingIndex][1], dat.translate[timingIndex + 1][1], timing) * viewportHeight/2}px
        )
        scale(
            ${smoothLerp(dat.scale[timingIndex], dat.scale[timingIndex + 1], timing)}
        )`;
        // Applies opacity effects.
        let opacityValue = smoothLerp(dat.opacity[timingIndex], dat.opacity[timingIndex + 1], timing);
        element.style.opacity = opacityValue;
        if (opacityValue == 0) element.style.visibility = 'hidden';
        else element.style.visibility = 'visible';

    }

}

function onMouseMove() {
    const titleText = document.getElementById('title');
    if (percentComplete > 10) {
        if (titleText == titleText.parentElement.querySelector(':hover')) {
            titleText.style.cursor = 'pointer';
            titleText.style.transform = 'scale(1.05)';
        }
        else {
            titleText.style.cursor = 'default';
            titleText.style.transform = 'scale(1)';
        }
    }
}

function smoothLerp(x, y, t) {
    return smoothstep(t) * (y - x) + x;
}

function smoothstep(t) {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    // return t * t * t * (6 * t * t - 15 * t + 10);   
    return t * t * (3 - 2 * t);
}

function checkAnswer() {
    const goodResponse = document.getElementById('radio-positive-response');
    const badResponse = document.getElementById('radio-negative-response');
    if (document.getElementById('cb-5a').checked == true) {
        goodResponse.hidden = false;
        badResponse.hidden = true;
        enableConfetti();
    }
    else {
        goodResponse.hidden = true;
        badResponse.hidden = false;
    }
}

function checkAnswers() {
    const IDs = ['cb-1b','cb-2b','cb-3b','cb-4b','cb-5b'];
    const goodResponse = document.getElementById('checkbox-positive-response');
    const badResponse = document.getElementById('checkbox-negative-response');
    let correctAnswer = true;
    for (let id of IDs) {
        let isChecked = document.getElementById(id).checked;
        if (!isChecked) correctAnswer = false;
    }
    if (correctAnswer) {
        goodResponse.hidden = false;
        badResponse.hidden = true;
        enableConfetti();
    }
    else {
        goodResponse.hidden = true;
        badResponse.hidden = false;
    }
}