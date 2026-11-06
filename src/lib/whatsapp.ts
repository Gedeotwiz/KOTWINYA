export const KOTWINYA_WHATSAPP_NUMBER = '250783801966';
export const KOTWINYA_WHATSAPP_GROUP = 'https://chat.whatsapp.com/BlHX2jr2FT6BGxqJ4d80bq?s=cl&p=a&iam=2';

export function openLeaderWhatsApp(message: string) {
  const url = `https://wa.me/${KOTWINYA_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}
