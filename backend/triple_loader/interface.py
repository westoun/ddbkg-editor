from abc import ABC, abstractmethod
from typing import List

from types_ import Triple


class TripleLoader(ABC):

    @abstractmethod
    def load(self, object_id: str) -> List[Triple]: ...
