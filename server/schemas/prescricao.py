from pydantic import BaseModel, ConfigDict


class PrescricaoBase(BaseModel):
    user_id: int
    medicamento: str
    via: str
    posologia: str
    duracao: int
    observacoes: str
    exames: str | None = None


class PrescricaoCreate(PrescricaoBase):
    pass


class PrescricaoRead(PrescricaoBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
