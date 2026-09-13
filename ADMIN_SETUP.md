D.F.E. CMS — NAVODILA ZA POSTAVITEV

Kaj dobiš:
- /admin/ = zasebni uredniški vmesnik Decap CMS
- Programi, urnik, obvestila in dokumenti se urejajo brez poseganja v HTML.
- Slike/PDF-je lahko nalagaš prek CMS v assets/uploads.
- GitHub hrani vse spremembe.

POMEMBNO:
Ta paket je CMS-ready, vendar mora biti stran najprej objavljena na hostingu,
ki omogoča prijavo CMS-a. Najlažja pot je GitHub + Netlify + Decap CMS/Git Gateway.

POSTOPEK:
1. Ustvari GitHub račun, če ga še nimaš.
2. Ustvari nov repository, npr. dfe-ples.
3. Naloži VSE datoteke iz tega paketa v repository.
4. V Netlify poveži ta GitHub repository in objavi stran.
5. V Netlify omogoči Identity in Git Gateway.
6. Nastavi Registration na Invite only.
7. Povabi svoj e-mail kot edinega CMS uporabnika.
8. Odpri https://TVOJA-STRAN/admin/
9. Prijavi se in tam boš lahko dodajal/urejal vsebino.

OPOMBA O MANIFESTU:
Ko dodaš novo vsebino prek CMS, je za popolnoma avtomatsko prikazovanje vseh
novih JSON zapisov potreben manifest. Za prvo verzijo je pripravljen ročni
content/manifest.json. Pri končni postavitvi lahko dodamo build skripto ali
serverless funkcijo, ki ga samodejno generira ob vsaki objavi.

BREZPLAČNA POT:
GitHub + Netlify + Decap CMS je primerna brezplačna začetna postavitev za tak
statični klub-spletni projekt. Pred javno uporabo je treba preveriti aktualne
omejitve izbranega ponudnika.
