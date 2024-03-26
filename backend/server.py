#!/usr/bin/env python3

from dotenv import load_dotenv
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from triple_loader import TripleLoader, NtFileLoader
from triple_updater import TripleUpdater
from types_ import Triple, TripleUpdate

load_dotenv()

triple_loader: TripleLoader = NtFileLoader()
triple_updater: TripleUpdater = None

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins="http://localhost:4200",
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", status_code=200)
def read_root():
    return "Hello World"


@app.get("/triples")
def get_triples(object_id: str):
    triples: List[Triple] = triple_loader.load(object_id)

    return {"triples": [triple.__dict__ for triple in triples]}


@app.post("/update")
def update_triples(triple_updates: List[TripleUpdate]):
    # TODO: De-serialize

    triple_updater.update(triple_updates)
    return 200
