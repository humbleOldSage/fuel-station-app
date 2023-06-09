from sqlmodel import SQLModel, create_engine
import models

DATABASE_URL = 'postgresql://satyam:satyam@localhost/stations'

engine = create_engine(DATABASE_URL)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)