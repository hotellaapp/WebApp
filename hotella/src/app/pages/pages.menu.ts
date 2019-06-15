export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'Dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'servicos',
        data: {
          menu: {
            title: 'Serviços',
            icon: 'ion-stats-bars',
            selected: false,
            expanded: false,
            order: 200,
          }
        },
      },
      {
        path: 'checkinout',
        data: {
          menu: {
            title: 'Check in/Check out',
            icon: 'ion-android-laptop',
            selected: false,
            expanded: false,
            order: 300,
          }
        },
        
      }, 
      {
        path: 'services',
        data: {
          menu: {
            title: 'Serviços',
            icon: 'ion-compose',
            selected: false,
            expanded: false,
            order: 400,
          }
        },
       
      },
      {
        path: 'informacoes',
        data: {
          menu: {
            title: 'Informações',
            icon: 'ion-compose',
            selected: false,
            expanded: false,
            order: 400,
          }
        },
       
      },
      {
        path: 'avaliacoes',
        data: {
          menu: {
            title: 'Avaliações',
            icon: 'ion-compose',
            selected: false,
            expanded: false,
            order: 500,
          }
        }
      },
      {
        
        path: 'admin',
        data: {
          menu: {
            title: 'Gestão Funcionários',
            icon: 'ion-gear-a',
            order: 600,
          }
        },
        

      },
	        {
        
        path: 'Charts',
        data: {
          menu: {
            title: 'BI',
            icon: 'ion-gear-a',
            order: 700,
          }
        },
        

      },
    ]
  
  }
];

//https://stackoverflow.com/questions/42997053/how-to-manage-menu-based-on-user-roles-in-angular-2
