# Tracking Google Ads - Imovel Explicado

Data: 2026-06-16

## Objetivo

Preparar o site para trafego pago com medicacao minimamente confiavel antes de aumentar verba. O foco inicial e entender se a pessoa:

1. chegou pela campanha certa;
2. leu a pagina;
3. clicou em WhatsApp;
4. iniciou ou concluiu triagem;
5. chegou a um ponto de atendimento comercial.

## Implementacao atual

Arquivo compartilhado:

```txt
/assets/imovel-tracking.js
```

Paginas ja usando o helper compartilhado:

```txt
/contrato-compra-venda-imovel
/triagem
/obrigado-triagem
```

O helper cria:

- `window.ImovelExplicado.createWhatsAppLink(message, source, campaign, service)`
- `window.ImovelExplicado.trackEvent(eventName, params, options)`
- envio para `dataLayer`
- envio para `gtag`, se existir
- envio para `fbq`, se existir
- envio para analytics interno, sem bloquear a pagina
- deduplicacao opcional por evento
- `debug` no console local

## Eventos principais

Eventos de visualizacao:

- `view_google_contract_landing`
- `view_triagem`
- `view_obrigado_triagem`
- `page_view` em paginas que usarem o helper com o nome padrao

Eventos de intencao:

- `click_whatsapp_qualificado`
- `click_whatsapp_header_google_contract`
- `click_whatsapp_hero_google_contract`
- `click_service_sinal_google_contract`
- `click_service_analise_google_contract`
- `click_service_contrato_compra_venda_google_contract`
- `click_service_promessa_google_contract`
- `click_whatsapp_triagem_summary`

Eventos de formulario:

- `submit_triagem_google_contract`
- `submit_triagem`
- `triagem_validation_error`

Eventos de engajamento:

- `scroll_50`
- `scroll_90`
- `faq_open`

## Conversoes recomendadas no Google Ads

### Primarias no primeiro teste

Use como conversoes primarias somente quando o volume for baixo e ainda nao houver compra:

1. `click_whatsapp_qualificado`
2. `submit_triagem`
3. `submit_triagem_google_contract`

Motivo: com pouca verba, otimizar direto para compra pode deixar a campanha sem aprendizado. Primeiro precisamos medir leads qualificados e conversas reais.

### Secundarias para observacao

Configure como observacao ou secundaria:

- `view_google_contract_landing`
- `scroll_50`
- `scroll_90`
- `faq_open`
- `triagem_validation_error`

### Futuras conversoes comerciais

Quando houver fluxo de pagamento mais fechado:

- `payment_started`
- `payment_confirmed`
- `purchase_contract_analysis`
- `lead_qualified_manual`

## Como configurar GTM sem quebrar o site

O helper aceita um `gtmId` opcional na configuracao da pagina:

```html
<script>
  window.ImovelExplicadoConfig = {
    gtmId: "GTM-XXXXXXX"
  };
</script>
<script src="/assets/imovel-tracking.js"></script>
```

Enquanto `gtmId` estiver vazio, nada e carregado. Isso evita erro antes de existir um container definitivo.

Recomendacao operacional:

1. Criar container Web no Google Tag Manager.
2. Instalar o ID `GTM-...` na configuracao das paginas principais.
3. Abrir Preview no Tag Manager.
4. Testar os cliques de WhatsApp, envio de triagem, scroll e FAQ.
5. Criar tags de conversao no GTM apenas depois de confirmar que os eventos aparecem no `dataLayer`.

## dataLayer esperado

Exemplo de clique qualificado:

```js
{
  event: "click_whatsapp_qualificado",
  page: "contrato-compra-venda-imovel",
  path: "/contrato-compra-venda-imovel",
  utmSource: "google",
  utmMedium: "cpc",
  utmCampaign: "gs_compra_venda_contrato_202606",
  service: "Analise documental e contratual",
  value: 297
}
```

Exemplo de envio de triagem:

```js
{
  event: "submit_triagem_google_contract",
  page: "contrato-compra-venda-imovel",
  perfil: "comprador",
  situacao: "recebi contrato",
  urgencia: "hoje",
  documentos: "contrato e matricula"
}
```

## Google Ads - setup manual

No Google Ads:

1. Acesse Metas > Conversoes.
2. Crie conversao de site.
3. Use `imovelexplicado.com.br` como dominio.
4. Escaneie o site.
5. Se usar GTM, publique tags para os eventos listados acima.
6. Se usar Google tag direta, configure eventos equivalentes pelo `gtag`.
7. Marque como primaria apenas as conversoes que devem orientar lance.

## Checklist antes de aumentar verba

- [ ] GTM/Google tag instalado em producao.
- [ ] Preview do Tag Manager conectado ao dominio real.
- [ ] `click_whatsapp_qualificado` aparece no `dataLayer`.
- [ ] `submit_triagem_google_contract` aparece ao enviar formulario da landing.
- [ ] `submit_triagem` aparece ao enviar `/triagem`.
- [ ] O link do WhatsApp abre com mensagem preenchida.
- [ ] Nenhum CTA principal usa `onrender.com`.
- [ ] Campanhas usam UTMs consistentes.
- [ ] Palavras negativas carregadas.
- [ ] Primeiros 3 dias acompanhados por termos de pesquisa.

## Referencias oficiais

- Google Ads: configuracao de conversoes web - https://support.google.com/google-ads/answer/16560108
- Google Tag Manager: visualizar e depurar containers - https://support.google.com/tagmanager/answer/6107056
- Google Ads: palavras-chave negativas - https://support.google.com/google-ads/answer/2453972
- Google Ads: anuncios responsivos de pesquisa - https://support.google.com/google-ads/answer/7684791
