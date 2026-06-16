# Pre-flight de campanha - Imovel Explicado Aluguel Direto

Data: 2026-06-16

## Status executivo

A landing, a triagem e o tracking do site estao tecnicamente prontos para receber trafego.

O bloqueio atual nao esta no site. Esta no Meta: a tela do Ad Center exibiu aviso vermelho de "Pagamento necessario" e os anuncios recentes aparecem como antigos/concluidos, com copy de contratos/sinal, nao como campanha nova de aluguel direto.

Recomendacao: nao adicionar verba relevante ate resolver pagamento e criar/duplicar uma campanha nova apontando para a landing de aluguel direto.

## URL principal para campanha

Use como destino:

https://imovelexplicado.com.br/aluguel-direto

Com UTM sugerida para Ads Manager:

https://imovelexplicado.com.br/aluguel-direto?utm_source=meta&utm_medium=paid_social&utm_campaign=aluguel_direto_validacao_20260616&utm_content={{ad.name}}

Se o Ad Center simplificado nao aceitar macro, usar:

https://imovelexplicado.com.br/aluguel-direto?utm_source=meta&utm_medium=paid_social&utm_campaign=aluguel_direto_validacao_20260616

## Verificacoes tecnicas realizadas

- Home: https://imovelexplicado.com.br/ retornando 200.
- Landing: https://imovelexplicado.com.br/aluguel-direto retornando 200.
- Triagem: https://imovelexplicado.com.br/triagem retornando 200.
- Contratos: https://imovelexplicado.com.br/contratos retornando 200.
- Landing mobile exibe titulo, proposta, preco inicial, prazo e CTA antes da dobra critica.
- WhatsApp da landing gera mensagem pre-preenchida.
- Triagem gera resumo e link de WhatsApp.
- `dataLayer` registra `page_view`, `click_whatsapp_hero` e `click_whatsapp_plan_seguro`.
- Backend de analytics recebeu eventos da landing com status 200.
- `sendBeacon` foi removido do tracking estatico para estabilizar o envio cross-domain.

## Configuracao recomendada no Meta

Objetivo inicial:

- Preferencia: Trafego para site, otimizando para visualizacao da pagina de destino.
- Evitar por enquanto: campanha direta para WhatsApp como unico destino, porque reduz aprendizado da pagina e dificulta entender onde o lead abandona.

Destino:

- Landing principal: `/aluguel-direto`.
- Nao usar `/contratos` como destino principal nesta fase.
- Nao usar `onrender.com` em anuncio.

Publico inicial:

- Localizacao: Brasil, ou Estado de Sao Paulo se o orcamento for muito curto.
- Idade: 30 a 60+.
- Evitar segmentacao estreita demais no primeiro teste.
- Se Meta sugerir Advantage+ Audience, aceitar com sugestoes de interesse ligadas a aluguel, imovel, proprietario, investimento imobiliario, contrato de aluguel.

Orcamento de teste:

- Se a conta estiver desbloqueada: R$ 40 a R$ 60 por dia por 48 horas.
- So aumentar se houver clique qualificado, permanencia na pagina, WhatsApp ou triagem.
- Com pouco saldo, preferir 1 campanha, 1 conjunto, 2 ou 3 criativos no maximo.

## Criativo e copy recomendados para esta fase

Promessa central:

"Vai alugar direto, sem imobiliaria? Organize contrato, caucao, vistoria e entrega das chaves antes de fechar."

Texto curto:

"Alugar direto parece simples ate surgir duvida sobre contrato, caucao, vistoria ou entrega das chaves. O Imovel Explicado organiza o fechamento para voce decidir com mais clareza."

CTA:

"Saiba mais"

Evitar no anuncio:

- "analise juridica"
- "parecer juridico"
- "garantia"
- "proteja-se 100%"
- promessa absoluta de evitar problema

## Bloqueios antes de verba

1. Resolver o aviso vermelho de pagamento no Meta.
2. Criar ou duplicar anuncio com destino para `/aluguel-direto`.
3. Confirmar que o preview do anuncio abre a landing e nao o WhatsApp direto.
4. Usar criativo de aluguel direto, nao criativo antigo de contrato generico.
5. Verificar se o Pixel/dataset continua associado a conta de anuncio.

## Criterio para liberar verba

Liberar verba somente quando:

- Conta Meta sem aviso de pagamento.
- Campanha ativa ou pronta para publicar.
- URL de destino conferida como `https://imovelexplicado.com.br/aluguel-direto`.
- Criativo e copy alinhados a aluguel direto.
- Primeira visualizacao do anuncio nao prometer resultado juridico ou garantia.

