#!/bin/bash

pandoc $1 -o $2 --pdf-engine=lualatex -V documentclass=bxjsarticle -V classoption=pandoc
