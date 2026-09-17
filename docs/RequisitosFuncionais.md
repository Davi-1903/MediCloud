# Requisitos Funcionais
## Usuário
- **RF01:** Deve ser possível que o usuário realize seu cadastro através do
nome, e-mail e senha. Ao concluir o cadastro, o usuário deve ser direcionado
para a página inicial (home). Caso já exista um usuário cadastrado com o mesmo
e-mail, o sistema deve exibir um pop-up com a mensagem "Credenciais Inválidas".
- **RF02:** Deve ser possível que o usuário realize login através do e-mail e
senha. Ao realizar o login com sucesso, o usuário deve ser direcionado para a
página inicial (home). Caso o e-mail ou a senha estejam incorretos, o sistema
deve exibir um pop-up com a mensagem "Email ou senha incorretos."
- **RF03:** Deve ser possível que o usuário realize logout do sistema ao clicar
no botão correspondente. Após o logout, o usuário deve ser direcionado para a
página de login.
- **RF04:** Deve ser possível que o usuário acesse a página de médicos e
visualize os médicos disponíveis, seus horários e os tipos de consulta
disponíveis, sendo elas online ou presencial.
- **RF05:** Deve ser possível que o usuário selecione um médico e uma data para
solicitar uma consulta. Após a solicitação, o sistema deve exibir um pop-up com
a mensagem "Aguardando confirmação de consulta".
- **RF06:** Deve ser possível que, ao solicitar uma consulta pela primeira vez, o usuário seja redirecionado para uma página com formulário para cadastro de informações pessoais (endereço, data de nascimento, peso, altura...).
- **RF07:** Deve ser possível que o usuário confirme uma consulta com até 1 dia
de antecedência da data prevista.
- **RF08:** Deve ser possível que o usuário cancele uma consulta com até 1 dia
de antecedência da data prevista.
- **RF09:** Deve ser possível que o usuário acesse a página de histórico de
consultas e visualize suas consultas realizadas e/ou agendadas.
- **RF10:** Deve ser possível que o usuário acesse e visualize sua página de
perfil.
- **RF11:** Deve ser possível que o usuário acesse e visualize a página inicial (home) do sistema.
- **RF12:** Deve ser possível que o usuário acesse e visualize seu histórico de
exames.
- **RF13:** Deve ser possível que o usuário acesse e visualize suas receitas e
documentos.

## Médico
- **RF14:** Deve ser possível que o médico realize o seu cadastro através do
nome, e-mail, CRM, Especialidade, senha e UF, porêm seu cadastro só será validado se o administrador permitir esse registro. Caso já exista um médico cadastrado com o mesmo
e-mail, o sistema deve exibir um pop-up com a mensagem "Credenciais Inválidas".
- **RF15:** Deve ser possível que o médico realize seu login através do
e-mail e senha. Ao concluir o login, o médico deve ser direcionado
para a página inicial (home) para médicos. 
- **RF16:** Deve ser possível que o médico realize logout do sistema ao clicar
no botão correspondente. Após o logout, o médico deve ser direcionado para a
página de login.
- **RF17:** Deve ser possível o médico cadastrar horários disponíveis para consultas, informando o dia, horário e o formato da consulta (online ou presencial). 
- **RF18:** Deve ser possível que o médico confirme uma consulta até um dia antes da data do atendimento.
- **RF19:** Deve ser possível que o médico cancele uma consulta até um dia antes da data do atendimento.
- **RF20:** Deve ser possível que o médico, durante ou após a consulta, cadastre informações do atendimento no prontuário eletrônico do paciente, informando dados como peso, altura, temperatura, pressão arterial, motivo da consulta, diagnóstico, prescri.
- **RF21:** Deve ser possível que o médico anexe arquivos relacionados à consulta do paciente, como exames, receitas, atestados e outros documentos.
## Sistema
- **RF22:** Deve ser possível os usuários receberem notificações sobre as informações das consultas agendadas (lembretes, alterações e cancelamento do atendimento).
- **RF23:** Deve ser possível que, passados 30 dias, um médico com status inativo seja excluído do banco de dados de forma automática.
## Administrador
- **RF24:** Deve ser possível que o administrador realize seu login através do
e-mail e senha. Ao concluir o login, o administrador deve ser direcionado
para a página de dashboard do sistema.
- **RF25:** Deve ser possível que o administrador realize a confirmação do cadastro dos médicos.
- **RF26:** Deve ser possível que o administrador possa mudar o status do médico (ativo e inativo).
