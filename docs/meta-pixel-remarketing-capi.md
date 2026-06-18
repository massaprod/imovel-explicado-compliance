# Meta Pixel, remarketing e CAPI

## Pixel

Pixel atual do projeto:

`998092116298334`

Esse pixel deve ser o unico usado nas paginas publicas do Imovel Explicado.

## Eventos recomendados

- `PageView`
- `ViewContent` para paginas de servico
- `Contact` em `click_whatsapp_qualificado`
- `Lead` em `submit_triagem` e `triagem_success`
- `trackCustom` para eventos diagnosticos

## Event ID

Eventos importantes recebem `event_id`. Isso prepara deduplicacao futura com CAPI.

## CAPI futura

Nao implementar token hardcoded.

Variaveis necessarias:
- `META_ACCESS_TOKEN`
- `META_PIXEL_ID`

Payload minimo futuro:
- `event_name`
- `event_time`
- `event_id`
- `action_source: website`
- `event_source_url`
- `client_user_agent`
- `fbc`
- `fbp`
- `lead_id`
- `custom_data`

## Publicos de remarketing Meta

- Todos visitantes 30 dias.
- Todos visitantes 90 dias.
- Todos visitantes 180 dias.
- Visitantes de `/verificacao-sinal-imovel`.
- Visitantes de `/contrato-compra-venda-imovel`.
- Visitantes de `/aluguel-direto`.
- Visitantes de `/imovel-sem-escritura`.
- Visitantes com `time_60s`.
- Visitantes com `scroll_75`.
- Visitantes que clicaram CTA mas nao WhatsApp.
- Visitantes que iniciaram triagem mas nao concluiram.
- Excluir `Lead` e `Contact` de campanhas de aquisicao quando aplicavel.
