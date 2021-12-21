
// Util

const MAX_IMAGE_ID = 9;
const DURATION = 3000; // (Math.random() * 15 + 30) * 1000;

function getCurrentTime() {
  return new Date().getTime();
}

function makeGifUrl(name) {
  return `./gif/${name}.gif`;
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

// Trial

function makeTrial() {
  let trialEndTime;
  let interval;
  let ahhh = 'AHHH';

  function gameover(didSurvive) {
    clearInterval(interval);

    if (didSurvive) {
      setTitleText('You are human');
      setSubtitleText('Congratulations Paul, enjoy your Dune');
      setCoverColor('#0f0');
      setBackgroundImage(makeGifUrl('victory'));

    } else {
      setTitleText('You died');
      setSubtitleText('');
      setCoverColor('#f00');
      // setBackgroundImage();
    }
  }

  const startTrial = () => {

    // if we started a trial, do not restart
    if (trialEndTime) {
      console.error('Already ran trial');
      return;
    }
    setTitleText('');
    setSubtitleText(ahhh);
    setBackgroundToRandomImage();

    // set the end time of the trial
    trialEndTime = getCurrentTime() + DURATION;

    interval = setInterval(() => {

      setSubtitleText(ahhh += 'HHH');
      setBackgroundToRandomImage();

      // if the trial is over, end the trial
      if (getCurrentTime() > trialEndTime) {
        gameover(true);
      }
    }, 1200);
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