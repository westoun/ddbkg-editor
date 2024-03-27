from dataclasses import dataclass

from .triple import Triple


@dataclass
class TripleUpdate:
    original_triple: Triple
    updated_triple: Triple
    timestamp: str
