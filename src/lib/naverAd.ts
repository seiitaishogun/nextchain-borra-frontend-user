const initScript = ({ el, id }: { el?: string; id?: string }) => {
  const defaultId = 'naver-ad-init';
  const b = document.querySelectorAll(`script[id=${id || defaultId}]`);
  b.forEach(e => e.remove());

  const naverAd = document.createElement('script');
  naverAd.id = id || defaultId;
  naverAd.type = 'text/javascript';
  naverAd.src = 'https://wcs.naver.net/wcslog.js';

  if (el) {
    document.querySelector(el)?.appendChild(naverAd);
  } else {
    document.body.appendChild(naverAd);
  }
};

const initHistoryChangeScript = () => {
  const id = 'init-naver-script-transform';
  const b = document.querySelector(`script[id=${id}]`);
  b?.remove();

  const naverAdTransform = document.createElement('script');
  naverAdTransform.id = id;
  naverAdTransform.type = 'text/javascript';
  naverAdTransform.innerHTML = `
    if(!wcs_add) var wcs_add ={};
    wcs_add["wa"] = "${process.env.NAVER_AD_ID}";
    if (!_nasa) var _nasa ={};
    if (window.wcs){
      window.wcs.inflow();
      wcs_do(_nasa);
    }
    `;
  document.body.appendChild(naverAdTransform);
};

const naverAdTrackContainerKey = 'naver-ad-container';

const naverAdTrack = ({
  key,
  value,
}: {
  key: number | string;
  value: number | string;
}) => {
  const beforeInitScript = document.querySelector('#naver-ad-track-init');
  beforeInitScript?.remove();

  initScript({
    el: `#${naverAdTrackContainerKey}`,
    id: 'naver-ad-track-init',
  });

  const beforeScript = document.querySelector('#naver-ad-track-script');
  beforeScript?.remove();

  const naverAdTrackScript = document.createElement('script');
  naverAdTrackScript.id = 'naver-ad-track-script';
  naverAdTrackScript.type = 'text/javascript';
  naverAdTrackScript.innerHTML = `
    var _nasa={};
    if(window.wcs) _nasa["cnv"] = wcs.cnv("${key}","${value}");
  `;

  document
    .querySelector(`#${naverAdTrackContainerKey}`)
    ?.appendChild(naverAdTrackScript);

  initHistoryChangeScript();
};

const initNaverAd = () => {
  initScript({});
  initHistoryChangeScript();
};

export { naverAdTrack, initNaverAd, naverAdTrackContainerKey };
