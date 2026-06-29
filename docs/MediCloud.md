# **MediCloud**

## **Visão Geral**

O **MediCloud** é um sistema para clínicas médicas que permite o agendamento online de consultas e a realização de atendimentos médicos virtuais de forma rápida e organizada. Por meio da plataforma, os pacientes podem escolher horários disponíveis, receber lembretes e acessar seu histórico de atendimentos.  
Para a clínica, o sistema oferece gestão de agendas, prontuários eletrônicos e relatórios, além da opção de consulta médica virtual, contribuindo para a otimização do atendimento, a redução de tarefas administrativas e garantindo segurança no armazenamento dos dados.

## **Problemas que a API resolve**

Os clientes têm dificuldade em encontrar profissionais de qualidade próximos de suas residências, problemas esses que pioram com a falta de gestão das clínicas no agendamento por serem lentos e ineficientes. Outro problema é a falta de consultas onlines ou o agendamento precisa ser presencial.

## **Público alvo**

…

## **Principais funcionalidades**

- Melhor gestão das clínicas;
- Consultas onlines;
- Agendamento online;
- Melhor visibilidade e organização: datas, horários, lembretes, históricos;

## **Requisitos Funcionais**

### **Usuário**

- **RF01:** O sistema deve permitir o cadastro de usuário/paciente.
- **RF02:** O usuário/paciente poderá realizar login.
- **RF03:** O usuário poderá realizar logout.
- **RF04:** O usuário poderá ter acesso aos horários disponíveis dos médicos.
- **RF05:** O sistema deve permitir que o paciente agende consultas presenciais de forma online.
- **RF06:** O sistema deve permitir que o paciente agende consultas virtuais.
- **RF07:** O paciente deve poder confirmar a consulta com até 1 dia de antecedência.
- **RF08:** O paciente deve poder cancelar consultas agendadas com até 1 dia de antecedência.
- **RF09:** O paciente deve poder visualizar seu histórico de consultas.

### **Médico**

- **RF10:** O médico poderá realizar login.
- **RF11:** O sistema permitirá que o médico realize logout.
- **RF12:** O sistema deve permitir que o médico cadastre horários disponíveis para consultas.
- **RF13:** O médico poderá confirmar a consulta com até 1 dia de antecedência.
- **RF14:** O médico poderá cancelar consultas agendadas com até 1 dia de antecedência.
- **RF15:** O médico deve poder cadastrar informações no prontuário do paciente.
- **RF16:** O sistema deve permitir ao médico anexar arquivos (exames, receitas, etc.).

### **Notificações**

- **RF17:** O sistema deve enviar notificações sobre consultas agendadas.
- **RF18:** O sistema deve informar alterações ou cancelamentos de consultas.

### **Administrador**

- **RF19:** O administrador poderá fazer login.
- **RF20:** O administrador poderá cadastrar os médicos.
- **RF21:** O administrador poderá editar os médicos.
- **RF22:** O administrador poderá excluir os médicos.

## **Requisitos Não Funcionais**

### **Performance**

- **RNF01:** O tempo de resposta do sistema deve ser inferior a 3 segundos para operações comuns;
- **RNF02:** O sistema deve suportar múltiplos usuários simultâneos;

### **Manutenibilidade**

- **RNF03:** O sistema deve ser modular para facilitar manutenção e evolução.
- **RNF04:** O código deve seguir padrões de desenvolvimento (ex: MVC, boas práticas).
- **RNF05:** O sistema deve possuir documentação técnica atualizada.

### **Segurança**

- **RNF06:** O sistema deve garantir autenticação segura com criptografia de senhas (ex: hash \+ salt).
- **RNF07:** O sistema deve utilizar protocolo HTTPS para todas as comunicações.
- **RNF08:** O acesso às funcionalidades deve ser controlado por níveis de permissão (Paciente, Médico, Administrador).
- **RNF09:** O sistema deve proteger contra ataques comuns (SQL Injection, XSS, CSRF).

### **Usabilidade**

- **RNF10:** A interface deve ser responsiva (funcionar em desktop, tablet e smartphone);
- **RNF11**: O sistema deve ter navegação intuitiva e de fácil aprendizado;
- **RNF12:** O usuário deve conseguir realizar tarefas principais (agendar consulta, login) em até 3 etapas;
