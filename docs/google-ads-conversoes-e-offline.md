# Google Ads - conversoes e offline conversion

## Conversoes online

Principal:
- `click_whatsapp_qualificado`

Secundarias:
- `submit_triagem`
- `triagem_success`
- `continue_whatsapp_after_triagem`

## Observacao importante

Clique no WhatsApp nao e venda. E lead inicial. Venda so deve ser marcada depois de pagamento confirmado.

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
2. Luis registra esse codigo na planilha.
3. Quando fechar, atualizar status para `fechado`.
4. Registrar valor e data.
5. Futuramente importar conversoes offline no Google Ads.
