from pydantic import BaseModel, ConfigDict

from models.prontuario import SangueType, SexoType

from schemas.patient import PatientRead


class ProntuarioBase(BaseModel):
    patient_id: int
    peso: float | None = None
    altura: float | None = None
    alergias: str | None = None
    sexo: SexoType | None = None
    tipo_sanguineo: SangueType | None = None


class ProntuarioCreate(ProntuarioBase):
    pass


class ProntuarioRead(ProntuarioBase):
    id: int
    patient_id: int
    patient : PatientRead

    model_config = ConfigDict(from_attributes=True)