import os
from typing import List

from .interface import TripleLoader
from types_ import Triple


class NtFileLoader(TripleLoader):
    source_path: str

    def __init__(self) -> None:
        SOURCE_PATH = os.getenv("NT_SOURCE_PATH")

        assert (
            SOURCE_PATH is not None
        ), "If NtFileLoader is used, the environment variable SOURCE_PATH has to be specified."

        self.source_path = SOURCE_PATH

    def load(self, object_id: str) -> List[Triple]:
        file_paths = self._get_file_paths(self.source_path)

        triples: List[Triple] = []
        for file_path in file_paths:
            file_triples = self._load_from_file(
                object_id=object_id, file_path=file_path
            )
            triples.extend(file_triples)

        return triples

    def _get_file_paths(self, path: str) -> List[str]:
        if os.path.isdir(path):

            file_paths = []
            for file_name in os.listdir(path):

                if file_name.endswith(".nt"):
                    file_path = f"{path}/{file_name}"
                    file_paths.append(file_path)

            return file_paths

        if path.endswith(".nt"):
            return [path]
        else:
            return []

    def _load_from_file(self, object_id: str, file_path: str) -> List[Triple]:
        triples: List[Triple] = []

        with open(file_path, "r") as nt_file:
            for line in nt_file:
                components = self._extract_components(line)

                subject = components[0]
                predicate = components[1]
                object = components[2]

                if subject == object_id:
                    triple = Triple(subject=subject, predicate=predicate, object=object)
                    triples.append(triple)

        return triples

    def _extract_components(self, line: str) -> List[str]:
        raw_components = line.split(" ")

        components: List[str] = []

        components_to_merge = []
        # Handle cases where values are literals with spaces in between.
        for component in raw_components:
            quotation_count = component.count('"')
            escaped_quotation_count = component.count('\\"')

            if (
                quotation_count - escaped_quotation_count == 1
                and len(components_to_merge) == 0
            ):
                components_to_merge.append(component)
            elif (
                quotation_count - escaped_quotation_count == 1
                and len(components_to_merge) > 0
            ):
                components_to_merge.append(component)
                merged_component = " ".join(components_to_merge)
                components.append(merged_component)
                components_to_merge = []
            elif len(components_to_merge) > 0:
                components_to_merge.append(component)
            else:
                components.append(component)

        return components
