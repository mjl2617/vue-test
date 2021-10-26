"pysh": "run-p main p:pysh",
"p:pysh": "parcel pysh/index.html --out-dir .dist/pysh --cache-dir .cache/pysh -p 5008",
"b:pysh": "parcel build pysh/index.html --out-dir dist/pysh --cache-dir .cache/pysh",
"build:pysh": "run-p b:base b:pysh",