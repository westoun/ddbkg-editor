from datetime import datetime
import json
from os import getenv
from typing import List
from uuid import uuid1

from types_ import Triple, TripleUpdate
from .interface import TripleUpdater


class JsonlStore(TripleUpdater):
    """Store tiple updates to a local .jsonl file."""

    target_dir: str

    def __init__(self) -> None:
        target_dir = getenv("SINK_TARGET_DIR")

        if target_dir is None:
            target_dir = "tmp"

        self.target_dir = target_dir

    def update(self, triple_updates: List[TripleUpdate]) -> None:
        target_path = f"{self.target_dir}/kg_diff_{datetime.now().isoformat()}_{uuid1()}.jsonl"
        with open(target_path, "w") as target_file:
            for triple_update in triple_updates:
                target_file.write(json.dumps(triple_update.to_dict()) + "\n")
