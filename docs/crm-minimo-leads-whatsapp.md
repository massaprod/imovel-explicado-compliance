# CRM minimo para leads de WhatsApp

## Objetivo

Conferir manualmente qual campanha gerou cada conversa e qual conversa virou venda.

## Regra principal

Todo lead deve ser registrado pelo `lead_id` que aparece na mensagem:

`Codigo: IE-YYYYMMDD-XXXX`

## Status

- novo
- automatico sem resposta
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
- respondeu_primeira_pergunta
- classificacao_qualidade

## Rotina diaria

1. Copiar o `Codigo` da mensagem recebida.
2. Preencher origem se o painel informar.
3. Enviar a primeira resposta curta por numero.
4. Se nao responder em 30 a 60 minutos, enviar follow-up curto.
5. Se continuar sem resposta, marcar `automatico sem resposta`.
6. So marcar `qualificado` quando houver resposta real ou triagem com contexto.
7. Registrar valor ofertado.
8. Ao fechar, registrar valor vendido e data.
9. Toda noite revisar perdidos e motivo de perda.

## Regra de qualidade

Mensagem automatica preenchida pelo site nao conta como lead qualificado.

Classificar como `qualificado` apenas quando a pessoa responder, explicar o caso, enviar documento, informar prazo ou confirmar que quer proposta.
