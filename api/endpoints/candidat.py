from main import *

from fastapi import HTTPException, status
from Class import candidat
from execute import fetchoneData, commitData
from security import encode, decode
import urllib.parse
# Votre code ici



router = APIRouter()





@router.get("/candidat/{email}/{mdp}")
async def get_Connect(email: str, mdp: str):
    email = urllib.parse.unquote(email)
    mdp = urllib.parse.unquote(mdp)
    sql = f"SELECT id_peoples,firstName,mdp FROM peoples WHERE email='{email}' and mdp='{mdp}'" 
    data_fetch = fetchoneData(sql)
    if data_fetch and data_fetch[2] == mdp:
        await connected(data_fetch[0], data_fetch[1])
        return {"id": data_fetch[0], "firstName": data_fetch[1]}
    else:
        return False

# Add a new people
@router.post("/candidat")
async def add_people(candidat : candidat):     
    sql = "INSERT INTO peoples (firstName, lastName, status, tel, email, mdp) VALUES (%s,%s,%s,%s,%s,%s)"
    val = (candidat.firstName, candidat.lastName, candidat.statu, candidat.tel, candidat.email, candidat.mdp)
    return commitData(sql,val) 


@router.get("/accountConnect/{id}")
async def amdin_Connect(id : int):
    
    sql = f"SELECT status FROM peoples WHERE id_peoples = '{id}'"    
    return fetchoneData(sql)



@router.patch("/connected")
async def connected(id_user: int, firstName_user: str):
    
    playload = {
        "id": id_user,
        "firstName": firstName_user
    }
    token = await encode(playload)
    
    sql = f"UPDATE peoples SET token = '{token}' WHERE id_peoples={id_user}"
    val = ""       

    return commitData(sql, val)

@router.get("/get_connexion")
async def get_connexion():
    sql =("SELECT token FROM peoples WHERE token IS NOT NULL")

    token = fetchoneData(sql)

    if(token):
        result = await decode(token)
        return result
    else:
        return False
    
    


@router.patch("/disconnect/{id}")
async def modify_data(id : int):

    sql = f"UPDATE peoples SET token = (NULL) WHERE id_peoples= {id}"
    val = ""

    return commitData(sql,val)
