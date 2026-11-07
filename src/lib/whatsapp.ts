export const KOTWINYA_WHATSAPP_NUMBER = '250783801966';
export const KOTWINYA_WHATSAPP_GROUP = 'https://chat.whatsapp.com/BlHX2jr2FT6BGxqJ4d80bq?s=cl&p=a&iam=2';

export function openLeaderWhatsApp(message: string) {
  const url = `https://wa.me/${KOTWINYA_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

export async function orderProductOnWhatsApp(message: string, imagePath: string, productName: string) {
  const imageUrl = new URL(imagePath, window.location.origin).href;

  // On supported phones, share the actual image file so WhatsApp can attach it
  // to the message. wa.me itself only accepts text and cannot attach media.
  if (typeof navigator.share === 'function' && typeof navigator.canShare === 'function') {
    try {
      const response = await fetch(imageUrl);
      if (response.ok) {
        const image = await response.blob();
        const extension = image.type.split('/')[1]?.replace('jpeg', 'jpg') || 'jpg';
        const file = new File([image], `${productName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.${extension}`, { type: image.type || 'image/jpeg' });
        const shareData = { title: productName, text: message, files: [file] };
        if (navigator.canShare(shareData)) {
          await navigator.share(shareData);
          return;
        }
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      // Continue with the text and public image link if native sharing fails.
    }
  }

  openLeaderWhatsApp(`${message}\nProduct image: ${imageUrl}`);
}
