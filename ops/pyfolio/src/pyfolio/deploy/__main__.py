import argparse
import enum

from pyfolio.deploy import file_transfer

USER_ARGS = argparse.Namespace

class ParserSingleton:
  def __init__(self):
    self._make_parser()

  def _make_parser(self):
    parser = argparse.ArgumentParser()
    parser.add_argument("--command", "-c", type=str, required=True)
    parser.add_argument("--source", "-s", type=str, required=False)
    parser.add_argument("--target", "-t", type=str, required=False)
    parser.add_argument("--dry_run", type=bool, required=False)
    parser.add_argument("--logger", "-l", type=str, required=False)
    self.parser = parser


class CommandEnum(enum.Enum):
  FILE_TRANSFER = "file_transfer"

class Command:
  FILE_TRANSFER = CommandEnum.FILE_TRANSFER.value



def main():

  if args.command not in CommandEnum:
    raise DeployException.InvalidCommand
  if args.command == Command.FILE_TRANSFER:
   file_transfer.run(args)



