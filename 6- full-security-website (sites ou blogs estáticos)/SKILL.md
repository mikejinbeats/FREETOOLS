---
name: site-security-hardening
description: Hardening total para deixar sites estáticos com backend Supabase/Cloudflare ULTRA BLINDADOS. Audita e reforça segurança em todas as camadas (frontend, headers de segurança, Supabase RLS, auth/admin, APIs, WAF, rate limiting, secrets) para minimizar ao máximo risco de invasão, fuga de dados ou abuso. Usa quando o site já está funcional e o utilizador disser coisas como "quero o site ultra seguro", "blindar o site", "hardening de segurança", "protege este site" ou "faz audit de segurança e corrige tudo". Integra-se diretamente com supabase-backend-architect, httrack-cleanup-seo-safe, modern-ui-transformer e seo-audit-v3.
---

# Site Security Hardening (Ultra Blindado)

Este skill é a camada final de segurança. Parte de um site já funcional (Cloudflare Pages + Supabase + Edge Functions + Resend/Stripe/etc.) e gera um plano único e completo de hardening para deixar tudo o mais blindado possível sem rebentar com o projeto.

## Quando usar este skill

Usar só depois de:

- UI pronta (modern-ui-transformer)
- Backend funcional (supabase-backend-architect)
- Conteúdo finalizado (content-marketing-engine)

Frases que devem disparar este skill:

- "Deixa o site ultra seguro"
- "Quero blindar o site"
- "Faz hardening de segurança"
- "Protege o backend e o admin"
- "Faz audit de segurança e corrige tudo"

## Input esperado (mínimo)

Quando invocas este skill, dá um resumo tipo:

PROJETO:
- Tipo de site: landing, institucional, SaaS, e-commerce ou app
- Stack: Cloudflare Pages + Supabase + Resend, Stripe, outros (se houver)

DADOS TRATADOS:
- Dados pessoais guardados: por exemplo nome, email, telefone, morada
- Dados sensíveis: por exemplo pagamentos, saúde, documentos (sim/não/quais)
- Painel admin: sim ou não, e o que faz (gestão de leads, encomendas, etc.)

BACKEND:
- Tabelas principais no Supabase (nomes e função de cada uma)
- Estado do RLS: ativo em todas, ativo em algumas ou desconhecido
- Endpoints/Functions principais: por exemplo /api/contact, /api/subscribe, /api/login, /api/admin/*

AUTH:
- Há login/signup: sim ou não
- Roles: por exemplo user, admin
- Rotas sensíveis: por exemplo /admin, /dashboard

INFRA:
- Deploy: Cloudflare Pages (sim/não)
- Domínio: domínio principal
- WAF/rate limiting: sim, não ou desconhecido

Se alguma parte estiver vazia, o skill deve assumir defaults conservadores (mais segurança do que conveniência) e indicar claramente no output onde fez essas suposições. Se faltar o nome exato de colunas como user_id ou owner_id, o skill deve inferir o nome mais provável com base na descrição da tabela e depois avisar o utilizador para validar antes de executar o SQL em produção.

## Fase Única – Hardening Completo End-to-End

Quando este skill é chamado, não divide o output em várias respostas. Internamente segue a sequência:

Threat Model → Frontend e Security Headers → Supabase (RLS e policies) → Auth/Admin → APIs/Edge → Cloudflare/WAF → Secrets → Checklist final

e devolve tudo junto num único texto markdown.

### 1. Threat Model rápido

Primeiro, dar uma visão geral dos riscos do projeto, adaptando ao contexto real:

Título: Security Threat Model

Superfície pública (exemplo, ajustar ao projeto):
- / (homepage)
- /servicos
- /blog
- /contacto
- /api/contact
- /api/subscribe

Zonas sensíveis:
- /admin
- /dashboard
- /api/admin/*
- Tabelas críticas: contacts, leads, orders, bookings, profiles, admin_users, payments

Principais riscos:
- Spam massivo em formulários públicos (contacto, newsletter, bookings)
- Brute-force em endpoints de login/admin
- Leitura indevida de dados via RLS mal configurado
- Abuso de APIs públicas para scraping ou enumeração
- Exposição acidental de secrets (chaves de API, service keys)

O skill deve adaptar esta secção aos paths, tabelas e endpoints que o utilizador listar.

### 2. Frontend e Security Headers

Secção destinada a blindar a camada cliente e as respostas HTTP.

Subsecção: Security headers para Cloudflare ou ficheiro headers

Bloco base recomendado para incluir na configuração:

X-Content-Type-Options: nosniff  
X-Frame-Options: SAMEORIGIN  
Referrer-Policy: strict-origin-when-cross-origin  
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload  
Permissions-Policy: geolocation=(), camera=(), microphone=(), payment=*  
X-XSS-Protection: 1; mode=block  
Content-Security-Policy:
- default-src 'self'
- img-src 'self' data: https:
- script-src 'self' https: 'unsafe-inline' 'unsafe-eval'
- style-src 'self' https: 'unsafe-inline'
- connect-src 'self' https: https://*.supabase.co https://api.resend.com https://api.stripe.com
- frame-ancestors 'self'

Notas para adaptação:
- Se o site usar Google Fonts ou outros CDNs, adicionar domínios corretos a style-src, font-src e script-src.
- Se o site chamar outras APIs externas, acrescentar esses domínios a connect-src.

Subsecção: Padrões seguros no frontend (HTML/JS)

Regras a seguir no código:

- Não usar innerHTML com valores vindos do utilizador sem sanitização segura.
- Evitar construir HTML com strings concatenadas a partir de input.
- Em ações críticas (delete, update sensível, operações de pagamento):
  - Usar confirmação extra, como modal de confirmação ou botão de “confirmar” separado.
- Não expor detalhes internos em mensagens de erro (sem stack traces, queries, nomes de tabelas ou chaves).

### 3. Supabase Hardening (RLS e Policies)

Aqui o foco é evitar abuso direto da base de dados via APIs.

Subsecção: Ativar RLS em todas as tabelas sensíveis

Se estas tabelas existirem no projeto, devem ter Row Level Security ativo:

ALTER TABLE public.contacts      ENABLE ROW LEVEL SECURITY;  
ALTER TABLE public.leads         ENABLE ROW LEVEL SECURITY;  
ALTER TABLE public.orders        ENABLE ROW LEVEL SECURITY;  
ALTER TABLE public.bookings      ENABLE ROW LEVEL SECURITY;  
ALTER TABLE public.profiles      ENABLE ROW LEVEL SECURITY;  
ALTER TABLE public.admin_users   ENABLE ROW LEVEL SECURITY;  
ALTER TABLE public.payments      ENABLE ROW LEVEL SECURITY;

O skill deve remover ou adicionar linhas conforme a lista real de tabelas que o utilizador fornecer. Se o utilizador mencionar outras tabelas com dados sensíveis (por exemplo invoices, customers, documents), o skill deve incluir essas também.

Subsecção: Policies blindadas por tipo de tabela

Formulários públicos, como contacts, leads, newsletter:

Objetivo:
- Qualquer visitante pode inserir (anon)
- Apenas utilizadores autenticados podem ler

SQL recomendado para contacts:

CREATE POLICY "Public can insert contacts"  
ON public.contacts  
FOR INSERT  
TO anon  
WITH CHECK (true);

CREATE POLICY "Authenticated can read contacts"  
ON public.contacts  
FOR SELECT  
TO authenticated  
USING (true);

Aplicar o mesmo padrão a leads, newsletter e outras tabelas de formulários públicos, trocando o nome da tabela.

Perfis de utilizador, por exemplo profiles:

Objetivo:
- O utilizador só pode ver e atualizar o próprio perfil.

SQL recomendado:

CREATE POLICY "Users view own profile"  
ON public.profiles  
FOR SELECT  
TO authenticated  
USING (auth.uid() = id);

CREATE POLICY "Users update own profile"  
ON public.profiles  
FOR UPDATE  
TO authenticated  
USING (auth.uid() = id);

Se o campo de relação não for id mas, por exemplo, user_id, o skill deve adaptar a condição para auth.uid() = user_id.

Encomendas ou reservas, por exemplo orders:

Objetivo:
- Cada utilizador só vê e cria as próprias encomendas ou reservas.
- Só admins podem ver tudo.

SQL recomendado:

CREATE POLICY "Users view own orders"  
ON public.orders  
FOR SELECT  
TO authenticated  
USING (auth.uid() = user_id);

CREATE POLICY "Users create own orders"  
ON public.orders  
FOR INSERT  
TO authenticated  
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins view all orders"  
ON public.orders  
FOR SELECT  
TO authenticated  
USING (
  EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE admin_users.user_id = auth.uid()
  )
);

Se o campo se chamar, por exemplo, customer_id ou owner_id, o skill deve substituir user_id por esse campo, usando a descrição do utilizador para inferir a coluna correta.

Tabela admin_users, que controla privilégios de admin:

Objetivo:
- Nunca expor diretamente esta tabela a nenhum role público.

SQL recomendado:

CREATE POLICY "No direct access to admin_users"  
ON public.admin_users  
FOR ALL  
TO public  
USING (false)  
WITH CHECK (false);

Tabela payments, com dados de pagamentos:

Objetivo:
- Acesso apenas via service role ou funções controladas.
- Nenhum acesso direto a partir do client.

SQL recomendado:

CREATE POLICY "No direct access to payments"  
ON public.payments  
FOR ALL  
TO public  
USING (false)  
WITH CHECK (false);

Qualquer acesso a payments deve ser feito via Edge Functions ou APIs protegidas, nunca diretamente com a anon key.

O skill deve deixar claro ao utilizador que este SQL é um template e deve ser validado numa base de testes antes de aplicar em produção, especialmente quando os nomes das colunas foram inferidos.

### 4. Auth e Admin Hardening

Blindar login, sessão e painel de administração.

Subsecção: Proteção de login contra brute-force

Princípios:

- Limitar tentativas de login por IP e, opcionalmente, por email num intervalo de tempo.
- Devolver mensagens de erro genéricas, sem revelar se o email existe ou não.

Em Cloudflare:

- Criar regra de rate limiting para rotas como /api/login e /api/auth/*.
- Exemplo: máximo de 10 a 20 pedidos de login por IP em 15 minutos, depois disso bloquear ou aplicar JS Challenge.

Se estiveres a usar Supabase Auth diretamente no frontend, o skill deve sugerir:

- Implementar camada adicional via Edge Function para login mais sensível (por exemplo, para admin), onde é possível contar tentativas por IP/email e aplicar bloqueios temporários.

Subsecção: Proteção da rota /admin

Regra forte:

- Nunca servir HTML nem dados de /admin a utilizadores:
  - não autenticados
  - autenticados mas não registados em admin_users

Padrão recomendado:

No frontend:

- Verificar sessão via Supabase Auth.
- Antes de renderizar conteúdo de admin, chamar endpoint que verifica se auth.uid() existe na tabela admin_users.

No backend:

- Em qualquer endpoint /api/admin/*:
  - Validar token Supabase.
  - Confirmar que auth.uid() está registado em admin_users.
  - Só então devolver dados.

Subsecção: Sessões e email verificado

Boas práticas:

- Sessões de admin com timeout mais curto, por exemplo 30 a 60 minutos de inatividade.
- Exigir email verificado, usando o campo email_confirmed_at, para:
  - Aceder a /admin
  - Executar ações críticas, como ver dados PII ou editar encomendas

O skill deve sugerir explicitamente que no painel Supabase Auth se ative verificação de email.

### 5. Hardening de APIs e Edge Functions

Remover portas de entrada óbvias via endpoints públicos.

Validação de input:

- Assegurar que:
  - Todos os campos obrigatórios estão presentes.
  - Os tamanhos de campos de texto são limitados (por exemplo mensagem com máximo de 2 000 caracteres).
  - Os formatos de email, telefone e outros campos são validados com regex apropriadas.
  - Requests com payload demasiado grande são rejeitadas.

Proteção anti-spam:

- Adicionar honeypot invisível em formulários (campo hidden que bots tendem a preencher, humanos não).
- Em endpoints com muito abuso, adicionar reCAPTCHA ou Cloudflare Turnstile, conforme o stack e a preferência.

Logging mínimo:

- Guardar ip_address e user_agent em tabelas como contacts, leads e bookings, para poder identificar IPs abusivos e padrões de spam.
- Evitar guardar dados desnecessários para respeitar RGPD.

CORS restrito:

- Configurar resposta de CORS para permitir apenas Origins do domínio de produção e, se necessário, de staging.
- Evitar Access-Control-Allow-Origin: * em produção.

### 6. Infraestrutura Cloudflare, WAF e Rate Limiting

Blindagem ao nível de rede e infraestrutura.

Subsecção: HTTPS e HSTS

Checklist:

- Always Use HTTPS ativado no projeto Cloudflare Pages.
- Certificado SSL ativo, válido e sem warnings.
- Header Strict-Transport-Security configurado com:
  - max-age de pelo menos 31536000 segundos (um ano)
  - includeSubDomains
  - preload, se planeias submeter ao preload list dos browsers

Subsecção: WAF e rate limiting

Regras modelo para implementar no painel Cloudflare:

Regra para proteger /api/contact:

- Condições:
  - Caminho da request contém /api/contact
  - Número de requests do mesmo IP em 5 minutos é superior a um limite, por exemplo 50
- Ação:
  - Aplicar Block ou JS Challenge

Regra para proteger /admin:

- Condição:
  - Caminho começa por /admin
- Ação:
  - Aplicar JS Challenge ou Managed Challenge

Opcionalmente, adicionar:

- Bloqueio ou challenge para:
  - Países sem relevância comercial para o site
  - ASNs conhecidos por alojar bots maliciosos
- Uso de regras geridas (Managed Rules) da Cloudflare para XSS/SQL injection básicos.

### 7. Secrets e Configuração

Refinar a gestão de segredos para evitar exposição acidental.

Principais regras:

- Nunca expor em JS, HTML ou repositórios públicos:
  - SUPABASE_SERVICE_ROLE_KEY
  - STRIPE_SECRET_KEY
  - RESEND_API_KEY
  - Outras chaves privadas de APIs ou serviços

- Usar sempre environment variables:
  - Em Cloudflare Pages, para produção e pré-visualização.
  - Em ficheiro .dev.vars para desenvolvimento local com wrangler.

Tabela resumo:

Variável: SUPABASE_URL  
- Onde deve estar: Cloudflare env e código (pode ser pública)  
- Onde não deve estar: não aplicável, é aceitável ser pública

Variável: SUPABASE_ANON_KEY  
- Onde deve estar: Cloudflare env e frontend  
- Onde não deve estar: repositórios públicos sem contexto ou documentação clara

Variável: SUPABASE_SERVICE_ROLE_KEY  
- Onde deve estar: apenas em environment variables server-side (Cloudflare env, SECRETS)  
- Onde não deve estar: JS/HTML públicos, repositórios git, ficheiros commitados

Variável: RESEND_API_KEY  
- Onde deve estar: apenas em environment variables server-side  
- Onde não deve estar: JS/HTML públicos, repositórios git

Variável: STRIPE_SECRET_KEY  
- Onde deve estar: apenas em environment variables server-side  
- Onde não deve estar: JS/HTML públicos, repositórios git

O skill deve lembrar o utilizador de nunca colocar estas chaves em código exposto, mesmo que o repositório pareça privado.

### 8. Checklist Final (compacto e único)

No fim, o skill deve devolver uma checklist única e acionável:

Título: Security Hardening Checklist

Secção FRONTEND e HEADERS:
- HTTPS ativo em todo o site
- Header Strict-Transport-Security configurado
- Content-Security-Policy aplicada sem erros graves
- X-Frame-Options, X-Content-Type-Options e Referrer-Policy corretamente definidos
- Nenhum recurso HTTP carregado em páginas HTTPS (zero mixed content)

Secção SUPABASE e DB:
- RLS ativo em todas as tabelas com dados sensíveis
- Policies criadas ou revistas para contacts, leads, orders, bookings, profiles, admin_users e payments
- Nenhum SELECT público em tabelas sensíveis
- Tabela admin_users sem acesso direto via anon ou authenticated
- Tabela payments acessível apenas via service role ou funções controladas

Secção AUTH e ADMIN:
- /admin acessível apenas a utilizadores autenticados com role admin
- Rate limiting ativo nos endpoints de login
- Email verificado exigido para ações críticas
- Sessões de admin com timeout adequado

Secção APIs e EDGE FUNCTIONS:
- Validação de inputs em todos os endpoints públicos
- CORS restrito aos domínios de produção e staging
- Logs mínimos de IP e user-agent em endpoints sensíveis
- Proteção anti-spam em formulários (honeypot e, se necessário, captcha ou WAF)

Secção INFRA e CLOUDFLARE:
- WAF ativo com regras contra bots, XSS e SQLi básicos
- Rate limiting configurado em /api/contact, /api/subscribe, /api/login
- Proteção adicional aplicada a /admin (challenge se fizer sentido)
- Nenhuma página sensível indexada sem necessidade (robots.txt e meta noindex nas páginas privadas)

Secção SECRETS:
- Nenhuma secret exposta em JS, HTML ou repositórios públicos
- Todas as secrets guardadas em environment variables
- Chaves rotacionadas periodicamente sempre que possível

## Integração com outros skills

Este skill trabalha em conjunto com:

- supabase-backend-architect: primeiro constrói o backend, depois este skill aperta RLS, policies e proteção de endpoints.
- httrack-cleanup-seo-safe: primeiro limpa clones e remove scripts/tracking antigos, depois este skill sobe a segurança a nível de headers, WAF e DB.
- modern-ui-transformer: garante UI moderna e acessível, sem introduzir vulnerabilidades óbvias.
- seo-audit-v3: pode ser corrido no fim para verificar que o hardening não quebrou performance e SEO.

## Fluxo recomendado

Fluxo sugerido para um projeto novo:

1. Construir o site com:
   - @2-modern-ui-transformer
   - @3-supabase-backend-architect
   - @4-content-marketing-engine

2. Quando o site estiver funcional, chamar:

   @site-security-hardening

   seguido do resumo do projeto, tabelas, auth, endpoints e configuração Cloudflare.

3. Aplicar o output:
   - Executar o SQL no Supabase SQL Editor.
   - Configurar os headers no ficheiro headers ou diretamente no painel Cloudflare.
   - Configurar WAF e rate limiting no painel Cloudflare.
   - Ajustar código nas funções /api e no frontend conforme as recomendações.

4. Opcionalmente, correr @seo-audit-v3 para validar SEO, segurança técnica visível e performance.
