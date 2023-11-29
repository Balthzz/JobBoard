from main import *
import jwt 


async def encode(playloadData):
    secretKey = "yak"
    token = jwt.encode(
        payload=playloadData,
        key=secretKey
    )
  
    return token




async def decode(token):
    secretKey = "yak"
    playload = jwt.decode(
        jwt=token[0],
        algorithms=["HS256"],
        key=secretKey
    )
    return playload


