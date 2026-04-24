from sqlmodel import SQLModel, Field

class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True)
    senha: str
    
    nome: str 
    telefone: str
    estado: str
    cidade: str
    cep: str = Field(max_length=9)
    rua: str
    bairro: str
    numero: int

    tipo: str
    
class Administrador(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key='user.id')

class Medico(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key='user.id')
    crm: str 
    especialidade: str
    
class Paciente(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key='user.id')
