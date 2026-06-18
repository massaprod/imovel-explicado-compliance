# Diagnostico de tracking atual

Data: 2026-06-18

## Status

GO COM RESSALVAS.

O funil agora tem camada central de tracking para as principais landings, triagem e pagina de obrigado. Tambem foram corrigidos pontos de fragmentacao em paginas antigas, home, aluguel direto, contratos e blog.

## O que existia

- Google Tag Manager em paginas principais via `GTM-TX2GTPFL`.
- Google Ads conversion id `AW-18245604135` nas landings principais.
- Meta Pixel atual `998092116298334` nas landings principais.
- Evento `click_whatsapp_qualificado` ja havia sido iniciado nas paginas de maior prioridade.
- Eventos basicos de formulario e page view existiam, mas estavam fragmentados.

## Problemas encontrados

- Triagem e paginas do ecossistema ainda usavam pixel antigo `1277173217718163`.
- Alguns fluxos de WhatsApp geravam mensagem sem `lead_id`.
- As duas mensagens recebidas no WhatsApp antes desta correcao nao carregavam identificador reconciliavel.
- Parte das paginas antigas tinha rastreamento proprio, sem persistencia forte de `gclid`, `fbclid`, first touch e last touch.
- O Google Ads registrava clique, mas nao havia garantia de conversao se o usuario abria WhatsApp antes do disparo seguro do evento.

## O que pode explicar WhatsApp sem conversao computada

- Clique ocorreu antes da conversao `click_whatsapp_qualificado` estar consolidada.
- O lead veio por link antigo ou por pagina com tracker fragmentado.
- A mensagem do WhatsApp nao tinha `Codigo: IE-...`, impedindo reconciliacao manual.
- Pixel/tag podiam estar carregando tarde ou em pixel divergente.
- A conversao do Google/Meta depende do evento no navegador; se o app do WhatsApp abre rapido demais, o evento precisa ser enviado antes da navegacao.

## Correcao aplicada

- Helper central `assets/imovel-tracking.js` ampliado.
- Captura e persistencia de UTMs, `gclid`, `gbraid`, `wbraid`, `fbclid`, referrer, first touch e last touch.
- `lead_id` curto gerado no formato `IE-YYYYMMDD-XXXX`.
- WhatsApp passa por handler comum nas paginas principais.
- Eventos comportamentais adicionados: tempo, scroll, secoes, CTA, formulario, WhatsApp e leads.
- Meta Pixel unificado para `998092116298334`.

## Ressalvas

- As mensagens recebidas antes da correcao nao sao retroativas.
- Validacao final precisa ser feita no Tag Assistant, GA4 DebugView e Meta Events Manager.
- Venda real continua dependendo de conciliacao manual no CRM ate existir integracao de pagamento/backend.
