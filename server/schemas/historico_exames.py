from pydantic import BaseModel, ConfigDict


class HistoricoExamesBase(BaseModel):
    prontuario_id: int
    arquivo: str | None = None


class HistoricoExamesCreate(HistoricoExamesBase):
    pass


class HistoricoExamesRead(HistoricoExamesBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
