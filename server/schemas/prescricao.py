from pydantic import BaseModel, ConfigDict

from schemas.prescricao_medicamento import PrescricaoMedicamentoRead


class PrescricaoBase(BaseModel):
    prontuario_id: int
    consulta_id: int
    # medicamento: str
    # via: str
    # posologia: str
    # duracao: int
    observacoes: str
    exames: str | None = None


class PrescricaoCreate(PrescricaoBase):
    pass


class PrescricaoRead(PrescricaoBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    prescricao_medicamentos: list[PrescricaoMedicamentoRead]