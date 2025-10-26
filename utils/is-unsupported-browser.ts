export const isUnsupportedBrowser = () => {
	if (typeof navigator === 'undefined') return false;

	const ua = navigator.userAgent.toLowerCase();

	const isSafari =
		ua.includes('safari') &&
		!ua.includes('chrome') &&
		!ua.includes('chromium') &&
		!ua.includes('android') &&
		!ua.includes('firefox');

	const isChromeOniOS = ua.includes('crios');

	return isSafari || isChromeOniOS;
};
