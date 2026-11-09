from pydantic import BaseModel, ConfigDict


class PrescricaoMedicamentoBase(BaseModel):
    prescricao_id: int
    medicamento: str | None = None
    via: str | None = None
    posologia: str | None = None
    duracao: str | None = None


class PrescricaoMedicamentoCreate(PrescricaoMedicamentoBase):
    pass


class PrescricaoMedicamentoRead(PrescricaoMedicamentoBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
