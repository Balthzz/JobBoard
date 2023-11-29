from main import *

from Class import advertisement
from execute import commitData, fetchoneData

router = APIRouter()

 # Add a new advertisement
@router.post("/advertisement")
async def add_advertisement(ad: advertisement):
    try:
        sql = "INSERT INTO advertisement (title, contract, shortDescription, detailDescription, id_companies) VALUES (%s,%s,%s,%s,%s)"
        val = (ad.title,ad.contract, ad.shortDescription, ad.detailDescription,ad.id_companies)
        return commitData(sql,val)
    

    except Exception as e:
        return str(e)  # Retourne l'erreur comme réponse pour le débogage

        


@router.get("/register/{advertisementId}")
async def get_advertisement(advertisementId: int):
    try:
        sql =(f"SELECT title, shortDescription, detailDescription FROM advertisement WHERE id_advertisement = {advertisementId}")
        result = fetchoneData(sql)           

        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

