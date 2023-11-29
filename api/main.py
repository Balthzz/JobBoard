from fastapi import FastAPI, APIRouter, HTTPException

from endpoints import advertisement, application, candidat, company, tables



app = FastAPI()




#Sécurité CORS
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




app.include_router(advertisement.router, prefix="/api", tags=["advertisement"])
app.include_router(candidat.router, prefix="/api", tags=["candidat"])
app.include_router(company.router, prefix="/api", tags=["company"])
app.include_router(application.router, prefix="/api", tags=["application"])
app.include_router(tables.router, prefix="/api", tags=["table"])




