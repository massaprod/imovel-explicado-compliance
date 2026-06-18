# Google Ads - diagnostico dos primeiros cliques

## Diagnostico

Os primeiros cliques do Google Ads nao devem ser usados como conclusao definitiva de oferta, preco ou pagina. Eles ocorreram antes da camada completa de rastreamento e reconciliacao por `lead_id`.

## O que sabemos

- A campanha Search foi publicada.
- Houve cliques reais.
- Houve ao menos duas conversas no WhatsApp no periodo, mas sem atribuicao confiavel.
- Antes da correcao, o evento de WhatsApp podia nao ser computado no Ads ou podia faltar identificador na mensagem.

## O que nao sabemos com seguranca

- Quais termos geraram as duas mensagens.
- Se os usuarios viram preco.
- Se rolaram a pagina.
- Se clicaram no CTA correto.
- Se abandonaram antes do WhatsApp.
- Se abriram WhatsApp e nao enviaram mensagem.

## Como analisar daqui para frente

1. Usar URL final com UTMs e preservacao de `gclid`.
2. Conferir `landing_page_view`, `time_30s`, `scroll_50`, `scroll_75` e `click_whatsapp_qualificado`.
3. Registrar todo WhatsApp recebido na planilha pelo `lead_id`.
4. Separar leads por termo, pagina e campanha.
5. Avaliar custo por WhatsApp e custo por lead qualificado, nao apenas CPC.

## Criterio de decisao

- Se Google gerar WhatsApp com custo aceitavel, priorizar Search.
- Se tiver muitos cliques sem `time_15s`, revisar termo e promessa do anuncio.
- Se tiver engajamento sem WhatsApp, revisar CTA, oferta, preco e confianca.
