from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from models import Cities, Stations, GasPrices
from services import engine, create_db_and_tables
from sqlmodel import Session
#We create an instance of FastAPI
app = FastAPI()

#We define authorizations for middleware components
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#We use a callback to trigger the creation of the table if they don't exist yet
#When the API is starting
@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.post("/add-city/")  # add city in DB 
async def add_city(city: Cities):
    with Session(engine) as session:

        #New code block
        exist = session.query(Cities).filter(
            Cities.postal_code == city.postal_code).first()
        if exist:
            raise HTTPException(
                status_code=400, detail="Postal code already exists")
        #New code block

        session.add(city)
        session.commit()
        session.refresh(city)
        return city
    
@app.post("/add-station/")
async def add_station(station: Stations):
    with Session(engine) as session:
        exist = session.query(Stations).filter(
            Stations.station_id == station.station_id).first()
        if exist:
            raise HTTPException(
                status_code=400, detail="Station already exists")

     
        session.add(station)
        session.commit()
        session.refresh(station)

        return station

@app.post("/add-gas-price/")
async def add_station(gasPrice: GasPrices):
    with Session(engine) as session:
        exist = session.query(GasPrices). \
            filter(GasPrices.oil_id == gasPrice.oil_id). \
            filter(GasPrices.maj == gasPrice.maj). \
            first()
        if exist:
            raise HTTPException(
                status_code=400, detail="Entry already exists")

        session.add(gasPrice)
        session.commit()
        session.refresh(gasPrice)
        return gasPrice