# Live chat setup

The site uses the hosted tawk.to widget, so KOTWINYA can reply to website chat visitors from the tawk.to inbox or mobile app without running a custom chat backend. The widget appears after its property and widget IDs are configured.

1. Create a tawk.to account and add the KOTWINYA website as a property.
2. In the dashboard, open **Administration → Chat Widget** and copy the widget code. The embed URL contains the property ID and widget ID.
3. Copy `.env.example` to `.env.local` and fill in the two values:

   ```env
   VITE_TAWK_PROPERTY_ID=your-property-id
   VITE_TAWK_WIDGET_ID=your-widget-id
   ```

4. Restart the Vite development server. In production, set the same `VITE_` variables in the hosting provider’s build environment and redeploy.
5. Add Gedeon and any other cooperative leaders as agents in the tawk.to property so they can answer chats.

## Optional WhatsApp Business sync

The **Buy Now**, contact form, and cooperative-leader actions open a direct WhatsApp conversation with `+250783801966`, prefilled with the visitor's request. Replies continue in that WhatsApp conversation. The group button opens the supplied WhatsApp group invite.

To see one-to-one WhatsApp conversations in tawk.to as well, connect the leader's WhatsApp Business account in tawk.to under **Administration → Integrations → Messaging → WhatsApp**. WhatsApp Coexistence can keep an eligible WhatsApp Business App number usable on the phone while syncing one-to-one messages to tawk.to. It requires Meta Business Manager access and an eligible WhatsApp Business account. **WhatsApp group chats do not sync to tawk.to.**

Website live-chat conversations and WhatsApp conversations remain separate threads: a message sent through the tawk.to website widget goes to the tawk.to inbox, while Buy Now/contact messages sent through WhatsApp go to the WhatsApp app and, if connected, the WhatsApp channel in tawk.to. A reply in WhatsApp will not appear inside the website widget conversation.

While tawk.to IDs are missing, clicking the website live-chat action explains that chat setup is pending and shows phone/email contact options.

Provider setup: [Adding the tawk.to widget](https://help.tawk.to/article/adding-a-widget-to-your-website), [connecting WhatsApp](https://help.tawk.to/article/connecting-whatsapp-to-tawkto), and [WhatsApp Coexistence](https://help.tawk.to/article/connecting-whatsapp-to-tawkto-with-whatsapp-coexistence). tawk.to's [FAQ](https://www.tawk.to/faqs/) describes its self-managed chat as free.
