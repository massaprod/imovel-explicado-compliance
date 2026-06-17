# Tracking Google Ads - Imovel Explicado

Data: 2026-06-16

## Objetivo

Preparar o site para trafego pago com medicao minimamente confiavel antes de aumentar verba. O foco inicial e entender se a pessoa:

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

GTM instalado nas paginas criticas:

```txt
GTM-TX2GTPFL
```

Status em 2026-06-16:

- GTM criado em conta separada `Imovel Explicado` / container `imovelexplicado.com.br`.
- GTM publicado no HTML das paginas `/contrato-compra-venda-imovel`, `/triagem` e `/obrigado-triagem`.
- Producao confirmada servindo `GTM-TX2GTPFL` nas tres paginas.
- Conta Google Ads antiga descartada operacionalmente por suspensao/bloqueio. Historico: conta `797-338-9619` no e-mail `massaproducoes1@gmail.com`, com aviso `Sua conta foi suspensa. Por isso, nao e possivel realizar determinadas acoes.`
- Nova conta Google Ads em onboarding no e-mail `imovelexplicado@gmail.com`, customer ID `493-444-4413`.
- Nova conta deve operar como anunciante direto do Imovel Explicado/Luis Carlos, nao como agencia gerenciando cliente.
- No onboarding da nova conta, foi escolhido `Configure apenas a conta` para evitar uma campanha automatica simplificada antes de conversoes, palavras-chave e orcamento estarem sob controle.
- Configuracoes permanentes da nova conta confirmadas: `Brasil`, `(GMT-03:00) Horario Sao Paulo`, `Real brasileiro (BRL R$)`.
- Conversao criada na nova conta Google Ads: `submit_triagem_google_contract`, ID `18245604135`, rotulo `-G1_CNjvvsAcEKeml_xD`.
- Conversoes otimizadas foram deixadas desativadas por enquanto para evitar tratamento adicional de dados pessoais antes da revisao de politica/implementacao.
- Tentativa de configurar via GTM foi descartada porque o import automatico so encontrou containers no usuario errado e a tag manual `Conversion Linker` apareceu pausada/sinalizada pelo GTM. O container foi limpo sem publicacao.
- Caminho atual: Google tag direta carregada pelo helper `/assets/imovel-tracking.js` nas paginas criticas e conversao disparada diretamente no evento `submit_triagem_google_contract`.
- Teste local em 2026-06-16 confirmou:
  - carregamento de `https://www.googletagmanager.com/gtag/js?id=AW-18245604135`;
  - disparo de conversao `send_to: AW-18245604135/-G1_CNjvvsAcEKeml_xD`;
  - preservacao de `gclid`, UTMs e evento `submit_triagem_google_contract`;
  - formulario da landing abrindo WhatsApp com mensagem estruturada para `+55 11 96449-2988`.
- Antes de colocar verba, publicar o site, validar a presenca da Google tag em producao e testar o envio de triagem no diagnostico do Google Ads.

O helper cria:

- `window.ImovelExplicado.createWhatsAppLink(message, source, campaign, service)`
- `window.ImovelExplicado.trackEvent(eventName, params, options)`
- envio para `dataLayer`
- envio para `gtag`, se existir
- carregamento opcional da Google tag do Google Ads
- disparo opcional de conversao Google Ads por evento configurado
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

O helper tambem aceita Google Ads direto:

```html
<script>
  window.ImovelExplicadoConfig = {
    googleAdsConversionId: "18245604135",
    googleAdsConversions: {
      submit_triagem_google_contract: {
        label: "-G1_CNjvvsAcEKeml_xD",
        value: 1,
        currency: "BRL"
      }
    }
  };
</script>
```

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

## Retomada na nova conta Google Ads

1. Concluir o onboarding da nova conta `493-444-4413`.
   - Configuracoes permanentes confirmadas: pais `Brasil`, fuso `(GMT-03:00) Horario Sao Paulo`, moeda `Real brasileiro (BRL R$)`.
   - Manter a escolha operacional `Configure apenas a conta`.
   - Nao publicar campanha automatica simplificada no onboarding.
   - Nao adicionar verba antes das conversoes estarem criadas e testadas.
2. Criar conversao de site para `submit_triagem_google_contract`.
   - Criada em 2026-06-16.
   - ID: `18245604135`.
   - Rotulo: `-G1_CNjvvsAcEKeml_xD`.
   - Tipo sugerido: lead/envio de formulario.
   - Uso: primaria.
   - Contagem: uma.
   - Valor inicial: `R$ 1,00`, conservador para nao distorcer lances antes de dados reais.
3. Criar conversao de site para `click_whatsapp_qualificado`.
   - Tipo sugerido: contato.
   - Uso: primaria apenas no primeiro teste de baixo volume; depois pode virar secundaria se houver muito clique sem conversa real.
   - Contagem: uma.
4. Criar conversao de site para `submit_triagem`.
   - Uso: primaria ou secundaria conforme volume.
5. Se voltar ao GTM, criar acionadores de Evento Personalizado com os mesmos nomes:
   - `submit_triagem_google_contract`
   - `submit_triagem`
   - `click_whatsapp_qualificado`
6. No GTM, criar tag `Vinculador de conversoes` em todas as paginas somente se o alerta de tag pausada/sinalizada nao se repetir.
7. No GTM, criar tags de conversao Google Ads usando os IDs/labels gerados nas conversoes acima somente depois de validar o container.
8. Publicar o container GTM apenas se nao houver alerta de malware/tag pausada.
9. No caminho atual, validar a Google tag direta em producao e testar no Diagnostico de conversoes do Google Ads.

## Checklist antes de aumentar verba

- [x] GTM/Google tag instalado em producao.
- [x] Conversao `submit_triagem_google_contract` criada no Google Ads.
- [x] Google tag direta validada localmente com ID `18245604135`.
- [x] Conversao `submit_triagem_google_contract` validada localmente com rotulo `-G1_CNjvvsAcEKeml_xD`.
- [x] Formulario local da landing abre WhatsApp com mensagem preenchida.
- [ ] Google tag direta publicada em producao com ID `18245604135`.
- [ ] Diagnostico do Google Ads reconhece a tag do dominio.
- [ ] Preview do Tag Manager conectado ao dominio real, se o GTM voltar a ser usado.
- [ ] `click_whatsapp_qualificado` aparece no `dataLayer`.
- [ ] `submit_triagem_google_contract` aparece ao enviar formulario da landing.
- [ ] `submit_triagem` aparece ao enviar `/triagem`.
- [ ] Conta Google Ads sem suspensao/bloqueio operacional.
- [x] Nova conta Google Ads `493-444-4413` com onboarding concluido.
- [ ] Conversoes Google Ads publicadas no site e testadas.
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
