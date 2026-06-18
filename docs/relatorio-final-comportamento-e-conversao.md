# Relatorio final - comportamento e conversao

## Status

GO COM RESSALVAS.

Pode rodar teste pequeno com tracking corrigido, mas nao recomendo escalar verba ate validar eventos nos paineis do Google, Meta e, idealmente, Clarity.

## Diagnostico principal

As duas mensagens no WhatsApp nao foram computadas porque ocorreram antes de termos reconciliacao confiavel por `lead_id` e antes da camada de tracking estar consolidada em todas as paginas. Tambem havia fragmentacao de Meta Pixel em paginas do ecossistema.

Os primeiros cliques do Google podem ser analisados apenas parcialmente. Eles mostram interesse, mas nao permitem saber com seguranca onde houve abandono.

A Meta gerou aprendizado parcial. Sem eventos confiaveis de WhatsApp, scroll, tempo e pixel unificado, nao e correto concluir que a oferta falhou.

## Funil atual

Google:

Impressao -> clique -> page view -> tempo/scroll -> CTA -> WhatsApp -> lead qualificado -> venda

Meta:

Impressao -> clique -> landing page view -> tempo/scroll -> CTA -> WhatsApp -> lead qualificado -> venda

## Eventos implementados

Funcionando no codigo:
- `page_view`
- `landing_page_view`
- `time_15s`
- `time_30s`
- `time_60s`
- `time_120s`
- `scroll_25`
- `scroll_50`
- `scroll_75`
- `scroll_90`
- `view_hero`
- `view_services`
- `view_pricing`
- `view_how_it_works`
- `view_faq`
- `view_final_cta`
- `faq_open`
- `start_triagem`
- `field_focus_triagem`
- `triagem_error`
- `submit_triagem`
- `triagem_success`
- `click_whatsapp_qualificado`
- `continue_whatsapp_after_triagem`
- `lead_whatsapp`
- `lead_triagem`

Precisa testar no painel:
- Recebimento no Google Ads.
- Recebimento no GA4/GTM.
- Recebimento no Meta Events Manager.
- Publicos de remarketing.

## Remarketing

Google:
- visitantes engajados;
- scroll 75%;
- iniciou triagem e nao enviou;
- clicou CTA e nao WhatsApp;
- por pagina de interesse.

Meta:
- visitantes 30/90/180 dias;
- ViewContent por servico;
- Contact/Lead para exclusao;
- remarketing de abandono.

## Pendencias criticas

P0:
- Validar eventos nos paineis antes de escalar verba.
- Registrar leads manualmente pelo `lead_id`.

P1:
- Configurar Clarity com mascaramento de campos.
- Criar conversoes secundarias separadas no Google/GA4, se ainda nao existirem.
- Conferir se a conversao principal no Google e `click_whatsapp_qualificado`.

P2:
- Evoluir CAPI Meta quando houver backend/token.
- Importacao offline de vendas no Google Ads.

## Proxima decisao

Recomendacao: rodar Google pequeno com tracking corrigido e Meta pequeno apenas para remarketing/teste controlado. Nao escalar ate confirmar que os eventos chegam nos paineis.

## Pergunta final obrigatoria

Depois desta implementacao, conseguiremos saber se o problema esta no anuncio, na pagina, no CTA, no WhatsApp ou no atendimento?

Resposta: sim, com ressalva. O codigo agora gera os sinais necessarios. A confirmacao final depende dos eventos aparecerem corretamente nos paineis e dos leads recebidos no WhatsApp serem registrados no CRM pelo `lead_id`.
