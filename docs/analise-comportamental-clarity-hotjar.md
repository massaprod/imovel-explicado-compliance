# Analise comportamental - Clarity ou Hotjar

## Recomendacao

Usar Microsoft Clarity como primeira opcao por custo e simplicidade.

## Status tecnico

O helper aceita `clarityId`, mas nao carrega nada se o ID estiver vazio. Isso evita ferramenta externa sem configuracao.

## Como instalar

1. Criar projeto no Microsoft Clarity.
2. Copiar o ID.
3. Inserir em `window.ImovelExplicadoConfig.clarityId` ou variavel equivalente no build.
4. Validar que carregou apenas nas paginas desejadas.

## Privacidade

- Nao coletar CPF, RG, documentos ou dados bancarios.
- Mascarar campos de formulario se a ferramenta permitir.
- Evitar gravar conteudo sensivel digitado.
- Atualizar politica de privacidade/cookies.

## O que observar

- Abandono antes do hero.
- Rage click.
- Tentativa de clicar em texto ou imagem nao clicavel.
- Scroll ate preco e saida.
- Dificuldade mobile.
- CTA ignorado.
- Usuario abre FAQ e sai.
- Usuario clica WhatsApp mas nao envia mensagem.

## Como cruzar com campanhas

Usar UTMs, `gclid`, `fbclid` e `lead_id` para comparar:
- Google vs Meta.
- pagina visitada.
- criativo/campanha.
- comportamento antes do WhatsApp.
