# DESCRIÇÃO 

Este aplicativo móvel foi desenvolvido para a Clamed, uma empresa do ramo farmacêutico, com o objetivo de otimizar o gerenciamento da movimentação de produtos entre suas filiais e facilitar o trabalho dos motoristas. O aplicativo oferece uma interface intuitiva e funcionalidades práticas para visualizar, registrar e atualizar o status de entregas e coletas, proporcionando mais organização e controle no processo logístico.

O aplicativo permite que os motoristas visualizem suas entregas, acompanhem o status e acessem o mapa para traçar uma linha reta entre a origem e o destino. A funcionalidade de captura de imagem permite que o motorista registre a coleta e a entrega com fotos, enquanto o administrador pode gerenciar o estoque, cadastrar usuários, e acompanhar as movimentações de produtos de maneira prática e visual.

# Funcionalidades Principais
## 1. Login
- Tela de login com uma interface amigável e animações usando Lottie.
- Autenticação de usuário.
  
## 2. Home
- Saudações personalizadas com o nome do usuário.
- Acesso direto a telas de Estoque e Usuários.
- Interface com atalhos para fácil navegação.

## 3. Movimentação de Produtos
- Listagem: Exibe todas as movimentações, incluindo detalhes como produto, origem, destino e status atual.
- Status e Ações:
 - Aguardando Coleta: Possui botão para iniciar a coleta, que abre a câmera do dispositivo para captura de imagem, atualizando o status da coleta.
 - Em Trânsito: Exibe o status "Em Trânsito" e oferece um botão para finalizar a entrega, permitindo nova captura de imagem no local de entrega.
 - Coleta Finalizada: Movimentações finalizadas, com status atualizável.
 - Mapas: Integração com um mapa básico que traça uma linha reta entre o ponto de origem e o destino de cada movimentação.
## 4. Gerenciamento de Estoque e Usuários
- Estoque: Listagem de produtos disponíveis, com pesquisa por nome e filtro por filiais.
- Usuários: Cadastro e listagem de novos usuários, com identificação de tipos (motorista ou filial).
- Gestão Simples: Interface de fácil acesso para adicionar e editar informações de usuários e estoque.


## Tecnologias Utilizadas
- React Native com Expo
- TypeScript para tipagem estática e maior segurança
- React Navigation para navegação fluida entre telas
- Expo Image Picker para captura de imagens diretamente com a câmera do dispositivo
- Lottie para animações atraentes na tela de login
- Axios para requisições HTTP e integração com a API de dados

## Instalação
1. Clone o repositório:
   
   ```
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```
2. Instale as dependências:
   
   ```
   npm install
   ```
3. Inicie o aplicativo:
   
   ```
   npm run start
   ```

## Estrutura de pastas
```
.
├── .expo
├── .vscode
├── assets
│   ├── images
│   └── animations
├── components
│   └── Header.tsx
├── node_modules
├── src
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── MapScreen.tsx
│   ├── MovementList.tsx
│   ├── MovementListForDriver.tsx
│   ├── MovementRegistration.tsx
│   ├── Stock.tsx
│   ├── types.ts
│   ├── UserList.tsx
│   └── UserRegistration.tsx
├── .env
├── .gitignore
├── app.json
├── App.tsx
├── babel.config.js
├── package-lock.json
├── package.json
└── tsconfig.json
```
   
   
   
