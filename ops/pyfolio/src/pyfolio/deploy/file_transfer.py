"""
Filename: file_transfer.py
Author: Tom Otero
Date: 2025-08-11
Version: 0.0.1
Description:
  - Module defining file transfer operations for the Portfolio app deploy pipeline.

#### TODO ####


#### NOTES ####
File Transfer Steps:
  - IF user inputs source and target, set source and target
    ELSE use defaults
  - ASSERT source and target exist
    EXCEPT -> FileNotFound
  - IF: DRY_RUN == true
    - OUTPUT expected target information
    ELSE:
    - GET files at source
    - COPY files to target
    - OUTPUT transfer information to stdout

Types:
  - FilePath
  - Args
  - Logger
  - StateFlag

Args:
  - run_type -> default: dry_run
  - source -> default:
  - (OPT) target
  - (OPT) logger
"""

import os
import argparse



def check_path(path: str) -> bool:
    return os.path.exists(path)


class Artifact:
    def __init__(self, source: str, target: str):
        self.source = source
        self.target = target



def move_files(): ...


def dry_run(): ...


def make_argparser():
  parser = argparse.ArgumentParser
  parser.add_argument("--source", "-s", type=str, required=True)
  parser.add_argument("--target", "-t", type=str, required=True)
  parser.add_argument("--dry_run", type=bool, required=False)
  parser.add_argument("--logger", "-l", type=str, required=False)
  return parser


""" Main """
def run(args: argparse.Namespace):
  print(f'Source: {args.source}')
  print(f'Target: {args.target}')


def main():
   parser = make_argparser()
   args = parser.parse_args()
   print(f'Source: {args.source}')
   print(f'Target: {args.target}')

if __name__ == "__main__":
    main()
