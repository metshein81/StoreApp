React Native äpi arenduse dokumentatsioon (StoreApp)

    Eeldused ja keskkonna seadistamine

Enne projekti loomist veenduti, et vajalikud tööriistad on paigaldatud:

    node.js: v20.6.1
    npm: v9.8.1
    android studio: emulaatori ja sdk tööriistadega
    visual studio code: peamine arenduskeskkond

Node.js ja npm paigaldati ametlikult veebilehelt. Versioonide kontrollimiseks kasutati käske:
node -v
npm -v

Expo CLI asemel kasutati otse npx käskusid. Globaalse Expo CLI kasutamist välditi:
npm uninstall -g expo-cli
npx create-expo-app storeapp
cd storeapp
npx expo start

    Projekti struktuur

Projekti kaustastruktuur on järgmine:

    storeapp
        App.js – peamine rakenduse algfail
        node_modules – sõltuvuste kataloog
        package.json – projekti sõltuvused ja seadistused
        package-lock.json – automaatne sõltuvuste fail
        .expo – expo vahemälu (vajadusel eemaldatav)

App.js faili esialgne sisu:

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tere tulemast minu äppi!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
});

    Projekti käivitamine

Android emulaatori kasutamine:

    avati android studio ja käivitati virtuaalne android-seade (avd)
    rakendus käivitati käsuga:
    npx expo start --android

Füüsilise seadme kasutamine:

    android-seade ühendati usb-kaabli kaudu
    seadetes lülitati sisse usb debugging
    rakendus käivitati seadmes qr-koodi skaneerides või käsuga:
    npx expo start

    Leitud probleemid ja lahendused

Probleem 1: Port 8081 kasutusel
Lahendus: kasutati alternatiivset porti:
npx expo start --port 8082

Probleem 2: ADB ei leidnud seadet/emulaatorit
Lahendus:

    kontrolliti adb olekut:
    adb devices
    vajadusel käivitati adb server uuesti:
    adb start-server

Probleem 3: Unable to resolve "../../App"
Lahendus:

    kontrolliti faili App.js olemasolu
    kontrolliti, et package.json peamine sisenemispunkt on:
    "main": "node_modules/expo/AppEntry.js"
    kustutati vahemälud ja installiti sõltuvused uuesti:
    rm -rf node_modules
    rm package-lock.json
    npm install
    npx expo start --clear

    Edukalt käivitatud rakendus

Rakendus käivitati edukalt nii emulaatoris kui füüsilises seadmes. Metro Bundler kuvas teate:
metro waiting on exp://192.168.1.200:8082

Ekraanil ilmus tekst:
tere tulemast minu äppi!

Rakenduse põhifail App.js vastutab ekraanide vahelise navigeerimise eest. Kasutatakse React Navigation teeki ekraanide vahel liikumiseks. Iga ekraan on määratud Stack Navigatoris oma nime ja komponendiga.

Rakenduses on loodud neli põhiekraani:

  HomeScreen kuvab tervitusteksti ja nupud teistele ekraanidele liikumiseks.
  ProductListScreen kuvab toodete nimekirja.
  ProductDetailScreen kuvab valitud toote detailvaate.
  AboutScreen kuvab infot rakenduse ja arendaja kohta.

Navigatsioonisüsteem on üles ehitatud nii, et kasutaja saab liikuda ekraanide vahel loogiliselt ja sujuvalt. Iga ekraani päises kuvatakse vastav pealkiri, mis annab kasutajale selge arusaama, millises vaates ta parajasti asub.

Iga ekraan on loodud eraldi failis ja imporditud App.js faili.

HomeScreen sisaldab tervitusteksti ja kahte nuppu, mille abil saab liikuda toodete nimekirja ja rakenduse kohta lehele.

ProductListScreen kuvab toodete loendi ja võib vajadusel sisaldada filtreerimis- ja otsingufunktsioone.

ProductDetailScreen kuvab valitud toote üksikasjalikku teavet, näiteks nime, hinda ja kirjeldust.

AboutScreen kuvab teavet rakenduse eesmärgi kohta ning võib sisaldada kontaktinfot ja vormi kasutajate tagasiside jaoks.

Rakenduse navigeerimise alguspunktiks on HomeScreen. Kõik ekraanid on ühendatud Stack Navigatori kaudu, mis haldab nende vahel liikumist ja tagab vajaliku päise kuvamise igal vaatel.

Rakenduse järgmine samm on andmete ühendamine Firebase andmebaasiga, et kuvada dünaamilist toodete nimekirja ja detailvaateid.
