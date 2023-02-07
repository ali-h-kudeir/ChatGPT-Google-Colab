// import Browser from 'webextension-polyfill';

export function getPossibleElementByQuerySelector<T extends Element>(queryArray: string[], source?: Element): T[] {
  for (const query of queryArray) {
    const elements = (source ?? document).querySelectorAll(query) as unknown as T[];
    return elements;
  }
  return [];
}

export function isBraveBrowser() {
  return (navigator as any).brave?.isBrave();
}

export async function shouldShowRatingTip() {
  return true;
  // const { ratingTipShowTimes = 0 } = await Browser.storage.local.get('ratingTipShowTimes');
  // if (ratingTipShowTimes >= 5) {
  //   return false;
  // }
  // await Browser.storage.local.set({ ratingTipShowTimes: ratingTipShowTimes + 1 });
  // return ratingTipShowTimes >= 2;
}
