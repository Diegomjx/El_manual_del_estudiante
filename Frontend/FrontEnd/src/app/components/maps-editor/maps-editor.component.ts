import { Component, OnInit } from '@angular/core';
import { CountriesData } from 'countries-map';



@Component({
  selector: 'app-maps-editor',
  templateUrl: './maps-editor.component.html',
  styleUrls: ['./maps-editor.component.scss']
})
export class MapsEditorComponent implements OnInit {

  constructor() { }

  // Countries code.
 // aprox 200 paises
 //Guardar value, información
  public mapData:CountriesData = {
    'all': {value: 12},
    'AF': { value:  93 },
    'AL ': { value:  355 },
    'DZ': { value:  213 },
    'AS': { value:  684 },
    'AD': { value:  376 },
    'AO': { value:  213 },
    'AI': { value:  213 },
    'AQ': { value:  213 },
    'AG': { value:  213 },
    'AR': { value:  213 },
    'AM': { value:  213 },
    'AW': { value:  213 },
    'AU': { value:  213 },
    'AT': { value:  213 },
    'AZ': { value:  213 },
    'BS': { value:  213 },
    'BH': { value:  213 },
    'BD': { value:  213 },
    'BB': { value:  213 },
    'BY': { value:  213 },
    'BE': { value:  213 },
    'BZ': { value:  213 },
    'BJ': { value:  213 },
    'BM': { value:  213 },
    'BT': { value:  213 },
    'BO': { value:  213 },
    'BA': { value:  213 },
    'BW': { value:  213 },
    'BR': { value:  213 },
    'IO': { value:  213 },
    'VG': { value:  213 },
    'BN': { value:  213 },
    'BG': { value:  213 },
    'BF': { value:  213 },
    'BI': { value:  213 },
    'KH': { value:  213 },
    'CM': { value:  213 },
    'CA': { value:  213 },
    'CV': { value:  213 },
    'KY': { value:  213 },
    'CF': { value:  213 },
    'TD': { value:  213 },
    'CL': { value:  213 },
    'CN': { value:  213 },
    'CX': { value:  213 },
    'CC': { value:  213 },
    'CO': { value:  213 },
    'KM': { value:  213 },
    'CK': { value:  213 },
    'CR': { value:  213 },
    'HR': { value:  213 },
    'CU': { value:  213 },
    'CW': { value:  213 },
    'CY': { value:  213 },
    'CZ': { value:  213 },
    'CD': { value:  213 },
    'DK': { value:  213 },
    'DJ': { value:  213 },
    'DM': { value:  213 },
    'DO': { value:  213 },
    'TL': { value:  213 },
    'EC': { value:  213 },
    'EG': { value:  213 },
    'SV': { value:  213 },
    'GQ': { value:  213 },
    'ER': { value:  213 },
    'EE': { value:  213 },
    'ET': { value:  213 },
    'FK': { value:  213 },
    'FO': { value:  213 },
    'FJ': { value:  213 },
    'FI': { value:  213 },
    'FR': { value:  213 },
    'PF': { value:  213 },
    'GA': { value:  213 },
    'GM': { value:  213 },
    'GE': { value:  213 },
    'DE': { value:  213 },
    'GH': { value:  213 },
    'GI': { value:  213 },
    'GR': { value:  213 },
    'GL': { value:  213 },
    'GD': { value:  213 },
    'GU': { value:  213 },
    'GT': { value:  213 },
    'GG': { value:  213 },
    'GN': { value:  213 },
    'GW': { value:  213 },
    'GY': { value:  213 },
    'HT': { value:  213 },
    'HN': { value:  213 },
    'HK': { value:  213 },
    'HU': { value:  213 },
    'IS': { value:  213 },
    'IN': { value:  213 },
    'ID': { value:  213 },
    'IR': { value:  213 },
    'IQ': { value:  213 },
    'IE': { value:  213 },
    'IM': { value:  213 },
    'IL': { value:  213 },
    'IT': { value:  213 },
    'CI': { value:  213 },
    'JM': { value:  213 },
    'JP': { value:  213 },
    'JE': { value:  213 },
    'JO': { value:  213 },
    'KZ': { value:  213 },
    'KE': { value:  213 },
    'KI': { value:  213 },
    'XK': { value:  213 },
    'KW': { value:  213 },
    'KG': { value:  213 },
    'LA': { value:  213 },
    'LV': { value:  213 },
    'LB': { value:  213 },
    'LS': { value:  213 },
    'LR': { value:  213 },
    'LY': { value:  213 },
    'LI': { value:  213 },
    'LT': { value:  213 },
    'LU': { value:  213 },
    'MO': { value:  213 },
    'MK': { value:  213 },
    'MG': { value:  213 },
    'MW': { value:  213 },
    'MY': { value:  213 },
    'MV': { value:  213 },
    'ML': { value:  213 },
    'MT': { value:  213 },
    'MH': { value:  213 },
    'MR': { value:  213 },
    'MU': { value:  213 },
    'YT': { value:  213 },
    'MX': { value:  213 },
    'FM': { value:  213 },
    'MD': { value:  213 },
    'MC': { value:  213 },
    'MN': { value:  213 },
    'ME': { value:  213 },
    'MS': { value:  213 },
    'MA': { value:  213 },
    'MZ': { value:  213 },
    'MM': { value:  213 },
    'NA': { value:  213 },
    'NR': { value:  213 },
    'NP': { value:  213 },
    'NL': { value:  213 },
    'AN': { value:  213 },
    'NC': { value:  213 },
    'NZ': { value:  213 },
    'NI': { value:  213 },
    'NE': { value:  213 },
    'NG': { value:  213 },
    'NU': { value:  213 },
    'KP': { value:  213 },
    'MP': { value:  213 },
    'NO': { value:  213 },
    'OM': { value:  213 },
    'PK': { value:  213 },
    'PW': { value:  213 },
    'PS': { value:  213 },
    'PA': { value:  213 },
    'PG': { value:  213 },
    'PY': { value:  213 },
    'PE': { value:  213 },
    'PH': { value:  213 },
    'PN': { value:  213 },
    'PL': { value:  213 },
    'PT': { value:  213 },
    'PR': { value:  213 },
    'QA': { value:  213 },
    'CG': { value:  213 },
    'RE': { value:  213 },
    'RO': { value:  213 },
    'RU': { value:  213 },
    'RW': { value:  213 },
    'BL': { value:  213 },
    'SH': { value:  213 },
    'KN': { value:  213 },
    'LC': { value:  213 },
    'MF': { value:  213 },
    'PM': { value:  213 },
    'VC': { value:  213 },
    'WS': { value:  213 },
    'ST': { value:  213 },
    'SA': { value:  213 },
    'SN': { value:  213 },
    'RS': { value:  213 },
    'SC': { value:  213 },
    'SL': { value:  213 },
    'SG': { value:  213 },
    'SX': { value:  213 },
    'SK': { value:  213 },
    'SI': { value:  213 },
    'SB': { value:  213 },
    'SO': { value:  213 },
    'ZA': { value:  213 },
    'KR': { value:  213 },
    'SS': { value:  213 },
    'ES': { value:  213 },
    'LK': { value:  213 },
    'SD': { value:  213 },
    'SR': { value:  213 },
    'SJ': { value:  213 },
    'SZ': { value:  213 },
    'SE': { value:  213 },
    'CH': { value:  213 },
    'SY': { value:  213 },
    'TW': { value:  213 },
    'TJ': { value:  213 },
    'TZ': { value:  213 },
    'TH': { value:  213 },
    'TG': { value:  213 },
    'TK': { value:  213 },
    'TO': { value:  213 },
    'TT': { value:  213 },
    'TN': { value:  213 },
    'TR': { value:  213 },
    'TM': { value:  213 },
    'TC': { value:  213 },
    'TV': { value:  213 },
    'VI': { value:  213 },
    'UG': { value:  213 },
    'UA': { value:  213 },
    'AE': { value:  213 },
    'GB': { value:  213 },
    'US': { value:  213 },
    'UY': { value:  213 },
    'UZ': { value:  213 },
    'VU': { value:  213 },
    'VA': { value:  213 },
    'VE': { value:  213 },
    'VN': { value:  213 },
    'WF': { value:  213 },
    'EH': { value:  213 },
    'YE': { value:  213 },
    'ZM': { value:  213 },
    'ZW': { value:  213 },

/*
    'GB' : { value:  20, extra: {
      'Hamilton': '2008, 2014-2015, 2017-2020', 'Stewart': '1969, 1971, 1973', 'Hill, G.': '1962, 1968',
      'Clark': '1963, 1965', 'Button': '1980', 'Hawthorn': '1958', 'Hill, D.': '1996', 'Hunt': '1947',
      'Mansell': '1992', 'Surtees': '1964'
    } },*/
   // 'DE' : { value:  12, extra: { 'Schumacher': '1994-1995, 2000-2004', 'Vettel': '2010-2013', 'Rosberg, N.': '2016' } },
   // 'BR' : { value:  8, extra: { 'Fittipaldi': '1972, 1974', 'Senna': '1988, 1990-1991', 'Piquet': '1981, 1983, 1987' } },
  //  'AR' : { value:  5, extra: { 'Fangio': '1951, 1954-1957' } },
   // 'FI' : { value:  4, extra: { 'Häkkinen': '1998-1999', 'Räikkönen': '2007', 'Rosberg, K.': '1982' } },
  //  'AU' : { value:  4, extra: { 'Brabham': '1959-1960, 1966', 'Jones': '1980' } },
  //  'AT' : { value:  4, extra: { 'Lauda': '1975, 1977, 1984', 'Rindt': '1970' } },
  //  'FR' : { value:  4, extra: { 'Prost': '1985-1986, 1989, 1993' } },
  //  'IT' : { value:  3, extra: { 'Ascari': '1952-1953', 'Farina': '1950' } },
 //   'US' : { value:  2, extra: { 'Hill, P.': '1961', 'Andretti': '1978' } },
   // 'ES' : { value:  2, extra: { 'Alonso': '2005-2006' } },
  //  'NZ' : { value:  1, extra: { 'Hulme': '1967' } },
   // 'ZA' : { value:  1, extra: { 'Scheckter': '1979' } },
   // 'CA' : { value:  1, extra: { 'Villeneuve': '1997' } },
  //  'PT' : { value:  7, extra: { 'Monteiro':  '---'} },
   // 'MX' : { value:  7, extra: { 'Pérez': '---' } },
 //   'RU' : { value:  7, extra: { 'Petrov': '---', 'Kviat': '---' } },
  //  'IN' : { value:  7, extra: { 'Chandhok': '---', 'Karthikeiyan': '---' } },
  //  'JP' : { value:  7, extra: { 'Sato': '---', 'Yamamoto': '---' } },
  //  'MY' : { value:  7, extra: { 'Yoong': '---' } },
  //  'GT' : { value:  7, extra: { 'Data': 'Guatemala' } },
    //'SV' : { value:  7, extra: { 'Data': 'El Salvador' } },
  }; 

  ngOnInit(): void {
   
  }

  public select(event: CountriesData) {
    console.log(event);
    // your logic
  }
 
  mapReady(): void {
    console.log('Map ready');
  }

}