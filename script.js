
// Util

const MAX_IMAGE_ID = 25;
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

function getRandomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
} 

// Colors

const BACKGROUND_TRIAL_COLORS = [
  '#cb0e0e',
  '#d45f39',
  '#dc8540',
  '#cd4518',
  '#a91010'
];

function getRandomColor() {
  return getRandomFromArray(BACKGROUND_TRIAL_COLORS);
}

// Text

const TRIAL_SUBTITLES = [
  'IT BURNS!',
  'Fear is the mind killer.',
  'Your mom is outside absolutley losing it.',
  `An animal caught in a trap will knaw off its leg...`,
  '...what will you do?',
  `What's in the box? Pain.`,
  'IIIII AAAAM, SHAKIRAAAAAAAA!',
  `It's like a sci-fi microwave or something`
];

const DEATH_SUBTITLES = [
  'Give up your water.',
  'Fear was the mind killer.',
  // 'IIIII AAAAM, SHAKIRAAAAAAAA!'
  // ''
];


const VICTORY_SUBTITLES = [
  'Congratulations Paul, enjoy your Dune.',
  `Spoiler: your old man won't be so lucky`,
  // ''
];

function getRandomPhrase(phrases) {
  return getRandomFromArray(phrases);
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
  });
}

function setBackgroundCoverColor(color) {
  $('#background-cover').css({
    backgroundColor: color,
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

function setAnimation(elem, animation) {
  $(`#${elem}`).addClass(animation);
}

function removeAnimation(elem, animation) {
  $(`#${elem}`).removeClass(animation);
}

function makeGameoverScreen(didSurvive) {
  removeAnimation('text-animator', 'shake');
  removeAnimation('background-image', 'shake');
  if (didSurvive) {
    setTitleText('You are human');
    setSubtitleText(getRandomPhrase(VICTORY_SUBTITLES));
    setCoverColor('#d19e0f');
    setBackgroundImage(makeGifUrl('victory'));
    return;
  } 
  setTitleText('You died');
  setSubtitleText(getRandomPhrase(DEATH_SUBTITLES));
  setCoverColor('#780404');
  setBackgroundImage(makeBgUrl('gom-jabbar'));
}

function makeTrialScreen(ahhh) {
  setTitleText(ahhh);
  setSubtitleText(getRandomPhrase(TRIAL_SUBTITLES));
  setBackgroundToRandomImage();
  setBackgroundCoverColor(getRandomColor());
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

    setAnimation('text-animator', 'shake');
    setAnimation('background-image', 'shake');
    makeTrialScreen(ahhh);

    // set the end time of the trial
    trialEndTime = getCurrentTime() + DURATION;

    function loop() {
      const interval = Math.random() * 2000 + 1200;
      timeout = setTimeout(() => {
        makeTrialScreen(ahhh += 'H');
  
        // if the trial is over, end the trial
        if (getCurrentTime() > trialEndTime) {
          gameover(true);
          return;
        } 

        loop();
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
