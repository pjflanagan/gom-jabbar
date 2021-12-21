
// Util

const MAX_IMAGE_ID = 21;
const DURATION = (Math.random() * 12 + 28) * 1000;

function getCurrentTime() {
  return new Date().getTime();
}

function makeGifUrl(name) {
  return `./img/gif/${name}.gif`;
}

function makeBgUrl(name) {
  return `./img/bg/${name}.jpg`;
}

// Text

const TRIAL_SUBTITLES = [
  'IT BURNS!',
  'Fear is the mind killer.',
  'Your mom is outside absolutley losing it.',
  `An animal caught in a trap will knaw off its leg...`,
  '...what will you do?',
];

const DEATH_SUBTITLES = [
  'Give up your water.',
  'Fear was the mind killer.',
  // ''
];


const VICTORY_SUBTITLES = [
  'Congratulations Paul, enjoy your Dune.',
  `Spoiler: your dad won't be so lucky`,
  // ''
];

function getRandomPhrase(phrases) {
  return phrases[Math.floor(Math.random() * phrases.length)];
}

// UI

function setTitleText(text) {
  $('#title').text(text);
}

function setSubtitleText(text) {
  $('#sub-title').text(text);
}

function setCoverColor(color) {
  $('#page-cover').css({
    backgroundColor: color,
    // opactity
  })
}

function setBackgroundImage(url) {
  $('#background-image').css({
    backgroundImage: url ? `url(${url})` : 'none'
  });
}

function setBackgroundToRandomImage() {
  const n = Math.floor(Math.random() * (MAX_IMAGE_ID + 1));
  setBackgroundImage(makeGifUrl(`giphy-${n}`));
}

function makeGameoverScreen(didSurvive) {
  if (didSurvive) {
    setTitleText('You are human');
    setSubtitleText(getRandomPhrase(VICTORY_SUBTITLES));
    setCoverColor('#75d10f');
    setBackgroundImage(makeGifUrl('victory'));
    return;
  } 
  setTitleText('You died');
  setSubtitleText(getRandomPhrase(DEATH_SUBTITLES));
  setCoverColor('#cb0e0e');
  setBackgroundImage(makeBgUrl('gom-jabbar'));
}

// Trial

function makeTrial() {
  let trialEndTime;
  let timeout;
  let ahhh = 'AHHH';

  function gameover(didSurvive) {
    clearTimeout(timeout);
    makeGameoverScreen(didSurvive);
  }

  const startTrial = () => {

    // if we started a trial, do not restart
    if (trialEndTime) {
      console.error('Already ran trial');
      return;
    }
    setTitleText(ahhh);
    setSubtitleText(getRandomPhrase(TRIAL_SUBTITLES));
    setBackgroundToRandomImage();

    // set the end time of the trial
    trialEndTime = getCurrentTime() + DURATION;

    function loop() {
      const interval = Math.random() * 2000 + 1200;
      timeout = setTimeout(() => {
        setTitleText(ahhh += 'H');
        setSubtitleText(getRandomPhrase(TRIAL_SUBTITLES));
        setBackgroundToRandomImage();
  
        // if the trial is over, end the trial
        if (getCurrentTime() > trialEndTime) {
          gameover(true);
        } else {
          loop();
        }

      }, interval);
    }

    loop();
  }

  const endTrial = () => {

    // if there is no trial started
    if (!trialEndTime) {
      return;
    }

    // if now is < than trial duration, end the trial in death
    if (getCurrentTime() < trialEndTime) {
      gameover(false);
    }
  };

  return [startTrial, endTrial];
}

// Main

const [startTrial, endTrial] = makeTrial();