#!/usr/bin/env python3

from dotenv import load_dotenv
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

from triple_loader import TripleLoader, LoaderFactory
from triple_updater import TripleUpdater, JsonlStore
from types_ import Triple, TripleUpdate

load_dotenv()

triple_loader: TripleLoader = LoaderFactory.get_loader()
triple_updater: TripleUpdater = JsonlStore()


class TripleUpdateBody(BaseModel):
    triple_updates: List[TripleUpdate]


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
    if not object_id.startswith("<"):
        object_id = f"<{object_id}>"

    triples: List[Triple] = triple_loader.load(object_id)

    return {"triples": [triple.__dict__ for triple in triples]}


@app.post("/update")
def update_triples(body: TripleUpdateBody):
    triple_updater.update(body.triple_updates)
    return 200
