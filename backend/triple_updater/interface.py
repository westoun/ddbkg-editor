from abc import ABC, abstractmethod
from typing import List

from types_ import Triple, TripleUpdate


class TripleUpdater(ABC):
    """Process and/or store triple updates."""

    @abstractmethod
    def update(self, triple_updates: List[TripleUpdate]) -> None: ...
