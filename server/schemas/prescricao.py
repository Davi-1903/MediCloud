from pydantic import BaseModel, ConfigDict


class PrescricaoBase(BaseModel):
    prontuario_id: int
    consulta_id: int
    observacoes: str
    exames: str | None = None


class PrescricaoCreate(PrescricaoBase):
    pass


class PrescricaoRead(PrescricaoBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
