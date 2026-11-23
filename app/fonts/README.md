# Fonts

`archivo-subset.woff2` is [Archivo](https://github.com/Omnibus-Type/Archivo) (SIL Open Font License 1.1,
see `OFL-Archivo.txt`), from `@fontsource-variable/archivo@5.3.0` (`archivo-latin-wdth-normal.woff2`, 90 KB),
reduced to what the site uses (31 KB):

```sh
fonttools varLib.instancer archivo-latin-wdth-normal.woff2 wght=400:800 wdth=100:125 -o limited.ttf
pyftsubset limited.ttf --flavor=woff2 --output-file=archivo-subset.woff2 \
  --unicodes="U+0020-007E,U+00A0,U+00A9,U+00B0,U+00B7,U+00D7,U+2013,U+2014,U+2018,U+2019,U+201C,U+201D,U+2022,U+2026,U+20B9,U+2212,U+2192" \
  --layout-features='kern,liga,calt,tnum,lnum,case,ccmp,locl,mark,mkmk'
```

Weights 400–800 and widths 100–125 % remain variable. If copy gains characters outside that list
(for example Malayalam text), regenerate the subset or they will render in the fallback font.
