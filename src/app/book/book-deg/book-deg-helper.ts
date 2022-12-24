import { Injectable } from '@angular/core'

// import { ActivatedRoute,
//          Router,
//          UrlTree,
//          UrlSegment,
//          UrlSegmentGroup } from '@angular/router'

// import { SpotsagaStatic } from './spotsaga-static'
// import { Overview } from '../_models/overview.model'


// overviewHelper.fragmentFromName(component['name'])

@Injectable()
export class BookDegHelper {



  public static creditsDataScroll: any = [

    { category: 'Los Angeles',
      lines:   [  "Allison Acosta",
                  "Anuj Bansal",
                  "Laura Basualdo",
                  "Wilfred Castillo",
                  "Claudia Chiu",
                  "Dennis Chiu",
                  "Ariel Creagh",
                  "Christian Paul Curameng",
                  "Myron Curlee",
                  "Dhawal Desai",
                  "Richard Franco",
                  "Christian Hall",
                  "Oscar Hernandez",
                  "Luis Hernandez-Velasquez",
                  "Conrad Hohener",
                  "Agustin Huerta",
                  "Michael Leung",
                  "Evelyn Li",
                  "Kaiji Liang",
                  "Julia Magallon",
                  "Krishna Marepalli",
                  "Andrew McHale",
                  "Alexis Mireles",
                  "Christopher Neumann",
                  "Carmen O'Rourke",
                  "Enrique Orozco",
                  "Daniel Phelan",
                  "Jeffrey Roi",
                  "Aram Subramanian",
                  "Justin Tan",
                  "Joshua Wang",
                  "Deena Widran",
                  "Eden Wong",
                  "Daniel Zepeda",
                ]
    },
    { category: 'Oakland',
      lines:   [  "Sara Ahrens",
                  "Michael Allen",
                  "Mustafa Amin",
                  "Danielle Aschettino-Ferguson",
                  "Alex Barnes",
                  "Corey Beck",
                  "Travis Chrupalo",
                  "Peter Cruz",
                  "Paul Degenkolb",
                  "Lucie Fougner",
                  "Daniel Gaspar Rodriguez",
                  "Edward Gil",
                  "Lilian Gonzalez",
                  "Elena Good",
                  "Jennifer Gross",
                  "Jorn Halle",
                  "Nick Hardisty",
                  "Youssef Heikal",
                  "Heavenz Kaur",
                  "Mariam Khird",
                  "Paige Kohrs-Herwig",
                  "Jiun-Wei Lai",
                  "David Lam",
                  "Yiling Lin",
                  "James Liu",
                  "Jay Love",
                  "Wayne Low",
                  "Abe Lynn",
                  "Catherine Markuson",
                  "David Martin",
                  "Melissa McCarty",
                  "Kevin McEntee",
                  "Carrie Mitchell",
                  "Erik Moore",
                  "Mohamed Musa",
                  "Christopher Ouyang",
                  "Melissa Patel",
                  "Andrea Ramos",
                  "Brendin Randall",
                  "Holly Razzano",
                  "Fendy Setiawan",
                  "Curtis Siegfried",
                  "Hagen Tam",
                  "Davis Thomas",
                  "Theresa Turri",
                  "Robert Wang",
                  "Xena Waters",
                  "Christopher Wolff",
                  "Simon Wong",
                  "Gordon Wray",
                  "Jay Yin" ]
    },


      // Orange County

    { category: 'Orange County',
      lines:  [ "Alex Arellano",
                "Matthew Barnard",
                "Geraldine Castro",
                "Garrett Hagen",
                "Salvador Hernandez",
                "Daniel Lin",
                "Rory Lopez-Esce",
                "Hue Truong Luong",
                "Xiaomi Mitsuhashi",
                "Jesus Orozco",
                "Seyed Pirzadeh",
                "Joshua Rojo",
                "Alfred Tran",
                "Phuoc Tran",
                "Claudia Zapata Kraft",
              ]
    },

    { category: 'Sacramento',
      lines:  [ "Christian Ambriz",
                "Kimberley Bocanegra",
                "Wesley Chan",
                "Yu-Wen Chi",
                "Fabian Cortes",
                "Catalina Doughri",
                "Lisa Esquivel",
                "Gyorgy Guevarra",
                "Ahmad Hassan",
                "Hannah Hilluby",
                "Christopher Hilson",
                "Emily Jahansouz",
                "Timothy Lindsey",
                "Devon Lumbard",
                "Emily Manasyan",
                "Kenneth Martin",
                "Daniel Miller",
                "David Miller",
                "Steven Moore",
                "Henry O'Brien",
                "Jared Ouellette",
                "Jaelen Pearson",
                "Laura Rice",
                "Jordan Rutledge",
                "Peter Sandlin",
                "Jason Scanlan",
                "Ruvim Skitsko",
                "Russell Steeves",
                "Rebecca Weldon",
                "Katharine Worcester",
              ]
    },

    { category: 'San Diego',
      lines:  [ "Ray Barakat",
                "Jose Brambila",
                "Michael Braund",
                "Jeremy Callister",
                "Alvaro Celestino",
                "Chad Closs",
                "Pascal Conte",
                "Octavio Cortes-Macouzet",
                "Valentina Couse-Baker",
                "Hannah Johnson",
                "Lindsey Kuster",
                "Jeffrey Lee",
                "Peter Maloney",
                "Alexander Motzny",
                "Megan Schroeder",
                "Austin Shakiban",
                "Aliana Sonza",
                "Nikki Tran",
                "Juan Yescas",
              ]
    },


    { category: 'San Francisco',
      lines:  [ "Andres Acosta",
                "Enrico Alvaro",
                "Anthony Ambrosio-Meir",
                "Falguni Amin",
                "Daisy Aquino",
                "Colette Armstrong",
                "Maury Ballif",
                "Stacy Bartoletti",
                "Mark Berkowitz",
                "Rosa Bertino",
                "Bryan Bindrich",
                "Torrey Bolden",
                "Walter Chang",
                "Michael Chisholm",
                "Oanh Chu",
                "Alex Chu",
                "Canna Chung",
                "Pia Concepcion",
                "Alejandro Doctor",
                "Lynn Doyle",
                "Peter Fobel",
                "Roberto Furlan",
                "Robert Graff",
                "Nada Haloush",
                "Erica Hays",
                "Thomas Hill",
                "Adam Hugo-Holman",
                "Kenny Huynh",
                "Amy Inhofer",
                "Kirk Johnston",
                "Laurie Johnston",
                "Lief Kaiper",
                "Shane Kaiper",
                "John Karcher",
                "Vincentius Kho",
                "Claire Killian",
                "In Sung Kim",
                "Que Le",
                "Monica Lee",
                "Julien Letham",
                "Rainbow Lin",
                "Laurie Lumish",
                "James Malley",
                "Miguel Marasigan",
                "Maria Martinez",
                "Erik McAdams",
                "Morgan Michna",
                "Lindsay Miller",
                "Adrian Nacamuli",
                "Aimee Nalle",
                "Timothy Nelson",
                "Rick Nystrom",
                "Sylvia Paret",
                "Roger Parra",
                "Robert Pekelnicky",
                "Raymond Pugliesi",
                "Pearl Ranchal",
                "Kirstie Roa",
                "Alan Roberts",
                "Joseph Rodgers",
                "Ariane Rosario Martinez",
                "Andrew Scott",
                "Carlos Serrano Rodezno",
                "Nicholas Skok",
                "Giana Stanco",
                "Hannah Thompson",
                "Bing Yi Tsui",
                "Erick Vasquez",
                "Sean Wang",
                "Jonathan Wegleitner",
                "Vincent Wenzel",
                "Laura Weyl",
                "Ryan White",
                "Hailey Woo",
                "Roberta Woo",
                "Loring Wyllie",
                "Yang Xie",
              ]
    },

    { category: 'Seattle',
      lines:  [ "Cale Ash",
                "Sarah Bergquist",
                "Michael Bramhall",
                "Bianca Casem",
                "Brett Cates",
                "Cecelia Guess",
                "Tiffany La",
                "Katrina Miller",
                "Dana Nance",
                "Jacqueline Rock",
                "Kenda Salisbury",
                "Joshua Sizemore",
                "Daniel Sloat",
                "Mitchell Smith",
                "David Sommer",
                "Kyle Steuck",
                "Clare Terpstra",
                "Benjamin Terry",
                "Lisette Terry",
                "Hee Jae Yang"
              ]
    },

    { category: 'Copy Adaptation',
      lines:  [ "Colette Armstrong",
                "Giana Stanco",
                "Laurie Lumish",
                ]
    },

    { category: 'Ideation',
      lines:  [ "Kenda Salisbury",
                "Allison Acosta",
                "Morgan Michna",
                "Deena Weiner Widran",
                "Lief Kaiper",
                "Rebecca Weldon",
                "Giana Stanco",
                "Colette Armstrong",
                "Laurie Lumish",
                ]
    },

    { category: 'Original Source Material',
      columns: 1,
      // lines:  [ `A Visit from St. Nicholas\nby Clement Clarke Moore` ]
      lines:  [ `A Visit from St. Nicholas  by Clement Clarke Moore` ]
    },

    { category: 'Creative',
      columns: 1,
      lines:  [ 'lowercase productions' ],
      links: [ 'https://www.lowercaseproductions.com/' ]
    },
  ]




  public static creditsData: any = [

    { category: 'Los Angeles',
      lines:   [  "Allison Acosta",
                  "Anuj Bansal",
                  "Laura Basualdo",
                  "Wilfred Castillo",
                  "Claudia Chiu",
                  "Dennis Chiu",
                  "Ariel Creagh",
                  "Christian Paul Curameng",
                  "Myron Curlee",
                  "Dhawal Desai",
                  "Richard Franco",
                  "Christian Hall",
                  "Oscar Hernandez",
                  "Luis Hernandez-Velasquez",
                  "Conrad Hohener",
                  "Agustin Huerta",
                  "Michael Leung",
                  "Evelyn Li",
                  "Kaiji Liang",
                  "Julia Magallon",
                  "Krishna Marepalli",
                  "Andrew McHale",
                  "Alexis Mireles",
                  "Christopher Neumann",
                  "Carmen O'Rourke",
                  "Enrique Orozco",
                  "Daniel Phelan",
                  "Jeffrey Roi",
                  "Aram Subramanian",
                  "Justin Tan",
                  "Joshua Wang",
                  "Deena Widran",
                  "Eden Wong",
                  "Daniel Zepeda",
                ]
    },
    { category: 'Oakland',
      lines:   [  "Sara Ahrens",
                  "Michael Allen",
                  "Mustafa Amin",
                  "Danielle Aschettino-Ferguson",
                  "Alex Barnes",
                  "Corey Beck",
                  "Travis Chrupalo",
                  "Peter Cruz",
                  "Paul Degenkolb",
                  "Lucie Fougner",
                  "Daniel Gaspar Rodriguez",
                  "Edward Gil",
                  "Lilian Gonzalez",
                  "Elena Good",
                  "Jennifer Gross",
                  "Jorn Halle",
                  "Nick Hardisty",
                  "Youssef Heikal",
                  "Heavenz Kaur",
                  "Mariam Khird",
                  "Paige Kohrs-Herwig",
                  "Jiun-Wei Lai",
                  "David Lam",
                  "Yiling Lin",
                  "James Liu",
                  "Jay Love",
                  "Wayne Low",
                  "Abe Lynn",
                  "Catherine Markuson",
                  "David Martin",
                  "Melissa McCarty",
                  "Kevin McEntee",
                  "Carrie Mitchell",
                  "Erik Moore",
                  "Mohamed Musa",
                  "Christopher Ouyang",
                  "Melissa Patel",
                  "Andrea Ramos",
                  "Brendin Randall",
                  "Holly Razzano",
                  ]
    },

    { category: "Oakland 2",
      hide_title: true,
      lines:  [   "Fendy Setiawan",
                  "Curtis Siegfried",
                  "Hagen Tam",
                  "Davis Thomas",
                  "Theresa Turri",
                  "Robert Wang",
                  "Xena Waters",
                  "Christopher Wolff",
                  "Simon Wong",
                  "Gordon Wray",
                  "Jay Yin" ]
    },


      // Orange County

    { category: 'Orange County',
      lines:  [ "Alex Arellano",
                "Matthew Barnard",
                "Geraldine Castro",
                "Garrett Hagen",
                "Salvador Hernandez",
                "Daniel Lin",
                "Rory Lopez-Esce",
                "Hue Truong Luong",
                "Xiaomi Mitsuhashi",
                "Jesus Orozco",
                "Seyed Pirzadeh",
                "Joshua Rojo",
                "Alfred Tran",
                "Phuoc Tran",
                "Claudia Zapata Kraft",
              ]
    },

    { category: 'Sacramento',
      lines:  [ "Christian Ambriz",
                "Kimberley Bocanegra",
                "Wesley Chan",
                "Yu-Wen Chi",
                "Fabian Cortes",
                "Catalina Doughri",
                "Lisa Esquivel",
                "Gyorgy Guevarra",
                "Ahmad Hassan",
                "Hannah Hilluby",
                "Christopher Hilson",
                "Emily Jahansouz",
                "Timothy Lindsey",
                "Devon Lumbard",
                "Emily Manasyan",
                "Kenneth Martin",
                "Daniel Miller",
                "David Miller",
                "Steven Moore",
                "Henry O'Brien",
                "Jared Ouellette",
                "Jaelen Pearson",
                "Laura Rice",
                "Jordan Rutledge",
                "Peter Sandlin",
                "Jason Scanlan",
                "Ruvim Skitsko",
                "Russell Steeves",
                "Rebecca Weldon",
                "Katharine Worcester",
              ]
    },

    { category: 'San Diego',
      lines:  [ "Ray Barakat",
                "Jose Brambila",
                "Michael Braund",
                "Jeremy Callister",
                "Alvaro Celestino",
                "Chad Closs",
                "Pascal Conte",
                "Octavio Cortes-Macouzet",
                "Valentina Couse-Baker",
                "Hannah Johnson",
                "Lindsey Kuster",
                "Jeffrey Lee",
                "Peter Maloney",
                "Alexander Motzny",
                "Megan Schroeder",
                "Austin Shakiban",
                "Aliana Sonza",
                "Nikki Tran",
                "Juan Yescas",
              ]
    },


    { category: 'San Francisco',
      lines:  [ "Andres Acosta",
                "Enrico Alvaro",
                "Anthony Ambrosio-Meir",
                "Falguni Amin",
                "Daisy Aquino",
                "Colette Armstrong",
                "Maury Ballif",
                "Stacy Bartoletti",
                "Mark Berkowitz",
                "Rosa Bertino",
                "Bryan Bindrich",
                "Torrey Bolden",
                "Walter Chang",
                "Michael Chisholm",
                "Oanh Chu",
                "Alex Chu",
                "Canna Chung",
                "Pia Concepcion",
                "Alejandro Doctor",
                "Lynn Doyle",
                "Peter Fobel",
                "Roberto Furlan",
                "Robert Graff",
                "Nada Haloush",
                "Erica Hays",
                "Thomas Hill",
                "Adam Hugo-Holman",
                "Kenny Huynh",
                "Amy Inhofer",
                "Kirk Johnston",
                "Laurie Johnston",
                "Lief Kaiper",
                "Shane Kaiper",
                "John Karcher",
                "Vincentius Kho",
                "Claire Killian",
                "In Sung Kim",
                "Que Le",
                "Monica Lee",
                "Julien Letham",
                "Rainbow Lin",
                "Laurie Lumish",
                "James Malley",
                "Miguel Marasigan",
                "Maria Martinez",
                "Erik McAdams",
                "Morgan Michna",
                "Lindsay Miller",
                "Adrian Nacamuli",
                "Aimee Nalle",
                "Timothy Nelson",
                "Rick Nystrom",
                "Sylvia Paret",
                "Roger Parra",
                "Robert Pekelnicky",
                "Raymond Pugliesi",
                "Pearl Ranchal",
                "Kirstie Roa",
                "Alan Roberts",
                "Joseph Rodgers",
                ]
    },

    { category: "San Francisco 2",
      hide_title: true,
      lines:  [
                "Ariane Rosario Martinez",
                "Andrew Scott",
                "Carlos Serrano Rodezno",
                "Nicholas Skok",
                "Giana Stanco",
                "Hannah Thompson",
                "Bing Yi Tsui",
                "Erick Vasquez",
                "Sean Wang",
                "Jonathan Wegleitner",
                "Vincent Wenzel",
                "Laura Weyl",
                "Ryan White",
                "Hailey Woo",
                "Roberta Woo",
                "Loring Wyllie",
                "Yang Xie",
              ]
    },

    { category: 'Seattle',
      lines:  [ "Cale Ash",
                "Sarah Bergquist",
                "Michael Bramhall",
                "Bianca Casem",
                "Brett Cates",
                "Cecelia Guess",
                "Tiffany La",
                "Katrina Miller",
                "Dana Nance",
                "Jacqueline Rock",
                "Kenda Salisbury",
                "Joshua Sizemore",
                "Daniel Sloat",
                "Mitchell Smith",
                "David Sommer",
                "Kyle Steuck",
                "Clare Terpstra",
                "Benjamin Terry",
                "Lisette Terry",
                "Hee Jae Yang"
              ]
    },

    { category: 'Copy Adaptation',
      lines:  [ "Colette Armstrong",
                "Giana Stanco",
                "Laurie Lumish",
                ]
    },

    { category: 'Ideation',
      lines:  [ "Kenda Salisbury",
                "Allison Acosta",
                "Morgan Michna",
                "Deena Weiner Widran",
                "Lief Kaiper",
                "Rebecca Weldon",
                "Giana Stanco",
                "Colette Armstrong",
                "Laurie Lumish",
                ]
    },

    // { category: 'Original Source Material',
    //   lines:  [ "A Visit from St. Nicholas",
    //             "by Clement Clarke Moore"
    //             ]
    // },

    // { category: 'Creative',
    //   lines:  [ 'lowercase productions' ],
    //   links: [ 'https://www.lowercaseproductions.com/' ]
    // },
  ]
}