# User stories

## 1. Ansatte i SellPoint ønsker å kunne opprette og administrere kategorier.

Issues:
- #48



## 2. Som bruker ønsker jeg å kunne plassere annonsen min i en passende kategori

Issues:
- #49
- #50

Testkrav:

[] Når man oppretter et produkt, skal man kunne velge en forhåndsdefinert kategori. 

[] Man kan opprette et produkt innen en kategori, og finne produktet igjen under filtrering på denne kategorien 

[] Produktet er synlig for adminbruker i Django under denne kategorien.  

## 3. Som bruker ønsker jeg å kunne filtrere annonser på kategori og sted.

Issues:
- #51
- #52
- #53

Testkrav:

[] Bruker må velge én kategori for produktet de selv legger ut 

[] Man kan se hvilken kategori et produkt har på produktsiden til produktet 

[] Et produkt må merkes med et sted for å legges ut 

[] Brukere kan velge et eller flere steder de vil se produkter fra i en meny på forsiden 

[] Man kan velge hvilke kategorier man vil se på forsiden i en filtermeny 

[] Brukere kan filtrere på både sted og kategori samtidig 

[] Filtermenyen skal ha et utseende som er i tråd med resten av nettsiden 

## 4. Som bruker ønsker jeg å kunne sortere annonser etter pris.

Issues:
- #54
- #55

Testkrav:

[] Fire produkter skal opprettes, med priser 500, 300, 200, 500 (altså to med samme pris). 

[] Man skal kunne velge sorteringsrekkefølge på forsiden. 

[] Når man sorterer lav-høy, skal produktene komme i stigende prisrekkefølge. 

[] Når man sorterer høy-lav, skal produktene komme i synkende prisrekkefølge.  

## 5. Som bruker ønsker jeg å kunne markere annonser som favoritter slik at jeg enkelt kan finne dem igjen etterpå.

Issues:
- #56
- #57

Testkrav: 

[] Annonser skal ha en favorittknapp knyttet til seg (både på forsiden og inne på et produkt). 

[] Inne på profil skal det være en oversikt over likte annonser. Trykker man på favorittknappen skal det tilhørende produktet vises her. 

[] Favoriser ulike produkter og sjekk at de havner under likte annonser. 

