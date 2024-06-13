# LevelUp_JWP2_zal
Project zaliczeniowy z przedmiotu Programowanie w języku wysokiego poziomu 2 - Kamil Pytel

# Opis funkcjonalności aplikacji

Prezentowana aplikacja to TaskTracker z funkcjonalnościami modnego w ostatnim czasie trendu gamifikacji. Każde zadanie na podstawie jego trudności otrzymuje odpowiednią pulę punktów doświadczenia, która to zostaje przypisana do konta użytkownika po wykonaniu zadania. Po osiagnięciu wymaganej liczby punktów użytkownik może zdobywać kolejne poziomy bohatera i konkurować z innymi użytkownikami w globalnym rankingu.

# Opis techniczny aplikacji

Aplikacja podzielona jest na dwie części:

  -  backend - Flask + SQL Alchemy - obsługa routingu oraz przechowywanie danych o zdaniach i profilach użytkowników - działa na porcie 5000
  -  frontend - React - strona wizualna aplikacji, obługa plików JavaScript - działa na porcie 3000

# Docker

Aplikacja posiada wersję zbudowaną na dwóch kontenerach Docker - kolejno dla backendu i frontendu
