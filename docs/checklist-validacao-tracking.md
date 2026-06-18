# Checklist de validacao do tracking

## URLs de teste

Google:

`https://imovelexplicado.com.br/verificacao-sinal-imovel?utm_source=google&utm_medium=cpc&utm_campaign=search_alta_intencao&utm_content=teste&utm_term=teste&gclid=test123`

Meta:

`https://imovelexplicado.com.br/verificacao-sinal-imovel?utm_source=meta&utm_medium=paid_social&utm_campaign=meta_teste_landing_contratos&utm_content=teste&utm_term=teste&fbclid=test123`

## Paginas

- `/`
- `/verificacao-sinal-imovel`
- `/contrato-compra-venda-imovel`
- `/aluguel-direto`
- `/promessa-compra-venda-imovel`
- `/imovel-sem-escritura`
- `/triagem`
- `/obrigado-triagem`

## Validar em cada pagina

- Page view dispara.
- `landing_page_view` dispara.
- UTM persiste em links internos.
- `gclid` e `fbclid` persistem.
- Scroll dispara 25/50/75/90.
- Tempo dispara 15/30/60/120s.
- CTA dispara evento.
- WhatsApp abre.
- Mensagem contem `Codigo: IE-...`.
- Evento `click_whatsapp_qualificado` aparece no dataLayer.
- Meta recebe `Contact` quando configurado.
- Google Ads recebe conversao quando configurado.
- Formulario dispara `start_triagem`, `submit_triagem` e `triagem_success`.

## Ferramentas

- Google Tag Assistant.
- GTM Preview.
- GA4 DebugView.
- Meta Pixel Helper.
- Meta Events Manager Test Events.
- DevTools Console.
- DevTools Network.
