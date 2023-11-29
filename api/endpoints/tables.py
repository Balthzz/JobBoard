from main import *

from Class import updateData
from execute import fetchallData, commitData
router = APIRouter()

@router.get("/table/{table}")
async def get_table(table : str):
    sql = f"SELECT * FROM {table} "    
    return fetchallData(sql)

@router.get("/table/{table}/{id}")
async def get_tableRaw(table : str,id : str):
    sql = f"SELECT * FROM {table} WHERE id_{table}={id}"      
    return fetchallData(sql)

@router.patch("/table")
async def modify_data(dataUP :updateData):
    sql = f"UPDATE {dataUP.table} SET {dataUP.dataName} = '{dataUP.update}' WHERE id_{dataUP.table}={dataUP.id}"
    val = ""
    return commitData(sql,val)

#Delete an advertisement by id
@router.delete("/table/{table}/{id}")
async def delete_tableRow(table : str, id: int):
    try:
        sql = (f"DELETE FROM {table} WHERE id_{table} = {id}")
        val = ""
        result = commitData(sql,val)
        print("del : ",result)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    