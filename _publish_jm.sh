#!/bin/bash
NOW=$(date)

echo "$NOW -> Hugo Compiling"
hugo --config="config_jm.toml"
