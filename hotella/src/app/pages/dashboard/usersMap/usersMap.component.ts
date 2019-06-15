import {Component, ChangeDetectorRef} from '@angular/core';
import {BaThemeConfigProvider, layoutPaths} from '../../../theme';
import {UsersMapService} from './usersMap.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'users-map',
  templateUrl: './usersMap.html',
  styleUrls: ['./usersMap.scss'],
})

export class UsersMap implements OnInit{

  mapData:Object;
  mapDataTemp:Object;
  layoutColors:any;
  areas:Array<any>;
  map:any;
  check=false;

  constructor(private _baConfig:BaThemeConfigProvider,private _usersMapService:UsersMapService) {
    this.layoutColors = this._baConfig.get().colors;
    
    this.map= {
      type: 'map',
      theme: 'blur',
      zoomControl: { zoomControlEnabled: false, panControlEnabled: false },

      dataProvider: {
        map: 'worldLow',
        zoomLevel: 2.5,
        zoomLongitude: 10,
        zoomLatitude: 52,
        areas: [
        {id: 'AF', title: 'Afghanistan', customData: 0, groupId: '1'},           
      {id: 'AL', title: 'Albania', customData: 0, groupId: '2'}, 
      {id: 'DZ', title: 'Algeria', customData: 0, groupId: '3'}, 
      {id: 'AO', title: 'Angola', customData: 0, groupId: '4'}, 
      {id: 'AR', title: 'Argentina', customData: 0, groupId: '5'}, 
      {id: 'AM', title: 'Armenia', customData: 0, groupId: '6'}, 
      {id: 'AU', title: 'Australia', customData: 0, groupId: '7'}, 
      {id: 'AT', title: 'Austria', customData: 0, groupId: '8'}, 
      {id: 'AZ', title: 'Azerbaijan', customData: 0, groupId: '9'}, 
      {id: 'BH', title: 'Bahrain', customData: 0, groupId: '10'}, 
      {id: 'BD', title: 'Bangladesh', customData: 0, groupId: '11'}, 
      {id: 'BY', title: 'Belarus', customData: 0, groupId: '12'}, 
      {id: 'BE', title: 'Belgium', customData: 0, groupId: '13'}, 
      {id: 'BJ', title: 'Benin', customData: 0, groupId: '14'}, 
      {id: 'BT', title: 'Bhutan', customData: 0, groupId: '15'}, 
      {id: 'BO', title: 'Bolivia', customData: 0, groupId: '16'}, 
      {id: 'BA', title: 'Bosnia and Herzegovina', customData: 0, groupId: '17'}, 
      {id: 'BW', title: 'Botswana', customData: 0, groupId: '18'}, 
      {id: 'BR', title: 'Brazil', customData: 0, groupId: '19'}, 
      {id: 'BN', title: 'Brunei', customData: 0, groupId: '20'}, 
      {id: 'BG', title: 'Bulgaria', customData: 0, groupId: '21'}, 
      {id: 'BF', title: 'Burkina Faso', customData: 0, groupId: '22'}, 
      {id: 'BI', title: 'Burundi', customData: 0, groupId: '23'}, 
      {id: 'KH', title: 'Cambodia', customData: 0, groupId: '24'}, 
      {id: 'CM', title: 'Cameroon', customData: 0, groupId: '25'}, 
      {id: 'CA', title: 'Canada', customData: 0, groupId: '26'}, 
      {id: 'CV', title: 'Cape Verde', customData: 0, groupId: '27'}, 
      {id: 'CF', title: 'Central African Rep.', customData: 0, groupId: '28'}, 
      {id: 'TD', title: 'Chad', customData: 0, groupId: '29'}, 
      {id: 'CL', title: 'Chile', customData: 0, groupId: '30'}, 
      {id: 'CN', title: 'China', customData: 0, groupId: '31'}, 
      {id: 'CO', title: 'Colombia', customData: 0, groupId: '32'}, 
      {id: 'KM', title: 'Comoros', customData: 0, groupId: '33'}, 
      {id: 'CD', title: 'Congo, Dem. Rep.', customData: 0, groupId: '34'}, 
      {id: 'CG', title: 'Congo, Rep.', customData: 0, groupId: '35'}, 
      {id: 'CR', title: 'Costa Rica', customData: 0, groupId: '36'}, 
      {id: 'CI', title: 'Cote d\'Ivoire', customData: 0, groupId: '37'}, 
      {id: 'HR', title: 'Croatia', customData: 0, groupId: '38'}, 
      {id: 'CU', title: 'Cuba', customData: 0, groupId: '39'}, 
      {id: 'CY', title: 'Cyprus', customData: 0, groupId: '40'}, 
      {id: 'CZ', title: 'Czech Rep.', customData: 0, groupId: '41'}, 
      {id: 'DK', title: 'Denmark', customData: 0, groupId: '42'}, 
      {id: 'DJ', title: 'Djibouti', customData: 0, groupId: '43'}, 
      {id: 'DO', title: 'Dominican Rep.', customData: 0, groupId: '44'}, 
      {id: 'EC', title: 'Ecuador', customData: 0, groupId: '45'}, 
      {id: 'EG', title: 'Egypt', customData: 0, groupId: '46'}, 
      {id: 'SV', title: 'El Salvador', customData: 0, groupId: '47'}, 
      {id: 'GQ', title: 'Equatorial Guinea', customData: 0, groupId: '48'}, 
      {id: 'ER', title: 'Eritrea', customData: 0, groupId: '49'}, 
      {id: 'EE', title: 'Estonia', customData: 0, groupId: '50'}, 
      {id: 'ET', title: 'Ethiopia', customData: 0, groupId: '51'}, 
      {id: 'FJ', title: 'Fiji', customData: 0, groupId: '52'}, 
      {id: 'FI', title: 'Finland', customData: 0, groupId: '53'}, 
      {id: 'FR', title: 'France', customData: 0, groupId: '54'}, 
      {id: 'GA', title: 'Gabon', customData: 0, groupId: '55'}, 
      {id: 'GM', title: 'Gambia', customData: 0, groupId: '56'}, 
      {id: 'GE', title: 'Georgia', customData: 0, groupId: '57'}, 
      {id: 'DE', title: 'Germany', customData: 0, groupId: '58'}, 
      {id: 'GH', title: 'Ghana', customData: 0, groupId: '59'}, 
      {id: 'GR', title: 'Greece', customData: 0, groupId: '60'}, 
      {id: 'GT', title: 'Guatemala', customData: 0, groupId: '61'}, 
      {id: 'GN', title: 'Guinea', customData: 0, groupId: '62'}, 
      {id: 'GW', title: 'Guinea-Bissau', customData: 0, groupId: '63'}, 
      {id: 'GY', title: 'Guyana', customData: 0, groupId: '64'}, 
      {id: 'HT', title: 'Haiti', customData: 0, groupId: '65'}, 
      {id: 'HN', title: 'Honduras', customData: 0, groupId: '66'}, 
      {id: 'HK', title: 'Hong Kong, China', customData: 0, groupId: '67'}, 
      {id: 'HU', title: 'Hungary', customData: 0, groupId: '68'}, 
      {id: 'IS', title: 'Iceland', customData: 0, groupId: '69'}, 
      {id: 'IN', title: 'India', customData: 0, groupId: '70'}, 
      {id: 'ID', title: 'Indonesia', customData: 0, groupId: '71'}, 
      {id: 'IR', title: 'Iran', customData: 0, groupId: '72'}, 
      {id: 'IQ', title: 'Iraq', customData: 0, groupId: '73'}, 
      {id: 'IE', title: 'Ireland', customData: 0, groupId: '74'}, 
      {id: 'IL', title: 'Israel', customData: 0, groupId: '75'}, 
      {id: 'IT', title: 'Italy', customData: 0, groupId: '76'}, 
      {id: 'JM', title: 'Jamaica', customData: 0, groupId: '77'}, 
      {id: 'JP', title: 'Japan', customData: 0, groupId: '78'}, 
      {id: 'JO', title: 'Jordan', customData: 0, groupId: '79'}, 
      {id: 'KZ', title: 'Kazakhstan', customData: 0, groupId: '80'}, 
      {id: 'KE', title: 'Kenya', customData: 0, groupId: '81'}, 
      {id: 'KP', title: 'Korea, Dem. Rep.', customData: 0, groupId: '82'}, 
      {id: 'KR', title: 'Korea, Rep.', customData: 0, groupId: '83'}, 
      {id: 'KW', title: 'Kuwait', customData: 0, groupId: '84'}, 
      {id: 'KG', title: 'Kyrgyzstan', customData: 0, groupId: '85'}, 
      {id: 'LA', title: 'Laos', customData: 0, groupId: '86'}, 
      {id: 'LV', title: 'Latvia', customData: 0, groupId: '87'}, 
      {id: 'LB', title: 'Lebanon', customData: 0, groupId: '88'}, 
      {id: 'LS', title: 'Lesotho', customData: 0, groupId: '89'}, 
      {id: 'LR', title: 'Liberia', customData: 0, groupId: '90'}, 
      {id: 'LY', title: 'Libya', customData: 0, groupId: '91'}, 
      {id: 'LT', title: 'Lithuania', customData: 0, groupId: '92'}, 
      {id: 'LU', title: 'Luxembourg', customData: 0, groupId: '93'}, 
      {id: 'MK', title: 'Macedonia, FYR', customData: 0, groupId: '94'}, 
      {id: 'MG', title: 'Madagascar', customData: 0, groupId: '95'}, 
      {id: 'MW', title: 'Malawi', customData: 0, groupId: '96'}, 
      {id: 'MY', title: 'Malaysia', customData: 0, groupId: '97'}, 
      {id: 'ML', title: 'Mali', customData: 0, groupId: '98'}, 
      {id: 'MR', title: 'Mauritania', customData: 0, groupId: '99'}, 
      {id: 'MU', title: 'Mauritius', customData: 0, groupId: '100'}, 
      {id: 'MX', title: 'Mexico', customData: 0, groupId: '101'}, 
      {id: 'MD', title: 'Moldova', customData: 0, groupId: '102'}, 
      {id: 'MN', title: 'Mongolia', customData: 0, groupId: '103'}, 
      {id: 'ME', title: 'Montenegro', customData: 0, groupId: '104'}, 
      {id: 'MA', title: 'Morocco', customData: 0, groupId: '105'}, 
      {id: 'MZ', title: 'Mozambique', customData: 0, groupId: '106'}, 
      {id: 'MM', title: 'Myanmar', customData: 0, groupId: '107'}, 
      {id: 'NA', title: 'Namibia', customData: 0, groupId: '108'}, 
      {id: 'NP', title: 'Nepal', customData: 0, groupId: '109'}, 
      {id: 'NL', title: 'Netherlands', customData: 0, groupId: '110'}, 
      {id: 'NZ', title: 'New Zealand', customData: 0, groupId: '111'}, 
      {id: 'NI', title: 'Nicaragua', customData: 0, groupId: '112'}, 
      {id: 'NE', title: 'Niger', customData: 0, groupId: '113'}, 
      {id: 'NG', title: 'Nigeria', customData: 0, groupId: '114'}, 
      {id: 'NO', title: 'Norway', customData: 0, groupId: '115'}, 
      {id: 'OM', title: 'Oman', customData: 0, groupId: '116'}, 
      {id: 'PK', title: 'Pakistan', customData: 0, groupId: '117'}, 
      {id: 'PA', title: 'Panama', customData: 0, groupId: '118'}, 
      {id: 'PG', title: 'Papua New Guinea', customData: 0, groupId: '119'}, 
      {id: 'PY', title: 'Paraguay', customData: 0, groupId: '120'}, 
      {id: 'PE', title: 'Peru', customData: 0, groupId: '121'}, 
      {id: 'PH', title: 'Philippines', customData: 0, groupId: '122'}, 
      {id: 'PL', title: 'Poland', customData: 0, groupId: '123'}, 
      {id: 'PT', title: 'Portugal', customData: 0, groupId: '124'}, 
      {id: 'PR', title: 'Puerto Rico', customData: 0, groupId: '125'}, 
      {id: 'QA', title: 'Qatar', customData: 0, groupId: '126'}, 
      {id: 'RO', title: 'Romania', customData: 0, groupId: '127'}, 
      {id: 'RU', title: 'Russia', customData: 0, groupId: '128'}, 
      {id: 'RW', title: 'Rwanda', customData: 0, groupId: '129'}, 
      {id: 'SA', title: 'Saudi Arabia', customData: 0, groupId: '130'}, 
      {id: 'SN', title: 'Senegal', customData: 0, groupId: '131'}, 
      {id: 'RS', title: 'Serbia', customData: 0, groupId: '132'}, 
      {id: 'SL', title: 'Sierra Leone', customData: 0, groupId: '133'}, 
      {id: 'SG', title: 'Singapore', customData: 0, groupId: '134'}, 
      {id: 'SK', title: 'Slovak Republic', customData: 0, groupId: '135'}, 
      {id: 'SI', title: 'Slovenia', customData: 0, groupId: '136'}, 
      {id: 'SB', title: 'Solomon Islands', customData: 0, groupId: '137'}, 
      {id: 'SO', title: 'Somalia', customData: 0, groupId: '138'}, 
      {id: 'ZA', title: 'South Africa', customData: 0, groupId: '139'}, 
      {id: 'ES', title: 'Spain', customData: 0, groupId: '140'}, 
      {id: 'LK', title: 'Sri Lanka', customData: 0, groupId: '141'}, 
      {id: 'SD', title: 'Sudan', customData: 0, groupId: '142'}, 
      {id: 'SR', title: 'Surititle', customData: 0, groupId: '143'}, 
      {id: 'SZ', title: 'Swaziland', customData: 0, groupId: '144'}, 
      {id: 'SE', title: 'Sweden', customData: 0, groupId: '145'}, 
      {id: 'CH', title: 'Switzerland', customData: 0, groupId: '146'}, 
      {id: 'SY', title: 'Syria', customData: 0, groupId: '147'}, 
      {id: 'TW', title: 'Taiwan', customData: 0, groupId: '148'}, 
      {id: 'TJ', title: 'Tajikistan', customData: 0, groupId: '149'}, 
      {id: 'TZ', title: 'Tanzania', customData: 0, groupId: '150'}, 
      {id: 'TH', title: 'Thailand', customData: 0, groupId: '151'}, 
      {id: 'TG', title: 'Togo', customData: 0, groupId: '152'}, 
      {id: 'TT', title: 'Trinidad and Tobago', customData: 0, groupId: '153'}, 
      {id: 'TN', title: 'Tunisia', customData: 0, groupId: '154'}, 
      {id: 'TR', title: 'Turkey', customData: 0, groupId: '155'}, 
      {id: 'TM', title: 'Turkmenistan', customData: 0, groupId: '156'}, 
      {id: 'UG', title: 'Uganda', customData: 0, groupId: '157'}, 
      {id: 'UA', title: 'Ukraine', customData: 0, groupId: '158'}, 
      {id: 'AE', title: 'United Arab Emirates', customData: 0, groupId: '159'}, 
      {id: 'GB', title: 'United Kingdom', customData: 0, groupId: '160'}, 
      {id: 'US', title: 'United States', customData: 0, groupId: '161'}, 
      {id: 'UY', title: 'Uruguay', customData: 0, groupId: '162'}, 
      {id: 'UZ', title: 'Uzbekistan', customData: 0, groupId: '163'}, 
      {id: 'VE', title: 'Venezuela', customData: 0, groupId: '164'}, 
      {id: 'PS', title: 'West Bank and Gaza', customData: 0, groupId: '165'}, 
      {id: 'VN', title: 'Vietnam', customData: 0, groupId: '166'}, 
      {id: 'YE', title: 'Yemen, Rep.', customData: 0, groupId: '167'}, 
      {id: 'ZM', title: 'Zambia', customData: 0, groupId: '168'}, 
      {id: 'ZW', title: 'Zimbabwe', customData: 0, groupId: '169'}
      ]
      },

      areasSettings: {
        rollOverOutlineColor: this.layoutColors.border,
        rollOverColor: this.layoutColors.primaryDark,
        alpha: 0.8,
        unlistedAreasAlpha: 0.2,
        unlistedAreasColor: this.layoutColors.defaultText,
        balloonText: '[[title]]: [[customData]]'
      },


      legend: {
        width: '100%',
        marginRight: 27,
        marginLeft: 27,
        equalWidths: false,
        backgroundAlpha: 0.3,
        backgroundColor: this.layoutColors.border,
        borderColor: this.layoutColors.border,
        borderAlpha: 1,
        top: 362,
        left: 0,
        horizontalGap: 10,
        data: [
          {
            title: 'over 1 000 users',
            color: this.layoutColors.primary
          },
          {
            title: '500 - 1 000 users',
            color: this.layoutColors.successLight
          },
          {
            title: '100 - 500 users',
            color: this.layoutColors.success
          },
          {
            title: '0 - 100 users',
            color: this.layoutColors.danger
          }
        ]
      },
      export: {
        enabled: true
      },
      creditsPosition: 'bottom-right',
      pathToImages: layoutPaths.images.amChart
    };
    
    this._usersMapService.getData().subscribe(data => {
      for(let i=0; data[i];i++){
        for(let x=0;this.map.dataProvider.areas[x];x++){
          if(this.map.dataProvider.areas[x].id[0]==data[i].nacionalidade[0] && this.map.dataProvider.areas[x].id[1]==data[i].nacionalidade[1]) {
            this.map.dataProvider.areas[x].customData++;
            if(this.map.dataProvider.areas[x].customData>0) this.map.dataProvider.areas[x].color="#FEA501";
            
          }
    }
  }
  this.check=true;
    });
  
    this.mapDataTemp = this.map;

    this.mapData=this.mapDataTemp;
  }


  ngOnInit(){
    setInterval(()=>{ 
   this.layoutColors = this._baConfig.get().colors;
    
    this.map= {
      type: 'map',
      theme: 'blur',
      zoomControl: { zoomControlEnabled: false, panControlEnabled: false },

      dataProvider: {
        map: 'worldLow',
        zoomLevel: 2.5,
        zoomLongitude: 10,
        zoomLatitude: 52,
        areas: [
        {id: 'AF', title: 'Afghanistan', customData: 0, groupId: '1'},           
      {id: 'AL', title: 'Albania', customData: 0, groupId: '2'}, 
      {id: 'DZ', title: 'Algeria', customData: 0, groupId: '3'}, 
      {id: 'AO', title: 'Angola', customData: 0, groupId: '4'}, 
      {id: 'AR', title: 'Argentina', customData: 0, groupId: '5'}, 
      {id: 'AM', title: 'Armenia', customData: 0, groupId: '6'}, 
      {id: 'AU', title: 'Australia', customData: 0, groupId: '7'}, 
      {id: 'AT', title: 'Austria', customData: 0, groupId: '8'}, 
      {id: 'AZ', title: 'Azerbaijan', customData: 0, groupId: '9'}, 
      {id: 'BH', title: 'Bahrain', customData: 0, groupId: '10'}, 
      {id: 'BD', title: 'Bangladesh', customData: 0, groupId: '11'}, 
      {id: 'BY', title: 'Belarus', customData: 0, groupId: '12'}, 
      {id: 'BE', title: 'Belgium', customData: 0, groupId: '13'}, 
      {id: 'BJ', title: 'Benin', customData: 0, groupId: '14'}, 
      {id: 'BT', title: 'Bhutan', customData: 0, groupId: '15'}, 
      {id: 'BO', title: 'Bolivia', customData: 0, groupId: '16'}, 
      {id: 'BA', title: 'Bosnia and Herzegovina', customData: 0, groupId: '17'}, 
      {id: 'BW', title: 'Botswana', customData: 0, groupId: '18'}, 
      {id: 'BR', title: 'Brazil', customData: 0, groupId: '19'}, 
      {id: 'BN', title: 'Brunei', customData: 0, groupId: '20'}, 
      {id: 'BG', title: 'Bulgaria', customData: 0, groupId: '21'}, 
      {id: 'BF', title: 'Burkina Faso', customData: 0, groupId: '22'}, 
      {id: 'BI', title: 'Burundi', customData: 0, groupId: '23'}, 
      {id: 'KH', title: 'Cambodia', customData: 0, groupId: '24'}, 
      {id: 'CM', title: 'Cameroon', customData: 0, groupId: '25'}, 
      {id: 'CA', title: 'Canada', customData: 0, groupId: '26'}, 
      {id: 'CV', title: 'Cape Verde', customData: 0, groupId: '27'}, 
      {id: 'CF', title: 'Central African Rep.', customData: 0, groupId: '28'}, 
      {id: 'TD', title: 'Chad', customData: 0, groupId: '29'}, 
      {id: 'CL', title: 'Chile', customData: 0, groupId: '30'}, 
      {id: 'CN', title: 'China', customData: 0, groupId: '31'}, 
      {id: 'CO', title: 'Colombia', customData: 0, groupId: '32'}, 
      {id: 'KM', title: 'Comoros', customData: 0, groupId: '33'}, 
      {id: 'CD', title: 'Congo, Dem. Rep.', customData: 0, groupId: '34'}, 
      {id: 'CG', title: 'Congo, Rep.', customData: 0, groupId: '35'}, 
      {id: 'CR', title: 'Costa Rica', customData: 0, groupId: '36'}, 
      {id: 'CI', title: 'Cote d\'Ivoire', customData: 0, groupId: '37'}, 
      {id: 'HR', title: 'Croatia', customData: 0, groupId: '38'}, 
      {id: 'CU', title: 'Cuba', customData: 0, groupId: '39'}, 
      {id: 'CY', title: 'Cyprus', customData: 0, groupId: '40'}, 
      {id: 'CZ', title: 'Czech Rep.', customData: 0, groupId: '41'}, 
      {id: 'DK', title: 'Denmark', customData: 0, groupId: '42'}, 
      {id: 'DJ', title: 'Djibouti', customData: 0, groupId: '43'}, 
      {id: 'DO', title: 'Dominican Rep.', customData: 0, groupId: '44'}, 
      {id: 'EC', title: 'Ecuador', customData: 0, groupId: '45'}, 
      {id: 'EG', title: 'Egypt', customData: 0, groupId: '46'}, 
      {id: 'SV', title: 'El Salvador', customData: 0, groupId: '47'}, 
      {id: 'GQ', title: 'Equatorial Guinea', customData: 0, groupId: '48'}, 
      {id: 'ER', title: 'Eritrea', customData: 0, groupId: '49'}, 
      {id: 'EE', title: 'Estonia', customData: 0, groupId: '50'}, 
      {id: 'ET', title: 'Ethiopia', customData: 0, groupId: '51'}, 
      {id: 'FJ', title: 'Fiji', customData: 0, groupId: '52'}, 
      {id: 'FI', title: 'Finland', customData: 0, groupId: '53'}, 
      {id: 'FR', title: 'France', customData: 0, groupId: '54'}, 
      {id: 'GA', title: 'Gabon', customData: 0, groupId: '55'}, 
      {id: 'GM', title: 'Gambia', customData: 0, groupId: '56'}, 
      {id: 'GE', title: 'Georgia', customData: 0, groupId: '57'}, 
      {id: 'DE', title: 'Germany', customData: 0, groupId: '58'}, 
      {id: 'GH', title: 'Ghana', customData: 0, groupId: '59'}, 
      {id: 'GR', title: 'Greece', customData: 0, groupId: '60'}, 
      {id: 'GT', title: 'Guatemala', customData: 0, groupId: '61'}, 
      {id: 'GN', title: 'Guinea', customData: 0, groupId: '62'}, 
      {id: 'GW', title: 'Guinea-Bissau', customData: 0, groupId: '63'}, 
      {id: 'GY', title: 'Guyana', customData: 0, groupId: '64'}, 
      {id: 'HT', title: 'Haiti', customData: 0, groupId: '65'}, 
      {id: 'HN', title: 'Honduras', customData: 0, groupId: '66'}, 
      {id: 'HK', title: 'Hong Kong, China', customData: 0, groupId: '67'}, 
      {id: 'HU', title: 'Hungary', customData: 0, groupId: '68'}, 
      {id: 'IS', title: 'Iceland', customData: 0, groupId: '69'}, 
      {id: 'IN', title: 'India', customData: 0, groupId: '70'}, 
      {id: 'ID', title: 'Indonesia', customData: 0, groupId: '71'}, 
      {id: 'IR', title: 'Iran', customData: 0, groupId: '72'}, 
      {id: 'IQ', title: 'Iraq', customData: 0, groupId: '73'}, 
      {id: 'IE', title: 'Ireland', customData: 0, groupId: '74'}, 
      {id: 'IL', title: 'Israel', customData: 0, groupId: '75'}, 
      {id: 'IT', title: 'Italy', customData: 0, groupId: '76'}, 
      {id: 'JM', title: 'Jamaica', customData: 0, groupId: '77'}, 
      {id: 'JP', title: 'Japan', customData: 0, groupId: '78'}, 
      {id: 'JO', title: 'Jordan', customData: 0, groupId: '79'}, 
      {id: 'KZ', title: 'Kazakhstan', customData: 0, groupId: '80'}, 
      {id: 'KE', title: 'Kenya', customData: 0, groupId: '81'}, 
      {id: 'KP', title: 'Korea, Dem. Rep.', customData: 0, groupId: '82'}, 
      {id: 'KR', title: 'Korea, Rep.', customData: 0, groupId: '83'}, 
      {id: 'KW', title: 'Kuwait', customData: 0, groupId: '84'}, 
      {id: 'KG', title: 'Kyrgyzstan', customData: 0, groupId: '85'}, 
      {id: 'LA', title: 'Laos', customData: 0, groupId: '86'}, 
      {id: 'LV', title: 'Latvia', customData: 0, groupId: '87'}, 
      {id: 'LB', title: 'Lebanon', customData: 0, groupId: '88'}, 
      {id: 'LS', title: 'Lesotho', customData: 0, groupId: '89'}, 
      {id: 'LR', title: 'Liberia', customData: 0, groupId: '90'}, 
      {id: 'LY', title: 'Libya', customData: 0, groupId: '91'}, 
      {id: 'LT', title: 'Lithuania', customData: 0, groupId: '92'}, 
      {id: 'LU', title: 'Luxembourg', customData: 0, groupId: '93'}, 
      {id: 'MK', title: 'Macedonia, FYR', customData: 0, groupId: '94'}, 
      {id: 'MG', title: 'Madagascar', customData: 0, groupId: '95'}, 
      {id: 'MW', title: 'Malawi', customData: 0, groupId: '96'}, 
      {id: 'MY', title: 'Malaysia', customData: 0, groupId: '97'}, 
      {id: 'ML', title: 'Mali', customData: 0, groupId: '98'}, 
      {id: 'MR', title: 'Mauritania', customData: 0, groupId: '99'}, 
      {id: 'MU', title: 'Mauritius', customData: 0, groupId: '100'}, 
      {id: 'MX', title: 'Mexico', customData: 0, groupId: '101'}, 
      {id: 'MD', title: 'Moldova', customData: 0, groupId: '102'}, 
      {id: 'MN', title: 'Mongolia', customData: 0, groupId: '103'}, 
      {id: 'ME', title: 'Montenegro', customData: 0, groupId: '104'}, 
      {id: 'MA', title: 'Morocco', customData: 0, groupId: '105'}, 
      {id: 'MZ', title: 'Mozambique', customData: 0, groupId: '106'}, 
      {id: 'MM', title: 'Myanmar', customData: 0, groupId: '107'}, 
      {id: 'NA', title: 'Namibia', customData: 0, groupId: '108'}, 
      {id: 'NP', title: 'Nepal', customData: 0, groupId: '109'}, 
      {id: 'NL', title: 'Netherlands', customData: 0, groupId: '110'}, 
      {id: 'NZ', title: 'New Zealand', customData: 0, groupId: '111'}, 
      {id: 'NI', title: 'Nicaragua', customData: 0, groupId: '112'}, 
      {id: 'NE', title: 'Niger', customData: 0, groupId: '113'}, 
      {id: 'NG', title: 'Nigeria', customData: 0, groupId: '114'}, 
      {id: 'NO', title: 'Norway', customData: 0, groupId: '115'}, 
      {id: 'OM', title: 'Oman', customData: 0, groupId: '116'}, 
      {id: 'PK', title: 'Pakistan', customData: 0, groupId: '117'}, 
      {id: 'PA', title: 'Panama', customData: 0, groupId: '118'}, 
      {id: 'PG', title: 'Papua New Guinea', customData: 0, groupId: '119'}, 
      {id: 'PY', title: 'Paraguay', customData: 0, groupId: '120'}, 
      {id: 'PE', title: 'Peru', customData: 0, groupId: '121'}, 
      {id: 'PH', title: 'Philippines', customData: 0, groupId: '122'}, 
      {id: 'PL', title: 'Poland', customData: 0, groupId: '123'}, 
      {id: 'PT', title: 'Portugal', customData: 0, groupId: '124'}, 
      {id: 'PR', title: 'Puerto Rico', customData: 0, groupId: '125'}, 
      {id: 'QA', title: 'Qatar', customData: 0, groupId: '126'}, 
      {id: 'RO', title: 'Romania', customData: 0, groupId: '127'}, 
      {id: 'RU', title: 'Russia', customData: 0, groupId: '128'}, 
      {id: 'RW', title: 'Rwanda', customData: 0, groupId: '129'}, 
      {id: 'SA', title: 'Saudi Arabia', customData: 0, groupId: '130'}, 
      {id: 'SN', title: 'Senegal', customData: 0, groupId: '131'}, 
      {id: 'RS', title: 'Serbia', customData: 0, groupId: '132'}, 
      {id: 'SL', title: 'Sierra Leone', customData: 0, groupId: '133'}, 
      {id: 'SG', title: 'Singapore', customData: 0, groupId: '134'}, 
      {id: 'SK', title: 'Slovak Republic', customData: 0, groupId: '135'}, 
      {id: 'SI', title: 'Slovenia', customData: 0, groupId: '136'}, 
      {id: 'SB', title: 'Solomon Islands', customData: 0, groupId: '137'}, 
      {id: 'SO', title: 'Somalia', customData: 0, groupId: '138'}, 
      {id: 'ZA', title: 'South Africa', customData: 0, groupId: '139'}, 
      {id: 'ES', title: 'Spain', customData: 0, groupId: '140'}, 
      {id: 'LK', title: 'Sri Lanka', customData: 0, groupId: '141'}, 
      {id: 'SD', title: 'Sudan', customData: 0, groupId: '142'}, 
      {id: 'SR', title: 'Surititle', customData: 0, groupId: '143'}, 
      {id: 'SZ', title: 'Swaziland', customData: 0, groupId: '144'}, 
      {id: 'SE', title: 'Sweden', customData: 0, groupId: '145'}, 
      {id: 'CH', title: 'Switzerland', customData: 0, groupId: '146'}, 
      {id: 'SY', title: 'Syria', customData: 0, groupId: '147'}, 
      {id: 'TW', title: 'Taiwan', customData: 0, groupId: '148'}, 
      {id: 'TJ', title: 'Tajikistan', customData: 0, groupId: '149'}, 
      {id: 'TZ', title: 'Tanzania', customData: 0, groupId: '150'}, 
      {id: 'TH', title: 'Thailand', customData: 0, groupId: '151'}, 
      {id: 'TG', title: 'Togo', customData: 0, groupId: '152'}, 
      {id: 'TT', title: 'Trinidad and Tobago', customData: 0, groupId: '153'}, 
      {id: 'TN', title: 'Tunisia', customData: 0, groupId: '154'}, 
      {id: 'TR', title: 'Turkey', customData: 0, groupId: '155'}, 
      {id: 'TM', title: 'Turkmenistan', customData: 0, groupId: '156'}, 
      {id: 'UG', title: 'Uganda', customData: 0, groupId: '157'}, 
      {id: 'UA', title: 'Ukraine', customData: 0, groupId: '158'}, 
      {id: 'AE', title: 'United Arab Emirates', customData: 0, groupId: '159'}, 
      {id: 'GB', title: 'United Kingdom', customData: 0, groupId: '160'}, 
      {id: 'US', title: 'United States', customData: 0, groupId: '161'}, 
      {id: 'UY', title: 'Uruguay', customData: 0, groupId: '162'}, 
      {id: 'UZ', title: 'Uzbekistan', customData: 0, groupId: '163'}, 
      {id: 'VE', title: 'Venezuela', customData: 0, groupId: '164'}, 
      {id: 'PS', title: 'West Bank and Gaza', customData: 0, groupId: '165'}, 
      {id: 'VN', title: 'Vietnam', customData: 0, groupId: '166'}, 
      {id: 'YE', title: 'Yemen, Rep.', customData: 0, groupId: '167'}, 
      {id: 'ZM', title: 'Zambia', customData: 0, groupId: '168'}, 
      {id: 'ZW', title: 'Zimbabwe', customData: 0, groupId: '169'}
      ]
      },

      areasSettings: {
        rollOverOutlineColor: this.layoutColors.border,
        rollOverColor: this.layoutColors.primaryDark,
        alpha: 0.8,
        unlistedAreasAlpha: 0.2,
        unlistedAreasColor: this.layoutColors.defaultText,
        balloonText: '[[title]]: [[customData]]'
      },


      legend: {
        width: '100%',
        marginRight: 27,
        marginLeft: 27,
        equalWidths: false,
        backgroundAlpha: 0.3,
        backgroundColor: this.layoutColors.border,
        borderColor: this.layoutColors.border,
        borderAlpha: 1,
        top: 362,
        left: 0,
        horizontalGap: 10,
        data: [
          {
            title: 'over 1 000 users',
            color: this.layoutColors.primary
          },
          {
            title: '500 - 1 000 users',
            color: this.layoutColors.successLight
          },
          {
            title: '100 - 500 users',
            color: this.layoutColors.success
          },
          {
            title: '0 - 100 users',
            color: this.layoutColors.danger
          }
        ]
      },
      export: {
        enabled: true
      },
      creditsPosition: 'bottom-right',
      pathToImages: layoutPaths.images.amChart
    };
    
    this._usersMapService.getData().subscribe(data => {
      for(let i=0; data[i];i++){
        for(let x=0;this.map.dataProvider.areas[x];x++){
          if(this.map.dataProvider.areas[x].id[0]==data[i].nacionalidade[0] && this.map.dataProvider.areas[x].id[1]==data[i].nacionalidade[1]) {
            this.map.dataProvider.areas[x].customData++;
            if(this.map.dataProvider.areas[x].customData>0) this.map.dataProvider.areas[x].color="#FEA501";
            
          }
    }
  }
  this.check=true;
    });
    this.mapDataTemp = this.map;

    this.mapData=this.mapDataTemp;},10000)
  }


}
