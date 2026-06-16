# Validacao visual e estrategica - Imovel Explicado

Data: 2026-06-16

## Nota geral

8,6/10 para iniciar teste controlado de Google Search.

A nova landing especifica de contrato de compra e venda ficou adequada para trafego de alta intencao. A home continua boa como hub institucional/comercial, mas nao deve ser a URL principal para buscas como "contrato de compra e venda de imovel", "analisar contrato de imovel" ou "recibo de sinal compra de imovel".

## Pagina prioritaria criada

URL recomendada para Google Ads:

`https://imovelexplicado.com.br/contrato-compra-venda-imovel?utm_source=google&utm_medium=cpc&utm_campaign=gs_compra_venda_contrato_202606`

Promessa central:

`Contrato de imovel antes de assinar ou pagar sinal`

Objetivo da pagina:

Converter visitante de Google Search em contato qualificado pelo WhatsApp ou triagem curta, antes de vender analise, elaboracao de contrato, promessa ou verificacao antes do sinal.

## Diagnostico grafico geral

- A nova landing tem coerencia visual com a marca: fundo claro, verde como acao, grafite para autoridade, dourado como detalhe e imagem imobiliaria real.
- A primeira dobra agora comunica produto, momento de decisao e acao principal sem depender de texto longo.
- O card de entrega ajuda o visitante a entender o que recebe sem prometer resultado absoluto.
- A triagem embutida reduz atrito porque o usuario nao precisa entender todo o site para iniciar conversa.
- O mobile foi ajustado para nao ter overflow horizontal, com CTA fixo e texto mais confortavel.
- As paginas antigas estao tecnicamente funcionando, mas algumas ainda parecem mais "campanha anterior" do que sistema unico. A prioridade visual seguinte e unificar triagem, contratos e aluguel-direto na mesma biblioteca de componentes.

## Pontos fracos encontrados

1. A pagina de triagem ainda tem visual aceitavel, mas o botao principal escuro e a estrutura mais seca deixam a experiencia menos comercial que a nova landing.
2. A pagina `contratos.html` usa uma direcao visual mais escura e agressiva; pode funcionar para dor/urgencia, mas nao deve ser a pagina principal de Google Search para compra e venda.
3. Materiais antigos ainda usavam "consultor juridico e imobiliario"; isso foi removido das paginas publicas inspecionadas.
4. A home e boa como hub, mas e ampla demais para campanha de busca com intencao especifica.
5. Antes de aumentar verba no Google, falta confirmar/instalar tag de conversao do Google Ads ou Google Tag Manager. Hoje a pagina registra eventos internos e Meta Pixel atrasado, mas isso nao substitui a conversao do Google Ads para otimizacao.

## Melhorias aplicadas

- Criada landing `contrato-compra-venda-imovel.html`.
- Adicionado link da home para a nova pagina no card "Contrato de Compra e Venda".
- Atualizado sitemap com a nova URL.
- Criados atalhos de rota:
  - `/contrato-compra-venda`
  - `/contrato-imobiliario`
  - `/analise-contrato-imovel`
- Criados arquivos de Google Ads:
  - `marketing/google-ads/keywords-compra-venda-contrato.csv`
  - `marketing/google-ads/rsa-assets-compra-venda-contrato.csv`
  - `marketing/google-ads/negative-keywords-compra-venda-contrato.csv`
- Atrasado carregamento do Meta Pixel nesta landing para proteger performance inicial de Google Search.
- Removido posicionamento publico "juridico" onde aparecia como qualificacao de Luis.

## Validacao tecnica

Lighthouse local da nova landing:

- Performance: 99
- Accessibility: 96
- Best Practices: 96
- SEO: 100
- LCP: 2,2s
- TBT: 50ms
- CLS: 0

Playwright:

- Desktop 1440px: sem overflow horizontal; CTA fixo mobile oculto; imagem hero visivel; 4 cards de servico; 10 CTAs de WhatsApp.
- Mobile 390px: sem overflow horizontal; H1 dentro da largura; CTA fixo visivel; WhatsApp correto.
- Formulario: gera resumo, abre URL do WhatsApp com texto e mostra fallback.
- Eventos internos capturados: `view_google_contract_landing`, `submit_triagem_google_contract`, `scroll_50_google_contract`, `scroll_90_google_contract`.

## Identidade visual recomendada

Tokens:

- Fundo: `#f7f4ed`
- Texto principal: `#111820`
- Texto secundario: `#26313d` e `#5c6873`
- Acao principal: `#087a4a`
- Acao hover: `#075f3b`
- Detalhe premium: `#c79a43`
- Radius padrao: `8px`
- Titulo editorial: Georgia
- Interface/corpo: Inter/system UI

Componentes padrao:

- CTA primario sempre verde.
- CTA secundario claro com borda dourada suave.
- Cards com borda leve, fundo branco e raio discreto.
- Imagens reais de contrato, chaves, negociacao, documentos ou atendimento humano.
- Evitar fundo generico sem relacao com imovel/contrato.
- Evitar excesso de texto em cards e criativos.

## Direcao para criativos

Para Google Search, o criativo principal e o texto do anuncio. A arte visual entra mais em extensoes, remarketing e Meta. A linha visual deve seguir:

- Imagem real ou realista de contrato/chaves/documentos.
- Poucas palavras: dor + acao.
- Exemplo: "Antes de pagar sinal, organize o contrato."
- Botao/CTA visual: "Fazer triagem".
- Sem promessas como "garantia", "protecao total", "parecer juridico" ou "advogado online".

## Ajustes prioritarios antes de colocar mais verba

1. Configurar conversao do Google Ads:
   - clique no WhatsApp;
   - envio da triagem;
   - opcionalmente rolagem 50% como microconversao, mas nao como conversao principal.
2. Criar campanha de Search com correspondencia exata/frase, usando `keywords-compra-venda-contrato.csv`.
3. Usar a lista negativa especifica `negative-keywords-compra-venda-contrato.csv`, nao a lista antiga global sem revisao.
4. Rodar primeiro campanha pequena e focada, separando ad groups por intencao:
   - compra/venda contrato;
   - analise de contrato recebido;
   - elaboracao de contrato;
   - sinal/promessa/documentos.
5. Monitorar termos de pesquisa diariamente nas primeiras 48h.
6. Pausar termos informacionais/gratuitos imediatamente.

## Checklist visual de padronizacao

- Todo CTA principal esta em verde?
- A pagina de destino usa a mesma promessa do anuncio?
- A primeira dobra mostra produto, risco e acao sem depender de scroll?
- O usuario entende "o que recebo" em menos de 10 segundos?
- O mobile nao tem texto cortado nem botao fora da tela?
- O WhatsApp aparece como contato, mas sem substituir a triagem quando a pessoa quer organizar o caso?
- A linguagem preserva autoridade sem parecer juridica demais?
- Blog, Instagram, landing e triagem usam o mesmo logo, paleta, tom e CTA?
- O formulario pede apenas o necessario para iniciar a conversa?
- O pixel/conversao registra a acao que queremos otimizar?

## Proxima acao objetiva

Antes de escalar campanha: configurar conversao do Google Ads na landing nova e testar um clique/submit real com o Tag Assistant ou painel de diagnostico do Google Ads.

Depois disso, iniciar Search com verba pequena e foco em termos de compra, nao Meta como canal principal para esta oferta.
