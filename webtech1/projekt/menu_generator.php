<?php

$menu = [
  // (object)[
  //   'text'=> 'Domov',
  //   'url' => 'index.html',
  // ],
  (object)[
    'text'=> 'Pamiatky',
    'url' => 'pamiatky.html',
    'items' =>[
      (object)[
        'text'=> 'Mapy',
        'url' => 'pamiatky.html',
        'items' =>[
          (object)[
            'text'=> 'Časová OS',
            'url' => 'pamaiatky-os.html',
          ],
          (object)[
            'text'=> 'Google Mapa',
            'url' => 'pamaiatky-gmapa.html',
          ],
        ],
      ],
      (object)[
        'text'=> 'Zoznam',
        'url' => 'pamiatky.html',
      ],
    ],
  ],
  (object)[
    'text'=> 'Hry',
    'url' => 'games.html',
    'items' =>[
      (object)[
        'text'=> 'Chinese Checkers',
        'url' => 'game-checkers.html',
      ],
      (object)[
        'text'=> 'Tangram',
        'url' => 'game-tangram.html',
      ],
  	  (object)[
    		'text'=> 'Zápalkový hlavolam',
    		'url' => 'game-zapalky.html',
  	  ],
      (object)[
    		'text'=> 'Zemepisné puzzle',
    		'url' => 'game-puzzle.html',
  	  ],
      (object)[
    		'text'=> 'Hanoiské veže',
    		'url' => 'game-veze.html',
  	  ],
    ],
  ],
  (object)[

    'text'=> 'Pripomienkovač',
    'url' => 'pripomienkovac.html',
  ],
  (object)[
    'text'=> 'Meniny',
    'url' => 'meniny.html',
  ],
  (object)[
    'text'=> 'Kontakt',
    'url' => 'kontakt.html',
  ],
  /*
  (object)[
    'text'=> 'LVL1',
    'url' => 'index.html',
    'items' =>[
      (object)[
        'text'=> 'LVL2',
        'url' => 'index.html',
      ],
      (object)[
        'text'=> 'LVL2.1',
        'url' => 'index.html',
        'items' =>[
          (object)[
            'text'=> 'LVL3',
            'url' => 'index.html',
          ],
          (object)[
            'text'=> 'LVL3.1',
            'url' => 'index.html',
          ],
        ],
      ],
    ],
  ],*/
];
file_put_contents('js/menu.json',json_encode($menu));
echo json_encode($menu);
?>
