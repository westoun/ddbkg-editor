from abc import ABC, abstractmethod
from typing import List

from types_ import Triple


class TripleLoader(ABC):
    """Load triples from a loader-specific datasource."""

    @abstractmethod
    def load(self, object_id: str) -> List[Triple]: ...
