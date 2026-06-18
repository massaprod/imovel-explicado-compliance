# CRM minimo para leads de WhatsApp

## Objetivo

Conferir manualmente qual campanha gerou cada conversa e qual conversa virou venda.

## Regra principal

Todo lead deve ser registrado pelo `lead_id` que aparece na mensagem:

`Codigo: IE-YYYYMMDD-XXXX`

## Status

- novo
- respondeu
- qualificado
- proposta enviada
- pagamento pendente
- fechado
- perdido
- encaminhar profissional habilitado

## Campos minimos

- lead_id
- data_hora
- nome
- whatsapp
- origem
- medium
- campanha
- criativo
- termo
- pagina_entrada
- servico_interesse
- mensagem_inicial
- gclid
- fbclid
- status
- valor_apresentado
- valor_vendido
- data_fechamento
- motivo_perda

## Rotina diaria

1. Copiar o `Codigo` da mensagem recebida.
2. Preencher origem se o painel informar.
3. Marcar status.
4. Registrar valor ofertado.
5. Ao fechar, registrar valor vendido e data.
6. Toda noite revisar perdidos e motivo de perda.
