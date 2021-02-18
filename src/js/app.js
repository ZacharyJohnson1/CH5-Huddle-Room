
const navigation = () => {

    const homeBtn = document.getElementById('home-btn');
    const settingsBtn = document.getElementById('settings-btn');
    const powerBtn = document.getElementById('power-btn');
    const helpBtn = document.getElementById('help-btn');
    const popupExitBtns = document.querySelectorAll('.close-btn');
    const powerCancelBtn = document.getElementById('shutdown-cancel-btn');

    const homePage = document.getElementById('home-page');
    const settingsPage = document.getElementById('settings-page');
    const powerPopup = document.getElementById('power-popup');
    const helpPopup = document.getElementById('help-popup');

    const modal = document.querySelectorAll('.modal');

    //page flips
    const pages = [
        homePage,
        settingsPage,
    ];

    const navBtns = [
        homeBtn,
        settingsBtn,
    ];

    const navMap = new Map();
    navMap.set(homeBtn, homePage);
    navMap.set(settingsBtn, settingsPage);

    //open page
    navBtns.forEach(btn => btn.addEventListener('click', () => {
        pages.forEach(page => page.style.display = 'none');
        navBtns.forEach(b => b.classList.remove('nav-btn-selected'));
        const activePage = navMap.get(btn);
        activePage.style.display = 'block';
        btn.classList.add('nav-btn-selected');
    }));

    //popups
    const popups = [
        powerPopup,
        helpPopup
    ];

    const popupBtns = [
        powerBtn,
        helpBtn
    ];

    const popupMap = new Map();
    popupMap.set(powerBtn, powerPopup);
    popupMap.set(helpBtn, helpPopup);

    //open popups
    popupBtns.forEach(btn => btn.addEventListener('click', () => {
        popups.forEach(popup => popup.style.display = 'none');
        const activePopup = popupMap.get(btn);
        activePopup.style.display = 'flex';
        btn.classList.add('nav-btn-selected');
    }));

    //close popups
    popupExitBtns.forEach(btn => btn.addEventListener('click', () => {
        popups.forEach(popup => { popup.style.display = 'none';});
        popupBtns.forEach(btn => {
            btn.classList.remove('nav-btn-selected');
        });
    }));

    modal.forEach(() => window.addEventListener('click', (e) => {
        if (popups.includes(e.target)) {
            e.target.style.display = 'none';
            popupBtns.forEach(btn => {
                btn.classList.remove('nav-btn-selected');
            });
        }
    }));

    //cancel shutdown
    powerCancelBtn.addEventListener('click', () => {
        powerPopup.style.display = 'none';
        powerBtn.classList.remove('nav-btn-selected');
    });

    //on load
    pages.forEach(page => page.style.display = 'none');
    homePage.style.display = 'block';
    navBtns.forEach(b => b.classList.remove('nav-btn-selected'));
    homeBtn.classList.add('nav-btn-selected');

    CrComLib.publishEvent("b", 1, true);
    CrComLib.publishEvent("s", 1, "testing serial 1");
    // CrComLib.subscribeState("b", 1, (value) => {
    //     console.log(value);
    // });
}



const sourceSelection = () => {

    const src1Btn = document.getElementById('source-01-select-btn');
    const src2Btn = document.getElementById('source-02-select-btn');
    const src3Btn = document.getElementById('source-03-select-btn');

    const srcBtns = [
        src1Btn, 
        src2Btn, 
        src3Btn
    ];

    const srcBtnJoins = new Map();
    srcBtnJoins.set(src1Btn, 20);
    srcBtnJoins.set(src2Btn, 21);
    srcBtnJoins.set(src3Btn, 22);

    //source select events
    srcBtns.forEach(btn => btn.addEventListener('click', () => {
        CrComLib.publishEvent("b", srcBtnJoins.get(btn), true);
        CrComLib.publishEvent("b", srcBtnJoins.get(btn), false);
    }));

    //source select feedback
    srcBtns.forEach(btn => CrComLib.subscribeState("b", srcBtnJoins.get(btn), (value) => {
        if (value) srcBtnInterlock(srcBtns, btn);
    }));

    const srcBtnInterlock = (btns, btn) => {
        btns.forEach(b => b.classList.remove('src-btn-selected'));
        btn.classList.add('src-btn-selected');
    }
}

const displayPower = () => {

}

const dateTimeText = document.getElementById('date-time');
const setDateTime = () => {

    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = (hours >= 12) ? 'PM' : 'AM';
    if (hours > 12) hours -= 12;
    if (minutes < 10) minutes = '0' + minutes;

    let dateStr = `<h3>${hours}:${minutes} ${ampm}</h3>
                <h3>${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</h3>`;
    dateTimeText.innerHTML = dateStr;
}

setDateTime();
window.setInterval(setDateTime, 60000);
navigation();
sourceSelection();
displayPower();