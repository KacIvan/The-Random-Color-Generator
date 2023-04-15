function copyUrl() {
    navigator.clipboard.writeText(window.location.href);
};

const copyBtn = document.querySelector('.copy-link');
copyBtn.addEventListener('click', copyUrl);

function checkTextColor(text, color) {
    const luminance = chroma(color).luminance();
    text.style.color = luminance > 0.5 ? 'black' : 'white';
};

function copyToClickboard(text) {
    return navigator.clipboard.writeText(text);
};

const cols = document.querySelectorAll('.col');

function setRandomColors(isInitial) {
    const colors = isInitial ? getColorsFromHash() : [];

    cols.forEach((col, index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock');
        const text = col.querySelector('h2');
        const button = col.querySelector('button');

        if (isLocked) {
            colors.push(text.textContent);
            return;
        }

        const color = isInitial
            ? colors[index]
                ? colors[index]
                : chroma.random()
            : chroma.random();

        if (!isInitial) {
            colors.push(color);
        }

        text.textContent = color;
        col.style.background = color;

        checkTextColor(text, color);
        checkTextColor(button, color);
    })

    updateColorsHash(colors);
};


function updateColorsHash(colors = []) {
    document.location.hash = colors.map((col) => col.toString().substring(1)).join('-');
};


function getColorsFromHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash
            .substring(1)
            .split('-')
            .map(color => '#' + color);
    }
    return [];
};


document.addEventListener('keydown', (event) => {
    event.preventDefault();
    if (event.code.toLowerCase() === 'space') {
        setRandomColors();
    }
});


document.addEventListener('click', event => {
    const type = event.target.dataset.type;

    if (type === 'lock') {
        const node = event.target.tagName.toLowerCase() === 'i'
            ? event.target
            : event.target.children[0];

        node.classList.toggle('fa-lock-open');
        node.classList.toggle('fa-lock');
    } else if (type === 'copy') {
        copyToClickboard(event.target.textContent);
    }
});

setRandomColors(true);