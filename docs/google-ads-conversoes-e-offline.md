# Google Ads - conversoes e offline conversion

## Conversoes online

Principal:
- `submit_triagem_google_contract`

Secundarias:
- `submit_triagem`
- `triagem_success`
- `continue_whatsapp_after_triagem`
- `click_whatsapp_intent`

## Observacao importante

Clique no WhatsApp nao e venda e nao deve ser tratado como lead qualificado sozinho. E apenas intencao inicial.

Lead qualificado exige pelo menos uma destas evidencias:

- pessoa respondeu depois da mensagem automatica;
- pessoa preencheu triagem com contexto util;
- pessoa enviou documento, prazo, situacao ou objetivo claro;
- Luis classificou manualmente como caso atendivel.

Venda so deve ser marcada depois de pagamento confirmado.

## Dados que precisam ser preservados

- `lead_id`
- `gclid`
- `gbraid`
- `wbraid`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- pagina de entrada
- servico de interesse
- valor vendido
- data de fechamento

## Importacao offline futura

Quando houver venda confirmada, registrar:

- Google Click ID ou identificador equivalente quando disponivel.
- Conversion Name.
- Conversion Time.
- Conversion Value.
- Conversion Currency.
- Lead ID interno.

## Processo manual inicial

1. Cliente chama no WhatsApp com `Codigo: IE-...`.
2. Luis envia a pergunta de qualificacao curta.
3. Se a pessoa nao responder, marcar como `lead automatico sem engajamento`.
4. Se responder e houver caso atendivel, marcar como `qualificado`.
5. Quando fechar, atualizar status para `fechado`.
6. Registrar valor e data.
7. Futuramente importar conversoes offline no Google Ads.
