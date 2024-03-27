from dataclasses import dataclass
from typing import Dict

from .triple import Triple


@dataclass
class TripleUpdate:
    original_triple: Triple
    updated_triple: Triple
    timestamp: str

    def to_dict(self) -> Dict:
        return {
            "original_triple": self.original_triple.__dict__,
            "updated_triple": self.updated_triple.__dict__,
            "timestamp": self.timestamp,
        }
