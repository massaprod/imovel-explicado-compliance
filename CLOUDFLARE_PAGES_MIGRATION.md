# Cloudflare Pages - Imovel Explicado Contratos

## Decisao

Usar Cloudflare Pages para a landing estatica e manter o Render para o app/backend.

Motivo: campanhas pagas nao devem cair primeiro no cold start do Render. A landing estatica carrega rapido, aquece `https://imovel-explicado-contratos.onrender.com/api/health` em segundo plano e direciona o usuario para `/triagem` quando ele decide iniciar.

## Repositorio recomendado

```txt
massaprod/imovel-explicado-compliance
```

Branch:

```txt
main
```

Build command:

```txt
deixar vazio
```

Output directory:

```txt
/
```

## Configuracao no Cloudflare Pages

1. Entrar no Cloudflare Dashboard.
2. Acessar `Workers & Pages`.
3. Criar novo projeto Pages.
4. Conectar GitHub.
5. Selecionar `massaprod/imovel-explicado-compliance`.
6. Usar as configuracoes acima.
7. Publicar.

## URLs esperadas

Landing estatica publicada no Cloudflare Pages:

```txt
https://imovel-explicado-contratos.pages.dev/
```

Landing estatica provisoria anterior no GitHub Pages:

```txt
https://massaprod.github.io/imovel-explicado-compliance/
```

Backend/app:

```txt
https://imovel-explicado-contratos.onrender.com
```

Depois que Cloudflare Pages publicar, usar a URL `*.pages.dev` como URL principal dos anuncios ate termos dominio proprio.

## Dominios definitivos

Status verificado em 2026-06-09:

- `contratos.imovelexplicado.com.br` resolve e redireciona `/` para `/contratos`.
- `imovelexplicado.com.br` ainda nao possui registro A/AAAA visivel.
- `www.imovelexplicado.com.br` ainda nao existe no DNS.

Estrutura recomendada:

```txt
imovelexplicado.com.br                 -> hub principal, blog e canais
www.imovelexplicado.com.br             -> redireciona para imovelexplicado.com.br
contratos.imovelexplicado.com.br       -> pagina de venda do produto Contratos
```

Configurar no Cloudflare Pages, projeto `imovel-explicado-contratos`, em `Custom domains`:

```txt
imovelexplicado.com.br
www.imovelexplicado.com.br
contratos.imovelexplicado.com.br
```

Se o Cloudflare pedir DNS manual, usar:

```txt
Tipo   Nome        Destino
CNAME  @           imovel-explicado-contratos.pages.dev
CNAME  www         imovel-explicado-contratos.pages.dev
CNAME  contratos   imovel-explicado-contratos.pages.dev
```

Observacao: em zonas Cloudflare, o `@` pode aparecer como `imovelexplicado.com.br`. Manter `Proxied` ativo quando o Cloudflare recomendar.

No codigo, o `www` ja esta preparado para redirecionar para o dominio raiz e `contratos.imovelexplicado.com.br/` ja redireciona para `/contratos`.

## Status em 2026-06-04

- Cloudflare Pages conectado ao GitHub `massaprod/imovel-explicado-compliance`.
- Projeto publicado como `imovel-explicado-contratos`.
- URL principal provisoria: `https://imovel-explicado-contratos.pages.dev/`.
- Landing validada com HTTP 200.
- CTAs da landing apontam para `https://imovel-explicado-contratos.onrender.com/triagem`.
- Pagina de exclusao de dados validada em `https://imovel-explicado-contratos.pages.dev/exclusao-dados`.

## Depois do deploy

Atualizar estes locais para apontar para a URL Cloudflare:

- Link do Instagram.
- Link do Facebook.
- URL de site no Meta Developers, se a landing principal mudar.
- `APP_PUBLIC_URL` e `VITE_PUBLIC_APP_URL` somente se o backend tambem passar a responder pelo dominio definitivo. Enquanto a API continuar no Render, nao trocar essas variaveis sem revisar rotas e webhook.

## Observacao historica

Em 2026-06-04, o login social GitHub no Cloudflare falhou com mensagem de identidade divergente. A migracao depende de login manual na conta correta da Cloudflare ou cadastro por outro metodo.
