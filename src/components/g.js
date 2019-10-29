const g = [
  {
    id: "0",
    film_info: {
      title: "Happiness With Himself",
      alternative_title: "Raiders In Himself",
      total_rating: 9.4,
      poster: "images/posters/santa-claus-conquers-the-martians.jpg",
      age_rating: 18,
      director: "James Cameron",
      writers: ["Robert Zemeckis", "Hayao Miazaki"],
      actors: [
        "Leonardo DiCaprio",
        "Robert De Niro",
        "Edward Norton",
        "Harrison Ford"
      ],
      release: { date: "2013-03-29T02:26:54.947Z", release_country: "Germany" },
      runtime: 193,
      genre: ["Action", "Family", "Horror"],
      description:
        'Oscar-winning film, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.'
    },
    user_details: {
      personal_rating: 4,
      watchlist: false,
      already_watched: false,
      watching_date: null,
      favorite: false
    },
    comments: ["8958", "8959", "8960", "8961"]
  },
  {
    id: "1",
    film_info: {
      title: "Family On Himself",
      alternative_title: "A Shark On Themselves",
      total_rating: 4.8,
      poster: "images/posters/the-dance-of-life.jpg",
      age_rating: 21,
      director: "Akira Kurosawa",
      writers: ["Stephen Spielberg"],
      actors: [
        "Morgan Freeman ",
        "Leonardo DiCaprio",
        "Michael Caine",
        "Robert De Niro",
        "Takeshi Kitano",
        "Cillian Murphy"
      ],
      release: { date: "2009-02-26T19:19:44.420Z", release_country: "Russia" },
      runtime: 158,
      genre: ["Adventure", "Comedy", "Drama", "Family", "Horror", "Thriller"],
      description:
        "a war drama about two young people, with the best fight scenes since Bruce Lee."
    },
    user_details: {
      personal_rating: 5,
      watchlist: false,
      already_watched: true,
      watching_date: 1572362705268,
      favorite: false
    },
    comments: ["8962", "8963", "8964", "8965", "8966", "8967"]
  },
  {
    id: "2",
    film_info: {
      title: "Friends Who Bought The Floor",
      alternative_title: "A Lion In The Storm",
      total_rating: 7.3,
      poster: "images/posters/the-man-with-the-golden-arm.jpg",
      age_rating: 18,
      director: "Clint Eastwood",
      writers: ["Stephen King"],
      actors: [
        "Leonardo DiCaprio",
        "Michael Caine",
        "Tom Hanks",
        "Christian Bale",
        "Edward Norton",
        "Harrison Ford",
        "Ralph Fiennes"
      ],
      release: { date: "2010-07-29T21:42:31.823Z", release_country: "Russia" },
      runtime: 74,
      genre: ["Sci-Fi"],
      description:
        'from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", a film about a journey that heroes are about to make in finding themselves, with the best fight scenes since Bruce Lee.'
    },
    user_details: {
      personal_rating: 7,
      watchlist: true,
      already_watched: true,
      watching_date: 1555687505268,
      favorite: false
    },
    comments: ["8968", "8969", "8970"]
  },
  {
    id: "3",
    film_info: {
      title: "Country Of The Carpet",
      alternative_title: "Happiness Within The Carpet",
      total_rating: 6.5,
      poster: "images/posters/santa-claus-conquers-the-martians.jpg",
      age_rating: 6,
      director: "Chrostopher Nolan",
      writers: ["Robert Rodrigues", "Stephen Spielberg"],
      actors: [
        "Leonardo DiCaprio",
        "Robert De Niro",
        "Takeshi Kitano",
        "Ralph Fiennes"
      ],
      release: { date: "1997-03-24T20:46:53.192Z", release_country: "Finland" },
      runtime: 169,
      genre: ["Animation", "Action"],
      description:
        'Oscar-winning film, a war drama about two young people, true masterpiece where love and death are closer to heroes than their family, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.'
    },
    user_details: {
      personal_rating: 5,
      watchlist: true,
      already_watched: true,
      watching_date: 1565277905268,
      favorite: false
    },
    comments: ["8971", "8972", "8973"]
  },
  {
    id: "4",
    film_info: {
      title: "A Shark Without The Storm",
      alternative_title: "Country Of The Darkness",
      total_rating: 4,
      poster: "images/posters/popeye-meets-sinbad.png",
      age_rating: 6,
      director: "Tom Ford",
      writers: ["Stephen Spielberg", "Martin Scorsese"],
      actors: [
        "Leonardo DiCaprio",
        "Al Pacino",
        "Edward Norton",
        "Harrison Ford"
      ],
      release: { date: "1995-05-01T02:01:37.279Z", release_country: "Spain" },
      runtime: 81,
      genre: ["Animation", "Comedy"],
      description: "."
    },
    user_details: {
      personal_rating: 4,
      watchlist: true,
      already_watched: true,
      watching_date: 1572362705268,
      favorite: false
    },
    comments: ["8974", "8975", "8976", "8977", "8978", "8979"]
  },
  {
    id: "5",
    film_info: {
      title: "Laziness Of Themselves",
      alternative_title: "Country Who Saw The Void",
      total_rating: 9.2,
      poster: "images/posters/made-for-each-other.png",
      age_rating: 0,
      director: "Quentin Tarantino",
      writers: ["Robert Rodrigues", "Stephen King"],
      actors: ["Morgan Freeman ", "Matt Damon", "Ralph Fiennes"],
      release: { date: "2009-11-12T03:38:35.180Z", release_country: "USA" },
      runtime: 157,
      genre: ["Adventure", "Comedy", "Horror"],
      description:
        'a war drama about two young people, true masterpiece where love and death are closer to heroes than their family, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", a film about a journey that heroes are about to make in finding themselves, with the best fight scenes since Bruce Lee.'
    },
    user_details: {
      personal_rating: 4,
      watchlist: false,
      already_watched: true,
      watching_date: 1571585105268,
      favorite: false
    },
    comments: ["8980", "8981", "8982", "8983", "8984"]
  },
  {
    id: "6",
    film_info: {
      title: "Laziness Within The Darkness",
      alternative_title: "Friends Without The Floor",
      total_rating: 4.2,
      poster: "images/posters/the-man-with-the-golden-arm.jpg",
      age_rating: 18,
      director: "Alejandro Gonsales Inarritu",
      writers: [
        "Robert Zemeckis",
        "Quentin Tarantino",
        "Stephen King",
        "Hayao Miazaki"
      ],
      actors: [
        "Brad Pitt",
        "Robert De Niro",
        "Harrison Ford",
        "Cillian Murphy",
        "Ralph Fiennes"
      ],
      release: { date: "1992-01-12T18:35:12.110Z", release_country: "France" },
      runtime: 91,
      genre: ["Action", "Sci-Fi"],
      description:
        'a war drama about two young people, true masterpiece where love and death are closer to heroes than their family, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", a film about a journey that heroes are about to make in finding themselves, with the best fight scenes since Bruce Lee.'
    },
    user_details: {
      personal_rating: 5,
      watchlist: false,
      already_watched: true,
      watching_date: 1572276305268,
      favorite: true
    },
    comments: ["8985", "8986", "8987"]
  },
  {
    id: "7",
    film_info: {
      title: "Pioneers Within Themselves",
      alternative_title: "Friends In The Room",
      total_rating: 6.5,
      poster: "images/posters/the-great-flamarion.jpg",
      age_rating: 6,
      director: "Akira Kurosawa",
      writers: ["Hayao Miazaki"],
      actors: [
        "Leonardo DiCaprio",
        "Michael Caine",
        "Brad Pitt",
        "Al Pacino",
        "Harrison Ford",
        "Cillian Murphy"
      ],
      release: { date: "1992-03-19T15:41:57.067Z", release_country: "Russia" },
      runtime: 95,
      genre: ["Animation"],
      description:
        "a war drama about two young people, true masterpiece where love and death are closer to heroes than their family."
    },
    user_details: {
      personal_rating: 5,
      watchlist: false,
      already_watched: true,
      watching_date: 1565969105268,
      favorite: false
    },
    comments: ["8988", "8989", "8990", "8991", "8992"]
  },
  {
    id: "8",
    film_info: {
      title: "Laziness Who Saw Themselves",
      alternative_title: "Guest Who The Floor",
      total_rating: 4.2,
      poster: "images/posters/the-dance-of-life.jpg",
      age_rating: 6,
      director: "James Cameron",
      writers: ["Quentin Tarantino"],
      actors: [
        "Michael Caine",
        "Robert De Niro",
        "Matt Damon",
        "Takeshi Kitano",
        "Christian Bale",
        "Gary Oldman",
        "Ralph Fiennes"
      ],
      release: { date: "1994-02-22T18:25:13.598Z", release_country: "Russia" },
      runtime: 130,
      genre: ["Action", "Thriller"],
      description:
        "a war drama about two young people, true masterpiece where love and death are closer to heroes than their family, a film about a journey that heroes are about to make in finding themselves, with the best fight scenes since Bruce Lee."
    },
    user_details: {
      personal_rating: 6,
      watchlist: true,
      already_watched: true,
      watching_date: 1558797905268,
      favorite: false
    },
    comments: ["8993", "8994", "8995"]
  },
  {
    id: "9",
    film_info: {
      title: "Country With The Room",
      alternative_title: "A Man Who Sold The Carpet",
      total_rating: 6,
      poster: "images/posters/popeye-meets-sinbad.png",
      age_rating: 6,
      director: "Clint Eastwood",
      writers: ["Robert Zemeckis", "Stephen Spielberg", "Takeshi Kitano"],
      actors: [
        "Morgan Freeman ",
        "Michael Caine",
        "Brad Pitt",
        "Edward Norton",
        "Harrison Ford"
      ],
      release: { date: "2009-01-30T11:47:29.984Z", release_country: "France" },
      runtime: 76,
      genre: ["Thriller"],
      description:
        'from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.'
    },
    user_details: {
      personal_rating: 8,
      watchlist: true,
      already_watched: true,
      watching_date: 1547479505268,
      favorite: false
    },
    comments: ["8996", "8997", "8998"]
  },
  {
    id: "10",
    film_info: {
      title: "A Little Pony Who Stole The Room",
      alternative_title: "A Little Pony With Us",
      total_rating: 6.2,
      poster: "images/posters/popeye-meets-sinbad.png",
      age_rating: 0,
      director: "Tom Ford",
      writers: [
        "Robert Zemeckis",
        "Robert Rodrigues",
        "Quentin Tarantino",
        "Stephen Spielberg",
        "Martin Scorsese",
        "Hayao Miazaki"
      ],
      actors: [
        "Michael Caine",
        "Tom Hanks",
        "Takeshi Kitano",
        "Gary Oldman",
        "Al Pacino"
      ],
      release: { date: "2013-11-30T21:24:46.154Z", release_country: "France" },
      runtime: 130,
      genre: ["Adventure"],
      description:
        'Oscar-winning film, true masterpiece where love and death are closer to heroes than their family, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland".'
    },
    user_details: {
      personal_rating: 6,
      watchlist: false,
      already_watched: false,
      watching_date: null,
      favorite: false
    },
    comments: ["8999", "9000", "9001", "9002", "9003"]
  },
  {
    id: "11",
    film_info: {
      title: "Happiness Who The Room",
      alternative_title: "A Lion In The Darkness",
      total_rating: 6.4,
      poster: "images/posters/made-for-each-other.png",
      age_rating: 18,
      director: "Tom Ford",
      writers: [
        "Robert Zemeckis",
        "Quentin Tarantino",
        "Stephen King",
        "Takeshi Kitano"
      ],
      actors: ["Gary Oldman", "Ralph Fiennes"],
      release: { date: "1999-12-03T06:05:56.921Z", release_country: "Spain" },
      runtime: 184,
      genre: ["Action", "Family", "Horror", "Thriller"],
      description:
        'a war drama about two young people, true masterpiece where love and death are closer to heroes than their family, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.'
    },
    user_details: {
      personal_rating: 6,
      watchlist: false,
      already_watched: true,
      watching_date: 1572189905268,
      favorite: false
    },
    comments: ["9004", "9005", "9006", "9007", "9008"]
  },
  {
    id: "12",
    film_info: {
      title: "Guest Within The Wall",
      alternative_title: "A Tale Of A Little Bird Who Bought The Void",
      total_rating: 5.6,
      poster: "images/posters/the-man-with-the-golden-arm.jpg",
      age_rating: 21,
      director: "Brad Bird",
      writers: ["Robert Zemeckis", "Quentin Tarantino", "Martin Scorsese"],
      actors: ["Ralph Fiennes"],
      release: { date: "2019-10-13T08:09:14.693Z", release_country: "France" },
      runtime: 178,
      genre: ["Animation", "Action", "Sci-Fi"],
      description: "a war drama about two young people."
    },
    user_details: {
      personal_rating: 6,
      watchlist: false,
      already_watched: true,
      watching_date: 1556205905268,
      favorite: false
    },
    comments: ["9009", "9010", "9011", "9012", "9013"]
  },
  {
    id: "13",
    film_info: {
      title: "Laziness Who Sold Himself",
      alternative_title: "A Man Within The Floor",
      total_rating: 8.1,
      poster: "images/posters/the-great-flamarion.jpg",
      age_rating: 6,
      director: "Chrostopher Nolan",
      writers: [],
      actors: [
        "Leonardo DiCaprio",
        "Michael Caine",
        "Gary Oldman",
        "Edward Norton"
      ],
      release: { date: "2010-09-07T11:45:48.811Z", release_country: "Russia" },
      runtime: 191,
      genre: [],
      description:
        'a war drama about two young people, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland".'
    },
    user_details: {
      personal_rating: 5,
      watchlist: false,
      already_watched: true,
      watching_date: 1569684305268,
      favorite: false
    },
    comments: ["9014", "9015", "9016", "9017", "9018"]
  },
  {
    id: "14",
    film_info: {
      title: "A Little Pony Who Sold The Carpet",
      alternative_title: "Laziness Without The Storm",
      total_rating: 7.8,
      poster: "images/posters/popeye-meets-sinbad.png",
      age_rating: 21,
      director: "Brad Bird",
      writers: ["Hayao Miazaki"],
      actors: [
        "Leonardo DiCaprio",
        "Michael Caine",
        "Brad Pitt",
        "Tom Hanks",
        "Takeshi Kitano",
        "Edward Norton",
        "Harrison Ford",
        "Cillian Murphy",
        "Ralph Fiennes"
      ],
      release: { date: "2014-06-17T09:12:39.256Z", release_country: "USA" },
      runtime: 148,
      genre: ["Animation", "Adventure", "Thriller"],
      description:
        'from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", a film about a journey that heroes are about to make in finding themselves, with the best fight scenes since Bruce Lee.'
    },
    user_details: {
      personal_rating: 5,
      watchlist: false,
      already_watched: true,
      watching_date: 1554045905268,
      favorite: false
    },
    comments: ["9019", "9020", "9021"]
  },
  {
    id: "15",
    film_info: {
      title: "A Lion Within The Darkness",
      alternative_title: "A Tale Of A Little Bird On The Room",
      total_rating: 6.6,
      poster: "images/posters/sagebrush-trail.jpg",
      age_rating: 21,
      director: "Chrostopher Nolan",
      writers: ["Robert Rodrigues"],
      actors: [
        "Michael Caine",
        "Tom Hanks",
        "Al Pacino",
        "Harrison Ford",
        "Cillian Murphy"
      ],
      release: { date: "2003-06-26T17:45:05.614Z", release_country: "Finland" },
      runtime: 118,
      genre: ["Thriller"],
      description:
        'Oscar-winning film, true masterpiece where love and death are closer to heroes than their family, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", a film about a journey that heroes are about to make in finding themselves.'
    },
    user_details: {
      personal_rating: 9,
      watchlist: false,
      already_watched: true,
      watching_date: 1572362705268,
      favorite: true
    },
    comments: ["9022", "9023", "9024", "9025", "9026"]
  },
  {
    id: "16",
    film_info: {
      title: "A Tale Of A Little Bird In The Wall",
      alternative_title: "Raiders Who Him",
      total_rating: 8.9,
      poster: "images/posters/popeye-meets-sinbad.png",
      age_rating: 0,
      director: "Alejandro Gonsales Inarritu",
      writers: [],
      actors: ["Al Pacino", "Cillian Murphy"],
      release: { date: "1999-11-09T14:58:21.600Z", release_country: "Spain" },
      runtime: 184,
      genre: ["Comedy", "Thriller"],
      description:
        "true masterpiece where love and death are closer to heroes than their family, a film about a journey that heroes are about to make in finding themselves."
    },
    user_details: {
      personal_rating: 8,
      watchlist: false,
      already_watched: true,
      watching_date: 1572362705268,
      favorite: false
    },
    comments: ["9027", "9028", "9029", "9030", "9031"]
  },
  {
    id: "17",
    film_info: {
      title: "A Shark Of Himself",
      alternative_title: "Country Of The Carpet",
      total_rating: 8.9,
      poster: "images/posters/the-man-with-the-golden-arm.jpg",
      age_rating: 18,
      director: "Tom Ford",
      writers: ["Stephen King"],
      actors: [
        "Morgan Freeman ",
        "Michael Caine",
        "Matt Damon",
        "Takeshi Kitano",
        "Al Pacino",
        "Edward Norton",
        "Harrison Ford"
      ],
      release: { date: "2020-09-06T23:03:21.327Z", release_country: "China" },
      runtime: 67,
      genre: ["Drama", "Thriller"],
      description:
        "a film about a journey that heroes are about to make in finding themselves, with the best fight scenes since Bruce Lee."
    },
    user_details: {
      personal_rating: 8,
      watchlist: true,
      already_watched: false,
      watching_date: null,
      favorite: false
    },
    comments: ["9032", "9033", "9034", "9035", "9036", "9037"]
  },
  {
    id: "18",
    film_info: {
      title: "A Lion Who Sold The Storm",
      alternative_title: "Country Within The Wall",
      total_rating: 7.3,
      poster: "images/posters/santa-claus-conquers-the-martians.jpg",
      age_rating: 18,
      director: "Akira Kurosawa",
      writers: ["Takeshi Kitano"],
      actors: [
        "Leonardo DiCaprio",
        "Brad Pitt",
        "Robert De Niro",
        "Tom Hanks",
        "Harrison Ford",
        "Cillian Murphy"
      ],
      release: { date: "2007-07-15T10:10:19.007Z", release_country: "Germany" },
      runtime: 192,
      genre: ["Animation"],
      description:
        "a film about a journey that heroes are about to make in finding themselves."
    },
    user_details: {
      personal_rating: 7,
      watchlist: false,
      already_watched: true,
      watching_date: 1572362705268,
      favorite: false
    },
    comments: ["9038", "9039", "9040", "9041", "9042", "9043"]
  },
  {
    id: "19",
    film_info: {
      title: "Happiness Who The Room",
      alternative_title: "Pioneers Who Sold The Carpet",
      total_rating: 7.9,
      poster: "images/posters/made-for-each-other.png",
      age_rating: 21,
      director: "Quentin Tarantino",
      writers: ["Takeshi Kitano"],
      actors: ["Morgan Freeman ", "Tom Hanks", "Harrison Ford"],
      release: { date: "2017-02-24T01:21:30.284Z", release_country: "Italy" },
      runtime: 173,
      genre: ["Adventure"],
      description:
        'Oscar-winning film, a war drama about two young people, true masterpiece where love and death are closer to heroes than their family, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland".'
    },
    user_details: {
      personal_rating: 7,
      watchlist: false,
      already_watched: true,
      watching_date: 1565105105268,
      favorite: false
    },
    comments: ["9044", "9045", "9046"]
  }
];
