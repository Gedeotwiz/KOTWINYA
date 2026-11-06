interface TawkApi {
  onLoad?: () => void;
  maximize?: () => void;
  setChatInputMessage?: (message: string) => void;
  addTags?: (tags: string[]) => void;
}

declare global {
  interface Window {
    Tawk_API?: TawkApi;
    Tawk_LoadStart?: Date;
  }
}

const CHAT_UNAVAILABLE_EVENT = 'kotwinya:live-chat-unavailable';
let chatIsReady = false;
let queuedRequest: { message: string; tags: string[] } | null = null;

function dispatchUnavailable() {
  window.dispatchEvent(new CustomEvent(CHAT_UNAVAILABLE_EVENT));
}

function openWidget(message: string) {
  const api = window.Tawk_API;
  if (!api?.maximize || !api.setChatInputMessage) return false;

  api.setChatInputMessage(message);
  api.maximize();
  return true;
}

export function initializeLiveChat(propertyId?: string, widgetId?: string) {
  if (!propertyId || !widgetId) return false;
  if (document.getElementById('kotwinya-tawk-widget')) return true;

  const api = window.Tawk_API ?? {};
  api.onLoad = () => {
    chatIsReady = true;
    if (queuedRequest) {
      const request = queuedRequest;
      queuedRequest = null;
      window.Tawk_API?.addTags?.(request.tags);
      openWidget(request.message);
    }
  };
  window.Tawk_API = api;
  window.Tawk_LoadStart = new Date();

  const script = document.createElement('script');
  script.id = 'kotwinya-tawk-widget';
  script.async = true;
  script.src = `https://embed.tawk.to/${encodeURIComponent(propertyId)}/${encodeURIComponent(widgetId)}`;
  script.charset = 'UTF-8';
  script.setAttribute('crossorigin', '*');
  document.body.appendChild(script);
  return true;
}

export function requestLiveChat(message: string, tags: string[] = []) {
  if (!import.meta.env.VITE_TAWK_PROPERTY_ID || !import.meta.env.VITE_TAWK_WIDGET_ID) {
    dispatchUnavailable();
    return;
  }

  if (!chatIsReady || !openWidget(message)) {
    queuedRequest = { message, tags };
    return;
  }
  window.Tawk_API?.addTags?.(tags);
}

export { CHAT_UNAVAILABLE_EVENT };
