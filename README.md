# MediCloud

O **MediCloud** é um sistema para clínicas médicas que permite o **agendamento online de consultas** e a realização de **atendimentos médicos virtuais** de forma rápida e organizada. Por meio da plataforma, os pacientes podem escolher horários disponíveis, receber lembretes e acessar seu histórico de atendimentos.

Para a clínica, o sistema oferece **gestão de agendas, prontuários eletrônicos e relatórios**, além da opção de **consulta médica virtual**, contribuindo para a otimização do atendimento, a redução de tarefas administrativas e garantindo segurança no armazenamento dos dados.

## 🛠️ Tecnologias

| Tecnologias |
| ----------- |
| ReactJS     |
| TailwindCSS |

## ▶️ Como executar

1. **Clone e acesse o repositório**

    ```bash
    git clone https://github.com/Davi-1903/MediCloud.git
    cd MediCloud
    ```

2. **Instale todas as dependências**

    ```bash
    # Frontend
    npm install

    # Backend
    pip install -r requirements.txt
    ```

3. **Crie um arquivo `.env` na raiz do projeto e adicione as variáveis de ambiente**

    ```env
    # =================< Autenticação >=================
    SECRET_KEY=<CHAVE-SECRETA>
    ALGORITHM=HS256
    TOKEN_EXPIRE_MINUTES=30

    # ================< Banco de Dados >================
    DATABASE_URI=<URL-PARA-O-BANCO-DE-DADOS>
    ```

4. **Inicie ambos os servidores**

    ```bash
    # Frontend
    npm run dev

    # Backend
    uvicorn app:app --reload
    ```

## 🙃 Equipe

| Nome             |
| ---------------- |
| Ana Cecilya      |
| Ana Clara        |
| Davi Francisco   |
| Maria das Graças |

## 📅 Cronograma

| Tarefa     |        Data        |
| ---------- | :----------------: |
| Requisitos | `24/03` - `24/04`  |
| Modelagem  | `30/03` - `30/04`  |
| Figma      | `30/04` - `30/06`  |
| Backend    | `30/04` - `30/08`  |
| Frontend   | `30/04` - `30/08`  |

## 📄 Documentos

- [MediCloud](docs/MediCloud.md)

## ⚖️ Licença

- [LICENSE](LICENSE)
