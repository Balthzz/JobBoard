from pydantic import BaseModel
from typing import Any
from enum import Enum

#classe table data base
class candidat(BaseModel):
    firstName: str
    lastName: str
    statu: str
    tel: str
    email: str
    mdp: str

class advertisement(BaseModel):
    title: str
    contract : str
    shortDescription: str
    detailDescription: str
    id_companies : int

class company(BaseModel):
    name : str
    locationAdress : str
    sector : str

class application(BaseModel):
    emailSent : str
    id_advertisement : int
    id_peoples : int


class peopleConnect(BaseModel):
    email : str
    mdp : str

class updateData(BaseModel):
    table : str
    update : Any
    dataName : str
    id : int


class Sector(str, Enum):  #enum format
    It = 'It'
    marketing = 'marketing'

# class Status(str, Enum):  #enum format
#     Student = 'Student'
#     Unemployed = 'Unemployed'
#     Employee = 'Employee'

class CompanyCreate(BaseModel):
    name: str
    address: str
    sector: Sector #referal to Sector class

class Company(CompanyCreate): #
    company_id: int

class AdvertisementCreate(BaseModel):
    title : str
    shortDescription: str
    detailDescription: str

class Advertisement(AdvertisementCreate): #to call advertisementCReate
    advertisementId: int

#################candidat table########################
class CandidatCreate(BaseModel):
    statu : str
    lastName : str
    firstName : str
    tel : int
    email : str #maybe use email method verification?
    mdp: str

class Candidat(CandidatCreate): #to call advertisementCReate
    candidatId: int