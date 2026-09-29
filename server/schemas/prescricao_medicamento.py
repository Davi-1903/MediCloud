from pydantic import BaseModel, ConfigDict


class PrescricaoMedicamentoBase(BaseModel):
    prescricao_id: int
    medicamento: str
    via: str
    posologia: str
    duracao: str


class PrescricaoMedicamentoCreate(PrescricaoMedicamentoBase):
    pass


class PrescricaoMedicamentoRead(PrescricaoMedicamentoBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
