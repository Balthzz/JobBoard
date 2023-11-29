from main import *
from execute import commitData
from Class import company

router = APIRouter()

@router.post("/company")
async def add_company (company: company):     
    sql = "INSERT INTO companies (name, locationAdress, sector) VALUES (%s,%s,%s)"
    val = (company.name, company.locationAdress, company.sector)
    return commitData(sql,val) 

