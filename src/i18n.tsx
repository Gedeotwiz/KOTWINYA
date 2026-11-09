import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Language = 'en' | 'fr' | 'rw';
const translations: Record<Language, Record<string, string>> = {
  en: {},
  fr: {
    'Language': 'Langue', Home: 'Accueil', Products: 'Produits', 'Our story': 'Notre histoire', 'Our team': 'Notre équipe', Contact: 'Contact', 'Shop our products': 'Découvrir nos produits',
    'GOOD FOR YOU. GOOD FOR COMMUNITY.': 'BON POUR VOUS. BON POUR LA COMMUNAUTÉ.', 'Everyday care,': 'Les soins du quotidien,', 'made with purpose.': 'faits avec sens.',
    'Thoughtful soaps and home care, made by our cooperative in Rwanda. Every purchase helps local women and youth build a livelihood.': 'Des savons et produits ménagers fabriqués par notre coopérative au Rwanda. Chaque achat aide les femmes et les jeunes de la région à gagner leur vie.',
    'Explore products': 'Voir les produits', 'Get to know us': 'Nous découvrir', 'Locally made, community led': 'Fabriqué localement, porté par la communauté', 'Care that goes beyond clean': 'Le soin au-delà de la propreté', 'Made in Rwanda': 'Fabriqué au Rwanda', 'with care, by hand': 'avec soin, à la main',
    'Nature inspired': 'Inspiré par la nature', 'Community powered': 'Porté par la communauté', 'Proudly Rwandan': 'Fièrement rwandais', 'NATURAL INGREDIENTS': 'INGRÉDIENTS NATURELS', 'COMMUNITY EMPOWERMENT': 'AUTONOMISATION COMMUNAUTAIRE', 'PROUDLY MADE IN RWANDA': 'FIÈREMENT FABRIQUÉ AU RWANDA', 'DELIVERY ACROSS RWANDA': 'LIVRAISON AU RWANDA',
    'CARE FOR EVERYDAY': 'LE SOIN AU QUOTIDIEN', 'Made for your home.': 'Pensé pour votre maison.', 'Rooted in our community.': 'Ancré dans notre communauté.', 'Simple, dependable essentials crafted with care. Find the right fit for your daily routine.': 'Des essentiels simples et fiables, préparés avec soin. Trouvez ceux qui conviennent à votre quotidien.', 'All products': 'Tous les produits', Soaps: 'Savons', 'Home care': 'Entretien ménager', 'Search products': 'Rechercher des produits', 'Buy on WhatsApp ↗': 'Acheter sur WhatsApp ↗', 'No WhatsApp? Ask in website chat': 'Pas de WhatsApp ? Écrivez-nous ici',
    'OUR STORY': 'NOTRE HISTOIRE', 'A little care can': 'Un peu de soin peut', 'change a lot.': 'tout changer.', 'Meet the cooperative': 'Rencontrer la coopérative', 'community led': 'dirigé par la communauté', 'Made': 'Fabriqué', 'with care in Rwanda': 'avec soin au Rwanda', 'One': 'Un', 'purchase makes a difference': 'achat fait la différence',
    'A BETTER KIND OF EVERYDAY': 'UN QUOTIDIEN MEILLEUR', 'Care with a': 'Le soin avec', 'purpose.': 'un objectif.', 'Thoughtful ingredients': 'Des ingrédients choisis', 'Shared opportunity': 'Des opportunités partagées', 'Made close to home': 'Fabriqué près de chez vous',
    'MEET THE PEOPLE BEHIND KOTWINYA': 'RENCONTREZ L’ÉQUIPE DE KOTWINYA', 'Talk with our': 'Échangez avec notre', 'team.': 'équipe.', 'Reach out to our cooperative lead with questions, ideas, or to arrange a time to talk.': 'Contactez notre responsable pour vos questions, vos idées ou pour convenir d’un rendez-vous.', 'COOPERATIVE LEADER': 'RESPONSABLE DE LA COOPÉRATIVE', 'Chat on WhatsApp': 'Écrire sur WhatsApp',
    'WE’D LOVE TO HEAR FROM YOU': 'NOUS SERIONS RAVIS DE VOUS LIRE', "WE'D LOVE TO HEAR FROM YOU": 'NOUS SERIONS RAVIS DE VOUS LIRE', "Let's talk": 'Parlons', 'good things.': 'de belles choses.', 'Questions about an order, wholesale, or the cooperative? Send us a message and our team will get back to you.': 'Une question sur une commande, la vente en gros ou la coopérative ? Envoyez-nous un message.', 'CALL OR WHATSAPP': 'APPELER OU WHATSAPP', 'EMAIL US': 'NOUS ÉCRIRE', 'FIND US': 'NOUS TROUVER', 'SEND A MESSAGE': 'ENVOYER UN MESSAGE', 'Message our team': 'Écrire à notre équipe', 'Your name': 'Votre nom', 'Email address': 'Adresse e-mail', 'Your message': 'Votre message', 'Continue in WhatsApp': 'Continuer sur WhatsApp', 'I don’t use WhatsApp — chat here': 'Je n’utilise pas WhatsApp — écrire ici',
    'LET’S STAY CONNECTED': 'RESTONS EN CONTACT', "LET'S STAY CONNECTED": 'RESTONS EN CONTACT', 'Good things grow': 'Les belles choses grandissent', 'when we': 'quand nous', 'share.': 'partageons.', 'Join WhatsApp group': 'Rejoindre le groupe WhatsApp', Explore: 'Découvrir', 'Contact us': 'Nous contacter', 'Say hello': 'Dites bonjour', 'Website live chat': 'Messagerie du site', 'WhatsApp the leader ↗': 'Écrire au responsable ↗',
  },
  rw: {
    Language: 'Ururimi', Home: 'Ahabanza', Products: 'Ibicuruzwa', 'Our story': 'Ibyacu', 'Our team': 'Itsinda ryacu', Contact: 'Twandikire', 'Shop our products': 'Reba ibicuruzwa',
    'GOOD FOR YOU. GOOD FOR COMMUNITY.': 'BYIZA KURI WOWE. BYIZA KU MURYANGO.', 'Everyday care,': 'Kwiyitaho buri munsi,', 'made with purpose.': 'bikozwe bifite intego.',
    'Thoughtful soaps and home care, made by our cooperative in Rwanda. Every purchase helps local women and youth build a livelihood.': 'Isabune n’ibikoresho by’isuku byo mu rugo bikozwe na koperative yacu mu Rwanda. Buri gicuruzwa uguze gifasha abagore n’urubyiruko kubona imibereho.',
    'Explore products': 'Reba ibicuruzwa', 'Get to know us': 'Menya ibitwerekeyeho', 'Locally made, community led': 'Bikorerwa iwacu, biyobowe n’abaturage', 'Care that goes beyond clean': 'Isuku irenze gukaraba', 'Made in Rwanda': 'Byakorewe mu Rwanda', 'with care, by hand': 'byakozwe n’intoki kandi neza',
    'Nature inspired': 'Byahumetswe na kamere', 'Community powered': 'Bishyigikiwe n’abaturage', 'Proudly Rwandan': 'By’Abanyarwanda', 'NATURAL INGREDIENTS': 'IBIKORWA BIVA KURI KAMERE', 'COMMUNITY EMPOWERMENT': 'GUTEZA IMBERE ABATURAGE', 'PROUDLY MADE IN RWANDA': 'BYAKOREWE MU RWANDA', 'DELIVERY ACROSS RWANDA': 'BIGEZW AHO MU RWANDA HOSE',
    'CARE FOR EVERYDAY': 'KWITA KU BURI MUNSI', 'Made for your home.': 'Byagenewe urugo rwawe.', 'Rooted in our community.': 'Bishingiye ku muryango wacu.', 'Simple, dependable essentials crafted with care. Find the right fit for your daily routine.': 'Ibikoresho by’ingenzi byizewe kandi bikozwe neza. Hitamo ibikubereye buri munsi.', 'All products': 'Ibicuruzwa byose', Soaps: 'Amasabune', 'Home care': 'Isuku yo mu rugo', 'Search products': 'Shakisha ibicuruzwa', 'Buy on WhatsApp ↗': 'Gura kuri WhatsApp ↗', 'No WhatsApp? Ask in website chat': 'Nta WhatsApp? Twandikire hano',
    'OUR STORY': 'IBYACU', 'A little care can': 'Kwita ku kantu gato', 'change a lot.': 'bishobora guhindura byinshi.', 'Meet the cooperative': 'Menya koperative', 'community led': 'biyobowe n’abaturage', 'Made': 'Byakozwe', 'with care in Rwanda': 'neza mu Rwanda', 'One': 'Kimwe', 'purchase makes a difference': 'uguze kigira icyo gihindura',
    'A BETTER KIND OF EVERYDAY': 'KUBAHO NEZA BURI MUNSI', 'Care with a': 'Kwita ku bandi bifite', 'purpose.': 'intego.', 'Thoughtful ingredients': 'Ibikoresho byatoranyijwe neza', 'Shared opportunity': 'Amahirwe asangiwe', 'Made close to home': 'Byakorewe hafi yacu',
    'MEET THE PEOPLE BEHIND KOTWINYA': 'MENYA ABANTU BA KOTWINYA', 'Talk with our': 'Vugana n', 'team.': '’itsinda ryacu.', 'Reach out to our cooperative lead with questions, ideas, or to arrange a time to talk.': 'Baza umuyobozi wa koperative ibibazo, ibitekerezo cyangwa utegure igihe cyo kuganira.', 'COOPERATIVE LEADER': 'UMUYOBOZI WA KOPERATIVE', 'Chat on WhatsApp': 'Vugana kuri WhatsApp',
    "WE'D LOVE TO HEAR FROM YOU": 'TWISHIMIRA KUMVA IBITEKEREZO BYAWE', 'WE’D LOVE TO HEAR FROM YOU': 'TWISHIMIRA KUMVA IBITEKEREZO BYAWE', "Let's talk": 'Reka tuganire ku', 'good things.': 'bintu byiza.', 'Questions about an order, wholesale, or the cooperative? Send us a message and our team will get back to you.': 'Ufite ikibazo ku bicuruzwa, kugura byinshi cyangwa koperative? Twandikire, turagusubiza.', 'CALL OR WHATSAPP': 'DUHAMAGARE CYANGWA WHATSAPP', 'EMAIL US': 'TWANDIKIRE kuri EMAIL', 'FIND US': 'TUBONE', 'SEND A MESSAGE': 'OHEREZA UBUTUMWA', 'Message our team': 'Andikira itsinda ryacu', 'Your name': 'Amazina yawe', 'Email address': 'Imeyili yawe', 'Your message': 'Ubutumwa bwawe', 'Continue in WhatsApp': 'Komeza kuri WhatsApp', 'I don’t use WhatsApp — chat here': 'Nta WhatsApp nkoresha — vugana natwe hano',
    'LET’S STAY CONNECTED': 'DUKOMEZE KUJYA TUVUGANA', "LET'S STAY CONNECTED": 'DUKOMEZE KUJYA TUVUGANA', 'Good things grow': 'Ibintu byiza birakura', 'when we': 'iyo', 'share.': 'dusangiye.', 'Join WhatsApp group': 'Injira muri WhatsApp group', Explore: 'Reba', 'Contact us': 'Twandikire', 'Say hello': 'Tuvugishe', 'Website live chat': 'Ikiganiro kuri uru rubuga', 'WhatsApp the leader ↗': 'Andikira umuyobozi kuri WhatsApp ↗',
  },
};

Object.assign(translations.fr, {
  'Small batches. Shared success.': 'Petites séries. Réussite partagée.',
  'KOTWINYA is a community cooperative creating quality soaps and home care products while opening doors to skills, confidence, and income.': 'KOTWINYA est une coopérative communautaire qui fabrique des savons et des produits ménagers de qualité, tout en ouvrant des perspectives de compétences, de confiance et de revenus.',
  'Based in Nyabiheke, our members learn by making. Together we turn practical skills into products families can trust and opportunities that reach beyond our workshop.': 'À Nyabiheke, nos membres apprennent en fabriquant. Ensemble, nous transformons des compétences pratiques en produits fiables pour les familles et en possibilités qui dépassent notre atelier.',
  '“When our community grows, we all grow.”': '« Quand notre communauté grandit, nous grandissons tous. »',
  'Made with care for the routines and spaces that matter to you.': 'Fabriqué avec soin pour les habitudes et les espaces qui comptent pour vous.',
  'Your purchase helps local members build skills and steady income.': 'Votre achat aide les membres de la région à acquérir des compétences et un revenu stable.',
  'Produced in Nyabiheke and delivered across Rwanda.': 'Fabriqué à Nyabiheke et livré partout au Rwanda.',
  'Talk with our cooperative lead with questions, ideas, or to arrange a time to talk.': 'Contactez notre responsable pour vos questions, vos idées ou pour convenir d’un rendez-vous.',
  "Tell us what you're looking for...": 'Dites-nous ce que vous recherchez...',
  'WhatsApp opens a direct message to the cooperative lead. Website chat is also available.': 'WhatsApp ouvre une conversation directe avec le responsable de la coopérative. La messagerie du site est également disponible.',
  'Everyday care, made with purpose.': 'Les soins du quotidien, faits avec sens.',
  'A cooperative rooted in community.': 'Une coopérative ancrée dans la communauté.',
  'KOTWINYA Cooperative. Made with care in Rwanda.': 'Coopérative KOTWINYA. Fabriqué avec soin au Rwanda.',
  'Community is at the heart of everything.': 'La communauté est au cœur de tout.',
  'Join our cooperative WhatsApp group for product updates and community news.': 'Rejoignez le groupe WhatsApp de notre coopérative pour recevoir des nouvelles des produits et de la communauté.',
});
Object.assign(translations.rw, {
  'Small batches. Shared success.': 'Dukora bike. Tugatera imbere hamwe.',
  'KOTWINYA is a community cooperative creating quality soaps and home care products while opening doors to skills, confidence, and income.': 'KOTWINYA ni koperative y’abaturage ikora amasabune n’ibikoresho by’isuku byo mu rugo, inafasha abantu kugira ubumenyi, icyizere n’amafaranga.',
  'Based in Nyabiheke, our members learn by making. Together we turn practical skills into products families can trust and opportunities that reach beyond our workshop.': 'Dukorera i Nyabiheke, abanyamuryango bigira mu gukora. Duhindura ubumenyi ibintu bifasha imiryango n’amahirwe agera no hanze y’aho dukorera.',
  '“When our community grows, we all grow.”': '“Iyo umuryango wacu utera imbere, twese dutera imbere.”',
  'Made with care for the routines and spaces that matter to you.': 'Byakozwe neza kugira ngo bihuze n’ibyo ukenera buri munsi.',
  'Your purchase helps local members build skills and steady income.': 'Ibyo uguze bifasha abanyamuryango kongera ubumenyi no kubona amafaranga ahoraho.',
  'Produced in Nyabiheke and delivered across Rwanda.': 'Byakorewe i Nyabiheke kandi bigatangwa mu Rwanda hose.',
  'Talk with our cooperative lead with questions, ideas, or to arrange a time to talk.': 'Baza umuyobozi wa koperative ibibazo, umuhe ibitekerezo cyangwa utegure igihe cyo kuganira.',
  "Tell us what you're looking for...": 'Tubwire icyo ushaka...',
  'WhatsApp opens a direct message to the cooperative lead. Website chat is also available.': 'WhatsApp igufasha kwandikira umuyobozi wa koperative. Ushobora no kuganira natwe kuri uru rubuga.',
  'Everyday care, made with purpose.': 'Kwiyitaho buri munsi, bifite intego.',
  'A cooperative rooted in community.': 'Koperative ishingiye ku muryango.',
  'KOTWINYA Cooperative. Made with care in Rwanda.': 'Koperative KOTWINYA. Byakozwe neza mu Rwanda.',
  'Community is at the heart of everything.': 'Umuryango ni wo shingiro rya byose.',
  'Join our cooperative WhatsApp group for product updates and community news.': 'Injira muri WhatsApp group ya koperative umenye amakuru y’ibicuruzwa n’ay’abaturage.',
});

const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void; t: (text: string) => string } | null>(null);
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('kotwinya-language');
    return saved === 'fr' || saved === 'rw' ? saved : 'en';
  });
  useEffect(() => { localStorage.setItem('kotwinya-language', language); document.documentElement.lang = language; }, [language]);
  const t = (text: string) => translations[language][text] ?? text;
  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}
export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('useLanguage must be used inside LanguageProvider');
  return value;
}
