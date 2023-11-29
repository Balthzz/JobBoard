import mysql.connector
from contextlib import contextmanager

@contextmanager
def get_db_connection():
    mydb = mysql.connector.connect(
        host="127.0.0.1",
        user="balthazar",
        password="chillflex",
        database="data_base"
    )
    return mydb