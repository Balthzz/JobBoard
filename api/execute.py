# Fonctions pour CRUD : 

from main import *
import mysql.connector
# from database import get_db_connection

mydb = mysql.connector.connect(
        host="127.0.0.1",
        user="balthazar",
        password="chillflex",
        database="data_base"
    )

# mydb = get_db_connection()

#Fonction pour exécuter une des commandes CRUD
def commitData(sql,val):
     
     try :
         cursor = mydb.cursor()
         result = cursor.execute(sql, val)#Renvoie true si valider sinon renvoie l'erreur
         mydb.commit()
         return result
     except Exception as e:
        return str(e)

def fetchoneData(sql):
     try : 
          cursor = mydb.cursor()
          cursor.execute(sql)
          result = cursor.fetchone()
          if result is None : 
               raise HTTPException(status_code=404, detail="Advertisement not found")
          return result
     except Exception as e:
        return str(e)

def fetchallData(sql):
     try :
          cursor = mydb.cursor()
          cursor.execute(sql)
          data = cursor.fetchall()
          column_names = [i[0] for i in cursor.description]
          return [column_names] + data
     except Exception as e:
        return str(e)


