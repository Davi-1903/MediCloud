from pydantic import BaseModel, ConfigDict

from models.prontuario import SangueType, SexoType


class ProntuarioBase(BaseModel):
    peso: float | None = None
    altura: float | None = None
    alergias: str | None = None
    sexo: SexoType | None = None
    tipo_sanguineo: SangueType | None = None


class ProntuarioCreate(ProntuarioBase):
    pass


class ProntuarioRead(ProntuarioBase):
    model_config = ConfigDict(from_attributes=True)
    id: int


class ProntuarioUpdate(BaseModel):
    peso: float | None = None
    altura: float | None = None
    alergias: str | None = None
    sexo: SexoType | None = None
    tipo_sanguineo: SangueType | None = None