from sqlalchemy import Integer, Float
from sqlalchemy.orm import Mapped, mapped_column
from database import Base


class Record(Base):
    __tablename__ = 'records'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    age: Mapped[int] = mapped_column(Integer, nullable=False)
    weight: Mapped[float] = mapped_column(Float, nullable=False)
    height: Mapped[float] = mapped_column(Float, nullable=False)
    # temperatura, pressão, motivo, diagnostico

#   historico: Mapped['Historico'] = relationship(
#         back_populates='material', uselist=False, cascade='all, delete-orphan'
#     )
