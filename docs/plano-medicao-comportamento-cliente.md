# Plano de medicao do comportamento do cliente

## Objetivo

Responder onde o cliente abandona: anuncio, carregamento, hero, preco, CTA, formulario, WhatsApp ou atendimento.

## Eventos essenciais

Page:
- `page_view`
- `landing_page_view`
- `view_google_contract_landing`
- `view_sinal_landing`
- `view_promessa_landing`
- `view_sem_escritura_landing`
- `view_triagem`
- `view_obrigado_triagem`

Tempo:
- `time_15s`
- `time_30s`
- `time_60s`
- `time_120s`

Scroll:
- `scroll_25`
- `scroll_50`
- `scroll_75`
- `scroll_90`

Secoes:
- `view_hero`
- `view_services`
- `view_pricing`
- `view_how_it_works`
- `view_faq`
- `view_final_cta`

Conversao diagnostica:
- `click_cta_hero`
- `click_cta_header`
- `click_cta_sticky_mobile`
- `click_cta_service_card`
- `click_cta_final`
- `faq_open`

Conversao de lead:
- `click_whatsapp_qualificado`
- `submit_triagem`
- `triagem_success`
- `continue_whatsapp_after_triagem`
- `lead_whatsapp`
- `lead_triagem`

## Leitura pratica

- Cliques sem `landing_page_view`: problema de carregamento, URL, rejeicao ou clique ruim.
- `landing_page_view` sem `time_15s`: hero fraco, pagina lenta ou visitante errado.
- `time_30s` sem `scroll_50`: promessa inicial ou visual nao prendeu.
- `scroll_75` sem WhatsApp: oferta, preco, CTA ou confianca insuficiente.
- WhatsApp com pouco fechamento: atendimento, lead sujo, preco ou fit do publico.

## Decisao de escala

Nao aumentar verba ate termos pelo menos:
- 50 a 100 cliques rastreados por origem;
- eventos de scroll e tempo chegando;
- WhatsApp com `lead_id`;
- registro manual dos leads no CRM.
