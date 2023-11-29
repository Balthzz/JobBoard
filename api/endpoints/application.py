from main import *

from Class import application
from execute import commitData

router = APIRouter()

# Add a new people
@router.post("/application")
async def add_application(apply : application):  
    print(apply)   
    sql = "INSERT INTO application (emailSent,id_advertisement,id_peoples) VALUES (%s,%s,%s)"
    val = (apply.emailSent, apply.id_advertisement,apply.id_peoples)
    return commitData(sql,val) 