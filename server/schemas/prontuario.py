from pydantic import BaseModel, ConfigDict

from models.prontuario import SangueType, SexoType


class ProntuarioBase(BaseModel):
    user_id: int
    idade: int
    peso: float
    altura: float
    alergias: str | None = None
    sexo: SexoType | None = None
    tipo_sanguineo: SangueType | None = None


class ProntuarioCreate(ProntuarioBase):
    pass


class ProntuarioRead(ProntuarioBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
