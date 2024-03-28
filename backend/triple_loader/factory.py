import os
from typing import List, Type

from .interface import TripleLoader
from .nt_file_loader import NtFileLoader
from .bikidata_loader import BikidataLoader

LoaderClasses: List[Type[TripleLoader]] = [NtFileLoader, BikidataLoader]


class LoaderFactory:

    @classmethod
    def get_loader(cls) -> TripleLoader:
        loader_type = os.getenv("LOADER_TYPE")

        assert (
            loader_type is not None
        ), "The env variable 'LOADER_TYPE' has to be specified!"

        for LoaderClass in LoaderClasses:
            if LoaderClass.TYPE == loader_type:
                return LoaderClass()

        raise NotImplementedError(
            f"The specified loader type '{loader_type}' does not have a corresponding implementation."
            f"Available types are: {cls.get_loader_types()}"
        )

    @classmethod
    def get_loader_types(cls) -> List[str]:
        return [LoaderClass.TYPE for LoaderClass in LoaderClasses]
