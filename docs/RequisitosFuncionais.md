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
- **RF06:** Deve ser possível que o usuário confirme uma consulta com até 1 dia
de antecedência da data prevista.
- **RF07:** Deve ser possível que o usuário cancele uma consulta com até 1 dia
de antecedência da data prevista.
- **RF08:** Deve ser possível que o usuário acesse a página de histórico de
consultas e visualize suas consultas realizadas e/ou agendadas.
- **RF09:** Deve ser possível que o usuário acesse e visualize sua página de
perfil.
- **RF10:** Deve ser possível que o usuário acesse e visualize a página inicial (home) do sistema.
- **RF11:** Deve ser possível que o usuário acesse e visualize seu histórico de
exames.
- **RF12:** Deve ser possível que o usuário acesse e visualize suas receitas e
documentos.

## Médico
- **RF10:** O médico poderá realizar login.
- **RF11:** O sistema permitirá que o médico realize logout.
- **RF12:** O sistema deve permitir que o médico cadastre horários disponíveis para consultas.
- **RF13:** O médico poderá confirmar a consulta com até 1 dia de antecedência.
- **RF14:** O médico poderá cancelar consultas agendadas com até 1 dia de antecedência.
- **RF15:** O médico deve poder cadastrar informações no prontuário do paciente.
RF16: O sistema deve permitir ao médico anexar arquivos (exames, receitas, etc.).
## Notificações
- **RF17:** O sistema deve enviar notificações sobre consultas agendadas.
- **RF18:** O sistema deve informar alterações ou cancelamentos de consultas.
## Administrador
- **RF19:** O administrador poderá fazer login.
- **RF20:** O administrador poderá cadastrar os médicos.
- **RF21:** O administrador poderá editar os médicos.
- **RF22:** O administrador poderá excluir os médicos.