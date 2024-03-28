import duckdb
import os
from typing import List

from .interface import TripleLoader
from types_ import Triple


class BikidataLoader(TripleLoader):
    """Load triples from parquet files created by bikidata."""

    triplet_path: str
    hash_map_path: str

    def __init__(self) -> None:
        TRIPLET_PARQUET_PATH = os.getenv("TRIPLET_PARQUET_PATH")
        HASH_MAP_PARQUET_PATH = os.getenv("HASH_MAP_PARQUET_PATH")

        assert (
            TRIPLET_PARQUET_PATH is not None
        ), "If the BikidataLoader is used, the environment variable TRIPLET_PARQUET_PATH has to be specified."

        assert (
            HASH_MAP_PARQUET_PATH is not None
        ), "If the BikidataLoader is used, the environment variable HASH_MAP_PARQUET_PATH has to be specified."

        self.triplet_path = TRIPLET_PARQUET_PATH
        self.hash_map_path = HASH_MAP_PARQUET_PATH

    def load(self, object_id: str) -> List[Triple]:
        query = f"""
            SELECT lmap1.literal, pmap.literal, lmap2.literal 
            FROM '{self.triplet_path}' as stor
            JOIN '{self.hash_map_path}' as lmap1
            ON lmap1.hash = stor.subject
            JOIN '{self.hash_map_path}' as lmap2
            ON lmap2.hash = stor.object
            JOIN '{self.hash_map_path}' as pmap
            ON pmap.hash = stor.predicate
            WHERE lmap1.literal = '{object_id}';
        """

        entries = duckdb.query(query).fetchall()

        triples: List[Triple] = []
        for subject, predicate, object in entries:
            triple = Triple(subject=subject, predicate=predicate, object=object)
            triples.append(triple)

        return triples
